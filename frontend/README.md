# React + TypeScript + Vite

src/
├── api/ # API COMMUNICATION LAYER
│ ├── client.ts # Axios setup, interceptors (for handling JWT/tokens)
│ ├── auth.ts # Functions for /auth endpoints (login, register, logout)
│ ├── tasks.ts # Functions for /tasks and associated endpoints
│ └── ... # Other feature-specific API files (teams, projects)
|
├── components/ # REUSABLE UI ELEMENTS
│ ├── ui/ # Highly generic, presentational components (buttons, inputs, spinners)
│ │ ├── Button.tsx
│ │ ├── Modal.tsx
│ │ └── Input.tsx
│ └── shared/ # Components used across multiple features (e.g., UserAvatar)
|
├── features/ # BUSINESS LOGIC ORGANIZED BY DOMAIN (THE CORE OF THE APP)
│ ├── Auth/ # Authentication components and logic
│ │ ├── LoginScreen.tsx # The login screen
│ │ ├── RegisterScreen.tsx
│ │ └── AuthContext.tsx # (Or useAuth hook logic)
│ ├── Teams/
│ │ ├── TeamList.tsx
│ │ └── TeamInviteModal.tsx
│ ├── Projects/
│ │ ├── ProjectList.tsx
│ │ └── ProjectCreationForm.tsx
│ └── Tasks/
│ ├── TaskBoard.tsx # The main Kanban view (container)
│ ├── TaskColumn.tsx # Renders a single column (e.g., 'To Do')
│ ├── TaskCard.tsx # The draggable task item
│ └── TaskDetailsModal.tsx
|
├── hooks/ # CUSTOM REACT HOOKS
│ ├── useAuth.ts # Handles user session and token management
│ ├── useFetch.ts # General data fetching logic
│ └── useDebounce.ts
|
├── layouts/ # HIGH-LEVEL STRUCTURAL COMPONENTS
│ ├── Header.tsx # Top navigation and user profile
│ ├── Sidebar.tsx # Left navigation (teams/projects)
│ └── MainLayout.tsx # Combines Header and Sidebar to wrap the application view
|
├── store/ # GLOBAL STATE MANAGEMENT (Zustand)
│ └── useAppStore.ts # Central store for collections (ITask[], IProject[], currentUser)
|
├── types/ # TYPESCRIPT INTERFACES
│ └── models.ts # Core data types (IUser, ITask, IProject, ITeam, etc.)
|
├── App.tsx # Main component, containing routing logic (React Router setup)
└── index.tsx # Entry point for React application (ReactDOM.createRoot)









task-flow-pro/
├── src/
│   ├── api/    # For real-world API calls (e.g.FirebaseREST)
│   │   ├── tasks.ts
│   │   └── users.ts
│   │
│   ├── assets/                # Images, fonts, SVG icons
│   │
│   ├── components/
│   │   ├── common/    # Reusable UI elements (Buttons, Modals, Headers)
│   │   │   ├── Button.tsx
│   │   │   └── Modal.tsx
│   │   │
│   │   ├── tasks/             # Task-specific components
│   │   │   ├── TaskCard.tsx
│   │   │   ├── TaskColumn.tsx
│   │   │   ├── TaskCreationForm.tsx
│   │   │   └── TaskDetailModal.tsx
│   │   │
│   │   └── users/             # User/Auth components
│   │       ├── AssigneeDragTarget.tsx
│   │       └── UserSwitcher.tsx
│   │
│   ├── context/        # State management using React Context/Reducers
│   │   ├── AppContext.tsx     # Defines the Context and Provider
│   │   ├── appReducer.ts      # The centralized reducer logic
│   │   └── types.ts # Shared TypeScript interfaces
│   │
│   ├── hooks/  # Custom hooks (e.g., useAuth, useTasks, useRoleCheck)
│   │   └── useApp.ts # Custom hook to access AppContext 
│   │
│   ├── layouts/    # High-level page structures (Sidebar, Main Content)
│   │   └── MainLayout.tsx
│   │
│   ├── pages/                 # Components tied to specific routes/views
│   │   ├── KanbanBoardPage.tsx # The main application view
│   │   └── AdminPanelPage.tsx  # Protected route for user CRUD
│   │
│   ├── utils/    # General utility functions 
│   │   └── helpers.ts
│   │
│   ├── App.tsx    # Root component 
│   └── index.tsx              # Entry point
│
└── package.json