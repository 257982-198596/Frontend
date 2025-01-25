import { Link } from 'react-router-dom';
import { LuBarChart3 } from "react-icons/lu";

function Reportes() {
    return (
        <div>
            <LuBarChart3 className="icono-seccion" />
            <h2>Reportes</h2>
            <div className="row">
                <div className="col-md-6 indicador my-1">
                    <Link to="/reportes/vencimientos-del-mes" className="indicador-link">
                        <div className="d-flex align-items-center">
                            <LuBarChart3 className="icono-indicador" />
                            <h5 className="ms-2">Vencimientos del Mes</h5>
                        </div>
                    </Link>
                </div>
                <div className="col-md-6 indicador my-1">
                    <Link to="/reportes/cobros-mensuales" className="indicador-link">
                        <div className="d-flex align-items-center">
                            <LuBarChart3 className="icono-indicador" />
                            <h5 className="ms-2">Cobros Mensuales</h5>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Reportes;