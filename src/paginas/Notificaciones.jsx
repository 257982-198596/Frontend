import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { getNotificacionesApi } from "../api/servicioNotificaciones"; 
import { cargarNotificaciones } from "../slices/sliceNotificaciones";

function Notificaciones() {
  const notificaciones = useSelector((state) => state.sliceNotificaciones.notificaciones || []);
  const clientes = useSelector((state) => state.sliceClientes.clientes);
  const servicios = useSelector((state) => state.sliceServicios.servicios);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [servicioSeleccionado, setServicioSeleccionado] = useState("");
  const [notificacionesFiltradas, setNotificacionesFiltradas] = useState([]);

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

  const limpiarFiltros = () => {
    setClienteSeleccionado("");
    setServicioSeleccionado("");
    document.getElementById("slc-cliente").value = "";
    document.getElementById("slc-servicio").value = "";
  };

  useEffect(() => {
    const fetchNotificacionesData = async () => {
      try {
        const response = await getNotificacionesApi();
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
      setNotificacionesFiltradas(filtradas);
    }
  }, [clienteSeleccionado, servicioSeleccionado, notificaciones]);

  return (
    <div>
      <h2>Notificaciones</h2>
      <div className="row mb-3">
        <div className="col-md-3">
          <label htmlFor="slc-cliente" className="form-label">Filtrar por cliente:</label>
          <select 
            id="slc-cliente"
            name="slc-cliente"
            className="form-select"
            value={clienteSeleccionado} // Add this line
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
            console.log(notificacion);
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