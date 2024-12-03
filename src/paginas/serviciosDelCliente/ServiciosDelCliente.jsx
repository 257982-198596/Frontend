import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { obtenerServiciosClienteAPI } from "../../api/servicioServiciosDelCliente";
import { useNavigate } from "react-router-dom";
import { eliminarServicioDelClienteAPI } from "../../api/servicioServiciosDelCliente";
import ModalEliminar from "../../componentes/ModalEliminar";
import { useRef } from "react";

function ServiciosDelCliente() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [serviciosContratados, setServiciosContratados] = useState([]);
  const [serviciosFiltrados, setServiciosFiltrados] = useState([]);

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

  //filtrado del select
  const busSelectorFiltro = useRef("");

  const handleFiltrar = () => {
    const estadoSeleccionado = busSelectorFiltro.current.value;
    if (estadoSeleccionado === "" || estadoSeleccionado === "todos") {
      console.log('serviciosContratados', serviciosContratados)
      setServiciosFiltrados(serviciosContratados);
    } else {
      const serviciosFiltrados = serviciosContratados.filter(
        (servicio) => servicio.estadoDelServicioDelCliente.nombre === estadoSeleccionado
      );
      setServiciosFiltrados(serviciosFiltrados);
    }
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
    setServiciosContratados(response.data);
    setServiciosFiltrados(response.data); 
  };

  useEffect(() => {
    
    cargarServicios();

  }, [id]);


  return (
    <div className="container">
      <h3>Servicios de {cliente?.nombre || "Cliente no encontrado"}</h3>

      <Link to={`/clientes/asociar-servicio/${id}`}>
        <button className="btn oblcolor">Asociar Servicio</button>
      </Link>
      <div className="espacio"></div>
      <label htmlFor="slc-buscador">Filtrar por tipo:</label>
          <select id="slc-buscador" className="form-select" name="slc-buscador" ref={busSelectorFiltro}>
            <option value="">Seleccione Estado del Servicio</option>
            <option value="Activo">Activo</option>
            <option value="Pago">Pago</option>
            <option value="Vencido">Vencido</option>
            <option value="todos">Ver Todos</option>
          </select>
          <button className="btn btn-danger oblcolor" onClick={handleFiltrar}>
            Filtrar
          </button>
          <br></br>
      <div className="espacio"></div>
      {Array.isArray(serviciosFiltrados) && serviciosFiltrados.length > 0 ? (
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
            {serviciosFiltrados.map((servicio) => (
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Este cliente no tiene servicios asociados.</p>
      )}
      {/* Modal para Confirmar Eliminación */}
      <ModalEliminar
        show={modalVisible}
        handleClose={handleCerrarModal}
        handleEliminar={eliminarServicio}
        objAEliminar={"servicio"}
      />
    </div>
  );
}

export default ServiciosDelCliente;
