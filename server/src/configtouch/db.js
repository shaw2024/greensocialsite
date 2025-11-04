import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer = null;

export async function connectDB(uri) {
  if (uri) {
    await mongoose.connect(uri);
    console.log("Connected to external MongoDB");
    return;
  }
  mongoServer = await MongoMemoryServer.create();
  const memUri = mongoServer.getUri();
  await mongoose.connect(memUri);
  console.log("Connected to in-memory MongoDB");
}

export async function closeDB() {
  await mongoose.disconnect();
  if (mongoServer) await mongoServer.stop();
}
