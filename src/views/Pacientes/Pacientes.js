import React, { useRef, useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net-bs5";
import "datatables.net-responsive-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import Modal from "../../components/Modal/ModalPacientes";
import Sidebar from "../../components/Sidebar/Sidebar"; // Importa el componente Sidebar
import Navbar from "../../components/Navbar/Navbar"; // Importa el componente Navbar
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./Pacientes.css";

const TablaPacientes = () => {
  const tableRef = useRef(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleCrearPaciente = () => {
    console.log("Botón clickeado");
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const table = $(tableRef.current).DataTable({
      responsive: true,
      data: [
        {
          cedula: "1754200118",
          nombre: "Roberto",
          apellido: "Soto",
          correo: "roberto@gmail.com",
          numero: "09987450",
          acciones: "",
        },
        {
          cedula: "1754500128",
          nombre: "Joel",
          apellido: "Layedra",
          correo: "layedra@gmail.com",
          numero: "09987450",
          acciones: "",
        },
      ],
      columns: [
        { title: "Cédula", data: "cedula" },
        { title: "Nombre", data: "nombre" },
        { title: "Apellido", data: "apellido" },
        { title: "Correo", data: "correo" },
        { title: "Número", data: "numero" },
        { title: "Acciones", data: "acciones" },
      ],
    });

    return () => {
      table.destroy();
    };
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Sidebar style={{ height: '100%' }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Navbar */}
        <Navbar style={{ height: '50px' }} />
        {/* Main Content */}
        <div style={{ flex: 1, padding: '20px' }}>
          <div className="card shadow border-0">
            <div className="card-header border-0">
              <h1 className="bg-light">Lista de Pacientes</h1>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table" ref={tableRef}>
                  <thead>
                    <tr>
                      <th className="text-nowrap">Cédula</th>
                      <th className="text-nowrap">Nombre</th>
                      <th className="text-nowrap">Apellido</th>
                      <th className="text-nowrap">Correo</th>
                      <th className="text-nowrap">Número</th>
                      <th className="text-nowrap">Acciones</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            </div>
            {/* Botón flotante */}
            <button
              className="floating-button btn-float"
              onClick={handleCrearPaciente}
            >
              <span className="fa-icon">
                <FontAwesomeIcon icon={faPlus} />
              </span>
            </button>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablaPacientes;
