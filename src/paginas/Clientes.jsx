import { FiUserCheck } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { borrarClienteEnAPI } from "../api/servicioClientes";
import { eliminarCliente } from "../slices/sliceClientes";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import  EliminarCliente from "../paginas/clientes/EliminarCliente";

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

      const responseCliente = await borrarClienteEnAPI(clienteSeleccionado);
      console.log("Cliente eliminado:", responseCliente);
      dispatch(eliminarCliente(responseCliente));
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
      <table className="table table-dark">
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
                    className="btn btn-danger oblcolor"
                    onClick={() => verDetallesCliente(cliente.id)}
                  >
                    Ver Más
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger oblcolor"
                    onClick={() => editarCliente(cliente.id)}
                  >
                    Editar
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger oblcolor"
                    onClick={() => handleAbrirModal(cliente.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Modal para Confirmar Eliminación */}
      <EliminarCliente
        show={showModal}
        handleClose={handleCerrarModal}
        handleEliminar={borrarCliente}
      />
    </div>
  );
}

export default Clientes;
