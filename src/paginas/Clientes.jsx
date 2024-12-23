import { FiUserCheck } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { borrarClienteEnAPI } from "../api/servicioClientes";
import { eliminarCliente } from "../slices/sliceClientes";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import  ModalEliminar from "../componentes/ModalEliminar";

function Clientes() {
  const clientes = useSelector((state) => state.sliceClientes.clientes);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Modal Eliminar Cliente
  const [showModal, setShowModal] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  const verDetallesCliente = (idCliente) => {
    navigate(`/clientes/detalle/${idCliente}`);
  };
  const editarCliente = (idCliente) => {
    navigate(`/clientes/editar/${idCliente}`);
  };

  const serviciosDelCliente = (idCliente) => {
    navigate(`/clientes/servicios-del-cliente/${idCliente}`);
  };

  const handleAbrirModal = (idCliente) => {
    setClienteSeleccionado(idCliente);
    setShowModal(true);
  };

  const handleCerrarModal = () => {
    setShowModal(false);
    setClienteSeleccionado(null);
  };

  const borrarCliente = async () => {
    try {
      console.log("Cliente seleccionado para eliminar:", clienteSeleccionado);

      const idCliente = await borrarClienteEnAPI(clienteSeleccionado);
      const payload = { id: idCliente };
      dispatch(eliminarCliente(payload));
      handleCerrarModal();
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div>
      <FiUserCheck className="icono-seccion" />
      <h2>Clientes</h2>
      <Link to="/clientes/alta">
        <button className="btn oblcolor">Nuevo Cliente</button>
      </Link>

      <br></br>
      <div className="espacio"></div>
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">#ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Documento</th>
            <th scope="col">Email</th>
            <th scope="col">País</th>
            <th scope="col">Telefono</th>
            <th scope="col">Detalles</th>
            <th scope="col">Editar</th>
            <th scope="col">Eliminar</th>
            <th scope="col">Servicios Contratados</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => {
            return (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.numDocumento}</td>
                <td>{cliente.usuarioLogin.email}</td>
                <td>{cliente.pais.nombre}</td>
                <td>{cliente.telefono}</td>

                <td>
                  <button
                    className="btn btn-danger oblcolor btn-sm me-2"
                    onClick={() => verDetallesCliente(cliente.id)}
                  >
                    Ver Más
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger oblcolor btn-sm me-2"
                    onClick={() => editarCliente(cliente.id)}
                  >
                    Editar
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger oblcolor btn-sm me-2"
                    onClick={() => handleAbrirModal(cliente.id)}
                  >
                    Eliminar
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger oblcolor btn-sm me-2"
                    onClick={() => serviciosDelCliente(cliente.id)}
                  >
                    Ver Servicios
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Modal para Confirmar Eliminación */}
      <ModalEliminar
        show={showModal}
        handleClose={handleCerrarModal}
        handleEliminar={borrarCliente}
        objAEliminar={"cliente"}
      />
    </div>
  );
}

export default Clientes;
