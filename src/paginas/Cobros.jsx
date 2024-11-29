
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import  ModalEliminar from "../componentes/ModalEliminar";
import { borrarCobroEnAPI } from "../api/servicioCobros";
import { eliminarCobro } from "../slices/sliceCobros";

function Cobros() {
  const cobros = useSelector((state) => state.sliceCobros.cobros);

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

  const handleAbrirModal = (idCobro) => {
    setCobroSeleccionado(idCobro);
    setShowModal(true);
  };

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
  return (
    <div>
      <FaRegMoneyBillAlt className="icono-seccion" />
      <h2>Cobros</h2>
      <Link to="/cobros/alta">
        <button className="btn oblcolor">Nuevo Cobro</button>
      </Link>

      <br></br>
      
      <div className="espacio"></div>
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">#ID</th>
            <th scope="col">Monto</th>
            <th scope="col">Moneda</th>
            <th scope="col">Cliente</th>
            <th scope="col">Servicio</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Detalles</th>
            <th scope="col">Editar</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {cobros.map((cobro) => {
            return (
              <tr key={cobro.id}>
                <td>{cobro.id}</td>
                <td>{cobro.monto}</td>
                <td>{cobro.monedaDelCobro.nombre}</td>
                <td>{cobro.servicioDelCliente.clienteId}</td>
                <td>{cobro.servicioDelCliente.servicioContratado.nombre}</td>
                <td>{cobro.servicioDelCliente.descripcion}</td>
                <td>
                  <button
                    className="btn btn-danger oblcolor"
                    onClick={() => verDetallesCobro(cobro.id, cobro.servicioDelCliente.clienteId)}
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
