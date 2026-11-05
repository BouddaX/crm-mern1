const express = require("express");
const Client = require("../models/Client");
const router = express.Router();

function sendDatabaseError(res, error) {
  if (error.code === 11000) return res.status(409).json({ message: "A client with this email already exists." });
  if (error.name === "ValidationError") return res.status(400).json({ message: error.message });
  if (error.name === "CastError") return res.status(400).json({ message: "Invalid client ID." });
  console.error(error);
  return res.status(500).json({ message: "Unexpected server error." });
}

// GET /api/clients - list all contacts, newest first.
router.get("/", async (req, res) => {
  try { const clients = await Client.find().sort({ createdAt: -1 }); return res.status(200).json(clients); }
  catch (error) { return sendDatabaseError(res, error); }
});
// GET /api/clients/:id - read one contact.
router.get("/:id", async (req, res) => {
  try { const client = await Client.findById(req.params.id); if (!client) return res.status(404).json({ message: "Client not found." }); return res.status(200).json(client); }
  catch (error) { return sendDatabaseError(res, error); }
});
// POST /api/clients - create a contact.
router.post("/", async (req, res) => {
  try { const client = await Client.create(req.body); return res.status(201).json(client); }
  catch (error) { return sendDatabaseError(res, error); }
});
// PATCH /api/clients/:id - update the fields sent by the caller.
router.patch("/:id", async (req, res) => {
  try { const client = await Client.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after", runValidators: true }); if (!client) return res.status(404).json({ message: "Client not found." }); return res.status(200).json(client); }
  catch (error) { return sendDatabaseError(res, error); }
});
// DELETE /api/clients/:id - delete a contact.
router.delete("/:id", async (req, res) => {
  try { const client = await Client.findByIdAndDelete(req.params.id); if (!client) return res.status(404).json({ message: "Client not found." }); return res.status(200).json({ message: "Client deleted." }); }
  catch (error) { return sendDatabaseError(res, error); }
});
module.exports = router;
