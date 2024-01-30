import axios from 'axios';

const LoginService = async (email, pass) => {
  // Verificar si el correo electrónico y la contraseña están presentes
  if (!email || !pass) {
    throw new Error('El correo electrónico y la contraseña son obligatorios');
  }

  try {
    const response = await axios.post('http://localhost:3001/api/auth/login', { email, pass });

    // Verificar si la respuesta contiene un token válido
    if (response && response.data && response.data.token) {
      return response.data.token;
    } else {
      throw new Error('Token no válido en la respuesta');
    }
  } catch (error) {
    // Manejo de errores de Axios
    console.error('Error en LoginService:', error);

    // Verificar si la respuesta contiene un mensaje de error personalizado
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      // Si no hay un mensaje de error personalizado, lanzar un error genérico
      throw new Error('Error interno del servidor');
    }
  }
};

export default LoginService;
