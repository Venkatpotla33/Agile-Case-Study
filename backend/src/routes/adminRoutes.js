import { Router } from "express";
import { body } from "express-validator";
import {
  getDashboardSummary,
  listCars,
  listBookings,
} from "../controllers/adminController.js";
import {
  createCar,
  updateCar,
  deleteCar,
} from "../controllers/carController.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = Router();

router.use(authenticate, authorize("admin"));

router.get("/summary", getDashboardSummary);
router.get("/cars", listCars);
router.get("/bookings", listBookings);

router.post(
  "/cars",
  [
    body("title").notEmpty(),
    body("model").notEmpty(),
    body("brand").notEmpty(),
    body("city").notEmpty(),
    body("ratePerHour").isNumeric(),
    body("ratePerDay").isNumeric(),
    body("seats").isInt({ min: 1 }),
    body("fuelType").notEmpty(),
    body("transmission").isIn(["automatic", "manual"]),
  ],
  createCar
);
router.put(
  "/cars/:id",
  [
    body("title").optional().notEmpty(),
    body("model").optional().notEmpty(),
    body("brand").optional().notEmpty(),
  ],
  updateCar
);
router.delete("/cars/:id", deleteCar);

export default router;

