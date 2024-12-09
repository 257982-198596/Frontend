import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../paginas/Home';
import Clientes from '../paginas/Clientes';
import Notificaciones from '../paginas/Notificaciones';
import Cobros from '../paginas/Cobros';
import Reportes from '../paginas/Reportes';
import Categorias from '../paginas/Categorias';
import Servicios from '../paginas/Servicios';
import AltaClientes from '../paginas/clientes/AltaClientes';
import EditarCliente from '../paginas/clientes/EditarCliente';
import DetalleCliente from '../paginas/clientes/DetalleCliente';
import AltaServicios from '../paginas/servicios/AltaServicios';
import EditarServicio from '../paginas/servicios/EditarServicio';
import DetalleServicio from '../paginas/servicios/DetalleServicio';
import ServiciosDelCliente from '../paginas/serviciosDelCliente/ServiciosDelCliente';
import AsociarServicioDelCliente from '../paginas/serviciosDelCliente/AsociarServicioDelCliente';
import EditarServicioDelCliente from '../paginas/serviciosDelCliente/EditarServicioDelCliente';
import DetalleCobros from '../paginas/cobros/DetalleCobros';
import AltaCobros from '../paginas/cobros/AltaCobros';
import EditarCobros from '../paginas/cobros/EditarCobros';
import DetalleNotificacion from '../paginas/notificaciones/DetalleNotificacion';

const RutasProtegidas = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/clientes/alta" element={<AltaClientes />} />
        <Route path="/clientes/detalle/:id" element={<DetalleCliente />} />
        <Route path="/clientes/editar/:id" element={<EditarCliente />} />
        <Route path="/clientes/servicios-del-cliente/:id" element={<ServiciosDelCliente />} />
        <Route path="/clientes/editar-servicio/:idServicio" element={<EditarServicioDelCliente />} />
        <Route path="/clientes/asociar-servicio/:id" element={<AsociarServicioDelCliente />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/servicios/alta" element={<AltaServicios />} />
        <Route path="/servicios/detalle/:id" element={<DetalleServicio />} />
        <Route path="/servicios/editar/:id" element={<EditarServicio />} />
        <Route path="/notificaciones" element={<Notificaciones />} />
        <Route path="/notificaciones/detalle/:id" element={<DetalleNotificacion />} />
        <Route path="/cobros" element={<Cobros />} />
        <Route path="/cobros/alta" element={<AltaCobros />} />
        <Route path="/cobros/editar/:id" element={<EditarCobros />} />
        <Route path="/cobros/detalle/:id" element={<DetalleCobros />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/categorias" element={<Categorias />} />
      </Route>
    </Routes>
  );
};

export default RutasProtegidas;