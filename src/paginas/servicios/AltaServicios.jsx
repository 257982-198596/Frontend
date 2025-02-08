import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postNuevoServicioAPI } from "../../api/servicioServicios";
import { crearServicios } from "../../slices/sliceServicios";
import FormularioServicio from "../../componentes/formularios/FormularioServicio";
import { mostrarError, mostrarSuccess } from "../../componentes/Toasts";


function AltaServicios() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const lasCategorias = useSelector((state) => state.sliceCategorias.categorias);

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    categoriaId: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const limpiarFormulario = () => {
    setFormData({
      nombre: "",
      descripcion: "",
      categoriaId: "",
    });
  };

  const validarFormulario = (formData) => {
    if (!formData.nombre) {
      mostrarError("El nombre es obligatorio");
      return false;
    }
    if (!formData.descripcion) {
      mostrarError("La descripción es obligatoria");
      return false;
    }
    if (!formData.categoriaId) {
      mostrarError("Debe seleccionar una categoría");
      return false;
    }
    return true;
  };

  const submitNuevoServicio = async (event) => {
    event.preventDefault();
    if (!validarFormulario(formData)) {
      return;
    }

    try {
      const idUsuarioSuscriptor = localStorage.getItem("idUsuario");
      const objServicio = { idUsuarioSuscriptor, ...formData };
      const respuestaAPI = await postNuevoServicioAPI(objServicio);
      if (respuestaAPI.status === 201 || respuestaAPI.status === 200) {
        dispatch(crearServicios(respuestaAPI.data));
        //navigate("/servicios");
        mostrarSuccess("Servicio creado con éxito");
        limpiarFormulario();
      }
    }catch(error){
      mostrarError(error.message);
      console.log("Error al crear servicio", error);
      console.log("Error mensaje", error.message);
    }
    
  };

  return (
    <div className="container-fluid">
      <h3>Agregar Servicio</h3>
      <FormularioServicio
        formData={formData}
        handleChange={handleChange}
        onSubmit={submitNuevoServicio}
        modo="alta"
        lasCategorias={lasCategorias}
      />
    </div>
  );
}

export default AltaServicios;
