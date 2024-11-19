import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { putActualizarClienteAPI } from "../../api/servicioClientes";
import { actualizarClientes } from "../../slices/sliceClientes";
import FormularioCliente from "../../componentes/formularios/FormularioCliente";

function EditarCliente() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Obtener el ID del cliente desde la URL

  const losDocumentos = useSelector((state) => state.sliceTiposDocumentos.tiposDocumentos);
  const losPaises = useSelector((state) => state.slicePaises.paises);
  const clientes = useSelector((state) => state.sliceClientes.clientes);

  const cliente = clientes.find((c) => c.id === parseInt(id)); // Obtener el cliente por ID

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitEditarCliente = async (event) => {
    event.preventDefault();
    const idUsuarioSuscriptor = localStorage.getItem("idUsuario");
    const objCliente = { id, idUsuarioSuscriptor, ...formData };

    const respuestaAPI = await putActualizarClienteAPI(objCliente);
    if (respuestaAPI.status === 200) {
      dispatch(actualizarClientes(respuestaAPI.data));
      navigate("/clientes"); // Navegar de vuelta a la lista de clientes
    }
  };

  if (!cliente) {
    return <p>Cliente no encontrado.</p>;
  }

  return (
    <div className="container">
      <h3>Editar Cliente</h3>
      <FormularioCliente
        formData={formData}
        handleChange={handleChange}
        onSubmit={submitEditarCliente}
        modo="editar"
        losDocumentos={losDocumentos}
        losPaises={losPaises}
      />
    </div>
  );
}

export default EditarCliente;
