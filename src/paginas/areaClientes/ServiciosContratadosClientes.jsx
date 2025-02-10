import React, { useState } from 'react';

export default function ServiciosContratadosClientes({ serviciosActivosCliente }) {
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 10;

  const handlePageChange = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const serviciosPaginados = Array.isArray(serviciosActivosCliente)
    ? serviciosActivosCliente.slice(
        (paginaActual - 1) * elementosPorPagina,
        paginaActual * elementosPorPagina
      )
    : [];

  const totalPaginas = Array.isArray(serviciosActivosCliente)
    ? Math.ceil(serviciosActivosCliente.length / elementosPorPagina)
    : 0;

  return (
    <div className='container-fluid'>
      <h5>Servicios Activos</h5>
      {Array.isArray(serviciosActivosCliente) && serviciosActivosCliente.length > 0 ? (
        <>
          <div className="table-responsive">
            <table className="table table-responsive table-striped table-dark">
              <thead>
                <tr>
                  <th>Descripcion</th>
                  <th>Servicio</th>
                  <th>Precio</th>
                  <th>Moneda</th>
                  <th>Frecuencia</th>
                  <th>Estado</th>
                  <th>Fecha Inicio</th>
                  <th>Fecha Fin</th>
                </tr>
              </thead>
              <tbody>
                {serviciosPaginados.map((servicio) => (
                  <tr key={servicio.id}>
                    <td>{servicio.descripcion}</td>
                    <td>{servicio.servicioContratado.nombre}</td>
                    <td>{servicio.precio}</td>
                    <td>{servicio.monedaDelServicio.nombre}</td>
                    <td>{servicio.frecuenciaDelServicio.nombre}</td>
                    <td>{servicio.estadoDelServicioDelCliente.nombre}</td>
                    <td>{new Date(servicio.fechaInicio).toLocaleDateString()}</td>
                    <td>{new Date(servicio.fechaVencimiento).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <p className="pagina-paginacion">Página:</p>
            {Array.from({ length: totalPaginas }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`btn ${paginaActual === index + 1 ? 'btn oblcolor' : 'btn-secondary'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <p>No hay servicios activos.</p>
      )}
    </div>
  );
}
