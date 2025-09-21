import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Menu, 
  Plus, 
  Search, 
  Bell, 
  Sun, 
  Moon,
  Settings,
  User
} from 'lucide-react';
import { 
  toggleSidebar, 
  toggleTheme, 
  selectIsDarkMode, 
  selectSidebarCollapsed 
} from '../../redux/slices/themeSlice';
import { selectTasks } from '../../redux/slices/tasksSlice';

const Header = ({ onAddTask }) => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(selectIsDarkMode);
  const sidebarCollapsed = useSelector(selectSidebarCollapsed);
  const tasks = useSelector(selectTasks);

  // Calculate task statistics
  const taskStats = {
    total: tasks.length,
    todo: tasks.filter(task => task.status === 'todo').length,
    progress: tasks.filter(task => task.status === 'progress').length,
    done: tasks.filter(task => task.status === 'done').length,
    overdue: tasks.filter(task => {
      if (!task.dueDate) return false;
      return new Date(task.dueDate) < new Date().setHours(0, 0, 0, 0);
    }).length,
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 
      px-4 py-3 flex items-center justify-between">
      
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Sidebar Toggle */}
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 
            text-gray-600 dark:text-gray-400 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg 
            flex items-center justify-center">
            <span className="text-white font-bold text-sm">CU</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              Creative Upaay Dashboard
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Task Management System
            </p>
          </div>
        </div>
      </div>

      {/* Center Section - Task Stats */}
      <div className="hidden lg:flex items-center gap-6">
        <div className="flex items-center gap-4 px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {taskStats.total}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
          </div>
          
          <div className="w-px h-8 bg-gray-300 dark:bg-gray-600" />
          
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
              {taskStats.todo}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">To Do</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
              {taskStats.progress}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Progress</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold text-green-600 dark:text-green-400">
              {taskStats.done}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Done</div>
          </div>
          
          {taskStats.overdue > 0 && (
            <>
              <div className="w-px h-8 bg-gray-300 dark:bg-gray-600" />
              <div className="text-center">
                <div className="text-lg font-bold text-red-600 dark:text-red-400">
                  {taskStats.overdue}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Overdue</div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Add Task Button */}
        <button
          onClick={onAddTask}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg 
            transition-colors flex items-center gap-2 text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Task</span>
        </button>

        {/* Notifications */}
        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 
          text-gray-600 dark:text-gray-400 transition-colors relative">
          <Bell className="w-5 h-5" />
          {taskStats.overdue > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full 
              text-xs text-white flex items-center justify-center">
              {taskStats.overdue}
            </span>
          )}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => dispatch(toggleTheme())}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 
            text-gray-600 dark:text-gray-400 transition-colors"
          title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>

        {/* Settings */}
        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 
          text-gray-600 dark:text-gray-400 transition-colors">
          <Settings className="w-5 h-5" />
        </button>

        {/* User Profile */}
        <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 
          dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors">
          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full 
            flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="hidden md:inline text-sm font-medium text-gray-900 dark:text-white">
            Ritwik
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;