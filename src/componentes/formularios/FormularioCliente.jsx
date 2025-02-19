/* eslint-disable react/prop-types */
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function FormularioCliente({
  formData,
  handleChange,
  onSubmit,
  modo,
  losDocumentos,
  losPaises,
  resetContrasena,
  disableFields = [], 
}) {
  const isReadOnly = modo === "detalle";
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="nombre">Nombre del cliente *</Form.Label>
        <Form.Control
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Ingrese el nombre del cliente"
          readOnly={isReadOnly}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="idDocumento">
          Seleccione Tipo de Documento *
        </Form.Label>
        <Form.Select
          id="idDocumento"
          name="idDocumento"
          value={formData.idDocumento}
          onChange={handleChange}
          disabled={isReadOnly || disableFields.includes("idDocumento")} 
        >
            <option value="">Seleccione un tipo</option>
          {losDocumentos.map((tipodoc) => (
            <option key={tipodoc.id} value={tipodoc.id}>
              {tipodoc.nombre}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="numDocumento">Número de Documento *</Form.Label>
        <Form.Control
          type="number"
          id="numDocumento"
          name="numDocumento"
          value={formData.numDocumento}
          onChange={handleChange}
          readOnly={isReadOnly || disableFields.includes("numDocumento")} 
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="telefono">Número de Teléfono *</Form.Label>
        <Form.Control
          type="number"
          id="telefono"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          readOnly={isReadOnly}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="direccion">Dirección *</Form.Label>
        <Form.Control
          type="text"
          id="direccion"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          readOnly={isReadOnly}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="persona">Persona de Contacto *</Form.Label>
        <Form.Control
          type="text"
          id="persona"
          name="persona"
          value={formData.persona}
          onChange={handleChange}
          readOnly={isReadOnly}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="idPais">País de Origen *</Form.Label>
        <Form.Select
          id="idPais"
          name="idPais"
          value={formData.idPais}
          onChange={handleChange}
          disabled={isReadOnly}
        >
            <option value="">Seleccione un pais</option>
          {losPaises.map((pais) => (
            <option key={pais.id} value={pais.id}>
              {pais.nombre}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="email">Correo Electrónico *</Form.Label>
        <Form.Control
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          readOnly={isReadOnly || disableFields.includes("email")} 
        />
      </Form.Group>
      {modo !== "editar" && (
        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Contraseña *</Form.Label>
          <Form.Control
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            readOnly={isReadOnly}
          />
        </Form.Group>
      )}
      {modo === "editar" && (
        <Button
          variant="danger"
          className="btn-sm mt-2"
          onClick={resetContrasena}
        >
          Restablecer Contraseña
        </Button>
      )}
      <div className="d-flex justify-content-center">
      {!isReadOnly && (
          <Button variant="dark" type="submit" className="botones-formularios">
            {modo === "alta" ? "Crear Cliente" : "Guardar Cambios"}
          </Button>
        )}
        <Link to="/clientes">
          <Button variant="secondary" className="botones-formularios">Volver al Listado</Button>
        </Link>
        
      </div>
      <ToastContainer />
    </Form>
  );
}

export default FormularioCliente;
