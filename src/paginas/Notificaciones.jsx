import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getNotificacionesApi } from "../api/servicioNotificaciones"; 
import { cargarNotificaciones } from "../slices/sliceNotificaciones";
import { FiCalendar } from "react-icons/fi";

function Notificaciones() {
  const notificaciones = useSelector((state) => state.sliceNotificaciones.notificaciones);
  const clientes = useSelector((state) => state.sliceClientes.clientes);
  const servicios = useSelector((state) => state.sliceServicios.servicios);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [servicioSeleccionado, setServicioSeleccionado] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [notificacionesFiltradas, setNotificacionesFiltradas] = useState(notificaciones);
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 10;

  const handlePageChange = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const notificacionesPaginadas = Array.isArray(notificacionesFiltradas)
    ? notificacionesFiltradas.slice(
        (paginaActual - 1) * elementosPorPagina,
        paginaActual * elementosPorPagina
      )
    : [];

    //para cantidad de botones de paginacion
  const totalPaginas = Array.isArray(notificacionesFiltradas)
    ? Math.ceil(notificacionesFiltradas.length / elementosPorPagina)
    : 0;

  const formatFechaEnvio = (fechaEnvio) => {
    const date = new Date(fechaEnvio);
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleFiltrarPorCliente = (event) => {
    setClienteSeleccionado(event.target.value);
  };

  const handleFiltrarPorServicio = (event) => {
    setServicioSeleccionado(event.target.value);
  };

  const handleFiltrarPorFechaInicio = (event) => {
    setFechaInicio(event.target.value);
  };

  const handleFiltrarPorFechaFin = (event) => {
    setFechaFin(event.target.value);
  };

  const limpiarFiltros = () => {
    setClienteSeleccionado("");
    setServicioSeleccionado("");
    setFechaInicio("");
    setFechaFin("");
    document.getElementById("slc-cliente").value = "";
    document.getElementById("slc-servicio").value = "";
    document.getElementById("fecha-inicio").value = "";
    document.getElementById("fecha-fin").value = "";
  };

  

  useEffect(() => {
    const fetchNotificacionesData = async () => {
      try {
        const suscriptorId = localStorage.getItem("idSuscriptor");
        const response = await getNotificacionesApi(suscriptorId);
        dispatch(cargarNotificaciones(response.data));
        setNotificacionesFiltradas(response.data);

        
        if (response.data.length > 0) {
          let filtradas = response.data;
          if (clienteSeleccionado !== "" && clienteSeleccionado !== "todos") {
            filtradas = filtradas.filter(
              (notificacion) => notificacion.clienteNotificado.id === parseInt(clienteSeleccionado)
            );
          }
          if (servicioSeleccionado !== "" && servicioSeleccionado !== "todos") {
            filtradas = filtradas.filter(
              (notificacion) => notificacion.servicioNotificado.servicioContratado.id === parseInt(servicioSeleccionado)
            );
          }
          if (fechaInicio !== "" && fechaFin !== "") {
            filtradas = filtradas.filter((notificacion) => {
              const fechaEnvio = new Date(notificacion.fechaEnvio);
              return (
                fechaEnvio >= new Date(fechaInicio) && fechaEnvio <= new Date(fechaFin)
              );
            });
          }
          setNotificacionesFiltradas(filtradas);
        }
      } catch (error) {
        console.error("Error en get de notificaciones:", error);
      }
    };

    fetchNotificacionesData();
  }, [dispatch, clienteSeleccionado, servicioSeleccionado, fechaInicio, fechaFin]);

  return (
    <div>
      <FiCalendar className="icono-seccion" />
      <h2>Notificaciones</h2>
      <div className="row mb-3">
        <div className="col-md-3">
          <label htmlFor="slc-cliente" className="form-label">Filtrar por cliente:</label>
          <select 
            id="slc-cliente"
            name="slc-cliente"
            className="form-select"
            value={clienteSeleccionado}
            onChange={handleFiltrarPorCliente}
          >
            <option value="">Seleccione Cliente</option>
            <option value="todos">Todos</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label htmlFor="slc-servicio" className="form-label">Filtrar por tipo de servicio:</label>
          <select
            id="slc-servicio"
            name="slc-servicio"
            className="form-select"
            value={servicioSeleccionado}
            onChange={handleFiltrarPorServicio}
          >
            <option value="">Seleccione Servicio</option>
            <option value="todos">Todos</option>
            {servicios.map((servicio) => (
              <option key={servicio.id} value={servicio.id}>
                {servicio.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label htmlFor="fecha-inicio" className="form-label">Fecha Inicio:</label>
          <input
            type="date"
            id="fecha-inicio"
            name="fecha-inicio"
            className="form-control"
            onChange={handleFiltrarPorFechaInicio}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="fecha-fin" className="form-label">Fecha Fin:</label>
          <input
            type="date"
            id="fecha-fin"
            name="fecha-fin"
            className="form-control"
            onChange={handleFiltrarPorFechaFin}
          />
        </div>
      </div>
      <button className="btn btn-secondary mb-3" onClick={limpiarFiltros}>
        Limpiar Filtros
      </button>
      {Array.isArray(notificacionesFiltradas) && notificacionesFiltradas.length > 0 ? (
        <>
          <table className="table table-striped table-dark">
            <thead>
              <tr>
                <th scope="col">#ID</th>
                <th scope="col">Fecha Envío</th>
                <th scope="col">Cliente Notificado</th>
                <th scope="col">Mensaje</th>
                <th scope="col">Estado</th>
                <th scope="col">Servicio Notificado</th>
              </tr>
            </thead>
            <tbody>
              {notificacionesPaginadas.map((notificacion) => {
                return (
                  <tr key={notificacion.id}>
                    <td>{notificacion.id}</td>
                    <td>{formatFechaEnvio(notificacion.fechaEnvio)}</td>
                    <td>{notificacion.clienteNotificado.nombre}</td>
                    <td>{notificacion.mensaje}</td>
                    <td>{notificacion.estadoDeNotificacion.nombre}</td>
                    <td>{notificacion.servicioNotificado.descripcion}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="pagination">
            <p className="pagina-paginacion">Página:</p>
            {Array.from({ length: totalPaginas }, (_, index) => (
              <button
                //para identificar pagina actual
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
        <p>No hay notificaciones según el criterio de filtro seleccionado.</p>
      )}
    </div>
  );
}

export default Notificaciones;