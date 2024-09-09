// App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import TaskBoard from "./TaskBoard";
import TaskModal from "./TaskModal";
import Dashboard from "./components/Dashboard";
import EditTaskModal from "./EditTaskModal";
import DeleteTaskModal from "./DeleteTaskModal";
import { collection, getDocs, updateDoc, deleteDoc, doc, addDoc } from "@firebase/firestore"; // Import Firestore methods
import { db } from "./firebase"; // Firebase Firestore instance


function App() {
  const [tasks, setTasks] = useState({ todo: [], inProgress: [], completed: [] });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Fetch tasks from Firestore on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      const fetchedTasks = { todo: [], inProgress: [], completed: [] };

      querySnapshot.forEach((doc) => {
        const task = doc.data();
        fetchedTasks[task.status].push({ ...task, id: doc.id }); // Include doc.id
      });

      setTasks(fetchedTasks);
    };

    fetchTasks();
  }, []);

  // Function to handle adding a new task
  const addTask = async (newTask) => {
    try {
      const docRef = await addDoc(collection(db, "tasks"), newTask);
      setTasks(prevTasks => ({
        ...prevTasks,
        [newTask.status]: [...prevTasks[newTask.status], { ...newTask, id: docRef.id }]
      }));
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Function to update task status
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const taskRef = doc(db, "tasks", taskId);
      await updateDoc(taskRef, { status: newStatus });

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
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  // Function to delete a task
  const deleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));

      const updatedTasks = { ...tasks };
      Object.keys(updatedTasks).forEach((status) => {
        updatedTasks[status] = updatedTasks[status].filter((task) => task.id !== taskId);
      });
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Function to save an edited task
  const saveTask = async (editedTask) => {
    try {
      const taskRef = doc(db, "tasks", editedTask.id);
      await updateDoc(taskRef, editedTask);

      const updatedTasks = { ...tasks };
      updatedTasks[editedTask.status] = updatedTasks[editedTask.status].map(task =>
        task.id === editedTask.id ? editedTask : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return (
    <div className="app">
      <Dashboard onCreateTask={() => setIsCreateModalOpen(true)} />

      <TaskBoard 
        tasks={tasks} 
        updateTaskStatus={updateTaskStatus} 
      />

      <div className="task-actions">
        <button onClick={() => setIsEditModalOpen(true)}>Edit Task</button>
        <button onClick={() => setIsDeleteModalOpen(true)}>Delete Task</button>
      </div>

      {isCreateModalOpen && (
        <TaskModal 
          onClose={() => setIsCreateModalOpen(false)} 
          onCreate={addTask} 
        />
      )}

      {isEditModalOpen && (
        <EditTaskModal
          tasks={tasks}
          onClose={() => setIsEditModalOpen(false)}
          onSave={saveTask}
        />
      )}

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
