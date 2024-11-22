import { Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";

function FormularioServiciosDelCliente({
  formData,
  handleChange,
  onSubmit,
  serviciosDisponibles,
  monedasDisponibles,
  frecuenciasDisponibles,
}) {
  return (
    <Form onSubmit={onSubmit}>
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

      <Button variant="primary" type="submit" className="mt-3">
        Asociar Servicio
      </Button>
    </Form>
  );
}

FormularioServiciosDelCliente.propTypes = {
  formData: PropTypes.shape({
    servicioContratadoId: PropTypes.string.isRequired,
    precio: PropTypes.string.isRequired,
    monedaDelServicioId: PropTypes.string.isRequired,
    fechaInicio: PropTypes.string.isRequired,
    frecuenciaDelServicioId: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  serviciosDisponibles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
    })
  ).isRequired,
  monedasDisponibles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
    })
  ).isRequired,
  frecuenciasDisponibles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default FormularioServiciosDelCliente;
