import Car from "../models/Car.js";
import Booking from "../models/Booking.js";
import Payment from "../models/Payment.js";

export const getDashboardSummary = async (_req, res, next) => {
  try {
    const [carsCount, bookingsCount, paymentsCount] = await Promise.all([
      Car.countDocuments(),
      Booking.countDocuments(),
      Payment.countDocuments({ status: "Success" }),
    ]);

    res.json({
      carsCount,
      bookingsCount,
      successfulPayments: paymentsCount,
    });
  } catch (error) {
    next(error);
  }
};

export const listCars = async (_req, res, next) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 }).lean();
    res.json({ cars });
  } catch (error) {
    next(error);
  }
};

export const listBookings = async (_req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "fullName email")
      .populate("car", "title model city")
      .sort({ createdAt: -1 })
      .lean();
    res.json({ bookings });
  } catch (error) {
    next(error);
  }
};

