import { Outlet, useOutletContext } from "react-router-dom";
import Footer from "../componentes/Footer";
import Sidebar from "../componentes/Sidebar";
import Header from "../componentes/Header";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getClientesApi } from "../api/servicioClientes";
import { cargarClientes } from "../slices/sliceClientes";
import { getTiposDocumentosApi } from "../api/servicioTiposDocumentos";
import { cargarTiposDocumentos } from "../slices/sliceTiposDocumentos";
import { getPaisesApi } from "../api/servicioPaises";
import { cargarPaises } from "../slices/slicePaises";
import { getServiciosApi } from "../api/servicioServicios";
import { cargarServicios } from "../slices/sliceServicios";
import { getCategoriasApi } from "../api/servicioCategorias";
import { cargarCategorias } from "../slices/sliceCategorias";
import { getMonedasApi } from "../api/servicioMonedas";
import { cargarMonedas } from "../slices/sliceMonedas";
import { getFrecuenciasApi } from "../api/servicioFrecuencias";
import { cargarFrecuencias } from "../slices/sliceFrecuencias";
import { getCobrosApi } from "../api/servicioCobros";
import { cargarCobros } from "../slices/sliceCobros";
import { getMediosDePagoApi } from "../api/servicioMediosDePago";
import { cargarMediosDePago } from "../slices/sliceMediosDePago";
import { getNotificacionesApi, getNotificacionesPorMesApi } from "../api/servicioNotificaciones";
import { cargarNotificaciones } from "../slices/sliceNotificaciones";
import { urlAPI } from "../api/api";
import IndicadoresAhorro from "../componentes/IndicadoresAhorro";
import { FaBars } from "react-icons/fa"; 

function Home() {
  const dispatch = useDispatch();
  const [notificacionesPorMes, setNotificacionesPorMes] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(false); 
  const suscriptorId = localStorage.getItem("idSuscriptor");
  const year = new Date().getFullYear();


  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  useEffect(() => {
    const GetClientes = async () => {
      console.log("URL DE LA API", urlAPI);
      const variables = import.meta.env.VITE_REACT_APP_API_URL; 
      const variables2 = import.meta.env.APPSETTING_REACT_APP_API_URL; 
      console.log("variables",variables);
      console.log("variables2",variables2);
      try {
        const response = await getClientesApi(suscriptorId); 
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
    const GetServicios = async () => {
      try {
        const response = await getServiciosApi(suscriptorId); 
        if (response.status == 200) {
          const payload = {
            serviciosStore: response.data
          };
          
          dispatch(cargarServicios(payload));
        }else {
          throw "Error al obtener servicios";
        }
      } catch (error) {
        console.log("Error API SERVICIOS", error);
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
          throw "Error al obtener paises";
        }    
      } catch (error) {
        console.log("Error API Paises", error);
      }
    };
    const GetCategorias = async () => {
      try {
        const response = await getCategoriasApi(suscriptorId);
        if (response.status == 200) {
          const payload = {
            categoriasStore: response.data
          };
          dispatch(cargarCategorias(payload));
        }else {
          throw "Error al obtener categorias";
        }    
      } catch (error) {
        console.log("Error API Categorias", error);
      }
    };
    const GetMonedas = async () => {
      try {
        const response = await getMonedasApi();
        if (response.status == 200) {
          const payload = {
            monedasStore: response.data
          };
          dispatch(cargarMonedas(payload));
        }else {
          throw "Error al obtener monedas del sistema";
        }    
      } catch (error) {
        console.log("Error API Monedas", error);
      }
    };
    const GetFrecuencias = async () => {
      try {
        const response = await getFrecuenciasApi();
        if (response.status == 200) {
          const payload = {
            frecuenciasStore: response.data
          };
          dispatch(cargarFrecuencias(payload));
        }else {
          throw "Error al obtener frecuencias del sistema";
        }    
      } catch (error) {
        console.log("Error API Frecuencias", error);
      }
    };
    const GetCobros = async () => {
      try {
        const response = await getCobrosApi(suscriptorId);
        if (response.status == 200) {
          const payload = {
            cobrosStore: response.data
          };
          dispatch(cargarCobros(payload));
        }else {
          throw "Error al obtener obros del sistema";
        }    
      } catch (error) {
        console.log("Error API Cobros", error);
      }
    };
    const GetMediosDePago = async () => {
      try {
        const response = await getMediosDePagoApi();
        if (response.status == 200) {
          const payload = {
            mediosDePagoStore: response.data
          };
          dispatch(cargarMediosDePago(payload));
        }else {
          throw "Error al obtener medios de pago del sistema";
        }    
      } catch (error) {
        console.log("Error API Medios de Pago", error);
      }
    };
    const GetNotificaciones = async () => {
      try {
        const response = await getNotificacionesApi(suscriptorId);
        if (response.status == 200) {
          const payload = {
            notificacionesStore: response.data
          };
          dispatch(cargarNotificaciones(payload));
        } else {
          throw "Error al obtener notificaciones";
        }
      } catch (error) {
        console.log("Error API Notificaciones", error);
      }
    };
    const GetNotificacionesPorMes = async () => {
      try {
        const response = await getNotificacionesPorMesApi(suscriptorId, year);
        if (response) {
          setNotificacionesPorMes(response);
          console.log(response)
          console.log("notificacionesPorMes", notificacionesPorMes);
        } else {
          throw "Error al obtener notificaciones por mes";
        }
      } catch (error) {
        console.log("Error API Notificaciones por Mes", error);
      }
    };
    GetTiposDocumentos();
    GetClientes();
    GetServicios();
    GetPaises();
    GetCategorias();
    GetMonedas();
    GetFrecuencias();
    GetCobros();
    GetMediosDePago();
    GetNotificaciones();
    GetNotificacionesPorMes();
  }, []);

  //overflow para que las tablas se vena bien en celular
  return (
    <>
      <Header toggleSidebar={toggleSidebar}></Header>
      <div style={{ display: "flex" }}>
        {sidebarVisible && (
          <Sidebar style={{ minWidth: "200px" }} />
        )}
        
        <div style={{ flex: 1, padding: "1rem", overflowX: "auto" }}>
          <Outlet context={{ notificacionesPorMes }} />
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

const HomeContent = () => {
  const { notificacionesPorMes } = useOutletContext();
  
  return <IndicadoresAhorro notificacionesPorMes={notificacionesPorMes} />;
};

export { Home, HomeContent };
