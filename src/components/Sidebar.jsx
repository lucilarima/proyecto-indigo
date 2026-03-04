import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                {/* IMPORTANTE: El Link tiene que envolver el contenido.
                */}
                <Link to="/dashboard" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                    <h1>Indigo.</h1>
                </Link>
            </div>
            
            <nav className="sidebar-nav">
                <Link to="/dashboard" className={`nav-item ${isActive('/dashboard')}`}>
                    <span>🏠</span> Dashboard
                </Link>
                <Link to="/agenda" className={`nav-item ${isActive('/agenda')}`}>
                    <span>📅</span> Agenda
                </Link>
                <Link to="/mensajes" className={`nav-item ${isActive('/mensajes')}`}>
                    <span>💬</span> Mensajes
                </Link>
                <Link to="/configuracion" className={`nav-item ${isActive('/configuracion')}`}>
                    <span>⚙️</span> Configuración
                </Link>
            </nav>

            <div className="sidebar-footer">
                <button className="logout-btn-sidebar" onClick={handleLogout}>
                    <span>🚪</span> Log out
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;