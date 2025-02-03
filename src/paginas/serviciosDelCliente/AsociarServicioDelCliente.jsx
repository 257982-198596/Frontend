import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import FormularioServiciosDelCliente from "../../componentes/formularios/FormularioServiciosDelCliente";
import { postServicioDelClienteAPI } from "../../api/servicioServiciosDelCliente";
import { useNavigate } from "react-router-dom";
import { mostrarError, mostrarSuccess } from "../../componentes/Toasts";

function AsociarServicioDelCliente() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    descripcion: "",
    servicioContratadoId: "",
    precio: "",
    monedaDelServicioId: "",
    fechaInicio: "",
    frecuenciaDelServicioId: "",
  });

  const navigate = useNavigate();

  const cliente = useSelector((state) =>
    state.sliceClientes.clientes.find((cliente) => cliente.id === parseInt(id))
  );
  const lasFrecuencias = useSelector(
    (state) => state.sliceFrecuencias.frecuencias
  );
  const lasMonedas = useSelector((state) => state.sliceMonedas.monedas);
  const losServicios = useSelector((state) => state.sliceServicios.servicios);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const limpiarFormulario = () => {
    setFormData({
      descripcion: "",
      servicioContratadoId: "",
      precio: "",
      monedaDelServicioId: "",
      fechaInicio: "",
      frecuenciaDelServicioId: "",
    });
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
      const nuevoServicio = { ...formData, ClienteId: id };
      const response = await postServicioDelClienteAPI(nuevoServicio);
      if (response.status === 201 || response.status === 200) {
        mostrarSuccess("Servicio asociado con éxito");
        limpiarFormulario();
        //navigate("/clientes/servicios-del-cliente/" + id);
      }
    } catch (error) {
      mostrarError(error.message);
    }
  };

  return (
    <div className="container">
      <h3>Asociar Servicio a {cliente?.nombre || "Cliente no encontrado"}</h3>
      <FormularioServiciosDelCliente
        formData={formData}
        handleChange={handleChange}
        onSubmit={handleSubmit}
        modo="alta"
        serviciosDisponibles={losServicios}
        monedasDisponibles={lasMonedas}
        frecuenciasDisponibles={lasFrecuencias}
      />
    </div>
  );
}

export default AsociarServicioDelCliente;
