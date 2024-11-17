
import { Link, useLocation } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";
import { FiAirplay } from "react-icons/fi";

import { FiUserCheck } from "react-icons/fi";
import { LuBarChart3 } from "react-icons/lu";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { FiSliders } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";


function Sidebar() {
  const location = useLocation();

  

  return (
    <div className="sidebar">
      <ul className="menu">
        <li
          className={location.pathname === "/" ? "active" : ""}
          id="menuprincipal"
        >
          <Link to="/">
            
            <FiAirplay className="icono-sidebar" />
            <span className="link-text">Home</span>
          </Link>
        </li>
        <li
          className={location.pathname === "/clientes" ? "active" : ""}
          id="menuprincipal"
        >
          <Link to="/clientes">
            
            <FiUserCheck className="icono-sidebar" />
            <span className="link-text">Clientes</span>
          </Link>
        </li>
        <li
          className={location.pathname === "/servicios" ? "active" : ""}
          id="menuprincipal"
        >
          <Link to="/servicios">
            
            <FiShoppingCart className="icono-sidebar" />

            <span className="link-text">Servicios</span>
          </Link>
        </li>
        <li
          className={location.pathname === "/notificaciones" ? "active" : ""}
          id="menuprincipal"
        >
          <Link to="/notificaciones">
          <FiCalendar className="icono-sidebar"/>
            
            <span className="link-text">Notificaciones</span>
          </Link>
        </li>
        <li
          className={location.pathname === "/cobros" ? "active" : ""}
          id="menuprincipal"
        >
          <Link to="/cobros">
           
            <FaRegMoneyBillAlt className="icono-sidebar"  />
            <span className="link-text">Cobros</span>
          </Link>
        </li>
        <li
          className={location.pathname === "/reportes" ? "active" : ""}
          id="menuprincipal"
        >
          <Link to="/reportes">
           
            <LuBarChart3 className="icono-sidebar" />
            <span className="link-text">Reportes</span>
          </Link>
        </li>
        <li
          className={location.pathname === "/categorias" ? "active" : ""}
          id="menuprincipal"
        >
          <Link to="/categorias">
            
            <FiSliders className="icono-sidebar" />
            <span className="link-text">Categorías</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
