import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { obtenerServiciosClienteAPI } from "../../api/servicioServiciosDelCliente";
function ServiciosDelCliente() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [serviciosContratados, setServiciosContratados] = useState([]);
  
  const cliente = useSelector((state) =>
    state.sliceClientes.clientes.find((cliente) => cliente.id === parseInt(id))
  );

  useEffect(() => {
    const cargarServicios = async () => {
      const response = await obtenerServiciosClienteAPI(id);
      setServiciosContratados(response.data);
    };
    cargarServicios();
  }, [id]);


  return (
    <div className="container">
      <h3>Servicios de {cliente?.nombre || "Cliente no encontrado"}</h3>

      <Link to={`/clientes/asociar-servicio/${id}`}>
        <button className="btn oblcolor">Asociar Servicio</button>
      </Link>
      <div className="espacio"></div>
      {Array.isArray(serviciosContratados) && serviciosContratados.length > 0 ? (
        <table className="table table-striped table-dark">
          <thead>
            <tr>

              <th>Servicio</th>
              <th>Precio</th>
              <th>Moneda</th>
              <th>Frecuencia</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {serviciosContratados.map((servicio) => (
              <tr key={servicio.id}>

                <td>{servicio.servicioContratado.nombre}</td>
                <td>{servicio.precio}</td>
                <td>{servicio.monedaDelServicio.nombre}</td>
                <td>{servicio.frecuenciaDelServicio.nombre}</td>
                <td>{new Date(servicio.fechaInicio).toLocaleDateString()}</td>
                <td>{new Date(servicio.fechaVencimiento).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-danger oblcolor btn-sm me-2"
                    onClick={() => console.log("Editar servicio", servicio.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger oblcolor btn-sm"
                    onClick={() => console.log("Eliminar servicio", servicio.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Este cliente no tiene servicios asociados.</p>
      )}
    </div>
  );
}

export default ServiciosDelCliente;
