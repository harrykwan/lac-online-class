# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — dev server at http://localhost:3000 (Turbopack)
- `npm run lint` — ESLint (includes React Compiler rules — refs must not be read/written during render)
- `npx tsc --noEmit` — type check
- `npm run build` — production build with **static export** to `out/` (`output: "export"`, `trailingSlash: true`)
- `npx serve out` — preview the static export (deep links need the trailing slash)

## Architecture

Course site for the IAC Music Education System (Traditional Chinese + English music terms), built from a curriculum design doc. Fully static: all interactivity is client-side (Web Audio API + localStorage), no server APIs, zero runtime deps beyond the Next.js scaffold.

**Data-driven content:** All curriculum content lives in `src/data/` — `series/*.ts` (six series with unit lists, stages, app-practice mappings, assignments), `quizzes/*.ts` (quiz sets keyed by series id), `site.ts` (home-page copy), `types.ts` (all shapes). `data/series/index.ts` exports `SERIES: Record<SeriesId, Series>` — exhaustiveness means a missing series is a compile error. Unit codes ("1.1", "05B.4") are the progress-tracking keys.

**Series pages:** Every `/series/<slug>/page.tsx` just renders `<SeriesPage id="…" />` (`src/components/series/SeriesPage.tsx`), which composes the shared shell in IAC Standard Lesson Format (hero → stages → unit list with inline widgets → app practice → playground → assignment → assessment).

**Interactive widgets:** `src/components/interactive/` — one component per exercise. `WidgetMount.tsx` is the dispatcher mapping `WidgetId` (from `data/types.ts`) to components; add new widgets there. Quiz questions are data in `src/data/quizzes/` rendered by the single `QuizEngine`.

**Web Audio (`src/lib/audio/` + `src/hooks/`):**
- `AudioEngine.ts` is a singleton; the AudioContext is created lazily inside `ensure()` — **only call it from user-gesture handlers or effects**, never at module scope (SSR + autoplay policy).
- `voices.ts` synthesizes all sounds (clicks, notes, chords, drums) at explicit AudioContext times; `impulse.ts` builds procedural reverb IRs. No audio files.
- `useRhythmScheduler` is a look-ahead scheduler (25 ms tick, 0.12 s ahead); swing shifts 8th offbeats to `swingRatio` of a beat. Visual sync via a rAF loop popping scheduled steps into `currentStep` state.

**Progress (`src/context/ProgressContext.tsx` + `src/lib/progress/store.ts`):** Module-level store consumed with `useSyncExternalStore` (server snapshot = empty state) so localStorage hydration causes no cascading setState or hydration mismatch. Progress API: unit checkboxes, assignment step checklists, quiz scores.

## React Compiler lint rules (enforced)

- Never read/write refs during render. Imperative Web Audio node params are only mutated inside event handlers on freshly created nodes; when settings change mid-playback, **rebuild the graph** (stop + start with new params) — see `RhythmPlayer.applyLive`, `EQExplorer.changeGains`.
- Analyser/compressor nodes used during render or in draw callbacks come from state, not refs (`live` state in `CompressorVisualizer`, `analyser` state in `EQExplorer`).
- Canvas refs are read inside `useAnalyserLoop`'s effect/rAF loop only.
- No synchronous setState directly in effects — use `useSyncExternalStore` for external stores (see progress store).

## Conventions

- Design tokens live in `src/app/globals.css` (`@theme`): base/surface/ink palette, per-series accents (`--color-srhythm` … `--color-smixing`, mapped by `lib/accents.ts`). Component classes: `.card`, `.card-raised`, `.btn`, `.btn-primary`, `.btn-ghost`, `.pill` (buttons/pills are Tailwind v4 `@utility` — `@apply`able).
- Fonts: Geist + Noto Sans TC via `next/font` (CJK font must keep `preload: false`).
- UI text is 繁中 with English music terminology; user-facing copy goes in `data/` files, not inside components.
