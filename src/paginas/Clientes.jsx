import { FiUserCheck } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { borrarClienteEnAPI } from "../api/servicioClientes";
import { eliminarCliente } from "../slices/sliceClientes";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Clientes() {
  const clientes = useSelector((state) => state.sliceClientes.clientes);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const verDetallesCliente = (idCliente) => {
    navigate(`/clientes/detalle/${idCliente}`);
  };
  const editarCliente = (idCliente) => {
    // Navegar a la ruta de edición del cliente
    navigate(`/clientes/editar/${idCliente}`);
  };

  const borrarCliente = async (idCliente) => {
    try {
      const respBorrarCliente = await borrarClienteEnAPI(idCliente);

      const payload = {
        id: respBorrarCliente.idCliente,
      };
      dispatch(eliminarCliente(payload));
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div>
      <FiUserCheck className="icono-seccion" />
      <h2>Clientes</h2>
      <Link to="/clientes/alta">
        <button
          className="btn oblcolor"
          
        >
          Nuevo Cliente
        </button>
      </Link>

      <br></br>
      <div className="espacio"></div>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">#ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Documento</th>
            <th scope="col">Email</th>
            <th scope="col">País</th>
            <th scope="col">Telefono</th>
            <th scope="col">Detalles</th>
            <th scope="col">Editar</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => {
            return (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.numDocumento}</td>
                <td>{cliente.usuarioLogin.email}</td>
                <td>{cliente.pais.nombre}</td>
                <td>{cliente.telefono}</td>

                <td>
                  <button
                    className="btn btn-danger oblcolor"
                    onClick={() => verDetallesCliente(cliente.id)}
                  >
                    Ver Más
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger oblcolor"
                    onClick={() => editarCliente(cliente.id)}
                  >
                    Editar
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger oblcolor"
                    onClick={() => borrarCliente(cliente.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Clientes;
