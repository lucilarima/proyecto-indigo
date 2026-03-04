import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import Header from '../components/Header';
import './Agenda.css';

const Agenda = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const { proyectos, tareas, setTareas } = useData();

    const hoy = new Date();
    const [fechaBase, setFechaBase] = useState(new Date(hoy.getFullYear(), hoy.getMonth(), 1));
    const [fechaSeleccionada, setFechaSeleccionada] = useState(hoy);
    const [horasTemporales, setHorasTemporales] = useState({});
    const [menuAbierto, setMenuAbierto] = useState(null);
    const [editando, setEditando] = useState(null); 

    const handleLogout = () => { logout(); navigate('/'); };
    const cambiarMes = (offset) => setFechaBase(new Date(fechaBase.getFullYear(), fechaBase.getMonth() + offset, 1));
    const formatearFechaISO = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const fechaSeleccionadaStr = formatearFechaISO(fechaSeleccionada);

    const obtenerDiasDelMes = () => {
        const year = fechaBase.getFullYear();
        const month = fechaBase.getMonth();
        const primerDiaSemana = new Date(year, month, 1).getDay();
        const diasEnMes = new Date(year, month + 1, 0).getDate();
        let inicioOffset = primerDiaSemana === 0 ? 6 : primerDiaSemana - 1;
        const dias = [];
        for (let i = 0; i < inicioOffset; i++) dias.push({ vacio: true, key: `vacio-${i}` });
        for (let i = 1; i <= diasEnMes; i++) dias.push({ fecha: new Date(year, month, i), dia: i, key: `dia-${i}` });
        return dias;
    };

    const nombresMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const nombresDias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    const programarTarea = (id) => {
        const horaSeleccionada = horasTemporales[id];
        if (horaSeleccionada) {
            setTareas(tareas.map(t => t.id === id ? { ...t, hora: horaSeleccionada, fecha: fechaSeleccionadaStr, programada: true } : t));
            setHorasTemporales({ ...horasTemporales, [id]: "" });
        }
    };

    const borrarTarea = (id) => {
        setTareas(tareas.filter(t => t.id !== id));
        setMenuAbierto(null);
    };

    const desprogramarTarea = (id) => {
        setTareas(tareas.map(t => t.id === id ? { ...t, programada: false, hora: "" } : t));
        setMenuAbierto(null);
    };

    const iniciarEdicion = (tarea, campo) => setEditando({ id: tarea.id, campo, valorTemp: tarea[campo] });

    const guardarEdicion = () => {
        if (editando) {
            setTareas(tareas.map(t => t.id === editando.id ? { ...t, [editando.campo]: editando.valorTemp } : t));
            setEditando(null);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') guardarEdicion();
        if (e.key === 'Escape') setEditando(null);
    };

    const horasDia = Array.from({ length: 11 }, (_, i) => `${(i + 8).toString().padStart(2, '0')}:00`);

    return (
        <div className="app-layout">
            <aside className="sidebar">
                <div className="sidebar-brand"><h1>Indigo.</h1></div>
                <nav className="sidebar-nav">
                    <Link to="/dashboard" className="nav-item"><span>🏠</span> Dashboard</Link>
                    <Link to="/agenda" className="nav-item active"><span>📅</span> Agenda</Link>
                    <Link to="/mensajes" className="nav-item"><span>💬</span> Mensajes</Link>
                    <Link to="/configuracion" className="nav-item"><span>⚙️</span> Configuración</Link>
                </nav>
                <div className="sidebar-footer">
                    <button className="logout-btn-sidebar" onClick={handleLogout}><span>🚪</span> Log out</button>
                </div>
            </aside>

            <main className="main-content">
                <Header />

                <div className="agenda-grid">
                    <section className="timeline-section">
                        <div className="timeline-header">
                            <h2>{nombresDias[fechaSeleccionada.getDay()]} {fechaSeleccionada.getDate()}</h2>
                            <p>{nombresMeses[fechaSeleccionada.getMonth()]} {fechaSeleccionada.getFullYear()}</p>
                        </div>
                        <div className="timeline-container">
                            {horasDia.map(hora => {
                                const tareaEnHora = tareas.find(t => t.hora === hora && t.fecha === fechaSeleccionadaStr && t.programada);
                                const proyectoAsociado = tareaEnHora ? proyectos.find(p => p.id === tareaEnHora.proyectoId) : null;
                                
                                return (
                                    <div key={hora} className="time-slot">
                                        <div className="time-label">{hora}</div>
                                        <div className="time-line"></div>
                                        <div className="time-content">
                                            {tareaEnHora ? (
                                                <div className="scheduled-card">
                                                    <div className="card-header">
                                                        {editando && editando.id === tareaEnHora.id && editando.campo === 'titulo' ? (
                                                            <input autoFocus className="inline-edit-input title-edit" value={editando.valorTemp} onChange={e => setEditando({...editando, valorTemp: e.target.value})} onBlur={guardarEdicion} onKeyDown={handleKeyDown} />
                                                        ) : (
                                                            <h4 onClick={() => iniciarEdicion(tareaEnHora, 'titulo')}>{tareaEnHora.titulo}</h4>
                                                        )}
                                                        <div className="more-menu-container">
                                                            <button className="more-btn" onClick={() => setMenuAbierto(menuAbierto === tareaEnHora.id ? null : tareaEnHora.id)}>•••</button>
                                                            {menuAbierto === tareaEnHora.id && (
                                                                <div className="dropdown-menu">
                                                                    <button onClick={() => desprogramarTarea(tareaEnHora.id)}>Reprogramar</button>
                                                                    <button className="danger-text" onClick={() => borrarTarea(tareaEnHora.id)}>Borrar</button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <p className="project-tag">{proyectoAsociado ? proyectoAsociado.nombre : 'Sin Proyecto'}</p>
                                                </div>
                                            ) : <div className="empty-slot"></div>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    <section className="agenda-sidebar-right">
                        <div className="mini-calendar">
                            <div className="calendar-header">
                                <h3>{nombresMeses[fechaBase.getMonth()]} {fechaBase.getFullYear()}</h3>
                                <div className="calendar-nav">
                                    <span onClick={() => cambiarMes(-1)}>{'<'}</span>
                                    <span onClick={() => cambiarMes(1)}>{'>'}</span>
                                </div>
                            </div>
                            <div className="calendar-grid">
                                <span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span>
                                {obtenerDiasDelMes().map((item) => (
                                    <span key={item.key} className={`${item.vacio ? 'faded' : 'clickable-day'} ${!item.vacio && formatearFechaISO(item.fecha) === fechaSeleccionadaStr ? 'active' : ''}`} onClick={() => !item.vacio && setFechaSeleccionada(item.fecha)}>
                                        {item.vacio ? '' : item.dia}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="unassigned-tasks">
                            <div className="unassigned-header">
                                <h3>Por organizar para este día</h3>
                            </div>
                            <div className="tasks-to-schedule">
                                {tareas.filter(t => !t.programada && t.fecha === fechaSeleccionadaStr).length === 0 ? (
                                    <p className="all-done-msg">¡No hay tareas pendientes por programar para esta fecha!</p>
                                ) : (
                                    tareas.filter(t => !t.programada && t.fecha === fechaSeleccionadaStr).map(tarea => {
                                        const proyectoAsociado = proyectos.find(p => p.id === tarea.proyectoId);
                                        return (
                                            <div key={tarea.id} className="schedule-task-card">
                                                {proyectoAsociado && <span className="badge">{proyectoAsociado.nombre}</span>}
                                                <h4>{tarea.titulo}</h4>
                                                <div className="schedule-actions">
                                                    <select className="time-select" value={horasTemporales[tarea.id] || ""} onChange={(e) => setHorasTemporales({ ...horasTemporales, [tarea.id]: e.target.value })}>
                                                        <option value="">Hora...</option>
                                                        {horasDia.map(h => <option key={h} value={h}>{h}</option>)}
                                                    </select>
                                                    <button className="btn-programar" onClick={() => programarTarea(tarea.id)} disabled={!horasTemporales[tarea.id]}>
                                                        Programar
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Agenda;