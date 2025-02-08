import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FormularioCobro from "../../componentes/formularios/FormularioCobro";
import { useLocation } from "react-router-dom";

function DetalleCobros() {
  const { id } = useParams();
  const cobros = useSelector((state) => state.sliceCobros.cobros);
 
  const monedas = useSelector((state) => state.sliceMonedas.monedas);
  const clientes = useSelector((state) => state.sliceClientes.clientes);
  const mediosDePago = useSelector((state) => state.sliceMediosDePago.mediosDePago);
  //id del cliente seleccionado
  const location = useLocation();
  const clienteId = location.state?.clienteId;

  const cobro = cobros.find((s) => s.id === parseInt(id));

  const [formData, setFormData] = useState({
    cliente: "",
    servicio: "",
    descripcion: "",
    monto: "",
    moneda: "",
    fechaDePago: "",
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
        fechaDePago: cobro.fechaDePago ? new Date(cobro.fechaDePago).toISOString().split('T')[0] : "",
        medioDePago: cobro.medioPago.id || ""
      });
    }
  }, [cobro]);

  if (!cobro) {
    return <p>Cobro no encontrado.</p>;
  }

  return (
    <div className="container-fluid">
      <h3>Detalles del Cobro</h3>
      <FormularioCobro
        formData={formData}
        handleChange={() => {}} 
        onSubmit={(e) => e.preventDefault()} 
        modo="detalle"
        lasMonedas={monedas}
        losClientes={clientes}
        losMediosDePago={mediosDePago}
        clienteId={clienteId}
      />
    </div>
  );
}

export default DetalleCobros;
