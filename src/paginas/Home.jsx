import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Footer from '../componentes/Footer';
import Sidebar from '../componentes/Sidebar';

function Home() {
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

      <div style={{ display: 'flex' }}>
        <Sidebar style={{ minWidth: '200px' }} />
        <div style={{ flex: 1, padding: '1rem' }}>
          <Outlet />
        </div>
      </div>
      <Footer></Footer>
      
    </>
  )
}

export default Home