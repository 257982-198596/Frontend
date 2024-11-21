import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postNuevoClienteAPI } from "../../api/servicioClientes";
import { crearClientes } from "../../slices/sliceClientes";
import FormularioCliente from "../../componentes/formularios/FormularioCliente";

function AltaClientes() {
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
    
    const idUsuarioSuscriptor = localStorage.getItem("idUsuario");
    const objCliente = { idUsuarioSuscriptor, ...formData };
    const respuestaAPI = await postNuevoClienteAPI(objCliente);
    if (respuestaAPI.status === 201 || respuestaAPI.status === 200) {
      dispatch(crearClientes(respuestaAPI.data));
      navigate("/clientes");
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
    </div>
  );
}

export default AltaClientes;
