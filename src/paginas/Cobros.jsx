import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import ModalEliminar from "../componentes/ModalEliminar";
import { borrarCobroEnAPI } from "../api/servicioCobros";
import { eliminarCobro } from "../slices/sliceCobros";
import { useEffect } from "react";

function Cobros() {
  const cobros = useSelector((state) => state.sliceCobros.cobros);

  //para filtrado de clientes
  const clientes = useSelector((state) => state.sliceClientes.clientes);
  //para filtrado de servicios
  const servicios = useSelector((state) => state.sliceServicios.servicios);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [cobroSeleccionado, setCobroSeleccionado] = useState(null);

  const verDetallesCobro = (idCobro, clienteId) => {
    navigate(`/cobros/detalle/${idCobro}`, { state: { clienteId } });
  };
  const editarCobro = (idCobro) => {
    navigate(`/cobros/editar/${idCobro}`);
  };

  //para filtrado de clientes
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [cobrosFiltrados, setCobrosFiltrados] = useState(cobros);
  //para filtrado de servicios
  const [servicioSeleccionado, setServicioSeleccionado] = useState("");

  //para filtrado de clientes
  const handleFiltrarPorCliente = (event) => {
    setClienteSeleccionado(event.target.value);
  };
  //para filtrado de servicios
  const handleFiltrarPorServicio = (event) => {
    setServicioSeleccionado(event.target.value);
  };

  //Para eliminacion de cobros
  const handleAbrirModal = (idCobro) => {
    setCobroSeleccionado(idCobro);
    setShowModal(true);
  };

  //Para eliminacion de cobros
  const handleCerrarModal = () => {
    setShowModal(false);
    setCobroSeleccionado(null);
  };

  const borrarCobro = async () => {
    try {
      console.log("Cobro seleccionado para eliminar:", cobroSeleccionado);

      const idCobro = await borrarCobroEnAPI(cobroSeleccionado);
      const payload = { id: idCobro };
      dispatch(eliminarCobro(payload));
      handleCerrarModal();
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    let filtrados = cobros;
    //FILTRADO CLIENTES
    if (clienteSeleccionado !== "" && clienteSeleccionado !== "todos") {
      filtrados = filtrados.filter(
        (cobro) =>
          cobro.servicioDelCliente.clienteId === parseInt(clienteSeleccionado)
      );
    }
    //FILTRADO SERVICIOS
    if (servicioSeleccionado !== "" && servicioSeleccionado !== "todos") {
      filtrados = filtrados.filter(
        (cobro) =>
          cobro.servicioDelCliente.servicioContratado.id ===
          parseInt(servicioSeleccionado)
      );
    }
    //SIN FILTROS POR DEFECTO
    setCobrosFiltrados(filtrados);
  }, [clienteSeleccionado, servicioSeleccionado, cobros]);

  return (
    <div>
      <FaRegMoneyBillAlt className="icono-seccion" />
      <h2>Cobros</h2>
      <Link to="/cobros/alta">
        <button className="btn oblcolor">Nuevo Cobro</button>
      </Link>

      <br></br>

      <div className="espacio"></div>
      <div className="d-flex align-items-center">
        <div className="me-3">
          <label htmlFor="slc-cliente">Filtrar por cliente:</label>
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
        <div>
          <label htmlFor="slc-servicio">Filtrar por servicio:</label>
          <select
            id="slc-servicio"
            name="slc-servicio"
            className="form-select"
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
      <br></br>
      <div className="espacio"></div>
      
      {cobrosFiltrados.length > 0 ? (
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">#ID</th>
            <th scope="col">Monto</th>
            <th scope="col">Moneda</th>
            <th scope="col">Cliente</th>
            <th scope="col">Servicio</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Fecha de Pago</th>
            <th scope="col">Detalles</th>
            <th scope="col">Editar</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {cobrosFiltrados.map((cobro) => {
            return (
              <tr key={cobro.id}>
                <td>{cobro.id}</td>
                <td>{cobro.monto}</td>
                <td>{cobro.monedaDelCobro.nombre}</td>
                <td>{cobro.servicioDelCliente.clienteId}</td>
                <td>{cobro.servicioDelCliente.servicioContratado.nombre}</td>
                <td>{cobro.servicioDelCliente.descripcion}</td>
                <td>{new Date(cobro.fechaDePago).toLocaleDateString()}</td>
                
                <td>
                  <button
                    className="btn btn-danger oblcolor"
                    onClick={() =>
                      verDetallesCobro(
                        cobro.id,
                        cobro.servicioDelCliente.clienteId
                      )
                    }
                  >
                    Ver Más
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger oblcolor"
                    onClick={() => editarCobro(cobro.id)}
                  >
                    Editar
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger oblcolor"
                    onClick={() => handleAbrirModal(cobro.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      ) : (
        <p>No hay cobros según el criterio de filtro seleccionado.</p>
      )}


      {/* Modal para Confirmar Eliminación */}
      <ModalEliminar
        show={showModal}
        handleClose={handleCerrarModal}
        handleEliminar={borrarCobro}
        objAEliminar={"cobro"}
      />
    </div>
  );
}

export default Cobros;
