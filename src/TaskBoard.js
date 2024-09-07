import React from "react";
import TaskColumn from "./TaskColumn";

const TaskBoard = ({ tasks }) => {
  return (
    <div className="task-board">
      <TaskColumn title="TODO" tasks={tasks.todo} />
      <TaskColumn title="IN PROGRESS" tasks={tasks.inProgress} />
      <TaskColumn title="COMPLETED" tasks={tasks.completed} />
    </div>
  );
};

export default TaskBoard;
