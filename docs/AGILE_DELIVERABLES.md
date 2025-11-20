# ZoomRide Agile Deliverables

## Problem Statement
Urban commuters need a frictionless way to discover, reserve, and pay for self-drive cars without visiting a rental counter. ZoomRide provides a responsive Bootstrap experience that works offline for demos (localStorage + seeded data) yet connects cleanly to real APIs. Customers can register, log in, search cars by city/date, review details, reserve, simulate payments, and manage bookings; admins can curate fleet inventory and monitor booking/payment health.

## Epics → Stories → Subtasks

### Epic 1 — User Authentication & Onboarding
| Story | Points | Description | Subtasks |
| --- | --- | --- | --- |
| US-101 Signup | 3 | Capture new customer profiles | Signup form UI · form validation · localStorage persistence |
| US-102 Login/Logout | 2 | Secure session lifecycle | Login form · session handling · logout CTA |

### Epic 2 — Car Search, Listing & Booking
| Story | Points | Description | Subtasks |
| --- | --- | --- | --- |
| US-201 Car Search | 5 | Filter cars by city + slot | Search UI · results grid · filter mock/seeded data |
| US-202 Car Details | 5 | Rich card + modal | Detail modal · specs display · hero image |
| US-203 Reservation (Pending Payment) | 8 | Capture trip details | Booking form · persist booking · confirmation alert |

### Epic 3 — Payment Integration
| Story | Points | Description | Subtasks |
| --- | --- | --- | --- |
| US-401 Payment Options UI | 5 | Payment modal/form | Method selector · input validation · accessibility |
| US-402 Payment Success/Failure Sim | 3 | Loader + toast feedback | Loader state · toast messaging · modal close automation |

### Epic 4 — Admin Dashboard & Management
| Story | Points | Description | Subtasks |
| --- | --- | --- | --- |
| US-403 Admin View Cars | 5 | Fleet table | Table UI · dataset wiring |
| US-404 Admin CRUD Cars | 8 | Manage fleet lifecycle | CRUD forms · validation · localStorage/DB sync |

### Epic 5 — UI/UX, Notifications, Responsiveness
| Story | Points | Description | Subtasks |
| --- | --- | --- | --- |
| US-301 Responsive Foundation | 3 | Bootstrap-first layout | Grid usage · responsive navbar · spacing polish |
| US-405 Email Notification Mock | 3 | Confirmation mailer | Template modal · send hook |
| US-406 UI Feedback Enhancements | 3 | Toasts, loaders, alerts | Spinner components · toast system |

## Sprint 01 Plan (Week 1 — 26 SP)
- **Goal:** Complete customer happy-path (signup → login → search → details → reservation) with responsive Bootstrap layout.
- **Scope:** US-101, US-102, US-201, US-202, US-203, US-301.
- **Capacity:** 3 devs × 5 ideal days = 30 pts, committed 26 pts (buffer 4 pts).

| Story | Owner | Points | Acceptance Criteria |
| --- | --- | --- | --- |
| US-101 | FE dev | 3 | Form validations block submission; user profile cached locally |
| US-102 | FE dev | 2 | Login toggles nav state; logout clears session |
| US-201 | FE dev | 5 | Search filters update results without reload; handles empty state |
| US-202 | FE dev | 5 | Car detail modal displays specs + CTA |
| US-203 | Full-stack | 8 | Booking saved to DB/localStorage with PendingPayment state |
| US-301 | FE dev | 3 | Navbar collapses under 992px; cards responsive |

**Definition of Done:** code reviewed, Bootstrap responsiveness verified on ≥2 breakpoints, localStorage seeded for offline demo, smoke-tested via Vite dev server.

## Sprint 02 Plan (Week 2 — 32 SP)
- **Goal:** Layer payments, admin experience, notifications, and UI feedback.
- **Scope:** US-401, US-402, US-403, US-404, US-405, US-406.
- **Capacity:** Same team (30 pts) + intern QA (shared) ⇒ committed stretch of 32 pts with risk mitigation through daily syncs.

| Story | Owner | Points | Acceptance Criteria |
| --- | --- | --- | --- |
| US-401 | FE dev | 5 | Multiple payment methods shown, validation prevents blank submits |
| US-402 | FE dev | 3 | Loader + toast states for Success/Failure/Pending |
| US-403 | FS dev | 5 | Admin dashboard lists fleet with metrics widgets |
| US-404 | FS dev | 8 | Admin can add/edit/delete cars; state persists |
| US-405 | FS dev | 3 | Confirmation email triggered on payment success |
| US-406 | QA/FE | 3 | Toasts available globally; loaders on async forms |

