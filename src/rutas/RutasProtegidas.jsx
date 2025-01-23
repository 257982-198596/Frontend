import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Home, HomeContent } from '../paginas/Home';
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
import AltaCategorias from '../paginas/categorias/AltaCategorias';
import EditarCategoria from '../paginas/categorias/EditarCategoria';
import DetalleCategoria from '../paginas/categorias/DetalleCategoria';
import VencimientosDelMes from '../paginas/reportes/VencimientosDelMes';
import CobrosMensuales from '../paginas/reportes/CobrosMensuales';
import { HomeClientes, HomeClientesContent } from '../paginas/areaClientes/HomeClientes';

const RutasProtegidas = () => {
  const idRol = localStorage.getItem('idRol');

  return (
    <Routes>
      {idRol === '3' ? (
        <Route path="/home-clientes" element={<HomeClientes />}>
          <Route index element={<HomeClientesContent />} />
        </Route>
      ) : (
        <>
          <Route path="/" element={<Home />}>
            <Route index element={<HomeContent />} />
            <Route path="clientes" element={<Clientes />} />
            <Route path="clientes/alta" element={<AltaClientes />} />
            <Route path="clientes/detalle/:id" element={<DetalleCliente />} />
            <Route path="clientes/editar/:id" element={<EditarCliente />} />
            <Route path="clientes/servicios-del-cliente/:id" element={<ServiciosDelCliente />} />
            <Route path="clientes/editar-servicio/:idServicio" element={<EditarServicioDelCliente />} />
            <Route path="clientes/asociar-servicio/:id" element={<AsociarServicioDelCliente />} />
            <Route path="servicios" element={<Servicios />} />
            <Route path="servicios/alta" element={<AltaServicios />} />
            <Route path="servicios/detalle/:id" element={<DetalleServicio />} />
            <Route path="servicios/editar/:id" element={<EditarServicio />} />
            <Route path="notificaciones" element={<Notificaciones />} />
            <Route path="notificaciones/detalle/:id" element={<DetalleNotificacion />} />
            <Route path="cobros" element={<Cobros />} />
            <Route path="cobros/alta" element={<AltaCobros />} />
            <Route path="cobros/editar/:id" element={<EditarCobros />} />
            <Route path="cobros/detalle/:id" element={<DetalleCobros />} />
            <Route path="reportes" element={<Reportes />} />
            <Route path="reportes/vencimientos-del-mes" element={<VencimientosDelMes />} />
            <Route path="reportes/cobros-mensuales" element={<CobrosMensuales />} />
            <Route path="categorias" element={<Categorias />} />
            <Route path="categorias/alta" element={<AltaCategorias />} />
            <Route path="categorias/editar/:id" element={<EditarCategoria />} />
            <Route path="categorias/detalle/:id" element={<DetalleCategoria />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};

export default RutasProtegidas;