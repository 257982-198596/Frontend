import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { putActualizarCobroAPI } from "../../api/servicioCobros";
import { actualizarCobros } from "../../slices/sliceCobros";
import FormularioCobro from "../../componentes/formularios/FormularioCobro";

function EditarCobros() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const monedas = useSelector((state) => state.sliceMonedas.monedas);
  const clientes = useSelector((state) => state.sliceClientes.clientes);
  const mediosDePago = useSelector((state) => state.sliceMediosDePago.mediosDePago);
  const cobros = useSelector((state) => state.sliceCobros.cobros);

  const cobro = cobros.find((c) => c.id === parseInt(id));

  const [formData, setFormData] = useState({
    cliente: "",
    servicio: "",
    descripcion: "",
    monto: "",
    moneda: "",
    medioDePago: ""
  });

  useEffect(() => {
    if (cobro) {
      setFormData({
        cliente: cobro.servicioDelCliente.clienteId || "",
        servicio: cobro.servicioDelCliente.id || "",
        descripcion: cobro.servicioDelCliente.descripcion || "",
        monto: cobro.monto || "",
        moneda: cobro.monedaDelCobro.id || "",
        medioDePago: cobro.medioPago.id || ""
      });
    }
  }, [cobro]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitEditarCobro = async (event) => {
    event.preventDefault();
    const objCobro = { id, ...formData };

    const respuestaAPI = await putActualizarCobroAPI(objCobro);
    if (respuestaAPI.status === 200) {
      dispatch(actualizarCobros(respuestaAPI.data));
      navigate("/cobros");
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
      />
    </div>
  );
}

export default EditarCobros;