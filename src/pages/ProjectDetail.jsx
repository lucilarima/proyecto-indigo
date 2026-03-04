import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext'; 
import Header from '../components/Header';
import './Dashboard.css'; 

const ProjectDetail = () => {
    const { id } = useParams();
    const { logout } = useAuth();
    const navigate = useNavigate();
    
    // SALVAVIDAS 1: Si useData tarda en responder, le ponemos arrays vacíos por defecto
    const { proyectos = [], tareas = [] } = useData() || {};

    // SALVAVIDAS 2: Convertimos ambos a String para que coincidan 100% (evitamos parseInt)
    const proyecto = proyectos.find(p => String(p.id) === String(id));
    const tareasProyecto = tareas.filter(t => String(t.proyectoId) === String(id));

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const formatearFechaVista = (fechaISO) => {
        if (!fechaISO) return "";
        const [anio, mes, dia] = fechaISO.split('-');
        return `${dia}/${mes}/${anio}`;
    };

    // Si tipean un ID raro en la barra de búsqueda o el proyecto no existe
    if (!proyecto) {
        return (
            <div className="app-layout" style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <h2 style={{ color: '#1e1b4b' }}>Proyecto #{id} no encontrado</h2>
                <p style={{ color: '#64748b' }}>Asegurate de haber seleccionado un proyecto válido.</p>
                <Link to="/dashboard" className="add-btn" style={{ textDecoration: 'none', marginTop: '15px' }}>
                    Volver al Dashboard
                </Link>
            </div>
        );
    }

    return (
        <div className="app-layout">
            <aside className="sidebar">
                <div className="sidebar-brand"><h1>Indigo.</h1></div>
                <nav className="sidebar-nav">
                    <Link to="/dashboard" className="nav-item"><span>🏠</span> Dashboard</Link>
                    <Link to="/agenda" className="nav-item"><span>📅</span> Agenda</Link>
                    <Link to="/mensajes" className="nav-item"><span>💬</span> Mensajes</Link>
                    <Link to="/configuracion" className="nav-item"><span>⚙️</span> Configuración</Link>
                </nav>
                <div className="sidebar-footer">
                    <button className="logout-btn-sidebar" onClick={handleLogout}><span>🚪</span> Log out</button>
                </div>
            </aside>

            <main className="main-content">
                <Header />

                <div className="dashboard-container">
                    <Link to="/dashboard" style={{ textDecoration: 'none', color: '#64748b', fontWeight: 'bold', display: 'inline-block', marginBottom: '20px' }}>
                        ← Volver al Dashboard
                    </Link>

                    <div className="create-project-section" style={{ borderLeft: '5px solid #4f46e5' }}>
                        <h1 style={{ color: '#1e1b4b', margin: '0 0 10px 0' }}>{proyecto.nombre}</h1>
                        <p style={{ color: '#64748b', margin: 0 }}>
                            ID del Proyecto: {id} | Tareas vinculadas: {tareasProyecto.length}
                        </p>
                    </div>

                    <section className="tasks-section">
                        <h2>Tareas de este proyecto</h2>
                        <div className="task-list">
                            {tareasProyecto.length === 0 ? (
                                <p className="empty-state">No hay tareas creadas para este proyecto.</p>
                            ) : (
                                tareasProyecto.map((tarea) => (
                                    <div key={tarea.id} className={`task-item ${tarea.completada ? 'completed' : ''}`}>
                                        <div className="task-info">
                                            <input type="checkbox" checked={tarea.completada} readOnly className="task-checkbox" />
                                            <span className="task-title">{tarea.titulo}</span>
                                        </div>
                                        <span className="task-date">{formatearFechaVista(tarea.fecha)}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default ProjectDetail;