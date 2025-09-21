🔗 **Live Demo:** [View on Vercel](https://creative-upaay-dashboard-design.vercel.app/)

📌 React Kanban Board Dashboard

    A modern Kanban board style task management dashboard built with React, Redux Toolkit, Tailwind CSS, and react-beautiful-dnd.
    
    This app helps teams and individuals manage tasks visually by allowing them to create, update, delete, filter, and drag & drop tasks across different workflow stages like To Do, In Progress, and Done.

✨ Features

✅ Task Management (CRUD)

    Create, read, update, and delete tasks with details like:
    
    Title & description
    
    Priority (Low / Medium / High)
    
    Category (e.g., Design, Development)
    
    Assignee
    
    Due date

🎯 Drag & Drop

    Reorder tasks inside a column or move them across columns with react-beautiful-dnd.

🖼️ Interactive Modals

    Clean modals for adding, editing, and deleting tasks (with confirmation).

🔍 Filtering & Sorting

    Filter tasks by priority, assignee, or due date for quick task management.

🌗 Light/Dark Mode

    Responsive UI theme switch for better accessibility.

📱 Responsive Design

    Works smoothly across desktop and mobile screens.

🎨 Clean Visuals

    lucide-react icons for intuitive UI cues.

📂 Project Structure

    creative-upaay-dashboard/
    │
    ├── public/
    │   └── index.html                # HTML entry point
    │
    ├── src/
    │   ├── components/              # React components
    │   │   ├── Layout/
    │   │   │   ├── Header.jsx
    │   │   │   ├── Sidebar.jsx
    │   │   │   └── ThoughtsTimer.jsx
    │   │   ├── Modals/
    │   │   │   ├── AddTaskModal.jsx
    │   │   │   ├── EditTaskModal.jsx
    │   │   │   └── DeleteTaskModal.jsx
    │   │   ├── Filters/
    │   │   │   └── FilterBar.jsx
    │   │   ├── TaskCard.jsx
    │   │   ├── Column.jsx
    │   │   ├── KanbanBoard.jsx
    │   │   └── Badge.jsx
    │   │
    │   ├── redux/                   # Redux state management
    │   │    ├── slices/
    │   │    │    ├── tasksSlice.js
    │   │    │    ├── filtersSlice.js
    │   │    │    ├── projectsSlice.js
    │   │    │    └── themeSlice.js
    │   │    └── store.js
    │   │
    │   ├── styles/                  
    │   │    ├── globals.css         # Global CSS styles
    │   │    └── tailwind.config.js  # Tailwind CSS configuration
    │   │
    │   ├── helpers.js               # Utility helper functions
    │   ├── constants.js             # Constants for priorities, statuses, etc.
    │   ├── App.js                   # Main App component
    │   ├── index.js                 # React rendering entry point
    │   └── vite-env.d.ts            # Vite TypeScript environment types (if using TypeScript)
    │
    ├── package.json                 # Project dependencies and scripts
    ├── package-lock.json            # Dependency lock file
    └── README.md                   # Project documentation


🔧 Usage

    ➕ Add a task by clicking the “+” button in a column

    ✏️ Edit or ❌ delete tasks from the dropdown menu on task cards

    🖱️ Drag tasks across columns or reorder within a column

    🔎 Filter tasks using the filter bar

📅 Due date badges:

    🔴 Overdue

    🟡 Today

    🟢 Upcoming

📦 Key Dependencies

    React 18+ – Frontend framework

    Redux Toolkit – State management

    react-beautiful-dnd – Drag & drop interactions

    lucide-react – Icon set

    Tailwind CSS – Utility-first styling
