// src/redux/slices/tasksSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialTasks = [
  {
    id: '1',
    title: 'Design System',
    description: 'Create high-fidelity mobile mockups for the new app interface.',
    status: 'todo',
    priority: 'high',
    category: 'Design',
    assignee: 'Ritwik Shivankar',
    dueDate: '2024-12-25',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'API Integration',
    description: 'Integrate REST API endpoints for task management.',
    status: 'progress',
    priority: 'medium',
    category: 'Development',
    assignee: 'Rudra',
    dueDate: '2024-12-20',
    createdAt: '2024-01-16T09:30:00Z'
  },
  {
    id: '3',
    title: 'User Testing',
    description: 'Conduct user testing sessions for the new features.',
    status: 'done',
    priority: 'low',
    category: 'Research',
    assignee: 'R',
    dueDate: '2024-12-15',
    createdAt: '2024-01-17T14:15:00Z'
  }
];

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: initialTasks,
    loading: false,
    error: null,
  },
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now().toString(),
        ...action.payload,
        createdAt: new Date().toISOString(),
      };
      state.tasks.push(newTask);
    },
    updateTask: (state, action) => {
      const { id, updates } = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updates };
      }
    },
    moveTask: (state, action) => {
      const { taskId, newStatus } = action.payload;
      const task = state.tasks.find(task => task.id === taskId);
      if (task) {
        task.status = newStatus;
      }
    },
    deleteTask: (state, action) => {
      const taskId = action.payload;
      state.tasks = state.tasks.filter(task => task.id !== taskId);
    },
    reorderTasks: (state, action) => {
      const { sourceIndex, destinationIndex, sourceStatus } = action.payload;
      const tasksInStatus = state.tasks.filter(task => task.status === sourceStatus);
      const otherTasks = state.tasks.filter(task => task.status !== sourceStatus);
      const [movedTask] = tasksInStatus.splice(sourceIndex, 1);
      tasksInStatus.splice(destinationIndex, 0, movedTask);
      state.tasks = [...otherTasks, ...tasksInStatus];
    },
  },
});

export const { addTask, updateTask, moveTask, deleteTask, reorderTasks } = tasksSlice.actions;

export const selectTasks = (state) => state.tasks.tasks;
export const selectTasksByStatus = (status) => (state) =>
  state.tasks.tasks.filter(task => task.status === status);

export default tasksSlice.reducer;
