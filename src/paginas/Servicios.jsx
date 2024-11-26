
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";
import EliminarServicio from "../paginas/servicios/EliminarServicio";
import { borrarServicioEnAPI } from "../api/servicioServicios";
import { eliminarServicio } from "../slices/sliceServicios"

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
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div>
      <FiShoppingCart className="icono-seccion" />
      <h2>Servicios</h2>
      <Link to="/servicios/alta">
        <button className="btn oblcolor">Nuevo Servicio</button>
      </Link>

      <br></br>
      <div className="espacio"></div>
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
          {servicios.map((servicio) => {
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

      {/* Modal para Confirmar Eliminación */}
      <EliminarServicio
        show={showModal}
        handleClose={handleCerrarModal}
        handleEliminar={borrarServicio}
        objAEliminar={"servicio"}
      />
    </div>
  );
}

export default Servicios;
