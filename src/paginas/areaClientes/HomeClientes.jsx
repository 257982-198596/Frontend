import React from 'react';
import Header from '../../componentes/Header';
import SidebarClientes from '../../componentes/SidebarClientes'; // Import SidebarClientes
import Footer from '../../componentes/Footer'; // Import Footer
import { Outlet } from 'react-router-dom'; // Import Outlet

export default function HomeClientes() {
  const nombreCliente = localStorage.getItem('nombreCliente');

  return (
    <>
      <Header nombreCliente={nombreCliente} />
      <SidebarClientes /> 
      <div>
        <Outlet /> 
      </div>
      <Footer /> 
    </>
  );
}
