import { useRef, useState } from "react";
import { iniciarSesionApi } from "../api/servicioUsuarios";
import { useNavigate } from "react-router-dom";
import Footer from "../componentes/Footer";
import { mostrarError, mostrarSuccess } from "../componentes/Toasts";
import { ToastContainer } from 'react-toastify';
import { obtenerSuscriptorPorIdUsuarioApi } from "../api/servicioSuscriptores";
import { obtenerClientePorIdDeUsuario } from "../api/servicioUsuarios";

function Login() {
  const usuarioRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();
  const [deshabilitado, setDeshabilitado] = useState(true);

  const iniciarSesion = async () => {
    //falta validar
    try {
      const response = await iniciarSesionApi(
        usuarioRef.current.value,
        passwordRef.current.value
      );
      if (response.status === 200) {
        const usuarioLogueado = response.data;
        console.log("Usuario logueado", usuarioLogueado);
        localStorage.setItem("idUsuario", usuarioLogueado.id);
        const idRol = usuarioLogueado.rolId;
        localStorage.setItem("idRol", idRol);
        const idUsuario = localStorage.getItem("idUsuario");
        console.log("idUsuario", idUsuario);

        //ROL SUSCRIPTOR
        if (idRol === 2) {
          const suscriptorResponse = await obtenerSuscriptorPorIdUsuarioApi(idUsuario);
          if (suscriptorResponse.status === 200) {
            const suscriptor = suscriptorResponse.data;
            localStorage.setItem("nombreSuscriptor", suscriptor.nombre);
            localStorage.setItem("idSuscriptor", suscriptor.id);
          }
          //ROL CLIENTE
        } else if (idRol === 3) {
          const response = await obtenerClientePorIdDeUsuario(usuarioLogueado.email);
          if (response.status === 200) {
            const cliente = response.data;
            console.log("Cliente", cliente);
            localStorage.setItem("nombreCliente", cliente.nombre);
            localStorage.setItem("idCliente", cliente.id);
          }
          
        }

        mostrarSuccess("Usuario logueado con éxito");
        navigate(`/`);
       

      }
    } catch (error) {
      mostrarError(error.message);
    }

  };

  const habilitarBoton = (event) => {
    const campoCompletado = event.target.value;
    if (campoCompletado.length > 0) {
      setDeshabilitado(false);
    } else {
      setDeshabilitado(true);
    }
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center mt-5">
          <div className="col-4">
            <h3>Iniciar Sesión</h3>
            <form>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example1">
                  Usuario
                </label>
                <input
                  type="text"
                  id="form2Example1"
                  className="form-control"
                  onChange={habilitarBoton}
                  ref={usuarioRef}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example2">
                  Password
                </label>
                <input
                  type="password"
                  id="form2Example2"
                  className="form-control"
                  onChange={habilitarBoton}
                  ref={passwordRef}
                />
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <button
                  type="button"
                  className="btn btn-dark btn-block mb-4"
                  onClick={iniciarSesion}
                  disabled={deshabilitado}
                >
                  Iniciar Sesion
                </button>
                <button
                  type="button"
                  className="btn btn-light oblcolor mb-4"
                  onClick={() => navigate('/registro')}
                >
                  Registrar Usuario
                </button>
              </div>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Login;
