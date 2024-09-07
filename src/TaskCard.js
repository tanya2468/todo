import React, { useState } from "react";
import "./TaskCard.css"; // Assuming you have the CSS file linked

const TaskCard = ({ task, updateTaskStatus }) => {
  const { id, title, description, priority, date } = task;
  const [showDropdown, setShowDropdown] = useState(false);

  const handleStatusChange = (newStatus) => {
    setShowDropdown(false); // Hide dropdown after selecting an option
    updateTaskStatus(id, newStatus); // Update the task status
  };

  return (
    <div className={`task-card ${priority.toLowerCase()}`}>
      <div className="task-header">
        <span className={`priority ${priority.toLowerCase()}`}>{priority}</span>
        <h3>{title}</h3>
        <div className="dropdown">
          <button
            className="dropdown-toggle"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            &#9662;
          </button>
          {showDropdown && (
            <ul className="dropdown-menu">
              <li onClick={() => handleStatusChange("todo")}>Todo</li>
              <li onClick={() => handleStatusChange("inProgress")}>In Progress</li>
              <li onClick={() => handleStatusChange("completed")}>Completed</li>
            </ul>
          )}
        </div>
      </div>
      <p>{description}</p>
      <div className="task-footer">
        <span>{date}</span>
      </div>
    </div>
  );
};

export default TaskCard;
