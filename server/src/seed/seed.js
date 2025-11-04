import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { connectDB, closeDB } from "../config/db.js";
import User from "../models/User.js";
import Category from "../models/Category.js";
import Question from "../models/Question.js";

dotenv.config();

async function seed() {
  await connectDB(process.env.MONGODB_URI);

  await User.deleteMany({});
  await Category.deleteMany({});
  await Question.deleteMany({});

  const cats = await Category.insertMany([
    { name: "Environment" },
    { name: "Sustainability" },
    { name: "Recycling" },
    { name: "Green Tech" },
    { name: "Nature" }
  ]);

  const passwordHash = await bcrypt.hash("password123", 10);
  const demo = await User.create({ username: "demo", passwordHash });

  await Question.create([
    {
      categoryId: cats[0]._id,
      author: demo.username,
      body: "How can we reduce plastic waste?",
      answers: [{ author: demo.username, body: "Use reusable containers and avoid single-use plastics." }]
    },
    {
      categoryId: cats[3]._id,
      author: demo.username,
      body: "What is the future of solar technology?",
      answers: []
    }
  ]);

  console.log("✅ Database seeded successfully");
  await mongoose.connection.close();
  await closeDB();
}

seed();
