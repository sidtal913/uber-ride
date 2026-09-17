# Structural direction — DRAFT (not approved)

Sol proposed this charter; a human has not approved it.
Do NOT treat stack, clientRoot, forbidden paths, or the page map as locked ground truth.
Prefer the ticket brief and what is already committed in the repo.

STRUCTURAL DIRECTION (proposed): Uber Ride
Every block is tagged [grounded · sources] or [open · needs client confirmation].
Treat [open] as drafts — never as facts.
Product goal / MVP [grounded · product-description, UR-2, UR-3, UR-4]
  E-commerce ride-booking platform enabling users to book rides like Uber X with authenticated, real-time ride management. | People seeking on-demand ride booking; admins managing ride operations. | Book a ride quickly and reliably through a web application, with transparent pricing and ride tracking.
Requirements [grounded · product-description, UR-2, UR-3, UR-4]
  must-have: OpenAPI contract (spec/api.openapi.yaml) and auth spec (spec/auth.yaml) shipped before backend services and UI implementation; JWT bearer token authentication with customer role scope; Protected routes deny access without valid token; Schema: id, createdAt, updatedAt plus domain attributes (ride details, pricing, status); Primary landing page with photographic hero, headline, CTA, navigation, footer; Happy-path user flow from landing to main conversion (ride booking); Empty, loading, and error states for primary flow; Terraform modules for network, api, data, security under infra/ — must-not: Implement backend controllers, OpenAPI, or database migrations on frontend-only tickets (UR-6); Implement UI or React pages on backend-only tickets (UR-1, UR-3); Apply Terraform from VPods (PR-only deployment); Invent payloads or fields not agreed in contract; Include payment processor, admin console, or other out-of-scope features in MVP; Rewrite frontend pages as part of backend work
