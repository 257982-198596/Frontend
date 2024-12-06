import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Login from "../paginas/Login";
import Registro from "../paginas/Registro";
import Home from "../paginas/Home";
import Clientes from "../paginas/Clientes";
import Notificaciones from "../paginas/Notificaciones";
import Cobros from "../paginas/Cobros";
import Reportes from "../paginas/Reportes";
import Categorias from "../paginas/Categorias";
import Servicios from "../paginas/Servicios";
import AltaClientes from "../paginas/clientes/AltaClientes";
import EditarCliente from "../paginas/clientes/EditarCliente";
import DetalleCliente from "../paginas/clientes/DetalleCliente";
import AltaServicios from "../paginas/servicios/AltaServicios";
import EditarServicio from "../paginas/servicios/EditarServicio";
import DetalleServicio from "../paginas/servicios/DetalleServicio"; 
import ServiciosDelCliente from "../paginas/serviciosDelCliente/ServiciosDelCliente";
import AsociarServicioDelCliente from "../paginas/serviciosDelCliente/AsociarServicioDelCliente";
import EditarServicioDelCliente from "../paginas/serviciosDelCliente/EditarServicioDelCliente";
import DetalleCobros from "../paginas/cobros/DetalleCobros";
import AltaCobros from "../paginas/cobros/AltaCobros";
import EditarCobros from "../paginas/cobros/EditarCobros";
import ControlAutenticacion from "../componentes/ControlAutenticacion";
import RutasProtegidas from "./RutasProtegidas";
function Rutas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route
          path="/*"
          element={
            <ControlAutenticacion>
              <RutasProtegidas />
            </ControlAutenticacion>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Rutas;
