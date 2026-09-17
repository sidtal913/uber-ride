# PostgreSQL configuration — Uber Ride

The ride API persists bookings to PostgreSQL when `DATABASE_URL` is set. Without it, the API uses an **in-memory** store so local development and CI builds stay runnable.

## Local setup

1. Start PostgreSQL 15+ (Docker example):

```bash
docker run --name uber-ride-pg -e POSTGRES_USER=uber_ride -e POSTGRES_PASSWORD=uber_ride -e POSTGRES_DB=uber_ride -p 5432:5432 -d postgres:16
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Apply schema:

```bash
psql "$DATABASE_URL" -f lib/db/schema.sql
```

4. Run the app:

```bash
npm run dev
```

## Connection string

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Full PostgreSQL connection URI |
| `PGSSLMODE` | Optional SSL mode for managed RDS (default `prefer`) |

Example (matches `.env.example`):

```
DATABASE_URL=postgresql://uber_ride:uber_ride@localhost:5432/uber_ride
```

## Health check

`GET /api/health` reports `database`:

- `in-memory` — no `DATABASE_URL`
- `connected` — pool query succeeded
- `unavailable` — `DATABASE_URL` set but database not reachable

## Entity

See `spec/data-model.yaml` and `lib/db/schema.sql` for the `rides` table (`id`, `created_at`, `updated_at`, fare and Montreal route fields).
