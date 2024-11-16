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
import { getTiposDocumentosApi } from "../api/servicioTiposDocumentos";
import { cargarTiposDocumentos } from "../slices/sliceTiposDocumentos";
import { getPaisesApi } from "../api/servicioPaises";
import { cargarPaises } from "../slices/slicePaises";

function Home() {
  const dispatch = useDispatch();


  useEffect(() => {
    

    const GetClientes = async () => {
      try {
        const clientes = await getClientesApi();
        const payload = {
          clientesStore: clientes
        };
        
        dispatch(cargarClientes(payload));

    
      } catch (error) {
        console.log("Error API CLIENTES", error);
      }
    };
    const GetTiposDocumentos = async () => {
      try {
        const tiposDocs = await getTiposDocumentosApi();
        const payload = {
          tiposDocumentosStore: tiposDocs
        };
        
        //carga de todos los clientes al store
        dispatch(cargarTiposDocumentos(payload));

    
      } catch (error) {
        console.log("Error API Tipos Documentos", error);
      }
    };
    const GetPaises = async () => {
      try {
        const paises = await getPaisesApi();
        const payload = {
          paisesStore: paises
        };
        
        dispatch(cargarPaises(payload));

    
      } catch (error) {
        console.log("Error API Paises", error);
      }
    };
    GetTiposDocumentos();
    GetClientes();
    GetPaises();
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
