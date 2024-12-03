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

  const submitNuevoCliente = async (event) => {
    event.preventDefault();
    try{
      const idUsuarioSuscriptor = localStorage.getItem("idUsuario");
    const objCliente = { idUsuarioSuscriptor, ...formData };
    const respuestaAPI = await postNuevoClienteAPI(objCliente);
    if (respuestaAPI.status === 201 || respuestaAPI.status === 200) {
      dispatch(crearClientes(respuestaAPI.data));
      //navigate("/clientes");
      mostrarSuccess("Cliente creado con éxito");
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