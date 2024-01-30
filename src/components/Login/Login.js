import React, { useState, useEffect } from "react";
import LoginService from "./LoginService";
import logo from '../../assets/logo.png';
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
      // Si hay una sesión activa y estamos en la página de inicio de sesión, mostrar la alerta de sesión activa
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
        navigate('/'); // Redirigir al dashboard si el usuario confirma
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Validación básica del formato de correo electrónico
      if (!isValidEmail(email)) {
        Swal.fire({
          icon: 'error',
          title: 'Error de validación',
          text: 'Ingrese un correo electrónico válido'
        });
        return;
      }

      const token = await LoginService(email, password);
      // Almacenar el token en localStorage o en un estado global
      localStorage.setItem('token', token);
      // Indicar que se ha iniciado sesión
      localStorage.setItem('login-event', JSON.stringify({ loggedIn: true }));
      // Mostrar alerta de inicio de sesión
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
      timer: 1500 // Cerrar automáticamente después de 1.5 segundos
    }).then(() => {
      navigate('/'); // Redirigir al dashboard después de mostrar la alerta
    });
  };

  const isValidEmail = (email) => {
    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div>
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="app-logo" style={{ margin: "0 auto" }}>
            <img
              src={logo}
              alt="Logo de la aplicación"
              style={{ width: "150px", height: "auto" }}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
