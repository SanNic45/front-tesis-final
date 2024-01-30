import React, { useState } from 'react';
import Modal from 'react-modal';
import Sidebar from '../../components/Sidebar/Sidebar'; // Importa el componente Sidebar
import Navbar from '../../components/Navbar/Navbar'; // Importa el componente Navbar
import Swal from 'sweetalert2';

const HistorialClinico = () => {
  const [informacionPaciente, setInformacionPaciente] = useState(null);
  const [idPaciente, setIdPaciente] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleBuscarPaciente = (event) => {
    event.preventDefault();
    // Validación de longitud del ID
    if (idPaciente.length !== 10) {
      alert('El ID del paciente debe tener 10 dígitos.');
      return;
    }
    // Validación de solo números
    if (!/^\d+$/.test(idPaciente)) {
      alert('El ID del paciente solo debe contener números.');
      return;
    }
    const informacionPacienteMock = {
      nombre: 'Juan Perez',
      edad: 30,
      // Otros datos del paciente
    };
    setInformacionPaciente(informacionPacienteMock);
  };

  const handleIdChange = (event) => {
    const inputValue = event.target.value;
    // Validación de longitud máxima de 10 dígitos
    if (inputValue.length <= 10 && /^\d*$/.test(inputValue)) {
      setIdPaciente(inputValue);
    }
  };

  const handleCrearHistoriaClinica = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    // SweetAlert para mostrar mensaje de éxito al cerrar el modal
    Swal.fire('Historia clínica creada con éxito');
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Sidebar style={{ height: '100%' }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Navbar */}
        <Navbar style={{ height: '50px' }} />
        {/* Main Content */}
        <div style={{ flex: 1, padding: '20px' }}>
          <div className="historial-container">
            <div style={{ marginBottom: '20px' }}>
              <form style={{ marginBottom: '10px' }}>
                {/* Otros campos del formulario */}
                <button type="button" onClick={handleCrearHistoriaClinica} style={{ width: '100%' }}>Crear historia clínica</button>
              </form>
            </div>
            <div style={{ width: '100%' }}>
              <form onSubmit={handleBuscarPaciente} style={{ marginBottom: '20px' }}>
                <h3>Buscar historia clínica de paciente</h3>
                <div style={{ display: 'flex', marginBottom: '10px' }}>
                  <label htmlFor="dni1" style={{ marginRight: '10px' }}>Buscar por Número de cédula:</label>
                  <input
                    type="text"
                    id="dni1"
                    name="dni1"
                    value={idPaciente}
                    onChange={handleIdChange}
                    maxLength={10}
                    style={{ flex: 1 }}
                  />
                </div>
                <button type="submit" style={{ width: '100%' }}>Buscar</button>
              </form>
              {informacionPaciente && (
                <div>
                  <h4>Información del paciente:</h4>
                  <p>Nombre: {informacionPaciente.nombre}</p>
                  <p>Edad: {informacionPaciente.edad}</p>
                  {/* Otros datos del paciente */}
                </div>
              )}
            </div>

            {/* Modal */}
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              style={{
                content: {
                  width: '50%',
                  margin: 'auto',
                }
              }}
            >
              <h2>Contenido del modal</h2>
              <button onClick={closeModal}>Cerrar modal</button>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistorialClinico;
