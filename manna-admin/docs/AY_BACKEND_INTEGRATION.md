# Manna Admin — backend integration notes for AY

## What the route + fetch pattern means

The admin UI should not contain database logic directly inside every screen. A clean Next.js setup is:

Browser screen -> `fetch('/api/...')` -> Next.js Route Handler -> Firebase/backend service -> response -> screen state

For example, the Vendors screen can eventually call:

```ts
const response = await fetch('/api/admin/vendors');
const data = await response.json();
```

The matching Next.js route would live at:

```text
src/app/api/admin/vendors/route.ts
```

That route is the server-side boundary. It can authenticate the admin, check authorization, validate query parameters, call Firebase/Firestore or another backend service, and return only the data the UI needs.

## Why this helps AY

AY can build the real backend endpoints without rewriting the UI. The screen only needs a stable response shape.

Recommended endpoint groups:

- `GET /api/admin/vendors`
- `GET /api/admin/vendors/:vendorId`
- `POST /api/admin/vendors/:vendorId/approve`
- `POST /api/admin/vendors/:vendorId/reject`
- `POST /api/admin/vendors/:vendorId/suspend`
- `POST /api/admin/vendors/:vendorId/reactivate`
- `GET /api/admin/vendors/:vendorId/products`
- `GET /api/admin/orders`
- `GET /api/admin/orders/:orderId`
- `GET /api/admin/payouts`
- `GET /api/admin/payouts/:payoutId`
- `POST /api/admin/payouts/:payoutId/release`
- `POST /api/admin/payouts/:payoutId/retry`

These are recommendations, not live endpoints in this prototype.

## Important security rule

The browser should never be trusted to decide whether someone is an admin or whether a payout can be released. The route handler/backend must perform the authorization and business-rule checks.

For payouts, the backend should calculate the 10% Manna commission and the vendor settlement amount. The UI should display the backend's calculated values rather than calculating money that will actually move.

## Current prototype status

This ZIP is still frontend-only and uses fixture data. There are currently no `route.ts` handlers and no API `fetch()` calls. That is intentional: the screens are being finalized before the real backend contract is connected.

## Settlement and feedback rules

### Vendor payout lifecycle
1. Order is completed.
2. Backend calculates the vendor gross amount and Manna commission (10%).
3. Payout enters a 1-hour release window.
4. After 1 hour, backend checks for qualifying customer complaints, refund causes, or active disputes linked to the order.
5. If clear, the backend automatically releases the vendor payout.
6. If a qualifying issue exists, the payout stays held until the case is resolved.

The browser must never be trusted to release funds or calculate the final payable amount. The server should own these rules.

Suggested endpoints:
- `GET /api/admin/payouts`
- `GET /api/admin/payouts/:id`
- `POST /api/admin/payouts/:id/release` (server validates eligibility again)
- `POST /api/admin/payouts/:id/retry`

### Customer/vendor feedback
Approved channels can feed one normalized feedback record into the admin queue.

Suggested endpoint:
- `GET /api/admin/feedback`
- `GET /api/admin/feedback/:id`
- `POST /api/admin/feedback/:id/respond`
- `POST /api/admin/feedback/:id/resolve`
- `POST /api/admin/feedback/:id/escalate`

Feedback should include `sourceType` (`customer` or `vendor`), `type` (`complaint` or `suggestion`), `channel`, `priority`, `status`, optional `orderId`, and timestamps. Only order-linked complaints that meet Manna's refund/dispute criteria should pause payout release.

### Dispute review
Suggested endpoints:
- `GET /api/admin/disputes`
- `GET /api/admin/disputes/:id`
- `POST /api/admin/disputes/:id/resolve`
- `POST /api/admin/disputes/:id/refund`
- `POST /api/admin/disputes/:id/request-information`

Resolving a dispute should update the linked order/payout state transactionally so the payout engine can re-evaluate whether the vendor is now eligible for settlement.
