import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import User from "../models/User.js";

const router = Router();

router.post(
  "/register",
  [
    body("username").isString().trim().isLength({ min: 3 }).withMessage("Username >= 3 chars"),
    body("password").isString().isLength({ min: 6 }).withMessage("Password >= 6 chars")
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const { username, password } = req.body;
      const existing = await User.findOne({ username });
      if (existing) return res.status(409).json({ message: "Username already taken" });

      const passwordHash = await bcrypt.hash(password, 10);
      const user = await User.create({ username, passwordHash });
      const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET);
      res.json({ token, username });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

router.post(
  "/login",
  [body("username").isString().trim(), body("password").isString()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) return res.status(401).json({ message: "Invalid credentials" });
      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) return res.status(401).json({ message: "Invalid credentials" });
      const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET);
      res.json({ token, username });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;
