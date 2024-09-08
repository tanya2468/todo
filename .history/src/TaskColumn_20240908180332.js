import React from "react";
import TaskCard from "./TaskCard";

const TaskColumn = ({ title, tasks }) => {
  return (
    <div className="task-column">
      <h2>{title}</h2>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
    
  );
};

export default TaskColumn;
