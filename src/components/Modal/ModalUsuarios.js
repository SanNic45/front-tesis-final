import React, { useState } from "react";
import "./Modal.css";
import { createUser } from "./serviceModalUsuarios"; // Importa la función createUser
import Swal from 'sweetalert2'; // Importa SweetAlert

const ModalUsuarios = ({ onClose, isOpen }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    correo: "",
    telefono: "",
    fechaNacimiento: "",
    rol: "", // Agregando el campo "rol"
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Validación para permitir solo números y limitar a 10 dígitos para cédula y teléfono
    if ((name === "cedula" || name === "telefono") && !/^\d{0,10}$/.test(value)) {
      return;
    }
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Crea un objeto con los datos del formulario
      const userData = {
        name: formData.nombre,
        lastname: formData.apellido,
        cedula: formData.cedula,
        date: formData.fechaNacimiento,
        email: formData.correo,
        celular: formData.telefono,
        pass: formData.password,
        rol: formData.rol // Incluyendo el campo "rol"
      };

      // Envía los datos del formulario al backend para crear un nuevo usuario
      await createUser(userData);
      Swal.fire({
        title: 'Usuario creado!',
        text: 'El usuario se creó exitosamente.',
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then(() => onClose());
    } catch (error) {
      console.error("Error al crear usuario:", error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al crear el usuario.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  };

  const handleCancel = () => {
    setFormData({
      nombre: "",
      apellido: "",
      cedula: "",
      correo: "",
      telefono: "",
      fechaNacimiento: "",
      rol: "", // Restableciendo el campo "rol" al estado inicial
      password: "",
    });
  
    onClose();
  };

 

  return (
    <div className={`modal ${isOpen ? "show" : ""}`}>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <div className="modal-inner">
          <h3>Agregar Usuario</h3>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">
                    Nombre:
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    className="form-control"
                    value={formData.nombre}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="apellido" className="form-label">
                    Apellido:
                  </label>
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    className="form-control"
                    value={formData.apellido}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="cedula" className="form-label">
                    Cédula:
                  </label>
                  <input
                    type="text"
                    id="cedula"
                    name="cedula"
                    className="form-control"
                    value={formData.cedula}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="correo" className="form-label">
                    Correo:
                  </label>
                  <input
                    type="email"
                    id="correo"
                    name="correo"
                    className="form-control"
                    value={formData.correo}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="telefono" className="form-label">
                    Teléfono:
                  </label>
                  <input
                    type="text"
                    id="telefono"
                    name="telefono"
                    className="form-control"
                    value={formData.telefono}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="fechaNacimiento" className="form-label">
                    Fecha de Nacimiento:
                  </label>
                  <input
                    type="date"
                    id="fechaNacimiento"
                    name="fechaNacimiento"
                    className="form-control"
                    value={formData.fechaNacimiento}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                  Contraseña:
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="rol" className="form-label">
                    Rol:
                  </label>
                  <select
                    id="rol"
                    name="rol"
                    className="form-control"
                    value={formData.rol}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecciona un rol</option>
                    <option value="administrativo">Administrativo</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="button-container">
              <button type="submit" className="btn btn-success">
                Agregar Usuario
              </button>
              <button type="button" onClick={handleCancel} className="btn btn-secondary">
              Cancelar
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalUsuarios;
