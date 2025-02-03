import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { putActualizarCategoriaAPI } from "../../api/servicioCategorias";
import { actualizarCategoria } from "../../slices/sliceCategorias";
import FormularioCategoria from "../../componentes/formularios/FormularioCategoria";
import { mostrarError } from "../../componentes/Toasts";

function EditarCategoria() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const categorias = useSelector((state) => state.sliceCategorias.categorias);
  const categoria = categorias.find((c) => c.id === parseInt(id));

  const [formData, setFormData] = useState({
    nombre: "",
  });

  useEffect(() => {
    if (categoria) {
      setFormData({
        nombre: categoria.nombre || "",
      });
    }
  }, [categoria]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validarFormulario = (formData) => {
    if (!formData.nombre) {
      mostrarError("El nombre es obligatorio");
      return false;
    }
    if (formData.nombre.length <= 3) {
      mostrarError("El nombre debe tener más de tres caracteres");
      return false;
    }
    return true;
  };

  const submitEditarCategoria = async (event) => {
    event.preventDefault();
    if (!validarFormulario(formData)) {
      return;
    }
    try {
      const objCategoria = { id, ...formData };
      const respuestaAPI = await putActualizarCategoriaAPI(objCategoria);
      if (respuestaAPI.status === 200) {
        dispatch(actualizarCategoria(respuestaAPI.data));
        navigate("/categorias");
      }
    } catch (error) {
      mostrarError(error.message);
    }
  };

  if (!categoria) {
    return <p>Categoría no encontrada.</p>;
  }

  return (
    <div className="container">
      <h3>Editar Categoría</h3>
      <FormularioCategoria
        formData={formData}
        handleChange={handleChange}
        onSubmit={submitEditarCategoria}
        modo="editar"
      />
    </div>
  );
}

export default EditarCategoria;
