# ZoomRide Self-Drive Platform

ZoomRide is a two-sprint MERN application that lets customers register, search for short-term rental cars, make reservations, mock payments, and gives admins tools to manage fleet inventory and monitor bookings.

## Project Structure

```
.
├── backend        # Express + MongoDB REST API
└── frontend       # React + Bootstrap single-page app (Vite)
```

## Features

- **User onboarding**: email/password registration, login, JWT-protected APIs, profile fetch persisted in `localStorage` for offline demos.
- **Car discovery**: search by city/time window, responsive cards, detailed car view with availability.
- **Booking flow**: reserve car with trip details, booking lifecycle (`PendingPayment → Confirmed/Cancelled`), user booking management.
- **Payments (mocked)**: select card/UPI/wallet, simulate payment outcomes, update booking/payment status, confirmation email hook.
- **Admin dashboard**: summary widgets, add new cars, fleet list, booking monitoring with customer info.
- **Notifications**: Nodemailer service ready for SendGrid or local SMTP; confirmation email triggered on success.
- **Responsive UI**: Bootstrap 5 layout tested across desktop and mobile breakpoints.

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)

### Backend

```bash
cd backend
cp env.example .env                    # update values
npm install
npm run seed                           # optional: inserts demo admin, user, cars
npm run dev                            # starts API on http://localhost:5000
```

Key scripts:

- `npm run dev` — start with Nodemon
- `npm run seed` — populate sample data
- `npm test` — Jest + Supertest harness (add tests under `src/__tests__`)

### Frontend

```bash
cd frontend
npm install
npm run dev                            # launches Vite dev server on http://localhost:3000
```

Vite proxy forwards `/api` requests to the Express backend.

## API Overview

- `POST /api/auth/register` — create user
- `POST /api/auth/login` — authenticate user
- `GET /api/cars` — search inventory (filters: `city`, `startDate`, `endDate`)
- `GET /api/cars/:id` — car details
- `POST /api/bookings` — create booking (auth)
- `GET /api/bookings` — list bookings for logged user
- `POST /api/payments` — mock payment (auth)
- `GET /api/admin/*` — secured admin endpoints (role = `admin`)

All auth-protected routes expect `Authorization: Bearer <token>` header.

## Sprint Coverage

- **Sprint 01 (MVP)**: Registration, login/logout, search, car details, reservation flow, responsive UI.
- **Sprint 02**: Payment modal + status updates, admin dashboard CRUD, email notifications, UI feedback enhancements.

## Testing Suggestions

- Unit/API: Jest + Supertest (backend) — sample tests can target auth and booking flows.
- E2E/UI: Cypress (frontend) — happy-path scenarios for registration → booking → payment.
- API contract: Postman collection mirroring the routes above.

## Deployment Notes

- Recommended: Vercel for frontend, Render/Heroku/AWS for backend.
- Set environment variables for backend (`PORT`, `MONGO_URI`, `JWT_SECRET`, `SENDGRID_API_KEY`, `EMAIL_FROM`).
- Configure MongoDB indexes (email unique on `users`, etc.) via Mongoose schema definitions.

## Future Enhancements

- Real payment gateway integration (Stripe/Razorpay).
- Real-time availability calendar & dynamic pricing.
- Push/email notifications for admins on new bookings.
- Telemetry (logging, metrics) and infrastructure as code.

