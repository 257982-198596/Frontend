import React, { useEffect } from 'react';
import Header from '../../componentes/Header';
import SidebarClientes from '../../componentes/SidebarClientes';
import Footer from '../../componentes/Footer';
import { Outlet, useOutletContext } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getServiciosActivosEnApi } from '../../api/servicioServiciosDelCliente';
import { cargarServiciosActivos } from '../../slices/sliceAreaClientes';
import ServiciosContratadosClientes from './ServiciosContratadosClientes';

export default function HomeClientes() {
  const nombreCliente = localStorage.getItem('nombreCliente');
  const clienteId = localStorage.getItem('idCliente');
  const dispatch = useDispatch();
  const serviciosActivosCliente = useSelector((state) => state.sliceAreaClientes.serviciosActivosCliente);

  useEffect(() => {
    async function fetchServiciosActivos() {
      try {
        const response = await getServiciosActivosEnApi(clienteId);
        dispatch(cargarServiciosActivos({ servicios: response.data }));
      } catch (error) {
        console.error('Error al obtener servicios del cliente:', error);
      }
    }

    fetchServiciosActivos();
  }, [clienteId, dispatch]);

  return (
    <>
      <Header nombreCliente={nombreCliente} />
      <div style={{ display: 'flex' }}>
        <SidebarClientes />
        <div style={{ flex: 1, padding: '1rem' }}>
          <Outlet context={{ serviciosActivosCliente }} />
        </div>
      </div>
      <Footer />
    </>
  );
}

const HomeClientesContent = () => {
  const { serviciosActivosCliente } = useOutletContext();
  
  return <ServiciosContratadosClientes serviciosActivosCliente={serviciosActivosCliente} />;
};

export { HomeClientes, HomeClientesContent };
