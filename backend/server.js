// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Import Models
const User = require('./models/user');
const Application = require('./models/application');
const Ticket = require('./models/ticket');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch(err => console.log("Database Error: ", err));

// ==========================================
// 1. AUTHENTICATION ROUTES (Login & Register)
// ==========================================
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Error registering user" });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ==========================================
// 2. HOSTEL APPLICATION ROUTES
// ==========================================
app.post('/api/applications', async (req, res) => {
  const newApp = new Application(req.body);
  await newApp.save();
  res.status(201).json(newApp);
});

app.get('/api/applications', async (req, res) => {
  const applications = await Application.find();
  res.status(200).json(applications);
});

app.put('/api/applications/:id', async (req, res) => {
  const updatedApp = await Application.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  res.status(200).json(updatedApp);
});

// ==========================================
// 3. TICKETING / COMPLAINT ROUTES
// ==========================================
app.post('/api/tickets', async (req, res) => {
  const newTicket = new Ticket(req.body);
  await newTicket.save();
  res.status(201).json(newTicket);
});

app.get('/api/tickets', async (req, res) => {
  const tickets = await Ticket.find();
  res.status(200).json(tickets);
});

app.put('/api/tickets/:id', async (req, res) => {
  const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  res.status(200).json(updatedTicket);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));