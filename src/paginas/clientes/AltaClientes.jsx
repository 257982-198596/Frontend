import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { postNuevoClienteAPI } from "../../api/servicioClientes";
import { crearClientes } from "../../slices/sliceClientes";

function AltaClientes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const losDocumentos = useSelector(
    (state) => state.sliceTiposDocumentos.tiposDocumentos
  );

  const losPaises = useSelector((state) => state.slicePaises.paises);

  const nombreClienteRef = useRef();
  const idTipoDocumentoRef = useRef();
  const numDocumentoRef = useRef();
  const telefonoRef = useRef();
  const direccionRef = useRef();
  const personaRef = useRef();
  const idPaisRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitNuevoCliente = async (event) => {
    event.preventDefault();

    const idUsuarioSuscriptor = localStorage.getItem("idUsuario");

    const objCliente = {
      idUsuarioSuscriptor: idUsuarioSuscriptor,
      nombre: nombreClienteRef.current.value,
      idDocumento: idTipoDocumentoRef.current.value,
      numDocumento: numDocumentoRef.current.value,
      telefono: telefonoRef.current.value,
      direccion: direccionRef.current.value,
      persona: personaRef.current.value,
      idPais: idPaisRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    };
    console.log(objCliente);
    const respuestaAPI = await postNuevoClienteAPI(objCliente);
    if (respuestaAPI.codigo == 200) {
      const payload = {
        id: respuestaAPI.id,
        nombre: objCliente.nombre,
        idDocumento: objCliente.idDocumento,
        numDocumento: objCliente.numDocumento,
        telefono: objCliente.telefono,
        direccion: objCliente.direccion,
        persona: objCliente.persona,
        idPais: objCliente.idPais,
        email: objCliente.email,
        password: objCliente.password
      };

      dispatch(crearClientes(payload));

      //conceptoRef.current.value = "";
      
    }
  };

  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center mt-5">
          <div className="col-6">
            <h3>Agregar Cliente</h3>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="nombre">Nombre del cliente</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ancap SA"
                  id="nombre"
                  ref={nombreClienteRef}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="rubro">
                  Seleccione Tipo de Documento
                </Form.Label>
                <Form.Select
                  key="tipoDocumento"
                  id="tipoDocumento"
                  ref={idTipoDocumentoRef}
                >
                  <option>Tipo de Documento</option>
                  {losDocumentos.length > 0 ? (
                    losDocumentos.map((tipodoc) => {
                      return (
                        <option key={tipodoc.id} value={tipodoc.id}>
                          {tipodoc.nombre}
                        </option>
                      );
                    })
                  ) : (
                    <option>Cargando Rubros</option>
                  )}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="numDocumento">
                  Número de Documento
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="1984538943"
                  id="numDocumento"
                  ref={numDocumentoRef}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="telefono">Número de Teléfono</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="099123123"
                  id="telefono"
                  ref={telefonoRef}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="direccion">Dirección</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="18 de Julio 1654 ap. 2"
                  id="direccion"
                  ref={direccionRef}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="personaContacto">
                  Persona de Contacto
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="María Alvarez"
                  id="personaContacto"
                  ref={personaRef}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="pais">Pais de Origen</Form.Label>
                <Form.Select key="pais" id="pais" ref={idPaisRef}>
                  <option>Seleccione Pais</option>
                  {losPaises.length > 0 ? (
                    losPaises.map((pais) => {
                      return (
                        <option key={pais.id} value={pais.id}>
                          {pais.nombre}
                        </option>
                      );
                    })
                  ) : (
                    <option>Cargando Rubros</option>
                  )}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="email">Correo Electrónico</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="juan@gmail.com"
                  id="email"
                  ref={emailRef}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="password">Contraseña</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="************"
                  id="password"
                  ref={passwordRef}
                />
              </Form.Group>
              <br></br>
              <Button variant="dark" type="submit" onClick={submitNuevoCliente}>
                Crear Cliente
              </Button>
              <br></br>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
export default AltaClientes;
