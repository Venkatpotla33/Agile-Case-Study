import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/User.js";
import Car from "../models/Car.js";

dotenv.config({ path: process.env.ENV_PATH || undefined });

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/zoomride";

const seed = async () => {
  await mongoose.connect(MONGO_URI);

  await Promise.all([User.deleteMany(), Car.deleteMany()]);

  const admin = await User.create({
    fullName: "Admin User",
    email: "admin@zoomride.com",
    password: "AdminPass123!",
    role: "admin",
  });

  await User.create({
    fullName: "Demo Customer",
    email: "demo@zoomride.com",
    password: "DemoPass123!",
    role: "user",
  });

  await Car.insertMany([
    {
      title: "Compact City Ride",
      model: "Swift",
      brand: "Maruti",
      city: "Mumbai",
      pickupLocations: ["Bandra", "Andheri"],
      ratePerHour: 200,
      ratePerDay: 1500,
      seats: 5,
      fuelType: "Petrol",
      transmission: "automatic",
      imageUrl:
        "https://images.unsplash.com/photo-1549921296-3cce903855cd?auto=format&fit=crop&w=800&q=80",
      features: ["Bluetooth", "Air Conditioning", "USB Charging"],
    },
    {
      title: "Family SUV",
      model: "Creta",
      brand: "Hyundai",
      city: "Bengaluru",
      pickupLocations: ["Koramangala", "Whitefield"],
      ratePerHour: 350,
      ratePerDay: 2500,
      seats: 7,
      fuelType: "Diesel",
      transmission: "automatic",
      imageUrl:
        "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=800&q=80",
      features: ["GPS Navigation", "Rear Camera", "Android Auto"],
    },
  ]);

  console.log("Seed data inserted successfully");
  console.log(`Admin credentials: email=${admin.email} password=AdminPass123!`);

  await mongoose.disconnect();
};

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });

