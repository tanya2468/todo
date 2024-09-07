import React from 'react';
import TaskCard from './TaskCard';

const TaskBoard = ({ tasks, updateTaskStatus }) => {
  return (
    <div className="task-board">
      {Object.keys(tasks).map(status => (
        <div key={status} className="task-column">
          <h2>{status.charAt(0).toUpperCase() + status.slice(1)}</h2>
          {tasks[status].map(task => (
            <TaskCard
              key={task.id}
              task={task}
              updateTaskStatus={updateTaskStatus} // Ensure this is passed
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TaskBoard;
