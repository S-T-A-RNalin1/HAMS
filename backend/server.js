// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Sequelize } = require('sequelize');

const app = express();
app.use(cors());
app.use(express.json());

// ==========================================
// SQL DATABASE SETUP (SQLite)
// ==========================================
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './hostel_database.sqlite', // This creates a local SQL file in your backend folder
  logging: false 
});

// Initialize Models
const User = require('./models/user')(sequelize);
const Application = require('./models/application')(sequelize);
const Ticket = require('./models/ticket')(sequelize);

// Sync database (creates tables if they don't exist)
sequelize.sync()
  .then(() => console.log("SQL Database (SQLite) Connected & Synced!"))
  .catch(err => console.log("Database Sync Error: ", err));

// ==========================================
// 1. AUTHENTICATION ROUTES
// ==========================================
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // SQL: Find one by email
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // SQL: Create new record
    await User.create({ name, email, password: hashedPassword, role });
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Error registering user" });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
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
  const newApp = await Application.create(req.body);
  res.status(201).json(newApp);
});

app.get('/api/applications', async (req, res) => {
  const applications = await Application.findAll();
  res.status(200).json(applications);
});

app.put('/api/applications/:id', async (req, res) => {
  // SQL: Update where ID matches
  await Application.update({ status: req.body.status }, { where: { _id: req.params.id } });
  res.status(200).json({ message: "Updated successfully" });
});

// ==========================================
// 3. TICKETING / COMPLAINT ROUTES
// ==========================================
app.post('/api/tickets', async (req, res) => {
  const newTicket = await Ticket.create(req.body);
  res.status(201).json(newTicket);
});

app.get('/api/tickets', async (req, res) => {
  const tickets = await Ticket.findAll();
  res.status(200).json(tickets);
});

app.put('/api/tickets/:id', async (req, res) => {
  await Ticket.update({ status: req.body.status }, { where: { _id: req.params.id } });
  res.status(200).json({ message: "Updated successfully" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));