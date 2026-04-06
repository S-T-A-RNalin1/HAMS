// frontend/src/pages/AdminTickets.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const res = await axios.get('http://localhost:5000/api/tickets');
    setTickets(res.data);
  };

  const resolveTicket = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/tickets/${id}`, { status: 'resolved' });
      fetchTickets(); // Refresh list
    } catch (error) {
      alert("Failed to update ticket");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h3 className="page-title">Helpdesk Tickets</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Issue</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket._id}>
                <td style={{ fontWeight: '500' }}>{ticket.studentName}</td>
                <td>{ticket.issue}</td>
                <td>{ticket.description}</td>
                <td>
                  <span className={`badge ${ticket.status === 'resolved' ? 'approved' : 'pending'}`}>
                    {ticket.status}
                  </span>
                </td>
                <td>
                  {ticket.status === 'open' ? (
                    <button onClick={() => resolveTicket(ticket._id)} className="btn-action btn-approve">
                      Mark Resolved
                    </button>
                  ) : (
                    <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Resolved</span>
                  )}
                </td>
              </tr>
            ))}
            {tickets.length === 0 && <tr><td colSpan="5" style={{textAlign: 'center'}}>No open tickets.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTickets;