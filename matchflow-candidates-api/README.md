# MatchFlow — Candidates REST API

A functional **TypeScript REST mock API** for the *MatchFlow Recruiting Pipeline* from the 4-day Instaffo study plan. Built to practice **React + TypeScript + TanStack Query**, candidate filtering, loading/errors, optimistic status updates, rollback, and explainable matching.

> **The 24 candidate profiles are fictional.** There is no real applicant information. The `matchScore` is a transparent skill-overlap **demo heuristic** and must not be used for automated hiring decisions. An evaluator should always review evidence and gaps.

## Requirements and startup

- Node.js **22.6+** (native TypeScript type stripping)
- **No `npm install` needed to run or test**. TypeScript is executed directly using Node 22.

```bash
npm run dev           # hot reload: http://127.0.0.1:4000
# OR
npm start             # start without watcher
npm test              # run API integration tests
npm run reset         # restore original fictional candidates
```

Optional static typechecking:

```bash
npm install
npm run typecheck
```

Docker alternative (install Docker + Compose first):

```bash
docker compose up --build
```

`PORT` and `HOST` can be changed with environment variables. The API saves updated status values into `data/candidates.json`. The original dataset remains in `data/seed-candidates.json` and can be restored with `npm run reset`. The writable file is ignored by Git.

## Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/jobs` | Demo job profile and weighted criteria |
| `GET` | `/api/jobs/instaffo-senior-product-engineer` | Single job detail |
| `GET` | `/api/filters` | Available roles, skills, statuses, work models |
| `GET` | `/api/candidates` | List, search, filter, paginate and sort |
| `GET` | `/api/candidates/:id` | Detail, matched/missing criteria, evidence |
| `PATCH` | `/api/candidates/:id/status` | Change status (`new`, `shortlisted`, `interview`, `rejected`) |
| `POST` | `/api/candidates/:id/shortlist` | Shortlist shortcut, idempotent |

### Candidate list filters

`GET /api/candidates` supports:

- `q` — case-insensitive text in name, headline, role or skills
- `status` — one of the four valid pipeline statuses
- `role` — partial role name
- `skills=React,TypeScript` — case-insensitive *exact* skill names, comma-separated
- `skillMode=all|any` — require all specified skills (default) or any
- `minScore`, `maxScore` — values from 0 to 100
- `sortBy=matchScore|name|experienceYears|updatedAt` (default `matchScore`)
- `order=asc|desc` (default descending, except name)
- `page` (default 1), `limit` (default 12, maximum 100)

Example:

```bash
curl 'http://localhost:4000/api/candidates?status=new&skills=React,TypeScript&minScore=70&page=1&limit=6'
```

Response shape:

```json
{
  "data": [
    {
      "id": "cand-001",
      "name": "Alex Morgan",
      "role": "Senior Frontend Engineer",
      "skills": ["React", "TypeScript", "TanStack Query"],
      "matchScore": 92,
      "status": "new"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 6,
    "total": 9,
    "totalPages": 2,
    "statusCounts": {"new": 13, "shortlisted": 5, "interview": 4, "rejected": 2}
  }
}
```

**The response above is abbreviated**: the filter totals and counts reflect the seed dataset, but each candidate has additional fields and this example shows only the first item. Actual `data` entries include `location`, `headline`, `workModel`, `availability`, `summary`, `evidence`, timestamps and other fields. `meta.total` and `statusCounts` are computed from the actual dataset.

### Candidate detail and explained matching

```bash
curl http://localhost:4000/api/candidates/cand-001
```

The detail response returns the complete `Candidate` object with:

- `matchScore`: 0–100 score based **only** on declared skills and public demo weights
- `match.matchedRequirements`: items `{ skill, weight, priority }`
- `match.missingRequirements`: similarly, criteria absent from the profile
- `match.evidence`: fictional supporting notes (not verified facts)
- `match.explanation`: why the displayed score was computed

The weighted job rubric is visible at `/api/jobs/instaffo-senior-product-engineer`. Weights sum to 100. Alex Morgan illustrates the original study plan's **92%** match example. Scores are not calibrated to predict hiring success, nor do they decide a pipeline status.

### Change a candidate status

```bash
curl -X PATCH http://localhost:4000/api/candidates/cand-001/status \
  -H 'Content-Type: application/json' \
  -d '{"status":"shortlisted"}'

# Direct shortlist shortcut:
curl -X POST http://localhost:4000/api/candidates/cand-001/shortlist
```

Both endpoints respond with `{ "data": Candidate }`. Invalid status returns `400`, unknown candidate `404`. Changes persist across server restarts.

### Test loading, errors and optimistic rollback

```bash
# Introduce 800 ms of delay to test loading skeletons
curl 'http://localhost:4000/api/candidates?delayMs=800'

# Force an HTTP 503 without changing stored data
curl 'http://localhost:4000/api/candidates?simulateError=1'

# Force a failed status mutation (useful for TanStack Query rollback)
curl -X PATCH 'http://localhost:4000/api/candidates/cand-001/status?simulateError=1' \
  -H 'Content-Type: application/json' -d '{"status":"rejected"}'
```

Delay is capped at 2000 ms. Forced failure can alternatively use request header `X-Mock-Fail: 1`.

### Error format

```json
{ "error": { "code": "INVALID_STATUS", "message": "Valid statuses: new, shortlisted, interview, rejected." } }
```

## React + TanStack Query

Ready-made client and hooks (for integration with your separate React app):

- `frontend/api.ts` — typed REST client, cache key factory, list/detail/status/shortlist
- `frontend/react-query-example.ts` — `useCandidates`, `useCandidate`, `useUpdateCandidateStatus` with optimistic update and rollback
- `src/types.ts` — shared API types

A simple usage pattern:

```tsx
const filters: CandidateFilters = { status: "new", skills: ["React"], page: 1 };
const { data, isLoading, isError } = useCandidates(filters);
const updateStatus = useUpdateCandidateStatus();

// On button click:
updateStatus.mutate({ id: "cand-001", status: "shortlisted" });
```

The hooks preserve the filter object inside the TanStack Query list key. They optimistically update cached lists/detail and restore the original data if the mutation fails; an invalidated refetch reconciles pagination and counts after completion.

## Files

```text
matchflow-candidates-api/
├── src/
│   ├── index.ts           # HTTP server entrypoint
│   ├── server.ts          # routing, filters, validation, error responses
│   ├── matching.ts        # explicit demo job rubric + matching explanation
│   ├── store.ts           # JSON persistence, atomic write, reset
│   ├── types.ts           # TypeScript API contracts
│   └── reset.ts
├── data/
│   └── seed-candidates.json    # 24 fictional candidate profiles
├── frontend/
│   ├── api.ts
│   └── react-query-example.ts
├── tests/api.test.ts     # Integration tests (real HTTP requests)
├── docs/openapi.yaml     # OpenAPI 3.1 spec
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Scope and next iteration

This is a **local single-job mock API** with JSON persistence, not a multi-user production recruiting service. For production, replace the fixture store with a database, implement authentication/permissions, meaningful consent and retention policies, audit logs, secure CORS, data protection controls, and server-side evaluation methodology. A Ruby on Rails API could replace this mock later while keeping the API contract.
