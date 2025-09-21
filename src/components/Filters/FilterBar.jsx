import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search, Filter, X, Calendar, User, Flag } from 'lucide-react';
import {
  setSearchQuery,
  setSelectedCategory,
  setSelectedPriority,
  setSelectedAssignee,
  setDueDateFilter,
  setSortBy,
  setSortOrder,
  clearAllFilters,
  selectFilters,
} from '../../redux/slices/filtersSlice';

const FilterBar = () => {
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();

  const categories = ['all', 'Work', 'Personal', 'Development', 'Research', 'Design', 'Urgent'];
  const priorities = ['all', 'high', 'medium', 'low'];
  const assignees = ['all', 'Ritwik Shivankar', 'Rudra', 'Ridhi'];
  const dueDateFilters = [
    { value: 'all', label: 'All Dates' },
    { value: 'today', label: 'Due Today' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'overdue', label: 'Overdue' },
  ];
  const sortOptions = [
    { value: 'createdAt', label: 'Created Date' },
    { value: 'dueDate', label: 'Due Date' },
    { value: 'priority', label: 'Priority' },
    { value: 'title', label: 'Title' },
  ];

  const hasActiveFilters = filters.searchQuery || 
    filters.selectedCategory !== 'all' || 
    filters.selectedPriority !== 'all' || 
    filters.selectedAssignee !== 'all' || 
    filters.dueDateFilter !== 'all';

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={filters.searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
              focus:ring-2 focus:ring-blue-500 focus:border-transparent
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap gap-3">
          {/* Category Filter */}
          <select
            value={filters.selectedCategory}
            onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white
              focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>

          {/* Priority Filter */}
          <select
            value={filters.selectedPriority}
            onChange={(e) => dispatch(setSelectedPriority(e.target.value))}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white
              focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {priorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority === 'all' ? 'All Priorities' : priority.charAt(0).toUpperCase() + priority.slice(1)}
              </option>
            ))}
          </select>

          {/* Assignee Filter */}
          <select
            value={filters.selectedAssignee}
            onChange={(e) => dispatch(setSelectedAssignee(e.target.value))}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white
              focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {assignees.map((assignee) => (
              <option key={assignee} value={assignee}>
                {assignee === 'all' ? 'All Assignees' : assignee}
              </option>
            ))}
          </select>

          {/* Due Date Filter */}
          <select
            value={filters.dueDateFilter}
            onChange={(e) => dispatch(setDueDateFilter(e.target.value))}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white
              focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {dueDateFilters.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>

          {/* Sort Options */}
          <select
            value={filters.sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value))}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white
              focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                Sort by {option.label}
              </option>
            ))}
          </select>

          {/* Sort Order */}
          <button
            onClick={() => dispatch(setSortOrder(filters.sortOrder === 'asc' ? 'desc' : 'asc'))}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white
              hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            title={`Sort ${filters.sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
          >
            {filters.sortOrder === 'asc' ? '↑' : '↓'}
          </button>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={() => dispatch(clearAllFilters())}
              className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 
                transition-colors flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-3 flex flex-wrap gap-2">
          {filters.searchQuery && (
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 
              rounded-full text-xs flex items-center gap-1">
              Search: "{filters.searchQuery}"
              <button
                onClick={() => dispatch(setSearchQuery(''))}
                className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          
          {filters.selectedCategory !== 'all' && (
            <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 
              rounded-full text-xs flex items-center gap-1">
              Category: {filters.selectedCategory}
              <button
                onClick={() => dispatch(setSelectedCategory('all'))}
                className="hover:bg-green-200 dark:hover:bg-green-800 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          
          {filters.selectedPriority !== 'all' && (
            <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 
              rounded-full text-xs flex items-center gap-1">
              Priority: {filters.selectedPriority}
              <button
                onClick={() => dispatch(setSelectedPriority('all'))}
                className="hover:bg-orange-200 dark:hover:bg-orange-800 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterBar;