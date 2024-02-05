import React, { useState } from "react";
import "./Modal.css";
import { createPatient } from "./serviceModalPacientes";
import Swal from "sweetalert2";
import { FormControl } from "react-bootstrap";

const ModalPacientes = ({ onClose, isOpen }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    correo: "",
    telefono: "",
    fechaNacimiento: "",
    genero: "",
    direccion: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if ((name === "cedula" || name === "telefono") && !/^\d{0,10}$/.test(value)) {
      return;
    }
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (Object.values(formData).some((field) => !field)) {
      Swal.fire({
        title: "Campos Obligatorios",
        text: "Todos los campos son obligatorios. Por favor, complete todos los campos.",
        icon: "warning",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: 'btn btn-success btn-sw-alert',
        },
      });
      return;
    }
  
    // Additional check for null date
    if (!formData.fechaNacimiento) {
      Swal.fire({
        title: "Fecha de Nacimiento Obligatoria",
        text: "La fecha de nacimiento es obligatoria. Por favor, ingrese una fecha válida.",
        icon: "warning",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: 'btn btn-success btn-sw-alert',
        },
      });
      return;
    }
  
    try {
      const patientData = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        cedula: formData.cedula,
        correo: formData.correo,
        telefono: formData.telefono,
        fecha_nacimiento: formData.fechaNacimiento,  // Update property name here
        genero: formData.genero,
        direccion: formData.direccion,
      };
      await createPatient(patientData);
      Swal.fire({
        title: "Paciente creado!",
        text: "El paciente se creó exitosamente.",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        onClose();
        // Optionally, you may refresh the page or update the patient list
      });
    } catch (error) {
      console.error("Error al crear paciente:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un error al crear el paciente.",
        icon: "error",
        confirmButtonText: "Ok",
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
      genero: "",
      direccion: "",
    });
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? "show" : ""}`}>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <div className="modal-inner">
          <h3>Agregar Paciente</h3>
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
                    type="tel"
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
                  <label htmlFor="genero" className="form-label">
                    Genero:
                  </label>
                  <FormControl
                    as="select"
                    id="genero"
                    name="genero"
                    value={formData.genero}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled hidden>
                       Selecciona un género
                     </option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="otro">Otro</option>
                  </FormControl>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="direccion" className="form-label">
                    Dirección:
                  </label>
                  <input
                    type="text"
                    id="direccion"
                    name="direccion"
                    className="form-control"
                    value={formData.direccion}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="button-container">
              <button type="submit" className="btn btn-success">
                Agregar Paciente
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-secondary"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalPacientes;
