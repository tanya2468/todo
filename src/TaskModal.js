import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { addDoc, collection, updateDoc, doc } from "@firebase/firestore";
import "./TaskModal.css";

const TaskModal = ({ task, onClose, onCreate, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const tasksCollection = collection(db, "tasks");

  const formatDate = (inputDate) => {
    const dateParts = inputDate.split("-");
    return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
  };

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDate(task.date.split("/").reverse().join("-"));
      setStatus(task.status);
      setPriority(task.priority);
    }
  }, [task]);

  const isFormValid = () => {
    return title && date && status && priority;
  };

  const handleCreate = async () => {
    if (!isFormValid()) {
      alert("Please fill out all required fields!");
      return;
    }

    setIsLoading(true);

    const newTask = {
      title,
      description,
      date: formatDate(date),
      status,
      priority,
    };

    try {
      const docRef = await addDoc(tasksCollection, newTask);
      onCreate({ ...newTask, id: docRef.id });
      onClose();
    } catch (error) {
      console.error("Error creating task:", error);
      alert("An error occurred while creating the task. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (isFormValid()) {
      const updatedTask = {
        ...task,
        title,
        description,
        date: formatDate(date),
        status,
        priority,
      };

      try {
        await updateDoc(doc(db, "tasks", task.id), updatedTask);
        onSave(updatedTask);
        onClose();
      } catch (error) {
        console.error("Error saving task:", error);
        alert("An error occurred while saving the task. Please try again.");
      }
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
          <button className="cancel-button" onClick={onClose} disabled={isLoading}>
            Cancel
          </button>
          <button
            className="save-button"
            onClick={task ? handleSave : handleCreate}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : task ? "Save" : "Create"}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default TaskModal;
