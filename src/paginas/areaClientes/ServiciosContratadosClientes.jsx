import React from 'react';

export default function ServiciosContratadosClientes({ serviciosActivosCliente }) {
  return (
    <div>
      <h5>Servicios Activos</h5>
      {Array.isArray(serviciosActivosCliente) && serviciosActivosCliente.length > 0 ? (
        <table className="table table-striped table-dark">
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
            {serviciosActivosCliente.map((servicio) => (
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
      ) : (
        <p>No hay servicios activos.</p>
      )}
    </div>
  );
}
