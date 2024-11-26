import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import FormularioServiciosDelCliente from "../../componentes/formularios/FormularioServiciosDelCliente";
import { postServicioDelClienteAPI } from "../../api/servicioServiciosDelCliente";
import { useNavigate } from "react-router-dom";


function AsociarServicioDelCliente() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const nuevoServicio = { ...formData, ClienteId: id };
      const response = await postServicioDelClienteAPI(nuevoServicio);
      if (response.status === 201 || response.status === 200) {
        //dispatch(crearServicioDelCliente(respuestaAPI.data));
        navigate("/clientes/servicios-del-cliente/" + id);
      }
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
        modo="alta"
        serviciosDisponibles={losServicios}
        monedasDisponibles={lasMonedas}
        frecuenciasDisponibles={lasFrecuencias}
      />
    </div>
  );
}

export default AsociarServicioDelCliente;
