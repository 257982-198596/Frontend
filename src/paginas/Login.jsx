import  { useRef, useState } from "react";
import { iniciarSesionApi } from "../api/servicioUsuarios";
import { Link,useNavigate } from "react-router-dom";
import Footer from "../componentes/Footer";


function Login() {
  const usuarioRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();
  const [deshabilitado, setDeshabilitado] = useState(true);

  const [errorLogin, setErrorLogin] = useState(false);

  const iniciarSesion = async () => {
    //falta validar
    try{
    const response = await iniciarSesionApi(
      usuarioRef.current.value,
      passwordRef.current.value
    );
    if (response.status === 200) {
      const usuarioLogueado = response.data;  
      console.log("Usuario logueado", usuarioLogueado);
      localStorage.setItem("idUsuario", usuarioLogueado.id);
      localStorage.setItem("idRol", usuarioLogueado.rolId);
      //localStorage.setItem("apiKey", respuesta.apiKey);
      navigate(`/`);
    }else{
      	console.error("Error al iniciar sesion");
        setErrorLogin(response.data);
    }
    }catch(error){
      console.error(error.response?.data || error.message);
      setErrorLogin(error.response?.data || "Error al iniciar sesión");
    }
    
  };

  const habilitarBoton = (event) => {
    const campoCompletado = event.target.value;
    if(campoCompletado.length > 0){
      setDeshabilitado(false);
    }else{
      setDeshabilitado(true);
    }
  }

  return (
    <>
      <div className="container">
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

              <button
                type="button"
                className="btn btn-dark btn-block mb-4"
                onClick={iniciarSesion} 
                disabled={deshabilitado}
              >
                Iniciar Sesion
              </button>
              <br />
              {errorLogin && <p className="oblerror">Error de usuario o contraseña</p>}
              <Link to="/registro">Registrar Usuario</Link>
            </form>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Login;
