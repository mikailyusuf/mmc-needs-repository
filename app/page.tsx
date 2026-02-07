'use client';

import { useState } from 'react';
import LoginPage from '@/components/login-page';
import DashboardEnhanced from '@/components/dashboard-enhanced';
import ModuleEnhanced from '@/components/module-enhanced';

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
        <DashboardEnhanced role={userRole} onLogout={handleLogout} onNavigate={handleNavigate} />
      )}
      {appState === 'module' && <ModuleEnhanced moduleId={currentModule} onBack={handleBackToDashboard} />}
    </>
  );
}
