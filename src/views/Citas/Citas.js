import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar/Sidebar'; // Importa el componente Sidebar desde la ubicación correcta
import Navbar from '../../components/Navbar/Navbar'; // Importa el componente Navbar desde la ubicación correcta

const Citas = () => {
  const [cita, setCita] = useState({
    fecha: '',
    horaInicio: '',
    horaFin: '',
    pacienteId: '',
    doctorId: '',
    descripcion: ''
  });

  const [pacientes, setPacientes] = useState([]);
  const [doctores, setDoctores] = useState([]);

  useEffect(() => {
    // Cargar pacientes desde la base de datos
    axios.get('/api/pacientes')
      .then(response => {
        setPacientes(response.data);
      })
      .catch(error => {
        console.error('Error al cargar los pacientes:', error);
      });

    // Cargar doctores desde la base de datos
    axios.get('/api/doctores')
      .then(response => {
        setDoctores(response.data);
      })
      .catch(error => {
        console.error('Error al cargar los doctores:', error);
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCita(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí podrías enviar los datos de la cita a tu servidor para guardar en la base de datos
    console.log('Cita Agendada:', cita);
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
          <div>
            <h2>Agendar Cita Médica</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Fecha:</label>
                <input type="date" name="fecha" value={cita.fecha} onChange={handleChange} />
              </div>
              <div>
                <label>Hora de Inicio:</label>
                <input type="time" name="horaInicio" value={cita.horaInicio} onChange={handleChange} />
              </div>
              <div>
                <label>Hora de Fin:</label>
                <input type="time" name="horaFin" value={cita.horaFin} onChange={handleChange} />
              </div>
              <div>
                <label>Paciente:</label>
                <select name="pacienteId" value={cita.pacienteId} onChange={handleChange}>
                  <option value="">Seleccionar Paciente</option>
                  {pacientes.map(paciente => (
                    <option key={paciente.id} value={paciente.id}>{paciente.nombre} {paciente.apellido}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>Doctor:</label>
                <select name="doctorId" value={cita.doctorId} onChange={handleChange}>
                  <option value="">Seleccionar Doctor</option>
                  {doctores.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>{doctor.name} {doctor.lastname}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>Descripción:</label>
                <textarea name="descripcion" value={cita.descripcion} onChange={handleChange}></textarea>
              </div>
              <button type="submit">Agendar Cita</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Citas;
