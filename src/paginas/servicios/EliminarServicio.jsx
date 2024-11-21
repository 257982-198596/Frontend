
import { Modal, Button } from "react-bootstrap";

function EliminarServicio({ show, handleClose, handleEliminar }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Estás seguro que deseas eliminar este servicio? Esta acción no se puede deshacer.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleEliminar}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EliminarServicio;