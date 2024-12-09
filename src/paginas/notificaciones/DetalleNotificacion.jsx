import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FormularioNotificacion from "../../componentes/formularios/FormularioNotificacion";

function DetalleNotificacion() {
  const { id } = useParams();
  const notificaciones = useSelector((state) => state.sliceNotificaciones.notificaciones);

  const notificacion = notificaciones.find((n) => n.id === parseInt(id));

  const [formData, setFormData] = useState({
    cliente: "",
    mensaje: "",
    fechaEnvio: "",
    estado: "",
    servicio: ""
  });

  useEffect(() => {
    if (notificacion) {
      setFormData({
        cliente: notificacion.clienteNotificado.nombre || "",
        mensaje: notificacion.mensaje || "",
        fechaEnvio: notificacion.fechaEnvio ? new Date(notificacion.fechaEnvio).toISOString().split('T')[0] : "",
        estado: notificacion.estadoDeNotificacion.nombre || "",
        servicio: notificacion.servicioNotificado.descripcion || ""
      });
    }
  }, [notificacion]);

  if (!notificacion) {
    return <p>Notificación no encontrada.</p>;
  }

  return (
    <div className="container">
      <h3>Detalles de la Notificación</h3>
      <FormularioNotificacion
        formData={formData}
        handleChange={() => {}} 
        onSubmit={(e) => e.preventDefault()} 
        modo="detalle"
      />
    </div>
  );
}

export default DetalleNotificacion;
