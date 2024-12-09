import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Notificaciones() {
  const notificaciones = useSelector((state) => state.sliceNotificaciones.notificaciones);
  const clientes = useSelector((state) => state.sliceClientes.clientes);
  const navigate = useNavigate();

  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
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

  useEffect(() => {
    let filtradas = notificaciones;
    if (clienteSeleccionado !== "" && clienteSeleccionado !== "todos") {
      filtradas = filtradas.filter(
        (notificacion) => notificacion.clienteNotificado.id === parseInt(clienteSeleccionado)
      );
    }
    setNotificacionesFiltradas(filtradas);
  }, [clienteSeleccionado, notificaciones]);

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
      </div>
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