import React, { useState } from "react";
import TaskModal from "./TaskModal";

const EditTaskModal = ({ tasks, onClose, onSave }) => {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleEditClick = (task) => {
    setSelectedTask(task);
  };

  return (
    <div className="edit-task-modal">
      {selectedTask ? (
        <TaskModal
          task={selectedTask}
          onClose={onClose}
          onSave={onSave}
        />
      ) : (
        <div>
          <h2>Select a task to edit</h2>
          {Object.keys(tasks).map((status) =>
            tasks[status].map((task) => (
              <div key={task.id}>
                <button onClick={() => handleEditClick(task)}>
                  {task.title}
                </button>
              </div>
            ))
          )}
          <button onClick={onClose}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default EditTaskModal;
