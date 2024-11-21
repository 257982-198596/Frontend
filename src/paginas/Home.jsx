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
        const response = await getClientesApi();
        if (response.status == 200) {
          const payload = {
            clientesStore: response.data
          };
          
          dispatch(cargarClientes(payload));
        }else {
          throw "Error al obtener clientes";
        }
      } catch (error) {
        console.log("Error API CLIENTES", error);
      }
    };
    const GetTiposDocumentos = async () => {
      try {
        const response = await getTiposDocumentosApi();

        if (response.status == 200) {
          const payload = {
            tiposDocumentosStore: response.data
          };
          dispatch(cargarTiposDocumentos(payload));
        }else {
          throw "Error al obtener tipos de documentos";
        }
            
      } catch (error) {
        console.log("Error API Tipos Documentos", error);
      }
    };
    const GetPaises = async () => {
      try {
        const response = await getPaisesApi();
        if (response.status == 200) {
          const payload = {
            paisesStore: response.data
            
          };
          dispatch(cargarPaises(payload));
        }else {
          throw "Error al obtener clientes";
        }    
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
