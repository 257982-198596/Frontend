import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import FormularioServiciosDelCliente from "../../componentes/formularios/FormularioServiciosDelCliente";
import { asociarServicioAPI } from "../../api/servicioServiciosDelCliente";


function AsociarServicioDelCliente() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    servicioContratadoId: "",
    precio: "",
    monedaDelServicioId: "",
    fechaInicio: "",
    frecuenciaDelServicioId: "",
  });

  


  const cliente = useSelector((state) =>
    state.sliceClientes.clientes.find((cliente) => cliente.id === parseInt(id))
  );
  const lasFrecuencias = useSelector((state) => state.sliceFrecuencias.frecuencias);
  const lasMonedas = useSelector((state) => state.sliceMonedas.monedas);
  const losServicios = useSelector((state) => state.sliceServicios.servicios);
 

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const nuevoServicio = { ...formData, clienteId: id };
      await asociarServicioAPI(nuevoServicio);
      alert("Servicio asociado correctamente");
    } catch (error) {
      console.error("Error al asociar el servicio:", error);
    }
  };

  return (
    <div className="container">
      <h3>Asociar Servicio a {cliente?.nombre || "Cliente no encontrado"}</h3>
      <FormularioServiciosDelCliente
        formData={formData}
        handleChange={handleChange}
        onSubmit={handleSubmit}
        serviciosDisponibles={losServicios}
        monedasDisponibles={lasMonedas}
        frecuenciasDisponibles={lasFrecuencias}
      />
    </div>
  );
}

export default AsociarServicioDelCliente;
