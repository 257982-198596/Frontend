import React from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

function FormularioNotificacion({ formData, handleChange, onSubmit, modo }) {
  const isReadOnly = modo === "detalle";

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="cliente">Cliente</Form.Label>
        <Form.Control
          type="text"
          id="cliente"
          name="cliente"
          value={formData.cliente}
          onChange={handleChange}
          readOnly={isReadOnly}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="mensaje">Mensaje</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          id="mensaje"
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          readOnly={isReadOnly}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="fechaEnvio">Fecha de Envío</Form.Label>
        <Form.Control
          type="date"
          id="fechaEnvio"
          name="fechaEnvio"
          value={formData.fechaEnvio}
          onChange={handleChange}
          readOnly={isReadOnly}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="estado">Estado</Form.Label>
        <Form.Control
          type="text"
          id="estado"
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          readOnly={isReadOnly}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="servicio">Servicio</Form.Label>
        <Form.Control
          type="text"
          id="servicio"
          name="servicio"
          value={formData.servicio}
          onChange={handleChange}
          readOnly={isReadOnly}
        />
      </Form.Group>
      <div className="d-flex justify-content-center">
        <Link to="/notificaciones">
          <Button variant="secondary" className="botones-formularios">Volver al Listado</Button>
        </Link>
      </div>
    </Form>
  );
}

export default FormularioNotificacion;