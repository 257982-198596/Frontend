import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Login from "../paginas/Login";
import Registro from "../paginas/Registro";
import ControlAutenticacion from "../componentes/ControlAutenticacion";
import RutasProtegidas from "./RutasProtegidas";
function Rutas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route
          path="/*"
          element={
            <ControlAutenticacion>
              <RutasProtegidas />
            </ControlAutenticacion>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Rutas;
