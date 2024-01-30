import React, { useState, useEffect } from "react";
import LoginService from "./LoginService";
import "./Login.css";
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('token');
    const isLoginPage = location.pathname === '/login';
    if (isLoggedIn && isLoginPage) {
      showSessionAlert();
    }
  }, [location]);

  const showSessionAlert = () => {
    Swal.fire({
      icon: 'info',
      title: 'Sesión activa',
      text: 'Ya tienes una sesión activa. Por favor, cierra sesión antes de intentar acceder nuevamente.',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Ir al dashboard'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/');
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!isValidEmail(email)) {
        Swal.fire({
          icon: 'error',
          title: 'Error de validación',
          text: 'Ingrese un correo electrónico válido'
        });
        return;
      }

      const token = await LoginService(email, password);
      localStorage.setItem('token', token);
      localStorage.setItem('login-event', JSON.stringify({ loggedIn: true }));
      showLoginAlert();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error de inicio de sesión',
        text: error.message
      });
    }
  };

  const showLoginAlert = () => {
    Swal.fire({
      icon: 'success',
      title: 'Inicio de sesión exitoso',
      text: '¡Bienvenido! Has iniciado sesión correctamente.',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      navigate('/');
    });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100" style={{ 
      backgroundImage: 'url("/images/logos/fondo.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed', 
    }}>     
    <div className="card p-4 rounded-3 shadow bg-light" style={{ width: "400px" }}>
        <div className="text-center mb-4">
          <img
            src="/images/logos/logo.png"
            alt="Logo de la aplicación"
            style={{ width: "150px", height: "auto" }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-block">Login</button>
      </div>
    </div>
  );
};

export default Login;
