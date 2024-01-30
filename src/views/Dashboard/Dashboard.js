import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';

const Dashboard = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div style={{ height: '100%' }}>
        <Sidebar />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Navbar */}
        <div style={{ height: '50px' }}>
          <Navbar />
        </div>
        {/* Main Content */}
        <div style={{ flex: 1, padding: '20px' }}>
          <h2>Bienvenido al Sistema de Gestión de Citas Médicas e Historias Clínicas</h2>
          <div className="dashboard-stats">
            {/* Muestra estadísticas clave */}
            <div className="stat-item">
              <h3>Total de Citas</h3>
              <p>100</p>
            </div>
            <div className="stat-item">
              <h3>Pacientes Registrados</h3>
              <p>50</p>
            </div>
            {/* Agrega más estadísticas aquí */}
          </div>
          <div className="upcoming-appointments">
            <h3>Próximas Citas</h3>
            {/* Muestra una lista de las próximas citas */}
            <ul>
              <li>Cita 1 - Fecha y Hora</li>
              <li>Cita 2 - Fecha y Hora</li>
              {/* Agrega más citas aquí */}
            </ul>
          </div>
          {/* Agrega más secciones informativas y enlaces rápidos aquí */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
