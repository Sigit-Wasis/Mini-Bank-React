// src/App.tsx
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login.tsx';
import Home from './pages/Home.tsx';
import type { JSX } from 'react/jsx-dev-runtime';

// Komponen ProtectedRoute sederhana
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirect ke login, simpan lokasi asal agar bisa kembali setelah login
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<Login />} />

      {/* Protected route */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* Redirect semua path lain ke home kalau sudah login, atau login kalau belum */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;