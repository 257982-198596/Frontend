import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postNuevaCategoriaAPI } from "../../api/servicioCategorias";
import { crearCategoria } from "../../slices/sliceCategorias";
import FormularioCategoria from "../../componentes/formularios/FormularioCategoria";
import { mostrarError, mostrarSuccess } from "../../componentes/Toasts";

function AltaCategorias() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const limpiarFormulario = () => {
    setFormData({
      nombre: "",
    });
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

  const submitNuevaCategoria = async (event) => {
    event.preventDefault();
    if (!validarFormulario(formData)) {
      return;
    }

    try {
      const respuestaAPI = await postNuevaCategoriaAPI(formData);
      if (respuestaAPI.status === 201 || respuestaAPI.status === 200) {
        dispatch(crearCategoria(respuestaAPI.data));
        mostrarSuccess("Categoría creada con éxito");
        limpiarFormulario();
      }
    } catch (error) {
      mostrarError(error.message);
    }
  };

  return (
    <div className="container">
      <h3>Agregar Categoría</h3>
      <FormularioCategoria
        formData={formData}
        handleChange={handleChange}
        onSubmit={submitNuevaCategoria}
        modo="alta"
      />
    </div>
  );
}

export default AltaCategorias;