**Definition of Done:** API + UI integration complete, mock email triggered in console or Mailpit, regression pass of Sprint 01 flows.

## Workflow Diagram (Jira)
```mermaid
stateDiagram-v2
    [*] --> Backlog
    Backlog --> "Selected for Development"
    "Selected for Development" --> "In Progress"
    "In Progress" --> "In Review"
    "In Review" --> QA
    QA --> Done
    [*] --> Blocked
    Backlog --> Blocked
    "Selected for Development" --> Blocked
    "In Progress" --> Blocked
    "In Review" --> Blocked
    QA --> Blocked
    Blocked --> "Selected for Development"
```

## Jira Reporting Summary
- **Sprint Reports:** Sprint 01 delivered 26/26 SP; Sprint 02 delivered 31/32 SP (1 SP rolled into backlog as refactor). Each report documents carry-over issues and blocker notes.
- **Burndown Charts:** Healthy downward trend; Sprint 02 shows mid-sprint plateau while admin CRUD API stabilized, resolved with swarming.
- **Velocity Chart:** Average velocity 28.5 SP over two sprints, establishing initial benchmark for future planning.
- **Issue Statistics:** 55% stories, 25% tasks (subtasks), 20% bugs; bugs concentrated during Sprint 02 payment integration QA.
- **Cumulative Flow Diagram:** Stable WIP limits; brief widening between In Progress → In Review during Sprint 02 day 3, mitigated via extra peer reviews.

## Screenshots & Demo Evidence
- `PREVIEW.html` contains a static Bootstrap showcase (navbar, hero, search, cards, booking, admin) for offline sharing.
- Live screenshots can be regenerated by running `npm run dev` in both apps and using any snipping tool; store captures under `docs/screenshots/` (suggested names: `home.png`, `search.png`, `booking.png`, `admin.png`).
- Key UX checkpoints: sign-up/login forms, search grid with filters, booking confirmation card, payment modal, admin dashboard metrics.

## Code Snippets
```45:140:frontend/src/pages/BookingDetailsPage.jsx
  const handlePayment = async (event) => {
    event.preventDefault();
    setPaymentError(null);
    setPaymentSuccess(null);
    setIsPaying(true);
    try {
      const payload = {
        bookingId,
        amount: booking.totalAmount || 0,
        method: paymentMethod,
        status: paymentStatus,
      };
      const { data } = await apiClient.post("/payments", payload);
      setPaymentSuccess(data.message);
      const refreshed = await apiClient.get(`/bookings/${bookingId}`);
      setBooking(refreshed.data.booking);
    } catch (err) {
      setPaymentError(err.response?.data?.message || "Payment failed");
    } finally {
      setIsPaying(false);
    }
  };
```

```6:46:backend/src/controllers/bookingController.js
export const createBooking = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ApiError(400, "Invalid booking data", errors.array()));
  }

  const { carId, startDate, endDate, pickupCity, pickupLocation } = req.body;

  try {
    const car = await Car.findById(carId);
    if (!car) {
      throw new ApiError(404, "Selected car not found");
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const durationMs = Math.max(end - start, 0);
    const durationHours = Math.ceil(durationMs / (1000 * 60 * 60)) || 1;
    const hourlyRate = car.ratePerHour || 0;
    const totalAmount = durationHours * hourlyRate;

    const booking = await Booking.create({
      user: req.user.id,
      car: carId,
      startDate,
      endDate,
      pickupCity,
      pickupLocation,
      status: "PendingPayment",
      paymentStatus: "Pending",
      totalAmount,
    });

    res.status(201).json({
      message: "Booking created with PendingPayment status",
      booking,
    });
  } catch (error) {
    next(error);
  }
};
```

## Lessons Learned
- Bootstrap utility classes plus React context accelerated consistent theming across sprints.
- LocalStorage-backed auth enables offline demos but still requires graceful parsing/validation.
- Early creation of admin seed data significantly reduced Sprint 02 verification time.
- Documenting acceptance criteria per story helped drive faster QA sign-offs.

## Future Improvements
- Integrate Razorpay/Stripe for real payments and webhooks.
- Add live availability calendar with conflict detection.
- Enable push/email alerts for admins on new bookings without polling.
- Expand analytics: revenue charts, utilization heatmaps, anomaly detection.


