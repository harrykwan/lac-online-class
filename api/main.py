"""LAC class test — auth + progress sync API. Self-hosted, zero third-party deps."""
import json, os, sqlite3, time
from datetime import datetime, timezone
from pathlib import Path

import bcrypt, jwt
from fastapi import FastAPI, HTTPException, Response, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

DB = Path(os.environ.get("LAC_DB", "/data/lac.db"))
SECRET = os.environ.get("LAC_SECRET", "CHANGE_ME")
COOKIE = "lac_session"
JWT_TTL = 60 * 60 * 24 * 30  # 30 days

app = FastAPI(title="lac-api")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://classtest.harrykwan.tech", "http://localhost:4173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def db() -> sqlite3.Connection:
    conn = sqlite3.connect(DB)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    with db() as c:
        c.execute("""CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            password_hash TEXT NOT NULL,
            created_at TEXT NOT NULL)""")
        c.execute("""CREATE TABLE IF NOT EXISTS progress(
            user_id INTEGER PRIMARY KEY REFERENCES users(id),
            state_json TEXT NOT NULL DEFAULT '{}',
            updated_at TEXT NOT NULL)""")

init_db()

def make_token(uid: int) -> str:
    return jwt.encode({"uid": uid, "exp": int(time.time()) + JWT_TTL}, SECRET, algorithm="HS256")

def current_user(request) -> sqlite3.Row | None:
    t = request.cookies.get(COOKIE)
    if not t:
        return None
    try:
        uid = jwt.decode(t, SECRET, algorithms=["HS256"])["uid"]
    except Exception:
        return None
    with db() as c:
        return c.execute("SELECT * FROM users WHERE id=?", (uid,)).fetchone()

class AuthIn(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6, max_length=128)
    name: str = Field(default="", max_length=60)

@app.post("/api/auth/signup")
def signup(body: AuthIn, response: Response):
    pw = bcrypt.hashpw(body.password.encode(), bcrypt.gensalt()).decode()
    try:
        with db() as c:
            cur = c.execute(
                "INSERT INTO users(email,name,password_hash,created_at) VALUES(?,?,?,?)",
                (body.email.lower().strip(), body.name.strip() or body.email.split("@")[0], pw,
                 datetime.now(timezone.utc).isoformat()))
            uid = cur.lastrowid
    except sqlite3.IntegrityError:
        raise HTTPException(409, "email already registered")
    response.set_cookie(COOKIE, make_token(uid), httponly=True, samesite="lax",
                        secure=True, max_age=JWT_TTL)
    return {"id": uid, "email": body.email, "name": body.name}

@app.post("/api/auth/login")
def login(body: AuthIn, response: Response):
    with db() as c:
        u = c.execute("SELECT * FROM users WHERE email=?", (body.email.lower().strip(),)).fetchone()
    if not u or not bcrypt.checkpw(body.password.encode(), u["password_hash"].encode()):
        raise HTTPException(401, "invalid credentials")
    response.set_cookie(COOKIE, make_token(u["id"]), httponly=True, samesite="lax",
                        secure=True, max_age=JWT_TTL)
    return {"id": u["id"], "email": u["email"], "name": u["name"]}

@app.post("/api/auth/logout")
def logout(response: Response):
    response.delete_cookie(COOKIE)
    return {"ok": True}

@app.get("/api/auth/me")
def me(request: Request):
    u = current_user(request)
    return {"id": u["id"], "email": u["email"], "name": u["name"]} if u else None

@app.get("/api/progress")
def get_progress(request: Request):
    u = current_user(request)
    if not u:
        raise HTTPException(401, "not logged in")
    with db() as c:
        row = c.execute("SELECT state_json FROM progress WHERE user_id=?", (u["id"],)).fetchone()
    return json.loads(row["state_json"]) if row else {}

@app.put("/api/progress")
def put_progress(request: Request, state: dict):
    u = current_user(request)
    if not u:
        raise HTTPException(401, "not logged in")
    with db() as c:
        c.execute(
            """INSERT INTO progress(user_id, state_json, updated_at) VALUES(?,?,?)
               ON CONFLICT(user_id) DO UPDATE SET state_json=excluded.state_json, updated_at=excluded.updated_at""",
            (u["id"], json.dumps(state, ensure_ascii=False), datetime.now(timezone.utc).isoformat()))
    return {"ok": True}

@app.get("/api/health")
def health():
    return {"ok": True, "ts": time.time()}
