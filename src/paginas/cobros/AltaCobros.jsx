import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import FormularioCobro from "../../componentes/formularios/FormularioCobro";
import { postNuevoCobroAPI } from "../../api/servicioCobros";
import { crearCobro } from "../../slices/sliceCobros";

function AltaCobros() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const monedas = useSelector((state) => state.sliceMonedas.monedas);
  const clientes = useSelector((state) => state.sliceClientes.clientes);

  const [clienteId, setClienteId] = useState("");
  const [formData, setFormData] = useState({
    cliente: "",
    servicio: "",
    descripcion: "",
    monto: "",
    moneda: ""
  });

  // Actualizar cliente seleccionado
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    // Actualizar clienteId para cargar los servicios activos
    if (name === "cliente") {
      setClienteId(value);
    }
  };

  // Enviar nuevo cobro
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await postNuevoCobroAPI(formData);
      if (response.status === 201) {
        dispatch(crearCobro(response.data));
        navigate("/cobros");
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
        clienteId={clienteId} 
      />
    </div>
  );
}

export default AltaCobros;
