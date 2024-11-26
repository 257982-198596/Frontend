import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { obtenerServicioDelClienteAPI } from "../../api/servicioServiciosDelCliente";
import FormularioServiciosDelCliente from "../../componentes/formularios/FormularioServiciosDelCliente";
import { putServicioDelClienteAPI } from "../../api/servicioServiciosDelCliente";
import { useSelector } from "react-redux";

function EditarServicioDelCliente() {
  const { idServicio } = useParams(); // ID del servicio asociado al cliente
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
  const serviciosDisponibles = useSelector((state) => state.sliceServicios.servicios);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const response = await obtenerServicioDelClienteAPI(idServicio);

        if (response.status == 200) {
          const servicio = response.data;

          setFormData({

            servicioContratadoId: servicio.servicioContratadoId, 
            precio: servicio.precio, 
            monedaDelServicioId: servicio.monedaDelServicioId, 
            fechaInicio: servicio.fechaInicio.slice(0, 10),
            frecuenciaDelServicioId: servicio.frecuenciaDelServicioId , 
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await putServicioDelClienteAPI(idServicio,formData);

      if (response.status === 200) {
        console.log(response.data);
        const clienteId = response.data.cliente.id;
        navigate(`/clientes/servicios-del-cliente/${clienteId}`);
      } else {
        throw new Error("Error al actualizar el servicio");
      }
    } catch (error) {
      console.error("Error al actualizar el servicio:", error);
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
