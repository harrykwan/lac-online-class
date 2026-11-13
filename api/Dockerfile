FROM python:3.12-slim
RUN pip install --no-cache-dir fastapi "uvicorn[standard]" bcrypt pyjwt "pydantic[email]"
WORKDIR /app
COPY main.py .
VOLUME /data
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
