
import { Task } from '../types/Task';

export const addTask = (tasks: Task[], newTask: Task) => [...tasks, newTask];

export const editTask = (tasks: Task[], updatedTask: Task) =>
  tasks.map(task => (task.id === updatedTask.id ? updatedTask : task));

export const deleteTask = (tasks: Task[], taskId: number) =>
  tasks.filter(task => task.id !== taskId);

export const toggleTaskCompletion = (tasks: Task[], taskId: number) =>
  tasks.map(task => (task.id === taskId ? { ...task, completed: !task.completed } : task));

export const sortTasksByPriority = (tasks: Task[]) => {
  const priorityOrder = { high: 1, medium: 2, low: 3 };
  return [...tasks].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
};