Stack [grounded · https://github.com/sidtal913/uber-ride, frontend/ (React or similar SPA framework — TBD pending brand confirm), backend/ (ASP.NET, Node.js, or similar — TBD pending contract definition), UR-2]
  frontend/ (React or similar SPA framework — TBD pending brand confirm) / backend/ (ASP.NET, Node.js, or similar — TBD pending contract definition) — Greenfield project. Backend owns spec/api.openapi.yaml and spec/auth.yaml; frontend consumes via generated client. Infra: Terraform modules under infra/ (network, api, data, security). CI/CD: GitHub Actions (lint, test, build, terraform plan, environment approval, apply, smoke). Auth: JWT bearer token, customer role scope, OIDC identity. No payment processor or admin console in MVP.; paths: Payment processor integration (out of scope), Admin console (out of scope), Multi-tenant or B2B features (not in brief), Real-time WebSocket or push notifications (not mentioned), Third-party ride-matching or dispatch logic (not in scope)
Pages [open · needs client confirmation: Confirm pages/routes and must-have rules from each ticket description (not titles alone).]
  DRAFT (not fact): 4 surfaces
  Ask: Confirm pages/routes and must-have rules from each ticket description (not titles alone).
- Landing / Hero (/) [grounded · UR-2, UR-2, UR-2, UR-2]: Primary entry point; photographic hero with headline, CTA, and navigation; converts user to ride-booking flow.
    - Must include photographic hero (real photography, not stock) [open · needs client confirmation: Confirm constraints for Landing / Hero.]
    - Must include headline and primary CTA (UR-4, UR-5) [open · needs client confirmation: Confirm constraints for Landing / Hero.]
    - Must include navigation and footer (UR-4) [open · needs client confirmation: Confirm constraints for Landing / Hero.]
    - Must be Premium SaaS design mode (UR-4) [open · needs client confirmation: Confirm constraints for Landing / Hero.]
    - No payment or admin surfaces (out of scope) [open · needs client confirmation: Confirm constraints for Landing / Hero.]
    - Requires: UR-1 GitHub Actions: lint, test, build, terraform plan, environment approval, apply, app deploy, smoke [grounded · UR-2]
    - Customer OIDC identity [grounded · UR-2]
    - Ship with or immediately after Terraform — before application services/UI [grounded · UR-2]
- Ride Booking Flow (/book) [grounded · UR-6, UR-6, UR-6, UR-6]: Primary conversion: authenticated user books a ride (pickup, destination, ride type, pricing).
    - Requires JWT authentication (UR-3, UR-5) [open · needs client confirmation: Confirm constraints for Ride Booking Flow.]
    - Happy-path flow only (UR-5) [open · needs client confirmation: Confirm constraints for Ride Booking Flow.]
    - Must cover empty, loading, error states (UR-5) [open · needs client confirmation: Confirm constraints for Ride Booking Flow.]
    - Do not invent payloads (UR-3, UR-5) [open · needs client confirmation: Confirm constraints for Ride Booking Flow.]
    - Consumes OpenAPI contract from spec/api.openapi.yaml (UR-4, UR-5) [open · needs client confirmation: Confirm constraints for Ride Booking Flow.]
    - Ship the UI / page / component work only — not the API, schema, or server [grounded · UR-6]
    - Do not implement backend controllers, OpenAPI, or database migrations on this card [grounded · UR-6]
    - Define the Uber Ride API contract [grounded · UR-6]
- Ride Confirmation / Status (/rides/:id) [open · needs client confirmation: Confirm page “Ride Confirmation / Status” and its must-have rules from the backlog.]: Post-booking: display ride details, driver info, ETA, status updates.
    - Requires JWT authentication (UR-3) [open · needs client confirmation: Confirm constraints for Ride Confirmation / Status.]
    - Must handle loading and error states (UR-5) [open · needs client confirmation: Confirm constraints for Ride Confirmation / Status.]
    - Schema: id, createdAt, updatedAt plus ride attributes (UR-1, UR-3) [open · needs client confirmation: Confirm constraints for Ride Confirmation / Status.]
    - Do not invent fields (UR-3) [open · needs client confirmation: Confirm constraints for Ride Confirmation / Status.]
- Authentication / Login (/login) [open · needs client confirmation: Confirm page “Authentication / Login” and its must-have rules from the backlog.]: User sign-in; issues JWT bearer token for protected routes.
    - Auth model: decide_later (per product description) [open · needs client confirmation: Confirm constraints for Authentication / Login.]
    - OIDC identity or JWT-only (TBD) [open · needs client confirmation: Confirm constraints for Authentication / Login.]
    - Must deny access to protected routes without token (UR-1, UR-3) [open · needs client confirmation: Confirm constraints for Authentication / Login.]
Identity/UX [grounded · UR-2, UR-3, UR-4, UR-5]
  Uber Ride — OPEN — brand voice not specified in description or memory; awaiting Brand Kit confirmation and FE visual intake. — consumer-pretty (Premium SaaS design mode per UR-4: photographic hero, product grid, navigation, footer) — Real photography for ride-booking category; starter palette (#111111, #C45C26, #F5F0E8, #FFFFFF) pending Brand confirm. — avoid: Generic SaaS patterns (per brief: Premium SaaS design mode required); Placeholder or stock imagery (real photography required); Invented fields not agreed by UI (UR-3: do not invent fields); Payment or admin surfaces in primary flow (out of scope)
Data/contracts [grounded · Contract Registry, UR-2, UR-3, UR-4]
  Frontend generates client from spec/api.openapi.yaml; calls protected routes with JWT bearer token in Authorization header; receives JSON payloads matching OpenAPI schema.
Build state [open · needs client confirmation: Confirm what is already committed in the repo (pages, components, contracts).]
  DRAFT (not fact): pages: none yet; components: —; contracts: —; evidence: —
  Ask: Confirm what is already committed in the repo (pages, components, contracts).
Forbidden [grounded · Payment processor integration (out of scope), Admin console (out of scope), Multi-tenant or B2B features (not in brief), Real-time WebSocket or push notifications (not mentioned)]
  No mock/fake API data when a published Contract Registry row exists; No second layout shell if one is already committed; No palette/tokens outside established design/token files; Implement backend controllers, OpenAPI, or database migrations on frontend-only tickets (UR-6); Implement UI or React pages on backend-only tickets (UR-1, UR-3); Apply Terraform from VPods (PR-only deployment); Invent payloads or fields not agreed in contract
Sequencing [open · needs client confirmation: Is the next work foundation (shell) or a feature on an existing slice?]
  DRAFT (not fact): unknown — 
  Ask: Is the next work foundation (shell) or a feature on an existing slice?

Open fields (Confirm blocked until answered):
- Pages / routes + constraints: Confirm pages/routes and must-have rules from each ticket description (not titles alone).
- Current build state: Confirm what is already committed in the repo (pages, components, contracts).
- Sequencing pointer: Is the next work foundation (shell) or a feature on an existing slice?
Shell brief: Uber Ride is a greenfield e-commerce ride-booking platform. MVP: authenticated users land on a Premium SaaS hero page, book a ride through a happy-path flow, and receive confirmation. Backend exposes OpenAPI contract with JWT auth (customer role); frontend consumes via generated client. Infra: Terraform modules (network, api, data, security) deployed via GitHub Actions (plan, approve, apply, smoke). No payment, admin console, or real-time dispatch in scope. Brand voice and visual direction pending confirmation.
Reference page: landing
