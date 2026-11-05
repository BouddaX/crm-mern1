const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  nom: { type: String, required: [true, "Name is required."], trim: true, maxlength: [100, "Name must be 100 characters or fewer."] },
  email: { type: String, required: [true, "Email is required."], unique: true, lowercase: true, trim: true, maxlength: [254, "Email must be 254 characters or fewer."] },
  telephone: { type: String, trim: true, maxlength: 40 },
  entreprise: { type: String, trim: true, maxlength: 120 },
  statut: { type: String, enum: { values: ["prospect", "client", "inactif"], message: "Status must be prospect, client, or inactif." }, default: "prospect" }
}, { timestamps: true });

module.exports = mongoose.model("Client", clientSchema);
