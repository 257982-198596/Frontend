import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <>
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand to="/">Sistema de Cobros </Navbar.Brand>
          
          <Nav className="me-auto">
          
          </Nav>
          <div className="ml-auto d-flex align-items-center">
            <p className='encabezado mb-0'>Bienvenido</p>
            <span className="pipe-separator">|</span>
            <NavLink to="/logout" className="nav-link encabezado">Cerrar Sesión</NavLink>
          </div>
        </Container>
      </Navbar>
    </>
  )
}

export default Header