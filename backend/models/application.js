// backend/models/Application.js
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  // In the future, this will link to a real User ID. For now, we will use a plain string so we can test easily.
  studentName: { type: String, required: true }, 
  hostelPreference: { type: String, required: true },
  roomType: { type: String, enum: ['single', 'double', 'triple'], required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  appliedOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', applicationSchema);