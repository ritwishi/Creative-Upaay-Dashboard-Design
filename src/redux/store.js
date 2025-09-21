// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasksSlice';
import projectsReducer from './slices/projectsSlice';
import filtersReducer from './slices/filtersSlice';
import themeReducer from './slices/themeSlice';

// Load state from localStorage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('creativeUpaayState');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (error) {
    console.warn('Failed to load state from localStorage:', error);
    return undefined;
  }
};

// Save state to localStorage
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('creativeUpaayState', serializedState);
  } catch (error) {
    console.warn('Failed to save state to localStorage:', error);
  }
};

// Create store with loaded state
const preloadedState = loadFromLocalStorage();

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    projects: projectsReducer,
    filters: filtersReducer,
    theme: themeReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;