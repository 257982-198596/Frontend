import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { obtenerServiciosClienteAPI } from "../../api/servicioServiciosDelCliente";
import { useNavigate } from "react-router-dom";
import { eliminarServicioDelClienteAPI } from "../../api/servicioServiciosDelCliente";
import ModalEliminar from "../../componentes/ModalEliminar";
import { useRef } from "react";
import { enviarRecordatorioAPI, obtenerCantidadNotificacionesAPI } from "../../api/servicioNotificaciones";
import { mostrarError, mostrarSuccess } from "../../componentes/Toasts";
import { ToastContainer } from "react-toastify";
import { FiUserCheck } from "react-icons/fi";
import { FaEnvelopeOpen } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";

function ServiciosDelCliente() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [serviciosContratados, setServiciosContratados] = useState([]);
  const [serviciosFiltrados, setServiciosFiltrados] = useState([]);
  const [serviciosActivos, setServiciosActivos] = useState([]);
  const [serviciosHistoricos, setServiciosHistoricos] = useState([]);
  const [cantidadNotificaciones, setCantidadNotificaciones] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);
  const [servicioAEliminar, setServicioAEliminar] = useState(null);

  const cliente = useSelector((state) =>
    state.sliceClientes.clientes.find((cliente) => cliente.id === parseInt(id))
  );

  const editarServicioDelCliente = (idServicioCliente) => {
    navigate(`/clientes/editar-servicio/${idServicioCliente}`);
  };

  const handleAbrirModal = (idServicio) => {
    setServicioAEliminar(idServicio);
    setModalVisible(true);
  };

  const handleCerrarModal = () => {
    setServicioAEliminar(null);
    setModalVisible(false);
  };

  const eliminarServicio = async () => {
    try {
      const idCliente = await eliminarServicioDelClienteAPI(servicioAEliminar);
      handleCerrarModal();
      cargarServicios();
    } catch (error) {
      console.error("Error al eliminar el servicio:", error);
      alert("Ocurrió un error al intentar eliminar el servicio.");
    }
  };

  const cargarServicios = async () => {
    const response = await obtenerServiciosClienteAPI(id);
    const servicios = response.data;
    setServiciosContratados(servicios);
    setServiciosFiltrados(servicios);
    setServiciosActivos(servicios.filter(servicio => servicio.estadoDelServicioDelCliente.nombre === "Activo"));
    setServiciosHistoricos(servicios.filter(servicio => servicio.estadoDelServicioDelCliente.nombre !== "Activo"));
  };

  const cargarCantidadNotificaciones = async () => {
    try {
      const response = await obtenerCantidadNotificacionesAPI(id);
      console.log("Cantidad de notificaciones:", response.data.cantidadNotificaciones);
      setCantidadNotificaciones(response.data.cantidadNotificaciones);
    } catch (error) {
      console.error("Error al obtener la cantidad de notificaciones:", error);
    }
  };

  const enviarRecordatorio = async (idServicio) => {
    try {
      console.log("Enviando recordatorio para el servicio:", idServicio);
      await enviarRecordatorioAPI(idServicio);
      console.log("Recordatorio enviado con éxito.");
      mostrarSuccess("Recordatorio enviado con éxito.");
    } catch (error) {
      console.error("Error al enviar el recordatorio:", error);
      mostrarError("Ocurrió un error al intentar enviar el recordatorio.");
      console.error("Error al enviar el recordatorio:", error);
    }
  };

  useEffect(() => {
    cargarServicios();
    cargarCantidadNotificaciones();
  }, [id]);

  return (
    <div className="container">
      <FiUserCheck className="icono-seccion" />
      <h3>Servicios de {cliente?.nombre || "Cliente no encontrado"}</h3>

      <Link to={`/clientes/asociar-servicio/${id}`}>
        <button className="btn oblcolor">Asociar Servicio</button>
      </Link>
      <div className="espacio"></div>
      <div className="row">
        <div className="col-md-4 indicador">
        <FaMoneyBillTransfer className="icono-indicador" />
        
          <h5>Monto Anual - Servicios Activos</h5>
          <p className="valor-indicador">0</p> 
        </div>
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-5 indicador mx-1">
              <FaCalendarCheck className="icono-indicador" />
              <h5>Próximo Vencimiento</h5>
              <p className="valor-indicador">N/A</p> 
            </div>
            <div className="col-md-5 indicador mx-1">
              <FaEnvelopeOpen className="icono-indicador" />
              <h5>Notificaciones del Último Mes</h5>
              <p className="valor-indicador">{cantidadNotificaciones}</p> 
            </div>
          </div>
        </div>
      </div>
      <div className="espacio"></div>
      <h5>Servicios Activos</h5>
      {Array.isArray(serviciosActivos) && serviciosActivos.length > 0 ? (
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th>Descripcion</th>
              <th>Servicio</th>
              <th>Precio</th>
              <th>Moneda</th>
              <th>Frecuencia</th>
              <th>Estado</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {serviciosActivos.map((servicio) => (
              <tr key={servicio.id}>
                <td>{servicio.descripcion}</td>
                <td>{servicio.servicioContratado.nombre}</td>
                <td>{servicio.precio}</td>
                <td>{servicio.monedaDelServicio.nombre}</td>
                <td>{servicio.frecuenciaDelServicio.nombre}</td>

                <td>{servicio.estadoDelServicioDelCliente.nombre}</td>
                <td>{new Date(servicio.fechaInicio).toLocaleDateString()}</td>
                <td>{new Date(servicio.fechaVencimiento).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-danger oblcolor btn-sm me-2"
                    onClick={() => editarServicioDelCliente(servicio.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger oblcolor btn-sm"
                    onClick={() => handleAbrirModal(servicio.id)}
                  >
                    Eliminar
                  </button>
                  {servicio.estadoDelServicioDelCliente.nombre === "Activo" && (
                    <button
                      className="btn btn-warning oblcolor btn-sm"
                      onClick={() => enviarRecordatorio(servicio.id)}
                    >
                      Enviar Recordatorio
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay servicios activos.</p>
      )}

      <div className="espacio"></div>
      <h5>Histórico</h5>
      {Array.isArray(serviciosHistoricos) && serviciosHistoricos.length > 0 ? (
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th>Descripcion</th>
              <th>Servicio</th>
              <th>Precio</th>
              <th>Moneda</th>
              <th>Frecuencia</th>
              <th>Estado</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {serviciosHistoricos.map((servicio) => (
              <tr key={servicio.id}>
                <td>{servicio.descripcion}</td>
                <td>{servicio.servicioContratado.nombre}</td>
                <td>{servicio.precio}</td>
                <td>{servicio.monedaDelServicio.nombre}</td>
                <td>{servicio.frecuenciaDelServicio.nombre}</td>

                <td>{servicio.estadoDelServicioDelCliente.nombre}</td>
                <td>{new Date(servicio.fechaInicio).toLocaleDateString()}</td>
                <td>{new Date(servicio.fechaVencimiento).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-danger oblcolor btn-sm me-2"
                    onClick={() => editarServicioDelCliente(servicio.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger oblcolor btn-sm"
                    onClick={() => handleAbrirModal(servicio.id)}
                  >
                    Eliminar
                  </button>
                  {servicio.estadoDelServicioDelCliente.nombre === "Activo" && (
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => enviarRecordatorio(servicio.id)}
                    >
                      Enviar Recordatorio
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay servicios históricos.</p>
      )}
      {/* Modal para Confirmar Eliminación */}
      <ModalEliminar
        show={modalVisible}
        handleClose={handleCerrarModal}
        handleEliminar={eliminarServicio}
        objAEliminar={"servicio"}
      />
      <ToastContainer />
    </div>
  );
}

export default ServiciosDelCliente;
