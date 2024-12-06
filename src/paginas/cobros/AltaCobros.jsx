import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import FormularioCobro from "../../componentes/formularios/FormularioCobro";
import { postNuevoCobroAPI } from "../../api/servicioCobros";
import { crearCobro } from "../../slices/sliceCobros";
import { mostrarError, mostrarSuccess } from "../../componentes/Toasts";

function AltaCobros() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const monedas = useSelector((state) => state.sliceMonedas.monedas);
  const clientes = useSelector((state) => state.sliceClientes.clientes);
  const mediosDePago = useSelector(
    (state) => state.sliceMediosDePago.mediosDePago
  );

  const [clienteId, setClienteId] = useState("");
  const [formData, setFormData] = useState({
    cliente: "",
    servicio: "",
    monto: "",
    moneda: "",
    fechaDePago: "",
    medioDePago: "",
  });

  const limpiarFormulario = () => {
    setFormData({
      cliente: "",
      servicio: "",
      monto: "",
      moneda: "",
      fechaDePago: "",
      medioDePago: "",
    });
  };

  // Actualizar cliente seleccionado
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log("Cambio detectado:", { name, value });
    // Actualizar clienteId para cargar los servicios activos
    if (name === "cliente") {
      setClienteId(value);
    }
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

  // Enviar nuevo cobro
  const onSubmit = async (event) => {
    event.preventDefault();
    if (!validarFormulario(formData)) {
      return;
    }
    try {
      const response = await postNuevoCobroAPI(formData);
      if (response.status === 201) {
        dispatch(crearCobro(response.data));
        mostrarSuccess("Cobro creado con éxito");
        limpiarFormulario();
        //navigate("/cobros");
      }
    } catch (error) {
      console.error("Error al crear el cobro:", error);
    }
  };

  return (
    <div className="container">
      <h3>Alta de Cobro</h3>
      <FormularioCobro
        formData={formData}
        handleChange={handleChange}
        onSubmit={onSubmit}
        modo="alta"
        lasMonedas={monedas}
        losClientes={clientes}
        losMediosDePago={mediosDePago}
        clienteId={clienteId}
      />
    </div>
  );
}

export default AltaCobros;
