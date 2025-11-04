import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/categories.js";
import questionRoutes from "./routes/questions.js";
import seedRoutes from "./routes/seed.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Some environments (redirected logs / non-interactive shells) can
// cause read errors on the TTY ReadStream (EIO). In our dev container
// this surfaced as an unhandled 'error' event which terminated Node.
// Add a defensive listener to suppress EIO coming from stdin so the
// server stays up during dev. This is safe for development only.
if (process.stdin && typeof process.stdin.on === "function") {
  // Ensure the stream is flowing so internal TTY read handling is
  // initialized. In some container environments stdin is closed or
  // behaves like a broken pipe which can emit EIO; resume() helps
  // avoid a synchronous error in some Node builds.
  try {
    if (typeof process.stdin.resume === "function") process.stdin.resume();
  } catch (e) {
    // ignore
  }

  process.stdin.on("error", (err) => {
    // Ignore low-level I/O errors on stdin (EIO) which can happen
    // when the process has no TTY. Log at debug level so we can
    // diagnose if other problems appear.
    // eslint-disable-next-line no-console
    console.warn("Ignored stdin error:", err && err.code ? err.code : err);
  });

  // Defensively attach noop error handlers to stdout/stderr too.
  // In some CI/dev shells these writable streams may emit error
  // events that would otherwise be unhandled.
  try {
    if (process.stdout && typeof process.stdout.on === "function") {
      process.stdout.on("error", (e) => {
        // eslint-disable-next-line no-console
        console.warn("Ignored stdout error:", e && e.code ? e.code : e);
      });
    }
    if (process.stderr && typeof process.stderr.on === "function") {
      process.stderr.on("error", (e) => {
        // eslint-disable-next-line no-console
        console.warn("Ignored stderr error:", e && e.code ? e.code : e);
      });
    }
  } catch (e) {
    // ignore
  }
}

process.on("uncaughtException", (err) => {
  // Log and keep process alive in dev; nodemon will still restart
  // the process on serious failures. This helps prevent the app
  // from exiting on transient TTY read errors.
  // eslint-disable-next-line no-console
  console.error("Uncaught exception:", err && err.stack ? err.stack : err);
});

// Also handle unhandled promise rejections to avoid process termination
process.on("unhandledRejection", (reason, p) => {
  // eslint-disable-next-line no-console
  console.warn("Unhandled Rejection at:", p, "reason:", reason);
});


app.get("/", (req, res) => res.send("GreenSocialSite API OK"));
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/seed", seedRoutes);

const PORT = process.env.PORT || 4000;
connectDB(process.env.MONGODB_URI).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
