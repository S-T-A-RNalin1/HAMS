// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import all pages
import StudentDashboard from './pages/studentDashboard';
import AdminDashboard from './pages/adminDashboard';
import StudentTickets from './pages/studentTickets';
import AdminTickets from './pages/adminTickets';
import Login from './pages/login';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) setUser(JSON.parse(loggedInUser));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <Router>
      <div>
        <nav className="navbar">
          <h2 className="nav-brand">Hostel Allocation</h2>
          <div className="nav-links" style={{ display: 'flex', alignItems: 'center' }}>
            
            {/* Show links based on who is logged in */}
            {user?.role === 'student' && (
              <>
                <Link to="/">My Application</Link>
                <Link to="/tickets">Complaints</Link>
              </>
            )}
            
            {user?.role === 'admin' && (
              <>
                <Link to="/">Manage Applications</Link>
                <Link to="/tickets">Helpdesk</Link>
              </>
            )}

            {user ? (
              <div style={{ marginLeft: '40px', borderLeft: '1px solid #e2e8f0', paddingLeft: '20px' }}>
                <span style={{ color: '#64748b', marginRight: '15px', fontSize: '0.9rem' }}>
                  {user.name} ({user.role})
                </span>
                <button onClick={handleLogout} className="btn-action btn-reject">Logout</button>
              </div>
            ) : null}
          </div>
        </nav>

        <Routes>
          {!user ? (
            <Route path="*" element={<Login setAuth={setUser} />} />
          ) : (
            <>
              {/* Student Routes */}
              {user.role === 'student' && (
                <>
                  <Route path="/" element={<StudentDashboard user={user} />} />
                  <Route path="/tickets" element={<StudentTickets user={user} />} />
                </>
              )}
              {/* Admin Routes */}
              {user.role === 'admin' && (
                <>
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="/tickets" element={<AdminTickets />} />
                </>
              )}
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;