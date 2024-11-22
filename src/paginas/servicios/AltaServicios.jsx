import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postNuevoServicioAPI } from "../../api/servicioServicios";
import { crearServicios } from "../../slices/sliceServicios";
import FormularioServicio from "../../componentes/formularios/FormularioServicio";

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

  const submitNuevoServicio = async (event) => {
    event.preventDefault();
    const idUsuarioSuscriptor = localStorage.getItem("idUsuario");
    const objServicio = { idUsuarioSuscriptor, ...formData };
    const respuestaAPI = await postNuevoServicioAPI(objServicio);
    if (respuestaAPI.status === 201 || respuestaAPI.status === 200) {
      dispatch(crearServicios(respuestaAPI.data));
      navigate("/servicios");
    }
  };

  return (
    <div className="container">
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
