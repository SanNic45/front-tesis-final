import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";
import "datatables.net-bs5";
import "datatables.net-responsive-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import Modal from "../../components/Modal/ModalPacientes";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./Pacientes.css";

const TablaPacientes = () => {
  const tableRef = useRef(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const tableInstance = useRef(null);

  const handleCrearPaciente = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/pacient/all");
        const data = response.data;
        tableInstance.current = $(tableRef.current).DataTable({
          responsive: true,
          data: data,
          columns: [
            { title: "Cédula", data: "cedula" },
            { title: "Nombre", data: "nombre" },
            { title: "Apellido", data: "apellido" },
            { title: "Correo", data: "correo" },
            { title: "Número", data: "telefono" },
            { title: "Genero", data: "genero" },
          ],
          retrieve: true,
        });
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();

    return () => {
      if (tableInstance.current) {
        tableInstance.current.destroy();
      }
    };
  }, []); // Empty dependency array to run once on mount

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Navbar />
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
                      <th className="text-nowrap">Genero</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            </div>
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
