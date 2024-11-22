import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FormularioServicio from "../../componentes/formularios/FormularioServicio";

function DetalleServicio() {
  const { id } = useParams();
  const servicios = useSelector((state) => state.sliceServicios.servicios);
  const lasCategorias = useSelector((state) => state.sliceCategorias.categorias);

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

  if (!servicio) {
    return <p>Servicio no encontrado.</p>;
  }

  return (
    <div className="container">
      <h3>Detalles del Servicio</h3>
      <FormularioServicio
        formData={formData}
        handleChange={() => {}} 
        onSubmit={(e) => e.preventDefault()} 
        modo="detalle"
        lasCategorias={lasCategorias}
      />
    </div>
  );
}

export default DetalleServicio;
