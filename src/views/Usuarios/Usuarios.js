import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";
import "datatables.net-bs5";
import "datatables.net-responsive-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import Modal from "../../components/Modal/ModalUsuarios";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import "./Usuarios.css";

const TablaUsuarios = () => {
  const tableRef = useRef(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const tableInstance = useRef(null);

  const handleCrearUsuario = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/users/all"); 
        const data = response.data; 
        tableInstance.current = $(tableRef.current).DataTable({
          responsive: true,
          data: data, 
          columns: [
            { title: "Rol", data: "rol" },
            { title: "Nombre", data: "name" },
            { title: "Apellido", data: "lastname" },
            { title: "Cédula", data: "cedula" },
            { title: "Email", data: "email" },
            { title: "Celular", data: "celular" },
            
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
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ flex: 1, padding: '20px' }}>
          <div className="card shadow border-0">
            <div className="card-header border-0">
              <h1 className="bg-light">Lista de Usuarios</h1>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table" ref={tableRef}>
                  <thead>
                    <tr>
                    <th>Rol</th>
                      <th>Nombre</th>
                      <th>Apellido</th>
                      <th>Cédula</th>
                      <th>Email</th>
                      <th>Celular</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            </div>
            <button
              className="floating-button btn-float"
              onClick={handleCrearUsuario}
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

export default TablaUsuarios;
