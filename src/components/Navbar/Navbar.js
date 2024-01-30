import React, { useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const user = {
    name: 'Sebas Joel',
  };

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isLoggedIn = !!token; // Verificar si el usuario está autenticado

    // Redirigir al usuario al inicio de sesión si no está autenticado
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    // Eliminar el token JWT al cerrar sesión
    localStorage.removeItem('token');
    // Redirigir al usuario al inicio de sesión o a la página de inicio
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white sticky-top">
      <div className="container-fluid">
        <div className="dropdown-container ms-auto">
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic" className="custom-toggle">
              {user.name}
              <img
                src="/images/profile/user.jpg"
                alt="Usuario"
                className="rounded-circle user-image"
              />
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-right">
              <Dropdown.Item onClick={handleLogout}>Cerrar Sesión</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
