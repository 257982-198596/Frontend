import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useRef } from "react";
import { useSelector } from "react-redux";

function AltaClientes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const losDocumentos = useSelector(
    (state) => state.sliceTiposDocumentos.tiposDocumentos
  );

  const nombreClienteRef = useRef();
  const idTipoDocumentoRef = useRef();

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
              <Form.Label htmlFor="rubro">Seleccione Tipo de Documento</Form.Label>
              <Form.Select key="tipoDocumento" id="tipoDocumento" ref={idTipoDocumentoRef}>
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
            </Form>

          </div>
        </div>
      </div>
    </>
  );
}
export default AltaClientes;
