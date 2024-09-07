import React, { useState, useEffect } from "react";
import "./TaskModal.css"; // Import modal-specific CSS

const TaskModal = ({ task, onClose, onCreate, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  // Helper function to convert date to dd/mm/yyyy
  const formatDate = (inputDate) => {
    const dateParts = inputDate.split("-");
    return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`; // dd/mm/yyyy
  };

  // Populate form fields if editing an existing task
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDate(task.date.split("/").reverse().join("-")); // Convert dd/mm/yyyy to yyyy-mm-dd
      setStatus(task.status);
      setPriority(task.priority);
    }
  }, [task]);

  const handleSave = () => {
    if (title && date && status && priority) {
      const updatedTask = {
        ...task,
        title,
        description,
        date: formatDate(date), // Convert date to dd/mm/yyyy format
        status,
        priority
      };
      onSave(updatedTask);
      onClose(); // Close the modal after saving the task
    } else {
      alert("Please fill out all required fields!");
    }
  };

  const handleCreate = () => {
    if (title && date && status && priority) {
      const newTask = {
        id: Date.now(), // Generate a unique ID
        title,
        description,
        date: formatDate(date), // Convert date to dd/mm/yyyy format
        status,
        priority
      };
      onCreate(newTask);
      onClose(); // Close the modal after creating the task
    } else {
      alert("Please fill out all required fields!");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <header>
          <h2>{task ? "Edit Task" : "Create New Task"}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </header>
        <div className="modal-content">
          <div className="input-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="date">Select Date *</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="status">Status *</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="" disabled>Select here</option>
              <option value="todo">To Do</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="priority">Priority *</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            >
              <option value="" disabled>Select here</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <footer>
          <button className="cancel-button" onClick={onClose}>Cancel</button>
          <button 
            className="save-button" 
            onClick={task ? handleSave : handleCreate}
          >
            {task ? "Save" : "Create"}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default TaskModal;
