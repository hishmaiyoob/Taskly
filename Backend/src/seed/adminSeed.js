import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/User.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    // connect to DB
    await connectDB();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME || "Taskly Admin";

    // check admin credentials exist
    if (!adminEmail || !adminPassword) {
      console.error("ADMIN_EMAIL and ADMIN_PASSWORD are required!");

      process.exit(1);
    }

    // check whether admin already exists
    const existingAdmin = await User.findOne({
      email: adminEmail.toLowerCase(),
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    // hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    // create admin
    const admin = await User.create({
      name: adminName,
      email: adminEmail.toLowerCase(),
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully!");
    console.log(`Email: ${admin.email}`);
    console.log(`Role: ${admin.role}`);

    process.exit(0);
  } catch (error) {
    console.error("Admin seeding failed:", error.message);

    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
};

seedAdmin();
