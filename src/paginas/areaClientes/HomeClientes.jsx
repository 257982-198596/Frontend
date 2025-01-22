import React from 'react';
import Header from '../../componentes/Header';

export default function HomeClientes() {
  const nombreCliente = localStorage.getItem('nombreCliente');

  return (
    <>
      <Header nombreCliente={nombreCliente} />
      <div>HomeClientes</div>
    </>
  );
}
