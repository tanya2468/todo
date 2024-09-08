import React from "react";
import TaskCard from "./TaskCard";

const TaskBoard = ({ tasks, updateTaskStatus }) => {
  const handleDragOver = (e) => {
    e.preventDefault(); // Allow the drop by preventing the default behavior
  };

  const handleDrop = (e, newStatus) => {
    const taskId = e.dataTransfer.getData("taskId"); // Retrieve the task ID from the dragged item
    updateTaskStatus(Number(taskId), newStatus); // Update task status when dropped
  };

  return (
    <div className="task-board">
      {Object.keys(tasks).map((status) => (
        <div
          key={status}
          className="task-column"
          onDragOver={handleDragOver} // Allow the drop in this column
          onDrop={(e) => handleDrop(e, status)} // Handle dropping tasks into the appropriate column
        >
          <h2
            className={
              status === "todo"
                ? "purple"
                : status === "inProgress"
                ? "yellow"
                : "green"
            }
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </h2>
          {tasks[status].map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              updateTaskStatus={updateTaskStatus} // Pass down to TaskCard
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TaskBoard;