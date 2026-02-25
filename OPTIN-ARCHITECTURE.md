# BSLA Investor Portal — 3-Step Opt-In Flow Architecture

## 1) Scope and Objective
Implement a production-ready **/access** flow in the existing Next.js (App Router) Vercel app that:
1. Matches the provided `reference-optin-flow.html` design exactly (visual hierarchy, stepper behavior, card styling, animations).
2. Collects investor intake + compliance acknowledgements.
3. Submits securely to backend API (not client-direct to GHL).
4. Upserts contact in Big Star’s GoHighLevel (GHL) location.
5. Generates a private deal room link for `/room/[token]`.
6. Shows link immediately after submit and sends same link by email via Resend.

---

## 2) Architecture Decision: Backend API Route (Recommended)

## Decision
Use **Next.js server-side API route** (App Router `route.ts`) as the single integration point for:
- Validation
- GHL API calls
- Token issuance
- Email dispatch
- Audit logging

### Why not client-side GHL integration
Client-side posting to GHL would expose sensitive credentials and makes anti-abuse controls weak/unreliable.

### Recommended route layout
- `GET /access` — renders 3-step UI.
- `POST /api/access/submit` — receives full form payload, performs orchestration.
- `GET /api/access/verify?token=...` (or internal helper called by room page) — verifies token validity.

### Runtime recommendation
Use **Node.js runtime** for route handlers (not Edge) to simplify crypto libs, SDK usage, and provider compatibility.

---

## 3) UX / Frontend Spec (Design Fidelity)

## Route
- New route: **`/access`** (preferred over modifying `/accreditation` to preserve existing path and avoid regression risk).

## Design implementation rules
- Reproduce reference HTML/CSS values exactly (fonts, colors, spacing, borders, gradients, animation timings, progress indicator behavior).
- Keep 3 panels + success panel flow:
  - Step 1: Personal
  - Step 2: Accreditation
  - Step 3: Agreements
  - Step 4: Success state (shows private link CTA)
- Preserve stepper semantics (`active`, `done`) and transitions.

## Collected fields
Required:
- `name`
- `email`
- `phone`
- `accreditationBasis`
- `investmentRange`
- `ndaAccepted` (boolean)
- `accreditationConfirmed` (boolean)
- `riskAccepted` (boolean)

Optional:
- `company`
- `source`
- `notes`

Client-side validation:
- Step-gated required checks before moving next.
- Email format and normalized phone before final submit.
- All 3 legal checkboxes must be true before submit button is enabled.

---

## 4) Token Generation Strategy (Secure Deal Room Access)

## Recommended model: Opaque random token + server-side record
Generate high-entropy token server-side (e.g., 32 bytes random, base64url/hex). Do **not** embed PII.

Store token metadata in secure storage (recommended Vercel KV / Redis / Postgres):
- `tokenHash` (hash token at rest; do not store raw token)
- `contactId` (GHL contact id)
- `email`
- `issuedAt`
- `expiresAt` (recommended 7–30 days based on business policy)
- `status` (`active`, `revoked`, `used` if one-time policy)
- `requestFingerprint` (ip hash / user-agent hash optional)

Link format:
- `https://bsla-investor-portal.vercel.app/room/{rawToken}`

Verification flow:
1. `/room/[token]` must perform server-side verification (or call `/api/access/verify`).
2. Hash presented token and compare with stored hash.
3. Reject if not found/expired/revoked.
4. Optionally rotate token after first successful access.

### Why opaque token over JWT for this use case
- Easier revocation.
- No leaked claim data.
- Better control for expiry extension/manual invalidation.

---

## 5) GHL API Integration Spec

## Base API
Use GHL V2 endpoints under `https://services.leadconnectorhq.com` (or current documented base URL in GHL docs at implementation time).

## Auth/headers
- `Authorization: Bearer <GHL_API_KEY>`
- `Version: 2021-07-28` (or required current version header)
- `Content-Type: application/json`

## Required secrets/env
- `GHL_API_KEY`
- `GHL_LOCATION_ID`
- Optional (if custom fields resolved dynamically): `GHL_CONTACT_CUSTOM_FIELD_MAP_JSON`

## Endpoint sequence
1. **Upsert contact**
   - Endpoint: `POST /contacts/upsert`
   - Purpose: create/update by email/phone dedupe logic.

2. **Apply tags**
   - Endpoint: `POST /contacts/{contactId}/tags` (or equivalent Add Tags endpoint in current docs)
   - Suggested tags:
     - `bsla_access_requested`
     - `bsla_accredited_self_attested`
     - `bsla_investor_portal`
     - `range:<normalized_investment_range>`
     - optional source tag if present (`source:<value>`)

3. (Optional but recommended) **Create note/activity** on contact with compliance attestation timestamp.

## Field mapping
Standard fields:
- `name` -> split into `firstName` / `lastName` (best effort) or full name field per GHL schema
- `email` -> `email`
- `phone` -> `phone`
- `company` -> `companyName` (if supported)

Custom fields (create in GHL location first, then map by custom field IDs):
- `accreditationBasis`
- `investmentRange`
- `source`
- `notes`
- `ndaAccepted` (boolean)
- `accreditationConfirmed` (boolean)
- `riskAccepted` (boolean)
- `accessTokenIssuedAt` (datetime)
- `dealRoomLink` (optional convenience field)

