"use client";

import { useState, useEffect } from 'react';
import { addTask, editTask, deleteTask, toggleTaskCompletion, sortTasksByPriority } from '../utils/taskUtils';
import { Task } from '../types/Task';

export default function Home() {
  const [taskList, setTaskList] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  
  const [newTask, setNewTask] = useState<{ title: string; description: string; priority: 'high' | 'medium' | 'low' }>({
    title: '',
    description: '',
    priority: 'medium',
  });
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Save tasks to localStorage whenever taskList changes
    localStorage.setItem('tasks', JSON.stringify(taskList));
  }, [taskList]);

  const handleAddTask = () => {
    const task: Task = { ...newTask, id: Date.now(), completed: false };
    setTaskList(prevTasks => [...prevTasks, task]);
    setNewTask({ title: '', description: '', priority: 'medium' });
  };

  const handleEditTask = (task: Task) => {
    setActiveTask(task);
    setNewTask({ title: task.title, description: task.description, priority: task.priority });
    setModalVisible(true);
  };

  const handleDeleteTask = (taskId: number) => {
    setTaskList(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const handleToggleCompletion = (taskId: number) => {
    setTaskList(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = taskList.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveEdit = () => {
    if (activeTask) {
      const updatedTask = { ...activeTask, description: newTask.description, priority: newTask.priority };
      setTaskList(prevTasks => prevTasks.map(task => (task.id === activeTask.id ? updatedTask : task)));
      setModalVisible(false);
      setActiveTask(null);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Task Manager</h1>

        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        {/* Add Task Form */}
        {!modalVisible && (
          <form onSubmit={(e) => { e.preventDefault(); handleAddTask(); }} className="mb-6">
            <input
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full p-4 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <textarea
              placeholder="Task Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full p-4 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as 'high' | 'medium' | 'low' })}
              className="w-full p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button type="submit" className="w-full p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              Add Task
            </button>
          </form>
        )}

        <ul className="space-y-4">
          {sortTasksByPriority(filteredTasks).map(task => (
            <li key={task.id} className={`flex justify-between items-center p-4 rounded-lg shadow ${task.completed ? 'bg-green-100' : 'bg-gray-100'} transition`}>
              <div className="flex items-center">
                <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  {task.title}
                </span>
                {task.priority === 'high' && (
                  <span className="px-2 py-0.5 text-xs text-white bg-red-500 rounded-full ml-2">High</span>
                )}
                {task.priority === 'medium' && (
                  <span className="px-2 py-0.5 text-xs text-white bg-yellow-500 rounded-full mx-2">Medium</span>
                )}
                {task.priority === 'low' && (
                  <span className="px-2 py-0.5 text-xs text-white bg-green-500 rounded-full">Low</span>
                )}
              </div>
              <div className="flex items-center ml-2">
                <button onClick={() => handleToggleCompletion(task.id)} className="mr-2 p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
                  {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
                </button>
                <button onClick={() => handleEditTask(task)} className="mr-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Edit</button>
                <button onClick={() => handleDeleteTask(task.id)} className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Delete</button>
              </div>
            </li>
          ))}
        </ul>

        {/* Edit Modal */}
        {modalVisible && activeTask && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
              <h2 className="text-xl font-bold mb-4">Edit Task</h2>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="w-full p-4 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="w-full p-4 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
              <div className="flex mb-4">
                <span
                  className={`cursor-pointer flex items-center justify-center px-2 py-0.5 rounded-full ${newTask.priority === 'high' ? 'bg-red-500' : 'bg-gray-300'} hover:bg-red-400 transition`}
                  onClick={() => setNewTask({ ...newTask, priority: 'high' })}
                >
                  <span className="text-xs text-white">High</span>
                </span>
                <span
                  className={`cursor-pointer flex items-center justify-center px-2 py-0.5 rounded-full ${newTask.priority === 'medium' ? 'bg-yellow-500' : 'bg-gray-300'} hover:bg-yellow-400 transition mx-2`}
                  onClick={() => setNewTask({ ...newTask, priority: 'medium' })}
                >
                  <span className="text-xs text-white">Medium</span>
                </span>
                <span
                  className={`cursor-pointer flex items-center justify-center px-2 py-0.5 rounded-full ${newTask.priority === 'low' ? 'bg-green-500' : 'bg-gray-300'} hover:bg-green-400 transition`}
                  onClick={() => setNewTask({ ...newTask, priority: 'low' })}
                >
                  <span className="text-xs text-white">Low</span>
                </span>
              </div>
              <div className="flex justify-end mt-4">
                <button onClick={() => setModalVisible(false)} className="mr-2 p-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition">Cancel</button>
                <button onClick={handleSaveEdit} className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Save</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
