import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { putActualizarServicioAPI } from "../../api/servicioServicios";
import { actualizarServicios } from "../../slices/sliceServicios";
import FormularioServicio from "../../componentes/formularios/FormularioServicio";

function EditarServicio() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const lasCategorias = useSelector((state) => state.sliceCategorias.categorias);
  const servicios = useSelector((state) => state.sliceServicios.servicios);

  const servicio = servicios.find((s) => s.id === parseInt(id));

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    categoriaId: "",
  });

  useEffect(() => {
    if (servicio) {
      setFormData({
        nombre: servicio.nombre || "",
        descripcion: servicio.descripcion || "",
        categoriaId: servicio.categoriaId || "",
      });
    }
  }, [servicio]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitEditarServicio = async (event) => {
    event.preventDefault();
    const idUsuarioSuscriptor = localStorage.getItem("idUsuario");
    const objServicio = { id, idUsuarioSuscriptor, ...formData };

    const respuestaAPI = await putActualizarServicioAPI(objServicio);
    if (respuestaAPI.status === 200) {
      dispatch(actualizarServicios(respuestaAPI.data));
      navigate("/servicios");
    }
  };

  if (!servicio) {
    return <p>Servicio no encontrado.</p>;
  }

  return (
    <div className="container">
      <h3>Editar Servicio</h3>
      <FormularioServicio
        formData={formData}
        handleChange={handleChange}
        onSubmit={submitEditarServicio}
        modo="editar"
        lasCategorias={lasCategorias}
      />
    </div>
  );
}

export default EditarServicio;
