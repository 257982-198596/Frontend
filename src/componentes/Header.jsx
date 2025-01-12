import { Container, Nav, Navbar, Modal, Button } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Header() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const nombreSuscriptor = localStorage.getItem("nombreSuscriptor");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand to="/">Sistema de Cobros </Navbar.Brand>
          <Nav className="me-auto">
          
          </Nav>
          <div className="ml-auto d-flex align-items-center">
            <p className='encabezado mb-0'>Bienvenido, {nombreSuscriptor}</p>
            <span className="pipe-separator">|</span>
            <NavLink to="#" onClick={handleShow} className="nav-link encabezado">Cerrar Sesión</NavLink>
          </div>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Está seguro que desea cerrar sesión?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Sí, cerrar sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Header