# API contract registry

Provisional stubs are allowed so frontend is never frozen waiting on backend.
When a published contract exists, wire to it — do not ship a parallel mock store.

| Domain | Contract | Status | Owner |
|--------|----------|--------|-------|
| Uber Ride REST | `spec/api.openapi.yaml` | published (UR-1) | Knox |
| Auth (JWT / roles) | `spec/auth.yaml` | published (UR-1) | Knox |
| Persistence | `spec/data-model.yaml` | published (UR-1) | Knox |
| Health | `GET /api/health` | implemented | Knox |
| Fare quote | `POST /api/v1/rides/quote` | implemented (customer/driver JWT) | Knox |
| Book ride | `POST /api/v1/rides` | implemented (customer JWT) | Knox |
| Orders (alias) | `GET/POST /orders` | implemented (customer JWT) | Knox |
| My rides | `GET /api/v1/rides` | implemented (customer JWT) | Knox |
| Ride detail | `GET /api/v1/rides/{rideId}` | implemented (owner or admin) | Knox |
| Admin list | `GET /api/v1/admin/rides` | implemented (admin JWT) | Knox |

Protected routes return **401** when `Authorization: Bearer` is missing or invalid (see `lib/auth/require-auth.ts`).
