import { Router } from "express";
import { body } from "express-validator";
import {
  createBooking,
  getUserBookings,
  getBookingById,
  cancelBooking,
} from "../controllers/bookingController.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  [
    body("carId").notEmpty(),
    body("pickupCity").notEmpty(),
    body("startDate").notEmpty(),
    body("endDate").notEmpty(),
  ],
  createBooking
);

router.get("/", getUserBookings);
router.get("/:id", getBookingById);
router.post("/:id/cancel", cancelBooking);

export default router;

