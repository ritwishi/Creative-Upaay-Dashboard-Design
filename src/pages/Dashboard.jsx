import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import KanbanBoard from '../components/Board/KanbanBoard';
import FilterBar from '../components/Filters/FilterBar';
import AddTaskModal from '../components/Modals/AddTaskModal';
import { selectSidebarCollapsed } from '../redux/slices/themeSlice';

const Dashboard = () => {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState('todo');
  const sidebarCollapsed = useSelector(selectSidebarCollapsed);

  const openAddTaskModal = (status = 'todo') => {
    setSelectedColumn(status);
    setIsAddTaskModalOpen(true);
  };

  const closeAddTaskModal = () => {
    setIsAddTaskModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        sidebarCollapsed ? 'ml-0' : 'ml-64'
      }`}>
        <Header onAddTask={() => openAddTaskModal()} />
        
        <main className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col">
            <FilterBar />
            <div className="flex-1 overflow-auto p-6">
              <KanbanBoard onAddTask={openAddTaskModal} />
            </div>
          </div>
        </main>
      </div>

      {/* Add Task Modal */}
      {isAddTaskModalOpen && (
        <AddTaskModal
          isOpen={isAddTaskModalOpen}
          onClose={closeAddTaskModal}
          initialStatus={selectedColumn}
        />
      )}
    </div>
  );
};

export default Dashboard;