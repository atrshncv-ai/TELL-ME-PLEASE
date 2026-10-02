window.STATE =
{
  "slug": "max-vk-buttons",
  "dir": "2026-10-02-max-vk-buttons--wip",
  "title": "Кнопки MAX и ВК + новый телефон на главной",
  "mode": "semi",
  "depth": "normal",
  "polish": null,
  "tier": "T0",
  "briefFile": "2026-10-02-brief.md",
  "memoryFile": "AGENTS.md",
  "skillDir": "/Users/aleksandrtrisenkov/.claude/skills/autopilot",
  "startedAt": "2026-10-02T18:56:46+04:00",
  "updatedAt": "2026-10-02T19:33:02+04:00",
  "finishedAt": null,
  "stages": [
    { "id": "preflight", "status": "done", "startedAt": "2026-10-02T18:56:46+04:00", "finishedAt": "2026-10-02T18:58:10+04:00", "note": "новая фича в настроенном репо" },
    { "id": "manifest",  "status": "done", "startedAt": "2026-10-02T18:58:10+04:00", "finishedAt": "2026-10-02T19:02:30+04:00", "note": "11 требований (9 явных + 2 подразумеваемых)" },
    { "id": "briefing",  "status": "done", "startedAt": "2026-10-02T19:02:30+04:00", "finishedAt": "2026-10-02T19:12:04+04:00", "note": "1 вопрос: кнопки только на главной" },
    { "id": "spec",      "status": "done", "startedAt": "2026-10-02T19:12:04+04:00", "finishedAt": "2026-10-02T19:31:40+04:00", "note": "13 историй, 9 решений; G2 нашёл 3 — исправлены" },
    { "id": "plan",      "status": "skipped", "startedAt": "2026-10-02T19:31:40+04:00", "finishedAt": "2026-10-02T19:33:02+04:00", "note": "ярус T0 — без разбивки на таски" },
    { "id": "build",     "status": "active", "startedAt": "2026-10-02T19:33:02+04:00" },
    { "id": "review",    "status": "pending" },
    { "id": "final",     "status": "pending" }
  ],
  "requirements": {
    "total": 11, "done": 0, "inTicket": 11, "inSpec": 0,
    "placeholder": 0, "deferred": 0, "dropped": 0
  },
  "tickets": [],
  "singlePass": { "tier": "T0", "spec": "spec.md", "interfaces": "interfaces.md", "note": "одна поверхность, один слой, без внешнего сервиса" },
  "tests": null,
  "debt": { "placeholders": [], "assumptions": [], "emptyEnv": [] },
  "additions": [],
  "coverage": { "found": 3, "fixed": 3, "deferred": 0, "note": "G2: подпись блока без формулировки и приёмки → задана дословно; R06 «без прокрутки либо в первом экране» неоднозначен → одно место и точный экран; отсылка к брифингу без цитаты → ответ перенесён в «Дополнения» брифа, чтобы его видел и G4" },
  "concerns": [],
  "reviewers": { "manifestSpec": null, "craft": null },
  "blind": null
}