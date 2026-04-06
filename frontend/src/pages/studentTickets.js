// frontend/src/pages/StudentTickets.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentTickets = ({ user }) => {
  const [tickets, setTickets] = useState([]);
  const [formData, setFormData] = useState({ issue: 'Maintenance', description: '' });

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tickets');
      // Filter to only show tickets submitted by this specific student
      const myTickets = res.data.filter(ticket => ticket.studentName === user.name);
      setTickets(myTickets);
    } catch (error) {
      console.error("Error fetching tickets");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/tickets', {
        ...formData,
        studentName: user.name
      });
      alert('Ticket Submitted Successfully!');
      setFormData({ ...formData, description: '' });
      fetchTickets(); // Refresh list
    } catch (error) {
      alert('Failed to submit ticket.');
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3 className="page-title">Raise a Complaint</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Issue Category</label>
            <select className="form-control" value={formData.issue} onChange={(e) => setFormData({...formData, issue: e.target.value})}>
              <option value="Maintenance">Room Maintenance</option>
              <option value="Internet">Internet/Wi-Fi</option>
              <option value="Cleaning">Cleaning/Hygiene</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea 
              className="form-control" 
              rows="3" 
              required
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe your issue in detail..."
            ></textarea>
          </div>
          <button type="submit" className="btn-primary" style={{ maxWidth: '200px' }}>Submit Ticket</button>
        </form>
      </div>

      <div className="card">
        <h3 className="page-title">My Tickets</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Issue</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket._id}>
                <td style={{ fontWeight: '500' }}>{ticket.issue}</td>
                <td>{ticket.description}</td>
                <td>
                  <span className={`badge ${ticket.status === 'resolved' ? 'approved' : 'pending'}`}>
                    {ticket.status}
                  </span>
                </td>
              </tr>
            ))}
            {tickets.length === 0 && <tr><td colSpan="3" style={{textAlign: 'center'}}>No tickets found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTickets;