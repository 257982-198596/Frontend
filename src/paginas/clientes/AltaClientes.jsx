import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postNuevoClienteAPI } from "../../api/servicioClientes";
import { crearClientes } from "../../slices/sliceClientes";
import FormularioCliente from "../../componentes/formularios/FormularioCliente";
import { mostrarError, mostrarSuccess } from "../../componentes/Toasts";
import { ToastContainer } from 'react-toastify';

export default function AltaClientes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const losDocumentos = useSelector((state) => state.sliceTiposDocumentos.tiposDocumentos);
  const losPaises = useSelector((state) => state.slicePaises.paises);

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

  const handleChange = (event) => {
    
    const { name, value } = event.target;
    //console.log("Cambio detectado:", { name, value });
    setFormData({ ...formData, [name]: value });
  };

  const validarFormulario = (formData) => {
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

  const limpiarFormulario = () => {
    setFormData({
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
  };

  const submitNuevoCliente = async (event) => {
    event.preventDefault();
    if (!validarFormulario(formData)) {
      return;
    }

    try{
      const idUsuarioSuscriptor = localStorage.getItem("idUsuario");
    const objCliente = { idUsuarioSuscriptor, ...formData };
    const respuestaAPI = await postNuevoClienteAPI(objCliente);
    if (respuestaAPI.status === 201 || respuestaAPI.status === 200) {
      dispatch(crearClientes(respuestaAPI.data));
      //navigate("/clientes");
      mostrarSuccess("Cliente creado con éxito");
      limpiarFormulario();
    }
    } catch (error) {
      console.log(error)
      
      mostrarError(error.message);
    }
  };

  return (
    <div className="container">
      <h3>Agregar Cliente</h3>
      <FormularioCliente
        formData={formData}
        handleChange={handleChange}
        onSubmit={submitNuevoCliente}
        modo="alta"
        losDocumentos={losDocumentos}
        losPaises={losPaises}
      />
      <ToastContainer />
    </div>
    
  );
}