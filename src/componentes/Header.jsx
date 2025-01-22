import { Container, Nav, Navbar, Modal, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Header({ nombreCliente }) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const idRol = localStorage.getItem("idRol");

  useEffect(() => {
    const nombreSuscriptor = localStorage.getItem("nombreSuscriptor");
    if (idRol === '2') {
      setNombre(nombreSuscriptor);
    } else if (idRol === '3') {
      setNombre(nombreCliente);
    }
  }, [idRol, nombreCliente]);

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
            <p className='encabezado mb-0'>Bienvenido, {nombre}</p>
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
  );
}

export default Header;