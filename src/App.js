import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Dashboard from './pages/Dashboard';
import { selectIsDarkMode } from './redux/slices/themeSlice';

function App() {
  const isDarkMode = useSelector(selectIsDarkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    // Apply dark mode class on mount
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <div className={`App min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'
    }`}>
      <Dashboard />
    </div>
  );
}

export default App;