import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BsPersonPlusFill } from "react-icons/bs";
import { FiBell } from "react-icons/fi";

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
            <FiBell className="icono-sidebar" />
            
            <span className="link-text">Home</span>
          </Link>
        </li>
        <li
          className={location.pathname === "/clientes" ? "active" : ""}
          id="menuprincipal"
        >
          <Link to="/clientes">
            <FiBell className="icono-sidebar" />
            <span className="link-text">Clientes</span>
          </Link>
        </li>
        <li
          className={location.pathname === "/servicios" ? "active" : ""}
          id="menuprincipal"
        >
          <Link to="/servicios">
            <FiBell className="icono-sidebar" />
            <span className="link-text">Servicios</span>
          </Link>
        </li>
        <li
          className={location.pathname === "/notificaciones" ? "active" : ""}
          id="menuprincipal"
        >
          <Link to="/notificaciones">
            <FiBell className="icono-sidebar" />
            <span className="link-text">Notificaciones</span>
          </Link>
        </li>
        <li
          className={location.pathname === "/cobros" ? "active" : ""}
          id="menuprincipal"
        >
          <Link to="/cobros">
            <FiBell className="icono-sidebar" />
            <span className="link-text">Cobros</span>
          </Link>
        </li>
        <li
          className={location.pathname === "/reportes" ? "active" : ""}
          id="menuprincipal"
        >
          <Link to="/reportes">
            <FiBell className="icono-sidebar" />
            <span className="link-text">Reportes</span>
          </Link>
        </li>
        <li
          className={location.pathname === "/categorias" ? "active" : ""}
          id="menuprincipal"
        >
          <Link to="/categorias">
            <FiBell className="icono-sidebar" />
            <span className="link-text">Categorías</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
