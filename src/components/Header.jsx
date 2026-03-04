import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    
    // Estado propio para abrir/cerrar las notificaciones
    const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);

    const inicialUsuario = user && user.name ? user.name.charAt(0).toUpperCase() : 'L';

    return (
        <header className="top-bar">
            <div className="search-bar">
                <span>🔍</span><input type="text" placeholder="Search..." />
            </div>
            <div className="top-bar-actions">
                {/* Botón de Mensajes funcional */}
                <button className="icon-btn" onClick={() => navigate('/mensajes')}>✉️</button>
                
                {/* Campanita con menú desplegable */}
                <div className="notification-wrapper">
                    <button className="icon-btn" onClick={() => setMostrarNotificaciones(!mostrarNotificaciones)}>
                        🔔
                    </button>
                    {mostrarNotificaciones && (
                        <div className="notification-dropdown">
                            No hay notificaciones pendientes.
                        </div>
                    )}
                </div>

                <div className="profile-img-placeholder small">{inicialUsuario}</div>
            </div>
        </header>
    );
};

export default Header;