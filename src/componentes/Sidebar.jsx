import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
    const location = useLocation();

    const menuItems = [
        { path: '/', label: 'HOME' },
        { path: '/clientes', label: 'CLIENTES' },
        { path: '/notificaciones', label: 'NOTIFICACIONES' },
        { path: '/cobros', label: 'COBROS' },
        { path: '/reportes', label: 'REPORTES' },
        { path: '/categorias', label: 'CATEGORÍAS' },
    ];

    return (
        <div className="sidebar">
           
            <ul className="menu">
                {menuItems.map((item) => (
                    <li
                        key={item.path}
                        className={location.pathname === item.path ? 'active' : ''}
                    >
                        <Link to={item.path}>{item.label}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
