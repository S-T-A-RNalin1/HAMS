// frontend/src/pages/studentDashboard.js
import React, { useState } from 'react';
import axios from 'axios';

const StudentDashboard = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    hostelPreference: 'Boys Hostel A',
    roomType: 'single'
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await axios.post('http://localhost:5000/api/applications', formData);
      setSubmitted(true);
      setFormData({ studentName: '', hostelPreference: 'Boys Hostel A', roomType: 'single' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      setError('Failed to submit application. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h3 className="page-title">📋 Submit Application</h3>
        
        {submitted && (
          <div style={{
            backgroundColor: '#dcfce7',
            border: '1px solid #16a34a',
            color: '#16a34a',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '24px',
            fontWeight: '500'
          }}>
            ✓ Application submitted successfully! We'll review it shortly.
          </div>
        )}

        {error && (
          <div style={{
            backgroundColor: '#fee2e2',
            border: '1px solid #dc2626',
            color: '#dc2626',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '24px',
            fontWeight: '500'
          }}>
            ✗ {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Student Name *</label>
            <input 
              type="text" 
              className="form-control"
              placeholder="Enter your full name"
              required
              value={formData.studentName}
              onChange={(e) => setFormData({...formData, studentName: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Hostel Preference *</label>
            <select 
              className="form-control"
              value={formData.hostelPreference} 
              onChange={(e) => setFormData({...formData, hostelPreference: e.target.value})}
            >
              <option value="Boys Hostel A">Boys Hostel A</option>
              <option value="Girls Hostel B">Girls Hostel B</option>
            </select>
          </div>

          <div className="form-group">
            <label>Room Type *</label>
            <select 
              className="form-control"
              value={formData.roomType} 
              onChange={(e) => setFormData({...formData, roomType: e.target.value})}
            >
              <option value="single">Single</option>
              <option value="double">Double</option>
              <option value="triple">Triple</option>
            </select>
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Submitting...' : 'Apply Now'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentDashboard;