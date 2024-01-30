import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './views/Dashboard/Dashboard';
import Pacientes from './views/Pacientes/Pacientes';
import Usuarios from './views/Usuarios/Usuarios';
import HistorialClinico from './views/Historias/HistorialClinico';
import Citas from './views/Citas/Citas';
import Swal from 'sweetalert2';

const App = () => {
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'token') {
        if (!event.newValue) {
          // Mostrar una alerta si el token se elimina del almacenamiento local
          Swal.fire({
            icon: 'warning',
            title: 'Sesión expirada',
            text: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
            showConfirmButton: false,
            footer: '<a href="/login">Ir a Login</a>'
          });
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/historias" element={<HistorialClinico />} />
        <Route path="/citas" element={<Citas />} />
      </Routes>
    </Router>
  );
};

export default App;
