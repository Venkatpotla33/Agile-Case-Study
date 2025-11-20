import { validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";
import Booking from "../models/Booking.js";
import Payment from "../models/Payment.js";
import { sendBookingConfirmation } from "../services/notificationService.js";

export const createPayment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ApiError(400, "Invalid payment data", errors.array()));
  }

  const { bookingId, amount, method, status } = req.body;

  try {
    const booking = await Booking.findById(bookingId).populate("user").populate("car");
    if (!booking) {
      throw new ApiError(404, "Booking not found");
    }

    if (!["Pending", "Success", "Failure"].includes(status)) {
      throw new ApiError(400, "Unsupported payment status");
    }

    const payment = await Payment.create({
      booking: bookingId,
      amount,
      method,
      status,
      transactionId: `TX-${Date.now()}`,
    });

    if (status === "Success") {
      booking.status = "Confirmed";
      booking.paymentStatus = "Success";
      await booking.save();
      await sendBookingConfirmation({
        booking,
        user: booking.user,
        payment,
      });
    } else if (status === "Failure") {
      booking.paymentStatus = "Failed";
      await booking.save();
    }

    res.status(201).json({
      message: `Payment recorded with status ${status}`,
      payment,
    });
  } catch (error) {
    next(error);
  }
};

