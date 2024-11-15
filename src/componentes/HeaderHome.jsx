
import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

function HeaderHome() {
  return (
    <>
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand to="/">257982 - 198596</Navbar.Brand>
          <Nav className="me-auto">
          <NavLink to="/clientes" className='menuprincipal'>CLIENTES</NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default HeaderHome