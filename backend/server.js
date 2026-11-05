require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const clientRoutes = require("./routes/clients");
const app = express();
const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:3000";

app.use(cors({ origin: allowedOrigin }));
app.use(express.json({ limit: "20kb" }));
app.get("/", (req, res) => res.status(200).json({ message: "CRM API is running" }));
app.use("/api/clients", async (req, res, next) => {
  try { await connectDB(); next(); }
  catch (error) { console.error("Database connection failed:", error.message); res.status(500).json({ message: "Could not connect to the database." }); }
});
app.use("/api/clients", clientRoutes);
app.use((error, req, res, next) => { console.error(error); res.status(error.status || 500).json({ message: "Invalid request." }); });
// Vercel calls the exported app; locally this file starts its own server.
if (!process.env.VERCEL) { const port = process.env.PORT || 4000; app.listen(port, () => console.log(`CRM API listening at http://localhost:${port}`)); }
module.exports = app;
