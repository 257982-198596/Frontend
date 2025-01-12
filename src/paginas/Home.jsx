import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Footer from "../componentes/Footer";
import Sidebar from "../componentes/Sidebar";
import Header from "../componentes/Header";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
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
import { getNotificacionesApi } from "../api/servicioNotificaciones";
import { cargarNotificaciones } from "../slices/sliceNotificaciones";
import { FaClock } from "react-icons/fa";
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

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
    const GetServicios = async () => {
      try {
        const response = await getServiciosApi();
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
        const response = await getCategoriasApi();
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
        const response = await getCobrosApi();
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
        const response = await getNotificacionesApi();
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
  }, []);

  return (
    <>
      <Header></Header>
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

const HomeContent = () => {
  const obtenerDatosGrafico = () => {
    return {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      datasets: [
        {
          label: 'Horas Ahorradas',
          data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
          backgroundColor: '#71397299',
          borderColor: '#713972',
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div className="container">
      <h3 className="mb-5">Indicadores de Ahorro de Tiempo</h3>
      <div className="row mb-3">
        <div className="col-md-4">
          <div className="indicador my-1">
            <FaClock className="icono-indicador" />
            <h5>Horas ahorradas este año en envío de correos</h5>
            <p className="valor-indicador">1200</p> 
          </div>
          <div className="indicador my-1">
            <FaClock className="icono-indicador" />
            <h5>Horas ahorradas este mes en envíos de correos</h5>
            <p className="valor-indicador">100</p> 
          </div>
        </div>
        <div className="col-md-8">
          <h5>Horas Ahorradas por Mes</h5>
          <Bar data={obtenerDatosGrafico()} />
        </div>
      </div>
    </div>
  );
};

export { Home, HomeContent };
