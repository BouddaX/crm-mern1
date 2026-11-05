const mongoose = require("mongoose");

async function connectDB() {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is missing. Add it to backend/.env.");
  // Reuse the connection when Vercel keeps this function warm.
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connected");
}
module.exports = connectDB;
