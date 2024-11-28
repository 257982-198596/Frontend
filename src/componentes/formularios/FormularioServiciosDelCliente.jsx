import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function FormularioServiciosDelCliente({
  formData,
  handleChange,
  onSubmit,
  modo,
  serviciosDisponibles,
  monedasDisponibles,
  frecuenciasDisponibles,
}) {
  const isReadOnly = modo === "detalle";
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="descripcion">Descripcion</Form.Label>
        <Form.Control
          type="text"
          id="descripcion"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          placeholder="Ingrese la descripcion"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="servicioContratadoId">Servicio</Form.Label>
        <Form.Select
          id="servicioContratadoId"
          name="servicioContratadoId"
          value={formData.servicioContratadoId}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un servicio</option>
          {serviciosDisponibles.map((servicio) => (
            <option key={servicio.id} value={servicio.id}>
              {servicio.nombre}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="precio">Precio</Form.Label>
        <Form.Control
          type="number"
          id="precio"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          placeholder="Ingrese el precio"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="monedaDelServicioId">Moneda</Form.Label>
        <Form.Select
          id="monedaDelServicioId"
          name="monedaDelServicioId"
          value={formData.monedaDelServicioId}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione una moneda</option>
          {monedasDisponibles.map((moneda) => (
            <option key={moneda.id} value={moneda.id}>
              {moneda.nombre}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="fechaInicio">Fecha de Inicio</Form.Label>
        <Form.Control
          type="date"
          id="fechaInicio"
          name="fechaInicio"
          value={formData.fechaInicio}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="frecuenciaDelServicioId">Frecuencia</Form.Label>
        <Form.Select
          id="frecuenciaDelServicioId"
          name="frecuenciaDelServicioId"
          value={formData.frecuenciaDelServicioId}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione una frecuencia</option>
          {frecuenciasDisponibles.map((frecuencia) => (
            <option key={frecuencia.id} value={frecuencia.id}>
              {frecuencia.nombre}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <div className="d-flex justify-content-center">
      {!isReadOnly && (
          <Button variant="dark" type="submit" className="botones-formularios">
            {modo === "alta" ? "Asociar Servicio" : "Guardar Cambios"}
          </Button>
        )}
        <Link to="/clientes">
          <Button variant="secondary" className="botones-formularios">Volver al Listado</Button>
        </Link>
        </div>
    </Form>
  );
}



export default FormularioServiciosDelCliente;
