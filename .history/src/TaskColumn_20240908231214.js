import React from "react";
import TaskCard from "./TaskCard";

const taskClasses = {
  Todo11: "todo",
  InProgress: "in-progress",
  Completed: "completed",
};

const TaskColumn = ({ type, tasks }) => {
  const headingClass = taskClasses[type] || "";

  return (
    <div className="task-column">
      <h2 className={headingClass}>{type}</h2>
      {tasks.length > 0 ? (
        tasks.map((task) => <TaskCard key={task.id} task={task} />)
      ) : (
        <p>No tasks available</p>
      )}
    </div>
  );
};

export default TaskColumn;