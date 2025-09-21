// src/components/TaskCard.jsx

import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import {
  Calendar,
  User,
  MessageSquare,
  Paperclip,
  MoreHorizontal,
  Edit3,
  Trash2,
  Flag,
} from 'lucide-react';
import { deleteTask, updateTask } from '../../redux/slices/tasksSlice';
import EditTaskModal from '../Modals/EditTaskModal';
import DeleteTaskModal from '../Modals/DeleteTaskModal';

const TaskCard = ({ task, index }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800';
      case 'medium':
        return 'text-orange-600 bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800';
      case 'low':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600';
    }
  };

  const getDueDateStatus = (dueDate) => {
    if (!dueDate) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    if (due < today) {
      return { status: 'overdue', color: 'text-red-600 dark:text-red-400' };
    } else if (due.getTime() === today.getTime()) {
      return { status: 'today', color: 'text-orange-600 dark:text-orange-400' };
    } else {
      return { status: 'upcoming', color: 'text-gray-600 dark:text-gray-400' };
    }
  };

  const dueDateStatus = getDueDateStatus(task.dueDate);

  // ✅ Fixed: now accepts id and does not use unwrap
  const handleDelete = async (id) => {
    setIsDeleting(true);
    try {
      dispatch(deleteTask(id));
      setIsDeleteModalOpen(false);
      setShowMenu(false);
    } catch (error) {
      console.error('Failed to delete task:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
    setShowMenu(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setShowMenu(false);
  };

  const handleStatusChange = (newStatus) => {
    dispatch(updateTask({
      id: task.id,
      updates: { status: newStatus }
    }));
    setShowMenu(false);
  };

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`task-card group relative mb-3 p-4 bg-white dark:bg-gray-700 rounded-lg 
              shadow-sm border border-gray-200 dark:border-gray-600 hover:shadow-md 
              transition-all duration-200 cursor-pointer
              ${snapshot.isDragging ? 'rotate-3 opacity-75 shadow-xl' : ''}
              ${snapshot.isDragging ? 'z-50' : 'z-10'}`}
            style={provided.draggableProps.style}
          >
            {/* Header with Priority and Menu */}
            <div className="flex items-start justify-between mb-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                <Flag className="w-3 h-3 inline mr-1" />
                {task.priority}
              </span>
              
              <div className="relative">
                <button
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(!showMenu);
                  }}
                  className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600
                    opacity-0 group-hover:opacity-100 transition-opacity z-20"
                  style={{ pointerEvents: 'all' }}
                >
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </button>

                {/* Dropdown Menu */}
                {showMenu && (
                  <div 
                    className="absolute right-0 top-8 w-48 bg-white dark:bg-gray-800 
                      rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 z-50"
                    onMouseDown={(e) => e.stopPropagation()}
                    style={{ pointerEvents: 'all' }}
                  >
                    <div className="py-1">
                      <button
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit();
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300
                          hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit Task
                      </button>
                      
                      <div className="border-t border-gray-200 dark:border-gray-600 my-1" />
                      
                      <div className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Move to
                      </div>
                      
                      {task.status !== 'todo' && (
                        <button
                          onMouseDown={(e) => e.stopPropagation()}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange('todo');
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300
                            hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          To Do
                        </button>
                      )}
                      
                      {task.status !== 'progress' && (
                        <button
                          onMouseDown={(e) => e.stopPropagation()}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange('progress');
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300
                            hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          In Progress
                        </button>
                      )}
                      
                      {task.status !== 'done' && (
                        <button
                          onMouseDown={(e) => e.stopPropagation()}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange('done');
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300
                            hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Done
                        </button>
                      )}
                      
                      <div className="border-t border-gray-200 dark:border-gray-600 my-1" />
                      
                      <button
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                          e.stopPropagation();
                          openDeleteModal();
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400
                          hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete Task
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Task Title */}
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
              {task.title}
            </h4>

            {/* Task Description */}
            {task.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">
                {task.description}
              </p>
            )}

            {/* Task Metadata */}
            <div className="space-y-2">
              {task.category && (
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  {task.category}
                </div>
              )}

              {task.dueDate && (
                <div className={`flex items-center gap-2 text-xs ${dueDateStatus?.color || 'text-gray-500 dark:text-gray-400'}`}>
                  <Calendar className="w-3 h-3" />
                  {new Date(task.dueDate).toLocaleDateString()}
                  {dueDateStatus?.status === 'overdue' && (
                    <span className="px-1 py-0.5 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded text-xs">
                      Overdue
                    </span>
                  )}
                  {dueDateStatus?.status === 'today' && (
                    <span className="px-1 py-0.5 bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded text-xs">
                      Today
                    </span>
                  )}
                </div>
              )}

              {task.assignee && (
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <User className="w-3 h-3" />
                  {task.assignee}
                </div>
              )}
            </div>

            {/* Footer with Actions */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-600">
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 
                  hover:text-gray-700 dark:hover:text-gray-300">
                  <MessageSquare className="w-3 h-3" />
                  <span>0</span>
                </button>
                
                <button className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 
                  hover:text-gray-700 dark:hover:text-gray-300">
                  <Paperclip className="w-3 h-3" />
                  <span>0</span>
                </button>
              </div>

              <span className="text-xs text-gray-400 dark:text-gray-500">
                {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        )}
      </Draggable>

      {/* Edit Task Modal */}
      {isEditModalOpen && (
        <EditTaskModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          task={task}
        />
      )}

      {/* Delete Task Modal */}
      <DeleteTaskModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        task={task}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />

      {/* Overlay to close menu */}
      {showMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowMenu(false)}
        />
      )}
    </>
  );
};

export default TaskCard;
