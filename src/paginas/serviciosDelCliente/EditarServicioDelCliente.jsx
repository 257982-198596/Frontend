import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { obtenerServicioDelClienteAPI } from "../../api/servicioServiciosDelCliente";
import FormularioServiciosDelCliente from "../../componentes/formularios/FormularioServiciosDelCliente";
import { putServicioDelClienteAPI } from "../../api/servicioServiciosDelCliente";
import { useSelector } from "react-redux";
import { mostrarError } from "../../componentes/Toasts";

function EditarServicioDelCliente() {
  const { idServicio } = useParams(); // ID del servicio asociado al cliente
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    descripcion: "",
    servicioContratadoId: "",
    precio: "",
    monedaDelServicioId: "",
    fechaInicio: "",
    frecuenciaDelServicioId: "",
  });

  const frecuenciasDisponibles = useSelector(
    (state) => state.sliceFrecuencias.frecuencias
  );
  const monedasDisponibles = useSelector((state) => state.sliceMonedas.monedas);
  const serviciosDisponibles = useSelector(
    (state) => state.sliceServicios.servicios
  );

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const response = await obtenerServicioDelClienteAPI(idServicio);

        if (response.status == 200) {
          const servicio = response.data;

          setFormData({
            descripcion: servicio.descripcion,
            servicioContratadoId: servicio.servicioContratadoId,
            precio: servicio.precio,
            monedaDelServicioId: servicio.monedaDelServicioId,
            fechaInicio: servicio.fechaInicio.slice(0, 10),
            frecuenciaDelServicioId: servicio.frecuenciaDelServicioId,
          });
        }
      } catch (error) {
        console.error("Error al cargar datos del servicio:", error);
      }
    };
    cargarDatos();
  }, [idServicio]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validarFormulario = (formData) => {
    if (!formData.descripcion) {
      mostrarError("La descripción es obligatoria");
      return false;
    }
    if (formData.descripcion.length < 5) {
      mostrarError("La descripción debe tener al menos 5 caracteres");
      return false;
    }
    if (!formData.servicioContratadoId) {
      mostrarError("Debe seleccionar un servicio");
      return false;
    }
    if (!formData.precio) {
      mostrarError("El precio es obligatorio");
      return false;
    }
    if (!/^\d+(\.\d{1,2})?$/.test(formData.precio)) {
      mostrarError("El precio debe ser un número válido");
      return false;
    }
    if (parseFloat(formData.precio) < 0) {
      mostrarError("El precio no puede ser negativo");
      return false;
    }
    if (!formData.monedaDelServicioId) {
      mostrarError("Debe seleccionar una moneda");
      return false;
    }
    if (!formData.fechaInicio) {
      mostrarError("La fecha de inicio es obligatoria");
      return false;
    }
    
    if (!formData.frecuenciaDelServicioId) {
      mostrarError("Debe seleccionar una frecuencia");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validarFormulario(formData)) {
      return;
    }
    try {
      const response = await putServicioDelClienteAPI(idServicio, formData);

      if (response.status === 200) {
        console.log(response.data);
        const clienteId = response.data.cliente.id;
        navigate(`/clientes/servicios-del-cliente/${clienteId}`);
      } else {
        throw new Error("Error al actualizar el servicio");
      }
    } catch (error) {
      console.error("Error al actualizar el servicio:", error);
      mostrarError(error.message);
    }
  };

  return (
    <div className="container">
      <h3>Editar Servicio del Cliente</h3>
      <FormularioServiciosDelCliente
        formData={formData}
        handleChange={handleChange}
        onSubmit={handleSubmit}
        modo="editar"
        serviciosDisponibles={serviciosDisponibles}
        monedasDisponibles={monedasDisponibles}
        frecuenciasDisponibles={frecuenciasDisponibles}
      />
    </div>
  );
}

export default EditarServicioDelCliente;
