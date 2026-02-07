'use client';

import { useState } from 'react';
import LoginPage from '@/components/login-page';
import DashboardPage from '@/components/dashboard-page';
import ModulePage from '@/components/module-page';

type AppState = 'login' | 'dashboard' | 'module';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('login');
  const [userRole, setUserRole] = useState<string>('');
  const [currentModule, setCurrentModule] = useState<string>('');

  const handleLogin = (role: string) => {
    setUserRole(role);
    setAppState('dashboard');
  };

  const handleLogout = () => {
    setUserRole('');
    setAppState('login');
    setCurrentModule('');
  };

  const handleNavigate = (module: string) => {
    setCurrentModule(module);
    setAppState('module');
  };

  const handleBackToDashboard = () => {
    setAppState('dashboard');
    setCurrentModule('');
  };

  return (
    <>
      {appState === 'login' && <LoginPage onLogin={handleLogin} />}
      {appState === 'dashboard' && (
        <DashboardPage role={userRole} onLogout={handleLogout} onNavigate={handleNavigate} />
      )}
      {appState === 'module' && <ModulePage moduleId={currentModule} onBack={handleBackToDashboard} />}
    </>
  );
}
