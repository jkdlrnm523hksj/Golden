# Security Specification - Lalezar Artisan Kitchen

## 1. Data Invariants
- A reservation must have a valid name, email, and phone.
- Guests must be between 1 and 20.
- `status` must always start as 'pending'.
- `createdAt` must be set to `request.time`.
- `reservationId` must be a valid ID.

## 2. The "Dirty Dozen" Payloads
1. **The Ghost Field**: Adding `isConfirmed: true` during creation.
2. **The Status Jump**: Setting `status: 'confirmed'` on creation.
3. **The ID Poison**: Sending a 2KB string as `reservationId`.
4. **The Giant Note**: Sending a 1MB string for `notes`.
5. **The Negative Guest**: Setting `guests: -1`.
6. **The Party Pack**: Setting `guests: 500`.
7. **The Time Travel**: Setting `createdAt` to a past date manually.
8. **The Anonymous Scrap**: Trying to `list` all reservations as an unauthenticated user.
9. **The Identity Spoof**: Trying to `update` status as an unauthenticated user.
10. **The Orphaned Field**: Missing `phone` number on creation.
11. **The Type Bomb**: Sending `guests` as a string instead of a number.
12. **The Admin Impersonator**: Trying to access `/admins` collection.

## 3. Test Runner (Draft)
```typescript
// firestore.rules.test.ts
// Tests would verify PERMISSION_DENIED for above payloads.
// We expect create to fail if status is not 'pending' or if extra fields exist.
// We expect list to fail for non-admins.
```
