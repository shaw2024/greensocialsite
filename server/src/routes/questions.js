import { Router } from "express";
import Question from "../models/Question.js";
import { authRequired } from "../middleware/auth.js";

const router = Router();

// Get questions by category
router.get("/category/:categoryId", authRequired, async (req, res) => {
  const { categoryId } = req.params;
  const questions = await Question.find({ categoryId }).sort({ createdAt: 1 });
  res.json(questions);
});

// Create question
router.post("/", authRequired, async (req, res) => {
  const { categoryId, body } = req.body;
  if (!body || !body.trim().endsWith("?")) {
    return res.status(400).json({ message: "Question must end with a question mark." });
  }
  const question = await Question.create({
    categoryId,
    author: req.user.username,
    body: body.trim(),
    answers: []
  });
  res.status(201).json(question);
});

// Get question by ID
router.get("/:id", authRequired, async (req, res) => {
  const question = await Question.findById(req.params.id);
  if (!question) return res.status(404).json({ message: "Not found" });
  res.json(question);
});

// Post answer
router.post("/:id/answers", authRequired, async (req, res) => {
  const { body } = req.body;
  if (!body || !body.trim())
    return res.status(400).json({ message: "Answer cannot be empty" });
  const question = await Question.findById(req.params.id);
  if (!question) return res.status(404).json({ message: "Not found" });
  question.answers.push({ author: req.user.username, body: body.trim() });
  await question.save();
  res.json(question);
});

export default router;
