# Agent guidance

This repository uses a local markdown issue tracker. Read `docs/agents/issue-tracker.md` and the relevant `.scratch/pravki-150826/` ticket before editing.

The project is a Next.js app in `frontend/` with epoch station JSON under `content/epochs/` mirrored to `frontend/public/content/epochs/` where applicable. Keep mirrored content byte-identical. Do not modify previously completed packages unless the new ticket explicitly requires it. Use small, verified edits and report blockers honestly.

<!-- autopilot:start -->
# Tell Me Please
Интерактивный тренажёр английского 5–9 кл.: 12 эпох (3×4 Present/Past/Future × Simple/Continuous/Perfect/PerfectContinuous), секторы A1/A2/B1/B2, станции, экзамен, Verb Bot; Next.js 16 App Router в `frontend/`, JSON `content/` ↔ `frontend/public/content/` (байт-зеркала).
## Команды
```bash
cd frontend && npx tsc --noEmit   # типы, 0 ошибок — обязательно
cd frontend && npm run build      # прод-сборка next build — обязательно
cd frontend && npm run dev:local  # dev next dev --turbopack (HMR)
cd frontend && npm run lint       # eslint — НЕ гейт, базовый шум 87 ошибок
node scripts/verify-epoch.mjs     # валидация content/epochs/*/index.json
node scripts/verify-content.mjs   # валидация content/tasks
node scripts/load-test.mjs http://localhost:3000 12   # N параллельных POST на /api/chat/stream (нужен поднятый next)
```
## Структура
- `frontend/src/app/` — App Router (`/mission`, `/epoch/[slug]/[sector]/[stationId]`, `/exam`, `/class/[grade]/...`)
- `frontend/src/components/` — `tasks/*` (21 тип `*Task.tsx` + `TaskHeader`, `LevelFlow`, `verdict.ts`), `EpochMapPoster`, `EpochTheory`, `ExamEntryCard`, `ContactBlock`, `RightsFooter`, `BotChatModal`, `VerbBot`
- `TaskRenderer.tsx` лежит НЕ в `components/`, а тремя копиями рядом со своим `page.tsx`: `class/[grade]/sections/[section]/[taskId]/`, `epoch/[slug]/[sector]/[stationId]/`, `exam/[sector]/[stationId]/`
- `frontend/src/lib/` — `epochs-meta.ts` (12 эпох), `epoch.ts` (прогресс), `useProgress.ts`/`useSound.ts`, `normalize.mjs`
- `frontend/src/server/chat/` — `stream/queue/keys/prompts.ts` → `/api/chat/stream` (SSE)
- `content/epochs/<slug>/index.json` + `content/tasks/grade_*` ↔ `frontend/public/content/` (`fetch('/content/...')`)
- `frontend/public/map/epoch-map.svg` (384KB data-URI JPEG+WebP) из 15MB `плакат.svg`
- `.zscripts/{build,dev,start}.sh` — standalone деплой space.z-ai (тарболл ≤50MB)
## Ключевые файлы
- `frontend/src/lib/epochs-meta.ts:1` — `EPOCH_META:EpochMeta[]` {slug,number,title,tagline,icon,cell:{row,col}}
- `frontend/src/components/EpochMapPoster.tsx:1` — `<EpochMapPoster progress:EpochProgress onFallback?>`, галочка `epochPercent===100` (4 сектора)
- `frontend/src/lib/epoch.ts:1` — `sectorGradeKey`/`stationPassed`/`epochPercent`, `tmp_progress_grade_<N>` (A1→5,A2→6,B1→8,B2→9)
- `frontend/src/components/ExamEntryCard.tsx:1` — карточка-вход на `/exam`; рендерится на `/mission` всегда + на `epoch/[slug]` только при `slug==="future-perfect-continuous"`; проп `unlocked` принимается и **игнорируется** (R32)
- `frontend/src/components/ContactBlock.tsx:1` — единственный источник контактов на сайте: экспортирует `CONTACT_PHONE`/`CONTACT_PHONE_TEL`/`VK_URL`/`MAX_URL`, рисует телефон + кнопки MAX/ВК инлайн-SVG; живёт только в `app/page.tsx:97`, телефон оттуда же импортирует `RightsFooter.tsx:8`
- `frontend/src/app/mission/page.tsx:1` — ≥1024px плакат / <1024px список; `frontend/src/app/epoch/[slug]/page.tsx:1` — теория+прогресс+достижения
## Архитектура
- Клиент fetch `/content/...` → `TaskRenderer` → `components/tasks/*`; прогресс `localStorage tmp_progress_grade_<N>`, сервер лишь `frontend/data/events.jsonl` via `/api/event`.
- Чат `POST /api/chat/stream` (очередь+ротация `LLM_API_KEYS`/`LLM_MODELS`), озвучка `SpeechSynthesis`→`/api/tts` (edge-tts), гейт `tmp-sound-gate-change`.
- Сборка `output:'standalone'`, `outputFileTracingExcludes:[skills,tell-me-please]`; плакат ≤700KB.
## Окружение
Только имена: `LLM_API_BASE`, `LLM_MODELS`, `LLM_API_KEYS`, `LLM_MODEL` (fallback-одиночка в `server/chat/stream.ts`, если `LLM_MODELS` пуст), `LLM_QUEUE_MAX`, `LLM_QUEUE_TIMEOUT`, `EVENTS_FILE`, `ADMIN_PASSWORD`, `ADMIN_LOGIN`, `BUILD_ID` (только `.zscripts/build.sh`, в рантайме не читается).
## Подводные камни
- Тест-раннера в репозитории нет — ни jest, ни vitest, ни playwright, ни скрипта `test` в `frontend/package.json`; ставить нельзя (новая зависимость = BLOCKED). Поэтому приёмка изменений = `npx tsc --noEmit` + `npm run build` + поднятый `npx next start -p 3022` и `curl -s http://localhost:3022/<route>` на выданный SSR-HTML (`| grep …` по ожидаемой строке) — этого достаточно, рендер проверяется без тестов.
- `npm run lint` — не гейт: 87 ошибок на чистом дереве (`react-hooks/immutability`, `no-explicit-any` по 20+ файлам). Не чинить попутно и не паниковать из-за красного вывода.
- Три копии `TaskRenderer.tsx` (класс/эпоха/экзамен) живут рядом со своим `page.tsx`, эпохальная и экзаменационная — копии: правка одной не попадает в остальные, надо синхронить вручную.
- Порт 3000 занят — `PORT=...`/`-p 3001`; `npm run dev`=build+start, HMR=`dev:local`.
- Standalone без `.next/static` — копировать вручную; `|| true` запрещён (FATAL-чек в `.zscripts/build.sh`).
- Тарболл ≤50MB — `outputFileTracingExcludes` для `skills/`/`tell-me-please/`; кэш чистить в build.sh.
- Next.js ≠ обучению — читать `frontend/node_modules/next/dist/docs/` перед кодом.
- НЕ ТРОГАТЬ: `frontend/src/server/**`, `/api/**`, `.zscripts/`, `content` без задачи; новая зависимость=`BLOCKED`.
## Как здесь работает Autopilot
- Прогон = каталог `.autopilot/<прогон>/` со spec/interfaces; задачи — тикеты в `.scratch/<фича>/issues/` со строками `Status:` и `Blocked by:`, порядок нумерации = порядок зависимостей.
- Перед редактированием читать `docs/agents/issue-tracker.md` и тикет текущего прогона (например `.scratch/pravki-150826/`); статус тикета обновлять по факту работы.
- Блокеры сообщать честно и сразу; границы модулей и «НЕ ТРОГАТЬ» из spec/interfaces обязательны.
<!-- autopilot:end -->
