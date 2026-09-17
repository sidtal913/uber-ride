# Hire brief
Project: Uber Ride
Hire agent: knox
Jira: UR-1
Task id: task_74cac7ba
Title: Backend: Define the Uber Ride API contract
Shape: api-route
## Description
Ship the backend API and data layer only — not the React / UI pages.
Include connection/config stubs and a minimal health or hello endpoint when greenfield.
Do not rewrite frontend pages.
Parent brief:
Define the Uber Ride API contract
Delivery order: 1.

Requires: none

Own spec/api.openapi.yaml and spec/auth.yaml. Define request/response payloads and persistence. Auth: authenticated users; requires JWT bearer token; scopes: customer role. Admin surface: admin only. Schema: fields id, createdAt, updatedAt plus domain attributes from the brief; reuse the existing table/entity when one already covers this domain. Contract: OpenAPI request/response payload shapes. Given the contract is published, When a client calls a protected route without a token, Then access is denied.

Brief:
E-commerce website to book a ride with taxi like the application uber x. A user select a destination and he gets the fair price and a driver picks up the offer exactly like uber. Make this on aws, use appsync, create cognito user pool for the users and the drivers., this happens in Montreal, nextjs application. use modern UI UX pro max great visual.

Infra: Terraform modules under infra/ only (network, api, data, security as named). PR only — no apply from VPods. Done means: plan succeeds in CI; modules cover the named resources. Given modules are opened as a PR, When plan runs, Then no apply is performed from VPods.

Visual structure: navigation; photographic hero with headline and CTA for Uber Ride; product grid or primary content section; footer. Imagery: real photography for the category (Brand Kit only — no invented brand). In scope: first viewport / hero + primary CTA only. Out of scope: other pages and payment processors.

## Scope
In scope: the primary landing / hero and the named user flow on this card.
Out of scope: other pages, payment processors, admin consoles, and work this ticket does not name.

Labels: vpods-generated
## Acceptance criteria
- API / data work in the parent brief is implemented.
- PostgreSQL (or named DB) config documented when required.
- At least one runnable API endpoint when the brief calls for it.
## Rules
- Read `.vpods/FRONTEND_AGENT.md` (frontend), `.vpods/MAYA_AGENT.md` (iOS), `.vpods/PROJECT.md`, `.vpods/CRAFT_*.md` (packed craft grammar including `CRAFT_UX.md` / `CRAFT_MOTION.md` / `CRAFT_IOS.md` when present), `.vpods/DESIGN_PACK.md` when present, and Brand Kit when present before writing code.
- Stay on this ticket's lane. Do not rewrite sibling hire pages/APIs unless required for integration.
- Ship a complete artifact for this shape — not a stub.
- If the brief is genuinely ambiguous, ask exactly one intake question before writing code (waiting-on-answer). After generation starts, do not stop mid-execution to ask.
