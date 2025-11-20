import { Router } from "express";
import { body } from "express-validator";
import {
  searchCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
} from "../controllers/carController.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = Router();

router.get("/", searchCars);
router.get("/:id", getCarById);

router.post(
  "/",
  authenticate,
  authorize("admin"),
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
  "/:id",
  authenticate,
  authorize("admin"),
  [
    body("title").optional().notEmpty(),
    body("model").optional().notEmpty(),
    body("brand").optional().notEmpty(),
  ],
  updateCar
);

router.delete("/:id", authenticate, authorize("admin"), deleteCar);

export default router;

