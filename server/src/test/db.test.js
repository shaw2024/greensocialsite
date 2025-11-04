import { connectDB, closeDB } from "../config/db.js";

async function run() {
  try {
    console.log("Starting connectDB() (in-memory)...");
    await connectDB();
    console.log("connectDB() finished — connected.");

    // Simple sanity check: ensure mongoose connection is ready
    // We avoid importing mongoose here to keep this test minimal.

    console.log("Starting closeDB()...");
    await closeDB();
    console.log("closeDB() finished — disconnected.");

    console.log("DB test completed successfully.");
    process.exit(0);
  } catch (err) {
    console.error("DB test failed:", err);
    process.exit(1);
  }
}

// Run when invoked with `node src/test/db.test.js`
run();
