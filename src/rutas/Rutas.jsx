import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Login from "../paginas/Login";
import Registro from "../paginas/Registro";
import Home from "../paginas/Home";
import Clientes from "../paginas/Clientes";
import Notificaciones from "../paginas/Notificaciones";
import Cobros from "../paginas/Cobros";
import Reportes from "../paginas/Reportes";
import Categorias from "../paginas/Categorias";
import Servicios from "../paginas/Servicios";


function Rutas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />

        <Route path="/registro" element={<Registro />} />

        <Route path="/" element={<Home />}>
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/notificaciones" element={<Notificaciones />} />
          <Route path="/cobros" element={<Cobros />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/categorias" element={<Categorias />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Rutas;
