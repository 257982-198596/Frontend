import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FormularioCategoria from "../../componentes/formularios/FormularioCategoria";

function DetalleCategoria() {
  const { id } = useParams();
  const categorias = useSelector((state) => state.sliceCategorias.categorias);
  const categoria = categorias.find((c) => c.id === parseInt(id));

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
  });

  useEffect(() => {
    if (categoria) {
      setFormData({
        nombre: categoria.nombre || "",
        descripcion: categoria.descripcion || "",
      });
    }
  }, [categoria]);

  if (!categoria) {
    return <p>Categoría no encontrada.</p>;
  }

  return (
    <div className="container">
      <h3>Detalles de la Categoría</h3>
      <FormularioCategoria
        formData={formData}
        handleChange={() => {}} 
        onSubmit={(e) => e.preventDefault()} 
        modo="detalle"
      />
    </div>
  );
}

export default DetalleCategoria;
