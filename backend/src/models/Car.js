import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema(
  {
    start: { type: Date, required: true },
    end: { type: Date, required: true },
  },
  { _id: false }
);

const carSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    pickupLocations: [{ type: String, trim: true }],
    ratePerHour: { type: Number, required: true, min: 0 },
    ratePerDay: { type: Number, required: true, min: 0 },
    seats: { type: Number, required: true, min: 1 },
    fuelType: { type: String, required: true, trim: true },
    transmission: { type: String, enum: ["automatic", "manual"], required: true },
    imageUrl: { type: String },
    features: [{ type: String }],
    availability: [availabilitySchema],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);

export default Car;

