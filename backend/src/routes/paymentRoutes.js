import { Router } from "express";
import { body } from "express-validator";
import { createPayment } from "../controllers/paymentController.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.post(
  "/",
  authenticate,
  [
    body("bookingId").notEmpty(),
    body("amount").isNumeric(),
    body("method").isIn(["card", "upi", "wallet"]),
    body("status").isIn(["Pending", "Success", "Failure"]),
  ],
  createPayment
);

export default router;

