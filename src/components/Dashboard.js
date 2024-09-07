import React from "react";
import './Dashboard.css'; // Ensure to include your CSS for styles.
import images from '../assets/images.png'; // Path to your logo image.

const Dashboard = ({ onCreateTask }) => {
  return (
    <div className="dashboard-header">
      <div className="dashboard-logo">
        {/* Display the Board Infinity Logo */}
        <img src={images} alt="Board Infinity Logo" />
      </div>

      <div className="dashboard-content">
        <div className="dashboard-title">
          {/* Title in the center */}
          <h1>Desktop & Mobile Application</h1>
        </div>

        <div className="dashboard-create-task">
          {/* Create Task button aligned to the right */}
          <button onClick={onCreateTask} className="create-task-button">
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
