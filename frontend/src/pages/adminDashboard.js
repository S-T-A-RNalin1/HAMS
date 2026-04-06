// frontend/src/pages/adminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/applications');
      setApplications(res.data);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/applications/${id}`, { status });
      fetchApplications();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const filteredApplications = filter === 'all' 
    ? applications 
    : applications.filter(app => app.status === filter);

  const counts = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    approved: applications.filter(app => app.status === 'approved').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
  };

  return (
    <div className="container">
      <div className="card">
        <h3 className="page-title">📊 Manage Applications</h3>
        
        {/* Statistics Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '32px'
        }}>
          <div style={{
            backgroundColor: '#eff6ff',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #dbeafe'
          }}>
            <div style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' }}>
              Total Applications
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#2563eb', marginTop: '8px' }}>
              {counts.total}
            </div>
          </div>
          
          <div style={{
            backgroundColor: '#fef3c7',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #fde68a'
          }}>
            <div style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' }}>
              Pending Review
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#d97706', marginTop: '8px' }}>
              {counts.pending}
            </div>
          </div>

          <div style={{
            backgroundColor: '#dcfce7',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #bbf7d0'
          }}>
            <div style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' }}>
              Approved
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#16a34a', marginTop: '8px' }}>
              {counts.approved}
            </div>
          </div>

          <div style={{
            backgroundColor: '#fee2e2',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #fecaca'
          }}>
            <div style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' }}>
              Rejected
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#dc2626', marginTop: '8px' }}>
              {counts.rejected}
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div style={{ marginBottom: '24px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setFilter('all')}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: '1px solid var(--border-light)',
              backgroundColor: filter === 'all' ? 'var(--primary)' : 'white',
              color: filter === 'all' ? 'white' : 'var(--text-main)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontSize: '0.85rem',
              textTransform: 'uppercase'
            }}
          >
            All
          </button>
          <button
            onClick={() => setFilter('pending')}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: '1px solid var(--border-light)',
              backgroundColor: filter === 'pending' ? 'var(--warning-text)' : 'white',
              color: filter === 'pending' ? 'white' : 'var(--text-main)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontSize: '0.85rem',
              textTransform: 'uppercase'
            }}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('approved')}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: '1px solid var(--border-light)',
              backgroundColor: filter === 'approved' ? 'var(--success-text)' : 'white',
              color: filter === 'approved' ? 'white' : 'var(--text-main)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontSize: '0.85rem',
              textTransform: 'uppercase'
            }}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter('rejected')}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: '1px solid var(--border-light)',
              backgroundColor: filter === 'rejected' ? 'var(--danger-text)' : 'white',
              color: filter === 'rejected' ? 'white' : 'var(--text-main)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontSize: '0.85rem',
              textTransform: 'uppercase'
            }}
          >
            Rejected
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            Loading applications...
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Hostel</th>
                <th>Room Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.length > 0 ? (
                filteredApplications.map(app => (
                  <tr key={app._id}>
                    <td style={{ fontWeight: '600' }}>{app.studentName}</td>
                    <td>{app.hostelPreference}</td>
                    <td style={{ textTransform: 'capitalize' }}>{app.roomType}</td>
                    <td>
                      <span className={`badge ${app.status}`}>
                        {app.status}
                      </span>
                    </td>
                    <td>
                      {app.status === 'pending' ? (
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button 
                            onClick={() => updateStatus(app._id, 'approved')} 
                            className="btn-action btn-approve"
                            title="Approve this application"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => updateStatus(app._id, 'rejected')} 
                            className="btn-action btn-reject"
                            title="Reject this application"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '500' }}>
                          —
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '32px' }}>
                    {applications.length === 0 ? '📭 No applications yet.' : '❌ No applications match the filter.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;