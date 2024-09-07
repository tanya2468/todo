import React from "react";

const DeleteTaskModal = ({ tasks, onClose, onDelete }) => {
  const handleDeleteClick = (taskId) => {
    onDelete(taskId); // Pass the selected task's ID to the parent component
    onClose(); // Close the modal after deletion
  };

  return (
    <div className="delete-task-modal">
      <h2>Select a task to delete</h2>
      {Object.keys(tasks).map((status) =>
        tasks[status].map((task) => (
          <div key={task.id}>
            <button onClick={() => handleDeleteClick(task.id)}>
              {task.title}
            </button>
          </div>
        ))
      )}
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default DeleteTaskModal;
