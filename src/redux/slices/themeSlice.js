import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: false,
  sidebarCollapsed: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      // Update document class for Tailwind dark mode
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', state.isDarkMode);
      }
    },
    
    setTheme: (state, action) => {
      state.isDarkMode = action.payload;
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', state.isDarkMode);
      }
    },
    
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    
    setSidebarCollapsed: (state, action) => {
      state.sidebarCollapsed = action.payload;
    },
  },
});

export const {
  toggleTheme,
  setTheme,
  toggleSidebar,
  setSidebarCollapsed,
} = themeSlice.actions;

export const selectIsDarkMode = (state) => state.theme.isDarkMode;
export const selectSidebarCollapsed = (state) => state.theme.sidebarCollapsed;

export default themeSlice.reducer;