import React, { useEffect, useState } from 'react';
import { FaCalendarPlus } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";
import { TbPigMoney } from "react-icons/tb";
import { obtenerServiciosVencenEsteMesAPI } from '../../api/servicioServiciosDelCliente';

const VencimientosDelMes = () => {
  const [serviciosVencenEsteMes, setServiciosVencenEsteMes] = useState([]);

  useEffect(() => {
    const cargarServiciosVencenEsteMes = async () => {
      try {
        const idSuscriptor = localStorage.getItem('idUsuario');
        const response = await obtenerServiciosVencenEsteMesAPI(idSuscriptor);
        setServiciosVencenEsteMes(response.data);
      } catch (error) {
        console.error("Error al obtener los servicios que vencen este mes:", error);
      }
    };

    cargarServiciosVencenEsteMes();
  }, []);

  return (
    <div className="container">
      <h3>Vencimientos de OCTUBREEEEE</h3>
      <div className="row mb-3">
        <div className="col-md-3 indicador my-1 mx-1">
          <FaCalendarPlus className="icono-indicador" />
          <h5>Cantidad Vencimientos</h5>
          <p className="valor-indicador">12</p> 
        </div>
        <div className="col-md-3 indicador my-1 mx-1">
          <FaMoneyBillTrendUp className="icono-indicador" />
          <h5>Monto total de Renovaciones</h5>
          <p className="valor-indicador-pequeno">$867</p> 
        </div>
        <div className="col-md-3 indicador my-1  mx-1">
          <GiReceiveMoney className="icono-indicador" />
          <h5>Monto ya cobrado</h5>
          <p className="valor-indicador">$45</p> 
        </div>
        <div className="col-md-3 indicador my-1  mx-1">
          <TbPigMoney className="icono-indicador" />
          <h5>Monto pendiente de Cobro</h5>
          <p className="valor-indicador">$756</p> 
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <h5>Monto por Cobrar por Categoría de Servicio</h5>
          <div className="progress mb-2">
            <div className="progress-bar bg-info" role="progressbar" style={{width: '30%'}} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">Servicio A - $300</div>
          </div>
          <div className="progress mb-2">
            <div className="progress-bar bg-success" role="progressbar" style={{width: '50%'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">Servicio B - $500</div>
          </div>
          <div className="progress">
            <div className="progress-bar bg-warning" role="progressbar" style={{width: '20%'}} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">Servicio C - $200</div>
          </div>
        </div>
        
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          <h5>Servicios que Vencen en el Mes Corriente</h5>
          {Array.isArray(serviciosVencenEsteMes) && serviciosVencenEsteMes.length > 0 ? (
            <table className="table table-striped table-dark">
            <thead>
              <tr>
                <th scope="col">Cliente</th>
                <th scope="col">Servicio</th>
                <th scope="col">Monto</th>
                <th scope="col">Moneda</th>
                <th scope="col">Frecuencia</th>
                <th scope="col">Fecha Vencimiento</th>
                <th scope="col">Estado</th>
              </tr>
            </thead>
            <tbody>
              {serviciosVencenEsteMes.map((servicio) => {
           
                return (
                  <tr key={servicio.id}>
                    <td>{servicio.cliente.nombre}</td>
                    <td>{servicio.servicioContratado.nombre}</td>
                    <td>{servicio.precio}</td>
                    <td>{servicio.monedaDelServicio.nombre}</td>
                    <td>{servicio.frecuenciaDelServicio.nombre}</td>
                    <td>{new Date(servicio.fechaVencimiento).toLocaleDateString()}</td>
                    <td>{servicio.estadoDelServicioDelCliente.nombre}</td>
                    
                  </tr>
                );
              })}
            </tbody>
          </table>
          ) : (
            <p>No existen servicios que expiren este mes.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default VencimientosDelMes;