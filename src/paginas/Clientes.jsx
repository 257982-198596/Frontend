import { FiUserCheck } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { borrarClienteEnAPI, habilitarClienteEnAPI, deshabilitarClienteEnAPI, getClientesApi } from "../api/servicioClientes";
import { eliminarCliente, cargarClientes } from "../slices/sliceClientes";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ModalEliminar from "../componentes/ModalEliminar";
import { mostrarError, mostrarSuccess } from "../componentes/Toasts";
import { ToastContainer } from 'react-toastify';

function Clientes() {
  const clientes = useSelector((state) => state.sliceClientes.clientes);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const suscriptorId = localStorage.getItem("idSuscriptor");
        const response = await getClientesApi(suscriptorId);
        dispatch(cargarClientes({ clientesStore: response.data }));
      } catch (error) {
        console.log("Error al obtener clientes:", error);
      }
    };

    fetchClientes();
  }, [dispatch]);

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

      const idCliente = await borrarClienteEnAPI(clienteSeleccionado);
      const payload = { id: idCliente };
      dispatch(eliminarCliente(payload));
      handleCerrarModal();
      mostrarSuccess("Cliente eliminado exitosamente");
    } catch (error) {
      handleCerrarModal();
      mostrarError(error.message);
      console.log("error", error);
      
    }
  };

  const toggleHabilitacionCliente = async (idCliente, habilitado) => {
    try {
      if (habilitado) {
        await deshabilitarClienteEnAPI(idCliente);
        console.log(`Cliente con ID: ${idCliente} deshabilitado`);
      } else {
        await habilitarClienteEnAPI(idCliente);
        console.log(`Cliente con ID: ${idCliente} habilitado`);
      }
      
      
      const suscriptorId = localStorage.getItem("idSuscriptor");
      const response = await getClientesApi(suscriptorId);
      dispatch(cargarClientes({ clientesStore: response.data }));
    } catch (error) {
      console.log("error", error);
    }
  };

  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 10;

  const handlePageChange = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const clientesPaginados = Array.isArray(clientes)
    ? clientes.slice(
        (paginaActual - 1) * elementosPorPagina,
        paginaActual * elementosPorPagina
      )
    : [];

  const totalPaginas = Array.isArray(clientes)
    ? Math.ceil(clientes.length / elementosPorPagina)
    : 0;

  return (
    <div className="container-fluid">
      <FiUserCheck className="icono-seccion" />
      <h2>Clientes</h2>
      <Link to="/clientes/alta">
        <button className="btn oblcolor">Nuevo Cliente</button>
      </Link>

      <br></br>
      <div className="espacio"></div>
      
      {clientes.length > 0 ? (
      <>
        <div className="table-responsive">
          <table className="table table-striped table-dark">
            <thead>
              <tr>
                <th scope="col">#ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Documento</th>
                <th scope="col">Email</th>
                <th scope="col">País</th>
                <th scope="col">Detalles</th>
                <th scope="col">Editar</th>
                <th scope="col">Eliminar</th>
                <th scope="col">Servicios Contratados</th>
                <th scope="col">Hab. / Deshab.</th>
              </tr>
            </thead>
            <tbody>
              {clientesPaginados.map((cliente) => {
                const habilitado = cliente.estado && cliente.estado.nombre === "Activo"; 
                
                return (
                  <tr key={cliente.id}>
                    <td>{cliente.id}</td>
                    <td>{cliente.nombre}</td>
                    <td>{cliente.numDocumento}</td>
                    <td>{cliente.usuarioLogin.email}</td>
                    <td>{cliente.pais.nombre}</td>

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
                    <td>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={habilitado}
                          onChange={() => toggleHabilitacionCliente(cliente.id, habilitado)}
                        />
                        <span className="slider round"></span>
                      </label>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <p className="pagina-paginacion">Página:</p>
          {Array.from({ length: totalPaginas }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`btn ${paginaActual === index + 1 ? 'btn oblcolor' : 'btn-secondary'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </>
      ) : (
        <p>No hay clientes cargados en el sistema.</p>
      )}

      {/* Modal para Confirmar Eliminación */}
      <ModalEliminar
        show={showModal}
        handleClose={handleCerrarModal}
        handleEliminar={borrarCliente}
        objAEliminar={"cliente"}
      />
      <ToastContainer />
    </div>
  );
}

export default Clientes;
