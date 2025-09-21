import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import Column from './Column';
import { reorderTasks, moveTask } from '../../redux/slices/tasksSlice';
import { selectTasks } from '../../redux/slices/tasksSlice';
import { selectFilters } from '../../redux/slices/filtersSlice';

const KanbanBoard = ({ onAddTask }) => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const filters = useSelector(selectFilters);

  const getFilteredTasks = (status) => {
    let filteredTasks = tasks.filter(t => t.status === status);

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filteredTasks = filteredTasks.filter(t =>
        t.title.toLowerCase().includes(query) || t.description.toLowerCase().includes(query)
      );
    }

    if (filters.selectedCategory !== 'all') {
      filteredTasks = filteredTasks.filter(t => t.category === filters.selectedCategory);
    }

    if (filters.selectedPriority !== 'all') {
      filteredTasks = filteredTasks.filter(t => t.priority === filters.selectedPriority);
    }

    if (filters.selectedAssignee !== 'all') {
      filteredTasks = filteredTasks.filter(t => t.assignee === filters.selectedAssignee);
    }

    if (filters.dueDateFilter !== 'all') {
      const today = new Date().toISOString().split('T')[0];
      filteredTasks = filteredTasks.filter(t => {
        if (!t.dueDate) return filters.dueDateFilter === 'all';
        const dueDateISO = t.dueDate;
        switch (filters.dueDateFilter) {
          case 'today': return dueDateISO === today;
          case 'upcoming': return dueDateISO > today;
          case 'overdue': return dueDateISO < today;
          default: return true;
        }
      });
    }

    // Sorting
    filteredTasks.sort((a, b) => {
      let aVal = a[filters.sortBy];
      let bVal = b[filters.sortBy];

      if (filters.sortBy === 'priority') {
        const ord = { high: 3, medium: 2, low: 1 };
        aVal = ord[a.priority] || 0;
        bVal = ord[b.priority] || 0;
      }

      if (filters.sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return filteredTasks;
  };

  const columns = [
    { id: 'todo', title: 'To Do', tasks: getFilteredTasks('todo') },
    { id: 'progress', title: 'In Progress', tasks: getFilteredTasks('progress') },
    { id: 'done', title: 'Done', tasks: getFilteredTasks('done') },
  ];

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      dispatch(reorderTasks({
        sourceIndex: source.index,
        destinationIndex: destination.index,
        sourceStatus: source.droppableId,
        destinationStatus: destination.droppableId,
      }));
    } else {
      dispatch(moveTask({
        taskId: draggableId,
        newStatus: destination.droppableId,
        destinationIndex: destination.index,
      }));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-6 h-full overflow-x-auto pb-6">
        {columns.map(column => (
          <Column
            key={column.id}
            column={column}
            onAddTask={() => onAddTask(column.id)}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;