import './App.css'
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { lazy, Suspense } from 'react';
import NavBar from './components/NavBar';
import Protected from './components/Protected';
import AuthProvider from './context/AuthContext';
const HomePage = lazy(() => import('./pages/HomePage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();

  return (
    <main>
      <Router>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <NavBar />
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<Protected />} >
                  <Route path="/dashboard" element={<Dashboard />} />
                </Route>
              </Routes>
            </Suspense>
          </AuthProvider>
        </QueryClientProvider>
      </Router>
    </main>
  )
}

export default App
