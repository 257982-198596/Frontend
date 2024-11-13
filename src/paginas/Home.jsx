import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Footer from '../componentes/Footer';
import Sidebar from '../componentes/Sidebar';
import HeaderDinamico from '../componentes/HeaderDinamico';


function Home() {
  return (
    <>
        
        <HeaderDinamico></HeaderDinamico>

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