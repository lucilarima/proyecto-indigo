import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const isActive = (path) => location.pathname === path ? 'active' : '';
    const cerrarMenu = () => setMenuOpen(false);

    return (
        <aside className={`sidebar ${menuOpen ? 'is-open' : ''}`}>
            <div className="sidebar-brand">
                <Link to="/dashboard" style={{ textDecoration: 'none', cursor: 'pointer' }} onClick={cerrarMenu}>
                    <h1>Indigo.</h1>
                </Link>
            </div>

            {/* Botón hamburguesa: solo visible en mobile */}
            <button
                className={`sidebar-hamburger ${menuOpen ? 'active' : ''}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Abrir menú"
                aria-expanded={menuOpen}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <nav className="sidebar-nav" onClick={cerrarMenu}>
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
