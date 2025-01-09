import React, { useEffect, useState } from 'react';
import { FaCalendarPlus } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";
import { TbPigMoney } from "react-icons/tb";
import { obtenerServiciosVencenEsteMesAPI } from '../../api/servicioServiciosDelCliente';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const VencimientosDelMes = () => {
  const [serviciosVencenEsteMes, setServiciosVencenEsteMes] = useState([]);
  const [cantidadVencimientos, setCantidadVencimientos] = useState(0);
  const [montoTotalRenovaciones, setMontoTotalRenovaciones] = useState(0);
  const [montoYaCobrado, setMontoYaCobrado] = useState(0);
  const [montoPendienteCobro, setMontoPendienteCobro] = useState(0);

  const obtenerNombreMesYAño = () => {
    const meses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const fechaActual = new Date();
    const mes = meses[fechaActual.getMonth()];
    const año = fechaActual.getFullYear();
    return `${mes} ${año}`;
  };

  useEffect(() => {
    const cargarServiciosVencenEsteMes = async () => {
      try {
        const idSuscriptor = localStorage.getItem('idUsuario');
        const response = await obtenerServiciosVencenEsteMesAPI(idSuscriptor);
        console.log("Servicios que vencen este mes:", response.data);   
        setServiciosVencenEsteMes(response.data);
        //cantidad vencimientos del mes
        setCantidadVencimientos(response.data.length);
        //monto total renovaciones
        const totalRenovaciones = response.data.reduce((total, servicio) => total + servicio.precio, 0);
        setMontoTotalRenovaciones(totalRenovaciones);
        //total ya cobrado
        const totalCobrado = response.data
          .filter(servicio => servicio.estadoDelServicioDelCliente.nombre === "Pago")
          .reduce((total, servicio) => total + servicio.precio, 0);
        setMontoYaCobrado(totalCobrado);
        //resta monto pendiente de cobro
        setMontoPendienteCobro(totalRenovaciones - totalCobrado);
      } catch (error) {
        console.error("Error al obtener los servicios que vencen este mes:", error);
      }
    };

    cargarServiciosVencenEsteMes();
  }, []);

  const obtenerDatosGrafico = () => {
    const datosPorServicio = serviciosVencenEsteMes.reduce((acc, servicio) => {
      const nombreServicio = servicio.servicioContratado.nombre;
      if (!acc[nombreServicio]) {
        acc[nombreServicio] = 0;
      }
      acc[nombreServicio] += servicio.precio;
      return acc;
    }, {});
    console.log("Datos por servicio:", datosPorServicio);
    return {
      labels: Object.keys(datosPorServicio),
      datasets: [
        {
          label: 'Monto por Tipo de Servicio',
          data: Object.values(datosPorServicio),
          backgroundColor: '#71397299',
          borderColor: '#713972',
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div className="container">
      <h3>Vencimientos de {obtenerNombreMesYAño()}</h3>
      <div className="row mb-3">
        <div className="col-md-7">
          <div className="row">
            <div className="col-md-6 indicador my-1">
              <FaCalendarPlus className="icono-indicador" />
              <h5>Cantidad Vencimientos</h5>
              <p className="valor-indicador">{cantidadVencimientos}</p> 
            </div>
            <div className="col-md-6 indicador my-1">
              <FaMoneyBillTrendUp className="icono-indicador" />
              <h5>Monto total de Renovaciones</h5>
              <p className="valor-indicador">${montoTotalRenovaciones}</p> 
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 indicador my-1">
              <GiReceiveMoney className="icono-indicador" />
              <h5>Monto ya cobrado</h5>
              <p className="valor-indicador">${montoYaCobrado}</p> 
            </div>
            <div className="col-md-6 indicador my-1">
              <TbPigMoney className="icono-indicador" />
              <h5>Monto pendiente de Cobro</h5>
              <p className="valor-indicador">${montoPendienteCobro}</p> 
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <h5>Monto por Cobrar por Tipo de Servicio</h5>
          <Bar data={obtenerDatosGrafico()} />
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