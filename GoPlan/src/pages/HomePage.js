import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/homepage.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown(prevState => !prevState);
  };

  // Navigate to profile page
  const handleProfileClick = () => {
    setShowDropdown(false); // Close dropdown after navigating
    navigate('/profile');   // Navigate to the profile page
  };

  // Navigate to dashboard
  const handleDashboardClick = () => {
    setShowDropdown(false); // Close dropdown after navigating
    navigate('/dashboard'); // Navigate to the dashboard page
  };

  // Logout function
  const handleLogout = () => {
    setShowDropdown(false); // Close dropdown after logout
    navigate('/');          // Adjust to your landing page route for logout
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/travel'); // Navigate to the travel page
  };

  return (
    <div className="homepage">
      <header className="d-flex justify-content-between align-items-center px-4 py-2">
        <img src="/assets/images/goplanlogo.png" alt="GoPlan Logo" className="logo" />

        <div className="profile-icon" onClick={toggleDropdown}>
          <img src="/assets/images/maleuser.png" alt="Profile" />
          
          {showDropdown && (
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={handleProfileClick}>Your Profile</div>
              <div className="dropdown-item" onClick={handleDashboardClick}>Dashboard</div>
              <div className="dropdown-item" onClick={handleLogout}>Logout</div>
            </div>
          )}
        </div>
      </header>

      <main className="d-flex flex-column align-items-center justify-content-center text-center">
        <h1 className="text-success">Plan Travel</h1>
        <form className="homepage-form mt-4" onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label htmlFor="destination" className="form-label">Destination?</label>
            <input
              type="text"
              className="form-control"
              id="destination"
              name="destination"
              placeholder="e.g. Abia, Akwa"
              required
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="travel-schedule" className="form-label">Travel Schedule</label>
            <div className="d-flex gap-3">
              <input
                type="date"
                className="form-control"
                id="start-date"
                name="start"
                required
              />
              <input
                type="date"
                className="form-control"
                id="end-date"
                name="end"
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-success btn-block mt-3">Create Plan</button>
        </form>
      </main>

      <footer className="text-center py-3">
        <p>Copyright © 2024. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;