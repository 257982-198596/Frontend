import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";
import EliminarServicio from "../paginas/servicios/EliminarServicio";
import { borrarServicioEnAPI } from "../api/servicioServicios";
import { eliminarServicio } from "../slices/sliceServicios"
import { mostrarError, mostrarSuccess } from "../componentes/Toasts";
import { ToastContainer } from 'react-toastify';

function Servicios() {
  const servicios = useSelector((state) => state.sliceServicios.servicios);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);

  const verDetallesServicio = (idServicio) => {
    navigate(`/servicios/detalle/${idServicio}`);
  };
  const editarServicio = (idServicio) => {
    navigate(`/servicios/editar/${idServicio}`);
  };

  const handleAbrirModal = (idServicio) => {
    setServicioSeleccionado(idServicio);
    setShowModal(true);
  };

  const handleCerrarModal = () => {
    setShowModal(false);
    setServicioSeleccionado(null);
  };

  const borrarServicio = async () => {
    try {
      console.log("Servicio seleccionado para eliminar:", servicioSeleccionado);

      const idServicio = await borrarServicioEnAPI(servicioSeleccionado);
      const payload = { id: idServicio };
      dispatch(eliminarServicio(payload));
      handleCerrarModal();
      mostrarSuccess("Servicio eliminado exitosamente");

    } catch (error) {
      handleCerrarModal();
      mostrarError(error.message);
      console.log("error", error);
    }
  };

  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 10;

  const handlePageChange = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const serviciosPaginados = Array.isArray(servicios)
    ? servicios.slice(
        (paginaActual - 1) * elementosPorPagina,
        paginaActual * elementosPorPagina
      )
    : [];

  const totalPaginas = Array.isArray(servicios)
    ? Math.ceil(servicios.length / elementosPorPagina)
    : 0;

  return (
    <div className="container-fluid">
      <FiShoppingCart className="icono-seccion" />
      <h2>Servicios</h2>
      <Link to="/servicios/alta">
        <button className="btn oblcolor">Nuevo Servicio</button>
      </Link>

      <br></br>
      <div className="espacio"></div>
      
      {servicios.length > 0 ? (
      <>
        <div className="table-responsive">
          <table className="table table-striped table-dark">
            <thead>
              <tr>
                <th scope="col">#ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Descripción</th>
                <th scope="col">Categoría</th>
                <th scope="col">Detalles</th>
                <th scope="col">Editar</th>
                <th scope="col">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {serviciosPaginados.map((servicio) => {
                return (
                  <tr key={servicio.id}>
                    <td>{servicio.id}</td>
                    <td>{servicio.nombre}</td>
                    <td>{servicio.descripcion}</td>
                    <td>{servicio.categoriaDelServicio.nombre}</td>

                    <td>
                      <button
                        className="btn btn-danger oblcolor"
                        onClick={() => verDetallesServicio(servicio.id)}
                      >
                        Ver Más
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger oblcolor"
                        onClick={() => editarServicio(servicio.id)}
                      >
                        Editar
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger oblcolor"
                        onClick={() => handleAbrirModal(servicio.id)}
                      >
                        Eliminar
                      </button>
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
        <p>No hay servicios cargados en el sistema.</p>
      )}

      {/* Modal para Confirmar Eliminación */}
      <EliminarServicio
        show={showModal}
        handleClose={handleCerrarModal}
        handleEliminar={borrarServicio}
        objAEliminar={"servicio"}
      />
      <ToastContainer />
    </div>
  );
}

export default Servicios;
