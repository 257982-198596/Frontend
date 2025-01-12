import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiSliders } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";
import EliminarCategoria from "../paginas/categorias/EliminarCategoria";
import { borrarCategoriaEnAPI } from "../api/servicioCategorias";
import { eliminarCategoria } from "../slices/sliceCategorias";

function Categorias() {
  const categorias = useSelector((state) => state.sliceCategorias.categorias);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  const verDetallesCategoria = (idCategoria) => {
    navigate(`/categorias/detalle/${idCategoria}`);
  };
  const editarCategoria = (idCategoria) => {
    navigate(`/categorias/editar/${idCategoria}`);
  };

  const handleAbrirModal = (idCategoria) => {
    setCategoriaSeleccionada(idCategoria);
    setShowModal(true);
  };

  const handleCerrarModal = () => {
    setShowModal(false);
    setCategoriaSeleccionada(null);
  };

  const borrarCategoria = async () => {
    try {
      console.log("Categoría seleccionada para eliminar:", categoriaSeleccionada);

      const idCategoria = await borrarCategoriaEnAPI(categoriaSeleccionada);
      const payload = { id: idCategoria };
      dispatch(eliminarCategoria(payload));
      handleCerrarModal();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <FiSliders className="icono-seccion" />   
      <h2>Categorías</h2>
      <Link to="/categorias/alta">
        <button className="btn oblcolor">Nueva Categoría</button>
      </Link>

      <br></br>
      <div className="espacio"></div>
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">#ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Detalles</th>
            <th scope="col">Editar</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => {
            return (
              <tr key={categoria.id}>
                <td>{categoria.id}</td>
                <td>{categoria.nombre}</td>

                <td>
                  <button
                    className="btn btn-danger oblcolor"
                    onClick={() => verDetallesCategoria(categoria.id)}
                  >
                    Ver Más
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger oblcolor"
                    onClick={() => editarCategoria(categoria.id)}
                  >
                    Editar
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger oblcolor"
                    onClick={() => handleAbrirModal(categoria.id)}
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
      <EliminarCategoria
        show={showModal}
        handleClose={handleCerrarModal}
        handleEliminar={borrarCategoria}
        objAEliminar={"categoría"}
      />
    </div>
  );
}

export default Categorias;