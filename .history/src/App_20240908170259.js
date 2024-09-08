import React, { useState } from "react";
import "./App.css";
import TaskBoard from "./TaskBoard";
import TaskModal from "./TaskModal";
import Dashboard from "./components/Dashboard";
import EditTaskModal from "./EditTaskModal"; // Import the new edit modal component
import DeleteTaskModal from "./DeleteTaskModal"; // Import the new delete modal component

const initialTasks = {
  todo: [
    {
      id: 1,
      title: "Brainstorming",
      description: "Brainstorming brings team members' diverse experience into play.",
      priority: "High",
      <br>
      date: "18/09/2024",
      status: "todo"
    },
    {
      id: 2,
      title: "Wireframes",
      description: "Low fidelity wireframes include the most basic content and visuals.",
      priority: "High",
      date: "18/09/2024",
      status: "todo"
    }
  ],
  inProgress: [
    {
      id: 3,
      title: "Onboarding Illustrations",
      description: "",
      priority: "Low",
      date: "18/10/2024",
      status: "inProgress"
    }
  ],
  completed: [
    {
      id: 4,
      title: "Design System",
      description: "It just needs to adapt the UI from what you did before.",
      priority: "Medium",
      date: "12/10/2024",
      status: "completed"
    }
  ]
};

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Function to handle adding a new task
  const addTask = (newTask) => {
    setTasks(prevTasks => ({
      ...prevTasks,
      [newTask.status]: [...prevTasks[newTask.status], newTask]
    }));
  };

  const updateTaskStatus = (taskId, newStatus) => {
    const updatedTasks = { todo: [], inProgress: [], completed: [] };

    Object.keys(tasks).forEach(status => {
      tasks[status].forEach(task => {
        if (task.id === taskId) {
          task.status = newStatus;
          updatedTasks[newStatus].push(task);
        } else {
          updatedTasks[task.status].push(task);
        }
      });
    });

    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = { ...tasks };
    Object.keys(updatedTasks).forEach((status) => {
      updatedTasks[status] = updatedTasks[status].filter((task) => task.id !== taskId);
    });
    setTasks(updatedTasks);
  };

  const saveTask = (editedTask) => {
    const updatedTasks = { ...tasks };
    updatedTasks[editedTask.status] = updatedTasks[editedTask.status].map(task =>
      task.id === editedTask.id ? editedTask : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="app">
      
      {/* Dashboard component contains the logo, title, and create task button */}
      <Dashboard onCreateTask={() => setIsCreateModalOpen(true)} />

      {/* TaskBoard displays the tasks */}
      <TaskBoard 
        tasks={tasks} 
        updateTaskStatus={updateTaskStatus} 
      />

      {/* Buttons to trigger the edit and delete modals */}
      <div className="task-actions">
        <button onClick={() => setIsEditModalOpen(true)}>Edit Task</button>
        <button onClick={() => setIsDeleteModalOpen(true)}>Delete Task</button>
      </div>

      {/* Modal for creating new tasks */}
      {isCreateModalOpen && (
        <TaskModal 
          onClose={() => setIsCreateModalOpen(false)} 
          onCreate={addTask} 
        />
      )}

      {/* Modal for editing tasks */}
      {isEditModalOpen && (
        <EditTaskModal
          tasks={tasks}
          onClose={() => setIsEditModalOpen(false)}
          onSave={saveTask}
        />
      )}

      {/* Modal for deleting tasks */}
      {isDeleteModalOpen && (
        <DeleteTaskModal
          tasks={tasks}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={deleteTask}
        />
      )}
    </div>
  );
}

export default App;
