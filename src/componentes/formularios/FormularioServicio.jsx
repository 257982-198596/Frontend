
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function FormularioServicio({ formData, handleChange, onSubmit, modo, lasCategorias }) {
    const isReadOnly = modo === "detalle";
  
    return (
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="nombre">Nombre del Servicio</Form.Label>
          <Form.Control
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ingrese el nombre del servicio"
            readOnly={isReadOnly}
          />
        </Form.Group>
  
        <Form.Group className="mb-3">
          <Form.Label htmlFor="descripcion">Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Ingrese la descripción del servicio"
            readOnly={isReadOnly}
          />
        </Form.Group>
  
        <Form.Group className="mb-3">
          <Form.Label htmlFor="categoriaId">Categoría</Form.Label>
          <Form.Select
            id="categoriaId"
            name="categoriaId"
            value={formData.categoriaId}
            onChange={handleChange}
            disabled={isReadOnly}
          >
            <option value="">Seleccione una categoría</option>
            {lasCategorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
  
        <div className="d-flex justify-content-center">
          {!isReadOnly && (
            <Button variant="dark" type="submit" className="botones-formularios">
              {modo === "alta" ? "Crear Servicio" : "Guardar Cambios"}
            </Button>
          )}
          <Link to="/servicios">
            <Button variant="secondary" className="botones-formularios">Volver al Listado</Button>
          </Link>
        </div>
        <ToastContainer />
      </Form>
    );
  }
  
  export default FormularioServicio;