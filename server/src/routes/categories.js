import { Router } from "express";
import Category from "../models/Category.js";
import { authRequired } from "../middleware/auth.js";

const router = Router();

router.get("/", authRequired, async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});

export default router;
