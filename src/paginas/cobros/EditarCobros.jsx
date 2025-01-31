import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { putActualizarCobroAPI } from "../../api/servicioCobros";
import { actualizarCobros } from "../../slices/sliceCobros";
import FormularioCobro from "../../componentes/formularios/FormularioCobro";
import { mostrarError } from "../../componentes/Toasts";

function EditarCobros() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const monedas = useSelector((state) => state.sliceMonedas.monedas);
  const clientes = useSelector((state) => state.sliceClientes.clientes);
  const mediosDePago = useSelector(
    (state) => state.sliceMediosDePago.mediosDePago
  );
  const cobros = useSelector((state) => state.sliceCobros.cobros);

  const cobro = cobros.find((c) => c.id === parseInt(id));

  const [formData, setFormData] = useState({
    cliente: "",
    servicio: "",
    descripcion: "",
    monto: "",
    moneda: "",
    fechaDePago: "",
    medioDePago: "",
  });

  useEffect(() => {
    if (cobro && cobro.servicioDelCliente) {
      setFormData({
        cliente: cobro.servicioDelCliente.clienteId || "",
        servicio: cobro.servicioDelCliente.id || "",
        descripcion: cobro.servicioDelCliente.descripcion || "",
        monto: cobro.monto || "",
        moneda: cobro.monedaDelCobro.id || "",
        fechaDePago: cobro.fechaDePago ? new Date(cobro.fechaDePago).toISOString().split('T')[0] : "",
        medioDePago: cobro.medioPago.id || "",
      });
    }
  }, [cobro]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validarFormulario = (formData) => {
    if (!formData.cliente) {
      mostrarError("Debe seleccionar un cliente");
      return false;
    }
    if (!formData.servicio) {
      mostrarError("Debe seleccionar un servicio");
      return false;
    }
    if (!formData.monto) {
      mostrarError("Debe ingresar un monto");
      return false;
    }
    if (!/^\d+(\.\d{1,2})?$/.test(formData.monto)) {
      mostrarError("El monto debe ser un número válido");
      return false;
    }
    if (parseFloat(formData.monto) < 0) {
      mostrarError("El monto no puede ser negativo");
      return false;
    }
    if (!formData.moneda) {
      mostrarError("Debe seleccionar una moneda");
      return false;
    }
    if (!formData.medioDePago) {
      mostrarError("Debe seleccionar un medio de pago");
      return false;
    }
    return true;
  };

  const submitEditarCobro = async (event) => {
    event.preventDefault();
    if (!validarFormulario(formData)) {
      return;
    }
    try {
      const objCobro = { id, ...formData };
      const respuestaAPI = await putActualizarCobroAPI(objCobro);
      if (respuestaAPI.status === 200) {
        dispatch(actualizarCobros(respuestaAPI.data));
        navigate("/cobros");
      }
    } catch (error) {
      mostrarError(error.message);
    }
  };

  if (!cobro) {
    return <p>Cobro no encontrado.</p>;
  }

  return (
    <div className="container">
      <h3>Editar Cobro</h3>
      <FormularioCobro
        formData={formData}
        handleChange={handleChange}
        onSubmit={submitEditarCobro}
        modo="editar"
        lasMonedas={monedas}
        losClientes={clientes}
        losMediosDePago={mediosDePago}
        clienteId={formData.cliente}
        servicioId={formData.servicio} 
      />
    </div>
  );
}

export default EditarCobros;
