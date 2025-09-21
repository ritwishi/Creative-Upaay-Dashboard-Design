import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Home, 
  Calendar, 
  BarChart3, 
  Settings, 
  Users, 
  FolderOpen,
  Tag,
  Clock,
  X
} from 'lucide-react';
import { 
  toggleSidebar, 
  selectSidebarCollapsed, 
  selectIsDarkMode 
} from '../../redux/slices/themeSlice';
import { selectTasks } from '../../redux/slices/tasksSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const sidebarCollapsed = useSelector(selectSidebarCollapsed);
  const isDarkMode = useSelector(selectIsDarkMode);
  const tasks = useSelector(selectTasks);

  // Calculate statistics
  const stats = {
    total: tasks.length,
    categories: [...new Set(tasks.map(task => task.category))].length,
    completed: tasks.filter(task => task.status === 'done').length,
    pending: tasks.filter(task => task.status !== 'done').length,
  };

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      active: true,
      count: stats.total,
    },
    {
      id: 'calendar',
      label: 'Calendar',
      icon: Calendar,
      active: false,
      count: null,
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      active: false,
      count: null,
    },
    {
      id: 'team',
      label: 'Team',
      icon: Users,
      active: false,
      count: 3,
    },
  ];

  const projectItems = [
    {
      id: 'work',
      label: 'Work Projects',
      icon: FolderOpen,
      color: 'blue',
      count: tasks.filter(task => task.category === 'Work').length,
    },
    {
      id: 'personal',
      label: 'Personal',
      icon: Tag,
      color: 'green',
      count: tasks.filter(task => task.category === 'Personal').length,
    },
    {
      id: 'development',
      label: 'Development',
      icon: FolderOpen,
      color: 'purple',
      count: tasks.filter(task => task.category === 'Development').length,
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {!sidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-30 lg:hidden"
          onClick={() => dispatch(toggleSidebar())}
        />
      )}

      {/* Sidebar */}
      <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''} 
        bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700`}>
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg 
              flex items-center justify-center">
              <span className="text-white font-bold text-sm">CU</span>
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white text-sm">
                Creative Upaay
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Task Manager
              </p>
            </div>
          </div>
          
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="lg:hidden p-1 rounded text-gray-400 hover:text-gray-600 
              dark:hover:text-gray-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Main Navigation */}
          <nav className="space-y-1">
            <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase 
              tracking-wide mb-3">
              Navigation
            </div>
            
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  className={`sidebar-nav-item w-full ${item.active ? 'active' : ''}`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {item.count !== null && (
                    <span className="ml-auto px-2 py-0.5 text-xs rounded-full 
                      bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Projects Section */}
          <div className="mt-8">
            <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase 
              tracking-wide mb-3">
              Projects
            </div>
            
            <div className="space-y-1">
              {projectItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    className="sidebar-nav-item w-full"
                  >
                    <IconComponent className={`w-5 h-5 text-${item.color}-500`} />
                    <span className="font-medium">{item.label}</span>
                    {item.count > 0 && (
                      <span className="ml-auto px-2 py-0.5 text-xs rounded-full 
                        bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300">
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Quick Stats
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Total Tasks
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {stats.total}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Completed
                </span>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  {stats.completed}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Pending
                </span>
                <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                  {stats.pending}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>{stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%` 
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button className="sidebar-nav-item w-full">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </button>
          
          <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
            Version 1.0.0
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;