import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FormularioCliente from "../../componentes/formularios/FormularioCliente";

function DetalleCliente() {
  const { id } = useParams(); 
  const clientes = useSelector((state) => state.sliceClientes.clientes);
  const losDocumentos = useSelector((state) => state.sliceTiposDocumentos.tiposDocumentos);
  const losPaises = useSelector((state) => state.slicePaises.paises);

  const cliente = clientes.find((c) => c.id === parseInt(id)); 

  const [formData, setFormData] = useState({
    nombre: "",
    idDocumento: "",
    numDocumento: "",
    telefono: "",
    direccion: "",
    persona: "",
    idPais: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (cliente) {
      setFormData({
        nombre: cliente.nombre || "",
        idDocumento: cliente.documentoId || "",
        numDocumento: cliente.numDocumento || "",
        telefono: cliente.telefono || "",
        direccion: cliente.direccion || "",
        persona: cliente.personaContacto || "",
        idPais: cliente.paisId || "",
        email: cliente.usuarioLogin?.email || "",
        password: cliente.usuarioLogin?.password || "",
      });
    }
  }, [cliente]);

  if (!cliente) {
    return <p>Cliente no encontrado.</p>;
  }

  return (
    <div className="container">
      <h3>Detalles del Cliente</h3>
      <FormularioCliente
        formData={formData}
        handleChange={() => {}} 
        onSubmit={(e) => e.preventDefault()} 
        modo="detalle"
        losDocumentos={losDocumentos}
        losPaises={losPaises}
      />
    </div>
  );
}

export default DetalleCliente;
