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

function Rutas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/registro" element={<Registro />} />

        <Route path="/" element={<Home />}>
          <Route path="/clientes" element={<Clientes />}/>
          <Route path="/clientes/alta" element={<AltaClientes />} />
          <Route path="/clientes/detalle/:id" element={<DetalleCliente />} />
          <Route path="/clientes/editar/:id" element={<EditarCliente />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/servicios/alta" element={<AltaServicios />} />
          <Route path="/servicios/detalle/:id" element={<DetalleServicio />} />
          <Route path="/servicios/editar/:id" element={<EditarServicio />} />
          <Route path="/notificaciones" element={<Notificaciones />} />
          <Route path="/cobros" element={<Cobros />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/categorias" element={<Categorias />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Rutas;
