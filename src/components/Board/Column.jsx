import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Plus } from 'lucide-react';
import TaskCard from './TaskCard';

const Column = ({ column, onAddTask }) => {
  const { id, title, tasks, color, count } = column;

  const getColumnStyles = (color) => {
    const styles = {
      purple: 'border-purple-500 bg-purple-50 dark:bg-purple-900/20',
      orange: 'border-orange-500 bg-orange-50 dark:bg-orange-900/20',
      green: 'border-green-500 bg-green-50 dark:bg-green-900/20',
    };
    return styles[color] || styles.purple;
  };

  const getHeaderStyles = (color) => {
    const styles = {
      purple: 'text-purple-700 dark:text-purple-300',
      orange: 'text-orange-700 dark:text-orange-300',
      green: 'text-green-700 dark:text-green-300',
    };
    return styles[color] || styles.purple;
  };

  const getAddButtonStyles = (color) => {
    const styles = {
      purple: 'hover:bg-purple-100 dark:hover:bg-purple-800 text-purple-600 dark:text-purple-400',
      orange: 'hover:bg-orange-100 dark:hover:bg-orange-800 text-orange-600 dark:text-orange-400',
      green: 'hover:bg-green-100 dark:hover:bg-green-800 text-green-600 dark:text-green-400',
    };
    return styles[color] || styles.purple;
  };

  return (
    <div className={`kanban-column ${id} w-80 flex-shrink-0 rounded-lg border-t-4 ${getColumnStyles(color)} 
      dark:bg-gray-800 dark:border-gray-600`}>
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className={`font-semibold text-lg ${getHeaderStyles(color)}`}>
            {title}
          </h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium
            bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300`}>
            {count}
          </span>
        </div>
        
        <button
          onClick={onAddTask}
          className={`p-2 rounded-lg transition-colors ${getAddButtonStyles(color)}`}
          title={`Add task to ${title}`}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Droppable Area */}
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 min-h-[500px] transition-colors rounded-lg p-2
              ${snapshot.isDraggingOver ? 
                'bg-blue-50 dark:bg-blue-900/20 border-2 border-dashed border-blue-300 dark:border-blue-600' : 
                ''
              }`}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
              />
            ))}
            {provided.placeholder}

            {/* Empty State */}
            {tasks.length === 0 && (
              <div className="flex flex-col items-center justify-center h-40 text-gray-400 dark:text-gray-500">
                <Plus className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-sm text-center">
                  No tasks yet.<br />
                  <button 
                    onClick={onAddTask}
                    className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline mt-1"
                  >
                    Add your first task
                  </button>
                </p>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;