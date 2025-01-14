import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getNotificacionesApi } from "../api/servicioNotificaciones"; 
import { cargarNotificaciones } from "../slices/sliceNotificaciones";
import { FiCalendar } from "react-icons/fi";

function Notificaciones() {
  const notificaciones = useSelector((state) => state.sliceNotificaciones.notificaciones || []);
  const clientes = useSelector((state) => state.sliceClientes.clientes);
  const servicios = useSelector((state) => state.sliceServicios.servicios);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [servicioSeleccionado, setServicioSeleccionado] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [notificacionesFiltradas, setNotificacionesFiltradas] = useState(notificaciones);

  const verDetallesNotificacion = (idNotificacion) => {
    navigate(`/notificaciones/detalle/${idNotificacion}`);
  };

  const formatFechaEnvio = (fechaEnvio) => {
    const date = new Date(fechaEnvio);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
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
      } catch (error) {
        console.error("Error en get de notificaciones:", error);
      }
    };

    fetchNotificacionesData();
  }, [dispatch]);

  useEffect(() => {
    if (notificaciones.length > 0) {
      let filtradas = notificaciones;
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
  }, [clienteSeleccionado, servicioSeleccionado, fechaInicio, fechaFin, notificaciones]);

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
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">#ID</th>
            <th scope="col">Fecha Envío</th>
            <th scope="col">Cliente Notificado</th>
            <th scope="col">Mensaje</th>
            <th scope="col">Estado</th>
            <th scope="col">Servicio Notificado</th>
            <th scope="col">Detalles</th>
          </tr>
        </thead>
        <tbody>
          {notificacionesFiltradas.map((notificacion) => {
            //console.log(notificacion);
            return (
              <tr key={notificacion.id}>
                <td>{notificacion.id}</td>
                <td>{formatFechaEnvio(notificacion.fechaEnvio)}</td>
                <td>{notificacion.clienteNotificado.nombre}</td>
                <td>{notificacion.mensaje}</td>
                <td>{notificacion.estadoDeNotificacion.nombre}</td>
                <td>{notificacion.servicioNotificado.descripcion}</td>
                <td>
                  <button
                    className="btn btn-danger oblcolor"
                    onClick={() => verDetallesNotificacion(notificacion.id)}
                  >
                    Ver Más
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Notificaciones;