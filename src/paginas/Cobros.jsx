import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ModalEliminar from "../componentes/ModalEliminar";
import { borrarCobroEnAPI } from "../api/servicioCobros";
import { eliminarCobro } from "../slices/sliceCobros";

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
  //para filtrado de fechas
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 10;

  const handlePageChange = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const cobrosPaginados = Array.isArray(cobrosFiltrados)
    ? cobrosFiltrados.slice(
        (paginaActual - 1) * elementosPorPagina,
        paginaActual * elementosPorPagina
      )
    : [];

  const totalPaginas = Array.isArray(cobrosFiltrados)
    ? Math.ceil(cobrosFiltrados.length / elementosPorPagina)
    : 0;

  //para filtrado de clientes
  const handleFiltrarPorCliente = (event) => {
    setClienteSeleccionado(event.target.value);
  };
  //para filtrado de servicios
  const handleFiltrarPorServicio = (event) => {
    setServicioSeleccionado(event.target.value);
  };
  //para filtrado de fechas
  const handleFiltrarPorFechaInicio = (event) => {
    setFechaInicio(event.target.value);
  };

  const handleFiltrarPorFechaFin = (event) => {
    setFechaFin(event.target.value);
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

  const limpiarFiltros = () => {
    setClienteSeleccionado("");
    setServicioSeleccionado("");
    setFechaInicio("");
    setFechaFin("");
    document.getElementById("fecha-inicio").value = "";
    document.getElementById("fecha-fin").value = "";
    document.getElementById("slc-cliente").value = "";
    document.getElementById("slc-servicio").value = "";
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
    //FILTRADO FECHAS
    if (fechaInicio !== "" && fechaFin !== "") {
      filtrados = filtrados.filter((cobro) => {
        const fechaPago = new Date(cobro.fechaDePago);
        return (
          fechaPago >= new Date(fechaInicio) && fechaPago <= new Date(fechaFin)
        );
      });
    }
    //SIN FILTROS POR DEFECTO
    setCobrosFiltrados(filtrados);
  }, [clienteSeleccionado, servicioSeleccionado, fechaInicio, fechaFin, cobros]);

  return (
    <div>
      <FaRegMoneyBillAlt className="icono-seccion" />
      <h2>Cobros</h2>
      <Link to="/cobros/alta">
        <button className="btn oblcolor">Nuevo Cobro</button>
      </Link>

      <br></br>

      <div className="espacio"></div>
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
        <div className="col-md-3">
          <label htmlFor="slc-servicio" className="form-label">Filtrar por servicio:</label>
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
      <div className="espacio"></div>
      
      {cobrosFiltrados.length > 0 ? (
      <>
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
            {cobrosPaginados.map((cobro) => {
              return (
                <tr key={cobro.id}>
                  <td>{cobro.id}</td>
                  <td>{cobro.monto}</td>
                  <td>{cobro.monedaDelCobro.nombre}</td>
                  <td>{cobro.servicioDelCliente.cliente.nombre}</td>
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
