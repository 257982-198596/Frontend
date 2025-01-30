import React, { useEffect, useState } from 'react';
import { FaCalendarPlus } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";
import { TbPigMoney } from "react-icons/tb";
import { obtenerServiciosVencenEsteMesAPI, obtenerIndicadoresVencimientosMesAPI } from '../../api/servicioServiciosDelCliente';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const VencimientosDelMes = () => {
  const [serviciosVencenEsteMes, setServiciosVencenEsteMes] = useState([]);
  const [cantidadVencimientos, setCantidadVencimientos] = useState(0);
  const [montoTotalRenovaciones, setMontoTotalRenovaciones] = useState(0);
  const [montoYaCobrado, setMontoYaCobrado] = useState(0);
  const [montoPendienteCobro, setMontoPendienteCobro] = useState(0);
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 10;

  const handlePageChange = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const serviciosPaginados = Array.isArray(serviciosVencenEsteMes)
    ? serviciosVencenEsteMes.slice(
        (paginaActual - 1) * elementosPorPagina,
        paginaActual * elementosPorPagina
      )
    : [];

  const totalPaginas = Array.isArray(serviciosVencenEsteMes)
    ? Math.ceil(serviciosVencenEsteMes.length / elementosPorPagina)
    : 0;

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
        const idSuscriptor = localStorage.getItem('idSuscriptor');
        const response = await obtenerServiciosVencenEsteMesAPI(idSuscriptor);
        console.log("Servicios que vencen este mes:", response.data);   
        setServiciosVencenEsteMes(response.data);

        // Fetch indicators
        const indicadoresResponse = await obtenerIndicadoresVencimientosMesAPI(idSuscriptor);
        const indicadores = indicadoresResponse.data;
        setCantidadVencimientos(indicadores.CantidadVencimientos.toFixed(1));
        setMontoTotalRenovaciones(indicadores.MontoTotalRenovaciones.toFixed(1));
        setMontoYaCobrado(indicadores.MontoYaCobrado.toFixed(1));
        setMontoPendienteCobro(indicadores.MontoPendienteCobro.toFixed(1));
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
              <p className="valor-indicador">{montoTotalRenovaciones} USD</p> 
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 indicador my-1">
              <GiReceiveMoney className="icono-indicador" />
              <h5>Monto ya cobrado</h5>
              <p className="valor-indicador">{montoYaCobrado} USD</p> 
            </div>
            <div className="col-md-6 indicador my-1">
              <TbPigMoney className="icono-indicador" />
              <h5>Monto pendiente de Cobro</h5>
              <p className="valor-indicador">{montoPendienteCobro} USD</p> 
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
            <>
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
                  {serviciosPaginados.map((servicio) => (
                    <tr key={servicio.id}>
                      <td>{servicio.cliente.nombre}</td>
                      <td>{servicio.servicioContratado.nombre}</td>
                      <td>{servicio.precio}</td>
                      <td>{servicio.monedaDelServicio.nombre}</td>
                      <td>{servicio.frecuenciaDelServicio.nombre}</td>
                      <td>{new Date(servicio.fechaVencimiento).toLocaleDateString()}</td>
                      <td>{servicio.estadoDelServicioDelCliente.nombre}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
            <p>No existen servicios que expiren este mes.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default VencimientosDelMes;