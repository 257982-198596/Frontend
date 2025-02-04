import { Modal, Button } from "react-bootstrap";

function CancelarServicioDelCliente({ show, handleClose, handleCancelar }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Cancelación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Estás seguro que deseas cancelar este servicio? Esta acción no se puede deshacer.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Deshacer
        </Button>
        <Button variant="danger" onClick={handleCancelar}>
          Cancelar Servicio
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CancelarServicioDelCliente;
