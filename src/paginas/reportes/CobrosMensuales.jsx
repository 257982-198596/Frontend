import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { obtenerCobrosPorMesYServicioAPI, obtenerCobrosPorMesYClienteAPI } from '../../api/servicioCobros';

const CobrosMensuales = () => {
  const [servicioTipoSeleccionado, setTipoServicioSeleccionada] = useState('');
  const [clienteSeleccionado, setClienteSeleccionado] = useState('');
  const [datosPorCategoria, setDatosPorCategoria] = useState({});
  const [datosPorCliente, setDatosPorCliente] = useState({});

  const clientes = useSelector((state) => state.sliceClientes.clientes);
  const servicios = useSelector((state) => state.sliceServicios.servicios);

  useEffect(() => {
    const cargarDatosPorTipoServicio = async () => {
      try {
        const suscriptorId = localStorage.getItem('idSuscriptor');
        const year = new Date().getFullYear();
        const response = await obtenerCobrosPorMesYServicioAPI(suscriptorId, year, servicioTipoSeleccionado);
        setDatosPorCategoria(response.data);
      } catch (error) {
        console.error("Error al obtener los cobros por categoría:", error);
      }
    };

    if (servicioTipoSeleccionado) {
      cargarDatosPorTipoServicio();
    }
  }, [servicioTipoSeleccionado]);

  useEffect(() => {
    const cargarDatosPorCliente = async () => {
      try {
        const suscriptorId = localStorage.getItem('idSuscriptor');
        const year = new Date().getFullYear();
        const response = await obtenerCobrosPorMesYClienteAPI(suscriptorId, year, clienteSeleccionado);
        setDatosPorCliente(response.data);
        console.log("respuesta",response.data);
      } catch (error) {
        console.error("Error al obtener los cobros por cliente:", error);
      }
    };

    if (clienteSeleccionado) {
      cargarDatosPorCliente();
    }
  }, [clienteSeleccionado]);

  const obtenerDatosGrafico = (datos) => {
    const meses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return {
      labels: meses,
      datasets: [
        {
          label: 'Monto en USD',
          data: meses.map((mes, index) => (datos[index + 1] || 0).toFixed(1)),
          backgroundColor: '#71397299',
          borderColor: '#713972',
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div className="container">
      <h2>Reporte de Cobros Mensuales en el Año Corriente</h2>
      <div className="espacio"></div>
      <div className="row mb-3">
        <div className="col-md-6">
          <h5>Seleccione Tipo de Servicio</h5>
          <select
            className="form-select"
            value={servicioTipoSeleccionado}
            onChange={(e) => setTipoServicioSeleccionada(e.target.value)}
          >
            <option value="">Seleccione un tipo de servicio</option>
            {servicios.map((servicio) => (
              <option key={servicio.id} value={servicio.id}>
                {servicio.nombre}
              </option>
            ))}
          </select>
          {servicioTipoSeleccionado && (
            <Bar data={obtenerDatosGrafico(datosPorCategoria)} />
          )}
        </div>
        <div className="col-md-6">
          <h5>Seleccione Cliente</h5>
          <select
            className="form-select"
            value={clienteSeleccionado}
            onChange={(e) => setClienteSeleccionado(e.target.value)}
          >
            <option value="">Seleccione un cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nombre}
              </option>
            ))}
          </select>
          {clienteSeleccionado && (
            <Bar data={obtenerDatosGrafico(datosPorCliente)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CobrosMensuales;