import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { AdminPanel } from './components/admin/AdminPanel';
import { Sidebar } from './components/SideBar';
import { KanbanBoard } from './components/KanbanBoard';

function App() {
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  return (

    // <Provider store={store}>
    //   <Router>
    //     <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
    //       <Routes>
    //         {/* Public Routes */}
    //         <Route path="/login" element={<LoginScreen />} />
    //         <Route path="/register" element={<RegisterScreen />} />

    //         {/* Protected Routes */}
    //         <Route path="/dashboard" element={
    //           <ProtectedRoute>
    //             <MainLayout>
    //               <DashboardScreen />
    //             </MainLayout>
    //           </ProtectedRoute>
    //         } />

    //         <Route path="/projects" element={
    //           <ProtectedRoute>
    //             <MainLayout>
    //               <TaskBoard />
    //             </MainLayout>
    //           </ProtectedRoute>
    //         } />

    //         <Route path="/teams" element={
    //           <ProtectedRoute>
    //             <MainLayout>
    //               <TeamsScreen />
    //             </MainLayout>
    //           </ProtectedRoute>
    //         } />

    //         {/* Admin-only Routes */}
    //         <Route path="/admin/register-user" element={
    //           <ProtectedRoute>
    //             <MainLayout>
    //               <RegisterUserScreen />
    //             </MainLayout>
    //           </ProtectedRoute>
    //         } />

    //         <Route path="/admin/users" element={
    //           <ProtectedRoute>
    //             <MainLayout>
    //               <UsersListScreen />
    //             </MainLayout>
    //           </ProtectedRoute>
    //         } />

    //         {/* Default redirect */}
    //         <Route path="/" element={<Navigate to="/dashboard" replace />} />

    //         {/* Fallback route */}
    //         <Route path="*" element={<Navigate to="/dashboard" replace />} />
    //       </Routes>
    //     </div>
    //   </Router>
    // </Provider>

<AppProvider>
      <div className="flex h-screen bg-gray-50 font-sans">
        <Sidebar onOpenAdminPanel={() => setShowAdminPanel(true)} />
        <KanbanBoard onOpenAdminPanel={() => setShowAdminPanel(true)} />
      </div>
      {showAdminPanel && <AdminPanel onClose={() => setShowAdminPanel(false)} />}
    </AppProvider>
  );
};

export default App;