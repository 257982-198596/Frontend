import React, { useEffect } from 'react';
import Header from '../../componentes/Header';
import SidebarClientes from '../../componentes/SidebarClientes';
import Footer from '../../componentes/Footer';
import { Outlet, useOutletContext } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getServiciosActivosEnApi } from '../../api/servicioServiciosDelCliente';
import { cargarServiciosActivos } from '../../slices/sliceAreaClientes';
import ServiciosContratadosClientes from './ServiciosContratadosClientes';
import { getTiposDocumentosApi } from '../../api/servicioTiposDocumentos';
import { cargarTiposDocumentos } from '../../slices/sliceTiposDocumentos';
import { getPaisesApi } from '../../api/servicioPaises';
import { cargarPaises } from '../../slices/slicePaises';
import { getClienteById } from '../../api/servicioClientes';
import { cargarClientes } from '../../slices/sliceClientes';

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

    async function fetchTiposDocumentos() {
      try {
        const response = await getTiposDocumentosApi();
        if (response.status === 200) {
          dispatch(cargarTiposDocumentos({ tiposDocumentosStore: response.data }));
        } else {
          throw new Error('Error al obtener tipos de documentos');
        }
      } catch (error) {
        console.error('Error API Tipos Documentos:', error);
      }
    }

    async function fetchPaises() {
      try {
        const response = await getPaisesApi();
        if (response.status === 200) {
          dispatch(cargarPaises({ paisesStore: response.data }));
        } else {
          throw new Error('Error al obtener paises');
        }
      } catch (error) {
        console.error('Error API Paises:', error);
      }
    }

    async function fetchCliente() {
      try {
        const response = await getClienteById(clienteId);
        dispatch(cargarClientes(response.data));
        console.log('Cliente:', response.data);
      } catch (error) {
        console.error('Error al obtener cliente:', error);
      }
    }

    fetchServiciosActivos();
    fetchTiposDocumentos();
    fetchPaises();
    fetchCliente();
    
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
