const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// MongoDB Connection Function
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  }
};

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Define a Schema & Model for Contacts
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNo: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isContacted: { type: Boolean, default: false },
});

const Contact = mongoose.model("Contact", contactSchema);

// ✅ 1️⃣ POST - Save a Contact
app.post("/contacts", async (req, res) => {
  try {
    const { name, phoneNo, email, isContacted } = req.body;
    const newContact = new Contact({ name, phoneNo, email, isContacted });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ 2️⃣ GET - Get All Contacts
app.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

// ✅ 3️⃣ PUT - Update isContacted Status by ID
app.put("/contacts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { isContacted: true },
      { new: true } // Return the updated document
    );
    if (!updatedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.status(200).json(updatedContact);
  } catch (err) {
    res.status(400).json({ error: "Invalid request" });
  }
});

// Start Server after DB Connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
