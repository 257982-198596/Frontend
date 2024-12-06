import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { putActualizarClienteAPI } from "../../api/servicioClientes";
import { actualizarClientes } from "../../slices/sliceClientes";
import FormularioCliente from "../../componentes/formularios/FormularioCliente";
import { mostrarError } from "../../componentes/Toasts";


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

  const validarFormulario = (formData) => {
    console.log(formData.nombre)
    if (!formData.nombre) {
      mostrarError("El nombre es obligatorio");
 
      return false;
    }
    if (formData.nombre.length <= 3) {
      mostrarError("El nombre debe tener más de 3 caracteres");
      return false;
    }
    if (!formData.idDocumento) {
      mostrarError("El tipo de documento es obligatorio");
      return false;
    }
    if (!formData.numDocumento) {
      mostrarError("El número de documento es obligatorio");
      return false;
    }
    if (!/^\d+$/.test(formData.numDocumento)) {
      mostrarError("El número de documento debe ser numérico");
      return false;
    }
    if (!formData.telefono) {
      mostrarError("El número de teléfono es obligatorio");
      return false;
    }
    if (formData.telefono.length <= 7) {
      mostrarError("El teléfono debe tener más de 7 caracteres");
      return false;
    }
    if (!/^\d+$/.test(formData.telefono)) {
      mostrarError("El teléfono debe ser numérico");
      return false;
    }
    if (!formData.direccion) {
      mostrarError("El campo dirección es obligatorio");
      return false;
    }
    if (formData.direccion.length <= 5) {
      mostrarError("La dirección debe tener más de 5 caracteres");
      return false;
    }
    if (!formData.persona) {
      mostrarError("La persona de contacto es obligatoria");
      return false;
    }
    if (formData.persona.length <= 5) {
      mostrarError("La persona de contacto debe tener más de 5 caracteres");
      return false;
    }
    if (!formData.idPais) {
      mostrarError("El país de origen es obligatorio");
      return false;
    }
    if (!formData.email) {
      mostrarError("El correo electrónico es obligatorio");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      mostrarError("El correo electrónico no es válido");
      return false;
    }
    if (!formData.password) {
      mostrarError("La contraseña es obligatoria");
      return false;
    }
    return true;
  };


  const submitEditarCliente = async (event) => {
    event.preventDefault();
    console.log("Editando cliente", formData);
    if (!validarFormulario(formData)) {
      return;
    }
    try{
      const idUsuarioSuscriptor = localStorage.getItem("idUsuario");
      const objCliente = { id, idUsuarioSuscriptor, ...formData };
  
      const respuestaAPI = await putActualizarClienteAPI(objCliente);
      if (respuestaAPI.status === 200) {
        dispatch(actualizarClientes(respuestaAPI.data));
        navigate("/clientes"); // Navegar de vuelta a la lista de clientes
      }
    }catch(error){
      mostrarError(error.message);
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
