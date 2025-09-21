// src/components/Modals/DeleteTaskModal.jsx
import React from 'react';
import { X, AlertTriangle, Trash2 } from 'lucide-react';

const DeleteTaskModal = ({ isOpen, onClose, task, onConfirm, isDeleting = false }) => {
  if (!isOpen || !task) return null;

  const handleDelete = () => {
  onConfirm(task.id);
};

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Delete Task
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            disabled={isDeleting}
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Are you sure you want to delete this task? This action cannot be undone.
          </p>
          
          {/* Task Preview */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">
              {task.title}
            </h4>
            {task.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {task.description}
              </p>
            )}
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
              <span className={`px-2 py-1 rounded-full text-xs font-medium
                ${task.priority === 'high' ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' :
                  task.priority === 'medium' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400' :
                  'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400'}`}>
                {task.priority} priority
              </span>
              {task.category && (
                <span>{task.category}</span>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750 rounded-b-lg">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
              hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 
              hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 
              rounded-lg transition-colors flex items-center gap-2
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Delete Task
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskModal;
