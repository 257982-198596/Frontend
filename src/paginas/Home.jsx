import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Footer from "../componentes/Footer";
import Sidebar from "../componentes/Sidebar";
import HeaderDinamico from "../componentes/HeaderDinamico";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getClientesApi } from "../api/servicioClientes";
import { cargarClientes } from "../slices/sliceClientes";

function Home() {
  const dispatch = useDispatch();


  useEffect(() => {
    

    const GetClientes = async () => {
      try {
        const clientes = await getClientesApi();
        const payload = {
          clientesStore: clientes
        };
        //console.log('clientes', clientes)
        //carga de todos los clientes al store
        dispatch(cargarClientes(payload));

    
      } catch (error) {
        console.log("Error API CLIENTES", error);
      }
    };
    GetClientes();

    
  }, []);

  return (
    <>
      <HeaderDinamico></HeaderDinamico>

      <div style={{ display: "flex" }}>
        <Sidebar style={{ minWidth: "200px" }} />
        <div style={{ flex: 1, padding: "1rem" }}>
          <Outlet />
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Home;
