import { Link, useLocation } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { FiUserCheck } from "react-icons/fi";

function SidebarClientes() {
  const location = useLocation();

  return (
    <div className="sidebar">
      <ul className="menu">
        <li
          className={location.pathname === "/" ? "active" : ""}
          id="menuprincipal"
        >
          <Link to="/">
            <FiShoppingCart className="icono-sidebar" />
            <span className="link-text">Servicios Contratados</span>
          </Link>
        </li>
        <li
          className={location.pathname === "/perfil-cliente" ? "active" : ""}
          id="menuprincipal"
        >
          <Link to="/perfil-cliente">
            <FiUserCheck className="icono-sidebar" />
            <span className="link-text">Mi Perfil</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SidebarClientes;
