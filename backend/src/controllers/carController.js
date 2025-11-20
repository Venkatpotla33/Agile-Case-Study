import { validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";
import Car from "../models/Car.js";

export const searchCars = async (req, res, next) => {
  const { city, startDate, endDate } = req.query;

  try {
    const query = { isActive: true };
    if (city) {
      query.city = new RegExp(`^${city}$`, "i");
    }

    // Availability filtering (basic implementation)
    let cars = await Car.find(query).lean();

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      cars = cars.filter((car) => {
        if (!car.availability || car.availability.length === 0) {
          return true;
        }

        return car.availability.some((slot) => {
          const slotStart = new Date(slot.start);
          const slotEnd = new Date(slot.end);
          return start >= slotStart && end <= slotEnd;
        });
      });
    }

    res.json({ cars });
  } catch (error) {
    next(error);
  }
};

export const getCarById = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id).lean();
    if (!car) {
      throw new ApiError(404, "Car not found");
    }
    res.json({ car });
  } catch (error) {
    next(error);
  }
};

export const createCar = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ApiError(400, "Invalid car data", errors.array()));
  }

  try {
    const car = await Car.create(req.body);
    res.status(201).json({ message: "Car created", car });
  } catch (error) {
    next(error);
  }
};

export const updateCar = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ApiError(400, "Invalid car data", errors.array()));
  }

  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!car) {
      throw new ApiError(404, "Car not found");
    }
    res.json({ message: "Car updated", car });
  } catch (error) {
    next(error);
  }
};

export const deleteCar = async (req, res, next) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      throw new ApiError(404, "Car not found");
    }
    res.json({ message: "Car removed" });
  } catch (error) {
    next(error);
  }
};

