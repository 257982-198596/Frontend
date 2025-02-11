import React from 'react';
import { FaClock } from "react-icons/fa";
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const IndicadoresAhorro = ({ notificacionesPorMes = {} }) => {
  const obtenerDatosGrafico = () => {
    // Inicializa un array de 12 elementos, para representar los 12 meses del año
    const data = Array(12).fill(0);

    // Verifica si hay datos de notificaciones por mes
    if (notificacionesPorMes) {
      // Recorre las claves del objeto notificacionesPorMes
      Object.keys(notificacionesPorMes).forEach(key => {
        // Convierte la clave (mes) a un índice de array (restando 1) y asigna el valor correspondiente
        data[parseInt(key) - 1] = notificacionesPorMes[key];
      });
    }

    return {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      datasets: [
        {
          label: 'Horas Ahorradas',
          data: data,
          backgroundColor: '#71397299',
          borderColor: '#713972',
          borderWidth: 1,
        },
      ],
    };
  };

  // Calcula las horas ahorradas del año
  const horasAhorradasAnio = Object.values(notificacionesPorMes).reduce((acc, val) => acc + val, 0);

  // Obtiene el mes corriente 
  const mesCorriente = new Date().getMonth();

  // Calcula las horas ahorradas en el mes corriente
  const horasAhorradasMes = notificacionesPorMes[mesCorriente + 1] || 0;

  // Verifica si todos los valores son cero
  const todosCeros = horasAhorradasAnio === 0;

 
  return (
    <div className="container-fluid">
      <h3 className="mb-5">Indicadores de Ahorro de Tiempo</h3>
      {todosCeros && (
        <p className="text-center aviso">Aún no se han procesado envíos de Notificaciones. Envía Notificaciones a tus clientes para actualizar tus indicadores.</p>
      )}
      <div className="row mb-3">
        <div className="col-md-4">
          <div className="indicador my-1">
            <FaClock className="icono-indicador" />
            <h5>Horas ahorradas este año en envío de correos</h5>
            <p className="valor-indicador">{horasAhorradasAnio}</p> 
          </div>
          <div className="indicador my-1">
            <FaClock className="icono-indicador" />
            <h5>Horas ahorradas este mes en envíos de correos</h5>
            <p className="valor-indicador">{horasAhorradasMes}</p> 
          </div>
        </div>
        <div className="col-md-8">
          <h5>Horas Ahorradas por Mes</h5>
          <Bar data={obtenerDatosGrafico()} />
        </div>
        
        <div className="espacio"></div>
        <p className="text-center">* Los datos son estimativos calculando 30 minutos por notificación enviada</p>
      </div>
    </div>
  );
};

export default IndicadoresAhorro;
