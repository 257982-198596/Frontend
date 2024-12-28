import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function FormularioCategoria({ formData, handleChange, onSubmit, modo }) {
  const isReadOnly = modo === "detalle";

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="nombre">Nombre de la Categoría</Form.Label>
        <Form.Control
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Ingrese el nombre de la categoría"
          readOnly={isReadOnly}
        />
      </Form.Group>

  

      <div className="d-flex justify-content-center">
        {!isReadOnly && (
          <Button variant="dark" type="submit" className="botones-formularios">
            {modo === "alta" ? "Crear Categoría" : "Guardar Cambios"}
          </Button>
        )}
        <Link to="/categorias">
          <Button variant="secondary" className="botones-formularios">Volver al Listado</Button>
        </Link>
      </div>
      <ToastContainer />
    </Form>
  );
}

export default FormularioCategoria;
