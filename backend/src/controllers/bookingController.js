import { validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";
import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

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

export const getUserBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("car")
      .sort({ createdAt: -1 })
      .lean();

    res.json({ bookings });
  } catch (error) {
    next(error);
  }
};

export const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.id,
    })
      .populate("car")
      .lean();

    if (!booking) {
      throw new ApiError(404, "Booking not found");
    }

    res.json({ booking });
  } catch (error) {
    next(error);
  }
};

export const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { status: "Cancelled" },
      { new: true }
    );

    if (!booking) {
      throw new ApiError(404, "Booking not found");
    }

    res.json({ message: "Booking cancelled", booking });
  } catch (error) {
    next(error);
  }
};

