import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useRef, useEffect, useState } from "react";
import { putActualizarClienteAPI } from "../../api/servicioClientes";
import { actualizarClientes } from "../../slices/sliceClientes";

function EditarCliente() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Obtener el ID del cliente desde la URL

  const losDocumentos = useSelector(
    (state) => state.sliceTiposDocumentos.tiposDocumentos
  );
  const losPaises = useSelector((state) => state.slicePaises.paises);
  const clientes = useSelector((state) => state.sliceClientes.clientes);

  const cliente = clientes.find((c) => c.id === parseInt(id)); // Obtener el cliente por ID
  console.log("cliente", cliente);
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
        email: cliente.usuarioLogin.email || "",
        password: cliente.usuarioLogin.password || "",
      });
    }
  }, [cliente]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitEditarCliente = async (event) => {
    event.preventDefault();
    console.log('event', event.target.value);
    const idUsuarioSuscriptor = localStorage.getItem("idUsuario");
    const objCliente = {
      id,
      idUsuarioSuscriptor,
      ...formData,
    };

    const respuestaAPI = await putActualizarClienteAPI(objCliente);
    
    if (respuestaAPI.status === 200) {
      dispatch(actualizarClientes(objCliente));
      navigate("/clientes"); // Navegar de vuelta a la lista de clientes
    }
  };

  if (!cliente) {
    return <p>Cliente no encontrado.</p>;
  }

  return (
    <div className="container">
      <div className="row d-flex justify-content-center mt-5">
        <div className="col-6">
          <h3>Editar Cliente</h3>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="nombre">Nombre del cliente</Form.Label>
              <Form.Control
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="idDocumento">
                Seleccione Tipo de Documento
              </Form.Label>
              <Form.Select
                id="idDocumento"
                name="idDocumento"
                value={formData.idDocumento}
                onChange={handleChange}
              >
                {losDocumentos.map((tipodoc) => (
                  <option key={tipodoc.id} value={tipodoc.id}>
                    {tipodoc.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="numDocumento">
                Número de Documento
              </Form.Label>
              <Form.Control
                type="number"
                id="numDocumento"
                name="numDocumento"
                value={formData.numDocumento}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="telefono">Número de Teléfono</Form.Label>
              <Form.Control
                type="number"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="direccion">Dirección</Form.Label>
              <Form.Control
                type="text"
                id="direccion"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="persona">Persona de Contacto</Form.Label>
              <Form.Control
                type="text"
                id="persona"
                name="persona"
                value={formData.persona}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="idPais">País de Origen</Form.Label>
              <Form.Select
                id="idPais"
                name="idPais"
                value={formData.idPais} 
                onChange={handleChange}
              >
                {losPaises.map((pais) => (
                  <option key={pais.id} value={pais.id}>
                    {pais.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">Correo Electrónico</Form.Label>
              <Form.Control
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="password">Contraseña</Form.Label>
              <Form.Control
                type="text"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="dark" type="submit" onClick={submitEditarCliente}>
              Guardar Cambios
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default EditarCliente;