## Idempotency
Use a deterministic idempotency key per submit attempt:
- e.g., hash of `(email + normalizedPhone + yyyy-mm-ddThh:mm bucket)` or request UUID passed in header.
- Prevent duplicate contact updates/tags on accidental double-clicks.

---

## 6) Email Delivery Approach (Resend)

Resend is already configured in `secrets/resend.env` (do not hardcode secrets in repo).

## Required env in Vercel project
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `RESEND_FROM_NAME`

## Email flow
After successful GHL upsert + token issue:
1. Send transactional email to submitted address.
2. Subject example: `Your Private BSLA Deal Room Access Link`
3. Include:
   - Recipient name
   - Private link
   - Expiration time/date
   - Compliance reminder / not-share notice
4. If email fails, still return success + on-page link, and log `email_status=failed` for retry queue/manual follow-up.

## Reliability recommendation
- Non-blocking retry mechanism (queue or scheduled retry) for transient email failures.
- Log Resend message ID for audit trail.

---

## 7) End-to-End Data Flow Diagram

```text
[User @ /access]
   │ fills step 1..3
   ▼
POST /api/access/submit
   │
   ├─► Validate + normalize payload (zod/schema)
   ├─► Abuse controls (rate limit, honeypot, captcha optional)
   ├─► GHL contacts upsert
   │      └─► contactId returned
   ├─► GHL add tags + custom fields update
   ├─► Generate secure token
   ├─► Persist token hash + metadata (KV/Postgres)
   ├─► Compose deal room URL (/room/{token})
   ├─► Send email via Resend with URL
   └─► Return 200 JSON { dealRoomUrl, expiresAt, requestId }

Client success handler
   ├─► Transition to Step 4 success panel
   ├─► Show immediate "Enter Deal Room" CTA with returned URL
   └─► Optional auto-redirect after short delay

/room/[token]
   ├─► Verify token server-side
   ├─► allow if valid
   └─► reject with access-expired/invalid UI if not valid
```

---

## 8) Security Considerations

## Input validation
- Enforce strict schema server-side (length caps, allowed enums, boolean required checks).
- Sanitize free-text (`notes`) to prevent injection/log pollution.

## Rate limiting + abuse prevention
- Rate limit by IP and email (e.g., 5 requests / 15 min / IP; 3 requests / hour / email).
- Add hidden honeypot field; reject if populated.
- Optional CAPTCHA if abuse observed.

## CSRF
- Since this is same-origin form POST, enforce:
  - `Origin`/`Referer` checks on API route
  - `SameSite=Lax` cookies (if using session/csrf cookie)
  - Optional double-submit CSRF token if session cookie introduced

## Secrets
- Store all keys in Vercel env only.
- Never expose GHL or Resend keys to client bundle.
- Rotate keys periodically.

## Token security
- Use CSPRNG.
- Hash tokens at rest.
- Set TTL and revocation capability.
- Avoid including any PII in token payload or URL params.

## Observability & audit
- Log requestId, timestamp, masked email, GHL contactId, token status, email delivery status.
- Avoid logging raw tokens, full phone numbers, or raw request bodies in production logs.

---

## 9) API Contract (Builder-facing)

## Request: `POST /api/access/submit`
JSON body:
- `name: string`
- `email: string`
- `phone: string`
- `company?: string`
- `accreditationBasis: enum|string`
- `investmentRange: enum|string`
- `source?: enum|string`
- `ndaAccepted: boolean`
- `accreditationConfirmed: boolean`
- `riskAccepted: boolean`
- `notes?: string`

## Success response (200)
```json
{
  "ok": true,
  "dealRoomUrl": "https://bsla-investor-portal.vercel.app/room/<token>",
  "expiresAt": "2026-03-03T00:00:00.000Z",
  "requestId": "..."
}
```

## Error response
- `400` validation failure (field errors)
- `429` rate-limited
- `502` upstream integration failure (GHL/Resend)
- `500` unexpected internal error

All errors return stable machine-readable code + user-safe message.

---

## 10) Implementation Notes for Builder (Non-code)

1. Preserve existing `/accreditation` page unless product wants redirect to `/access`.
2. Build `/access` UI from reference HTML as source of truth.
3. Add backend route and integration utilities under server-only modules.
4. Update `/room/[token]` to enforce token verification before rendering sensitive content.
5. Add env vars in Vercel Project Settings and document in README.
6. Add integration tests for:
   - valid submission
   - missing required checkbox
   - duplicate submit/idempotency
   - expired token access
   - upstream GHL failure handling

---

## 11) Open Decisions (Need Product/Compliance Confirmation)

1. Token expiry policy: 7 days vs 30 days vs non-expiring.
2. One-time-use token vs reusable until expiry.
3. Whether to gate deal room immediately upon self-attestation or after manual review.
4. Final tag taxonomy in GHL for downstream automations.
5. Whether failed email should trigger automatic retries or manual CRM task.

---

## Final Recommendation (Concise)
Adopt **server-orchestrated `/api/access/submit` architecture** with **opaque hashed access tokens**, **GHL upsert + tagging**, and **Resend transactional delivery**. This meets all requirements, keeps credentials private, supports revocation/expiry, and is production-safe for a private investment deal room flow.