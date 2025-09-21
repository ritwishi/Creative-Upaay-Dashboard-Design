import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchQuery: '',
  selectedCategory: 'all',
  selectedPriority: 'all',
  selectedAssignee: 'all',
  dueDateFilter: 'all', // all, upcoming, overdue, today
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => { state.searchQuery = action.payload; },
    setSelectedCategory: (state, action) => { state.selectedCategory = action.payload; },
    setSelectedPriority: (state, action) => { state.selectedPriority = action.payload; },
    setSelectedAssignee: (state, action) => { state.selectedAssignee = action.payload; },
    setDueDateFilter: (state, action) => { state.dueDateFilter = action.payload; },
    setSortBy: (state, action) => { state.sortBy = action.payload; },
    setSortOrder: (state, action) => { state.sortOrder = action.payload; },
    clearAllFilters: (state) => {
      state.searchQuery = '';
      state.selectedCategory = 'all';
      state.selectedPriority = 'all';
      state.selectedAssignee = 'all';
      state.dueDateFilter = 'all';
      state.sortBy = 'createdAt';
      state.sortOrder = 'desc';
    },
  },
});

export const {
  setSearchQuery,
  setSelectedCategory,
  setSelectedPriority,
  setSelectedAssignee,
  setDueDateFilter,
  setSortBy,
  setSortOrder,
  clearAllFilters,
} = filtersSlice.actions;

export const selectFilters = (state) => state.filters;

export default filtersSlice.reducer;
