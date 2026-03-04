import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext'; 
import Header from '../components/Header';
import Sidebar from '../components/Sidebar'; // <-- IMPORTAMOS EL COMPONENTE NUEVO
import './Dashboard.css';

const Dashboard = () => {
    // Traemos los datos del contexto global
    const { proyectos, setProyectos, tareas, setTareas } = useData();

    // Estados locales para los formularios
    const [nuevoProyecto, setNuevoProyecto] = useState("");
    const [nuevaTarea, setNuevaTarea] = useState("");
    const [fechaTarea, setFechaTarea] = useState(""); 
    const [proyectoTarea, setProyectoTarea] = useState(""); 
    const [tareaArrastrada, setTareaArrastrada] = useState(null);

    // --- FUNCIONES DE LÓGICA ---
    const handleCrearProyecto = (e) => {
        e.preventDefault();
        if (nuevoProyecto.trim() !== "") {
            setProyectos([...proyectos, { id: Date.now(), nombre: nuevoProyecto }]);
            setNuevoProyecto("");
        }
    };

    const handleCrearTarea = (e) => {
        e.preventDefault();
        if (nuevaTarea.trim() !== "" && fechaTarea !== "") {
            setTareas([...tareas, { 
                id: Date.now(), 
                titulo: nuevaTarea, 
                fecha: fechaTarea, 
                completada: false,
                proyectoId: proyectoTarea ? parseInt(proyectoTarea) : null,
                hora: "",          
                programada: false  
            }]);
            setNuevaTarea("");
            setFechaTarea("");
            setProyectoTarea("");
        }
    };

    const toggleTarea = (id) => {
        setTareas(tareas.map(tarea => tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea));
    };

    const formatearFechaVista = (fechaISO) => {
        if (!fechaISO) return "";
        const [anio, mes, dia] = fechaISO.split('-');
        return `${dia}/${mes}/${anio}`;
    };

    // Funciones de Drag & Drop
    const iniciarArrastre = (e, id) => setTareaArrastrada(id);
    const finalizarArrastre = () => setTareaArrastrada(null);
    const permitirSoltar = (e) => e.preventDefault(); 
    const soltarEnBasura = (e) => {
        e.preventDefault();
        if (tareaArrastrada) {
            setTareas(tareas.filter(t => t.id !== tareaArrastrada));
            setTareaArrastrada(null);
        }
    };

    return (
        <div className="app-layout">
            
            {/* AQUÍ LLAMAMOS AL SIDEBAR QUE AHORA TIENE EL LOGO CLICKEABLE */}
            <Sidebar />

            <main className="main-content">
                <Header />

                <div className="dashboard-container">
                    
                    <h2 className="section-title">Mis Tareas</h2>
                    <section className="tasks-section">
                        <form onSubmit={handleCrearTarea} className="add-task-form">
                            <input type="text" placeholder="Ej: Llamar al cliente..." value={nuevaTarea} onChange={(e) => setNuevaTarea(e.target.value)} required />
                            <select className="project-select" value={proyectoTarea} onChange={(e) => setProyectoTarea(e.target.value)}>
                                <option value="">Sin proyecto</option>
                                {proyectos.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
                            </select>
                            <input type="date" value={fechaTarea} onChange={(e) => setFechaTarea(e.target.value)} required />
                            <button type="submit" className="add-btn">+ Tarea</button>
                        </form>

                        <div className="task-list">
                            {tareas.length === 0 ? <p className="empty-state">No hay tareas pendientes.</p> : (
                                <>
                                    {tareas.map((tarea) => {
                                        const proyectoAsociado = proyectos.find(p => p.id === tarea.proyectoId);
                                        return (
                                            <div key={tarea.id} className={`task-item ${tarea.completada ? 'completed' : ''} ${tareaArrastrada === tarea.id ? 'is-dragging' : ''}`} draggable="true" onDragStart={(e) => iniciarArrastre(e, tarea.id)} onDragEnd={finalizarArrastre}>
                                                <div className="task-info">
                                                    <svg className="drag-handle" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M8 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM18 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM18 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM18 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/></svg>
                                                    <input type="checkbox" checked={tarea.completada} onChange={() => toggleTarea(tarea.id)} className="task-checkbox" />
                                                    <span className="task-title">{tarea.titulo}</span>
                                                    {proyectoAsociado && <span className="task-project-badge">{proyectoAsociado.nombre}</span>}
                                                </div>
                                                <span className="task-date">{formatearFechaVista(tarea.fecha)}</span>
                                            </div>
                                        )
                                    })}
                                    {!tareaArrastrada && <p className="drag-hint">💡 Mantené presionada una tarea y arrastrala para eliminarla</p>}
                                </>
                            )}
                        </div>
                        <div className={`trash-drop-zone ${tareaArrastrada ? 'active' : ''}`} onDragOver={permitirSoltar} onDrop={soltarEnBasura}><span>🗑️ Soltá para eliminar</span></div>
                    </section>

                    <h2 className="section-title">Crear Nuevo Proyecto</h2>
                    <section className="create-project-section">
                        <form onSubmit={handleCrearProyecto} className="create-project-form">
                            <input type="text" placeholder="Ej: Branding..." value={nuevoProyecto} onChange={(e) => setNuevoProyecto(e.target.value)} required />
                            <button type="submit" className="add-btn">+ Agregar</button>
                        </form>
                    </section>

                    <h2 className="section-title">Tus Proyectos</h2>
                    <div className="projects-grid">
                        {proyectos.map((proy) => {
                            const tareasDelProyecto = tareas.filter(t => t.proyectoId === proy.id && !t.completada);
                            return (
                                <div key={proy.id} className="project-card">
                                    <h3>{proy.nombre}</h3>
                                    <p>{tareasDelProyecto.length} tareas pendientes</p>
                                    <Link to={`/proyecto/${proy.id}`} className="view-link">Ver Detalles</Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;