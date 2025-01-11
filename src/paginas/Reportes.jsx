import { Link } from 'react-router-dom';
import { LuBarChart3 } from "react-icons/lu";

function Reportes() {
    return (
        <div>
            <LuBarChart3 className="icono-seccion" />
            <h2>Reportes</h2>
            <ul>
                <li>
                    <Link to="/reportes/vencimientos-del-mes">Vencimientos del Mes</Link>
                </li>
                <li>
                    <Link to="/reportes/cobros-mensuales">Cobros Mensuales</Link>
                </li>
            </ul>
            
        </div>
    );
}

export default Reportes;