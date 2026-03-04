import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import './Mensajes.css';

const Mensajes = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const [contactos] = useState([
        { id: 1, nombre: "Micaela (Diseño)", rol: "Equipo", online: true, avatar: "M" },
        { id: 2, nombre: "Mia Restaurante", rol: "Cliente", online: false, avatar: "M" },
        { id: 3, nombre: "Daiana de Arenal", rol: "Cliente", online: true, avatar: "D" }
    ]);

    const [chatActivo, setChatActivo] = useState(1);
    const [nuevoMensaje, setNuevoMensaje] = useState("");

    const [mensajes, setMensajes] = useState([
        { id: 1, chatId: 1, texto: "¡Hola! ¿Pudiste revisar las proporciones del logo?", mio: false, hora: "10:30" },
        { id: 2, chatId: 1, texto: "¡Hola Mica! Sí, ya las ajusté para que queden impecables en la presentación.", mio: true, hora: "10:35" },
        { id: 3, chatId: 2, texto: "Lucila, necesitamos la propuesta del menú para el viernes.", mio: false, hora: "Ayer" },
        { id: 4, chatId: 3, texto: "Los posts para redes sociales quedaron excelentes.", mio: false, hora: "Lunes" }
    ]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const enviarMensaje = (e) => {
        e.preventDefault();
        if (nuevoMensaje.trim() !== "") {
            const horaActual = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setMensajes([...mensajes, {
                id: Date.now(),
                chatId: chatActivo,
                texto: nuevoMensaje,
                mio: true,
                hora: horaActual
            }]);
            setNuevoMensaje("");
        }
    };

    const contactoActual = contactos.find(c => c.id === chatActivo);
    const mensajesDelChat = mensajes.filter(m => m.chatId === chatActivo);

    return (
        <div className="app-layout">
            <aside className="sidebar">
                <div className="sidebar-brand"><h1>Indigo.</h1></div>
                <nav className="sidebar-nav">
                    <Link to="/dashboard" className="nav-item"><span>🏠</span> Dashboard</Link>
                    <Link to="/agenda" className="nav-item"><span>📅</span> Agenda</Link>
                    <Link to="/mensajes" className="nav-item active"><span>💬</span> Mensajes</Link>
                    <Link to="/configuracion" className="nav-item"><span>⚙️</span> Configuración</Link>
                </nav>
                <div className="sidebar-footer">
                    <button className="logout-btn-sidebar" onClick={handleLogout}><span>🚪</span> Log out</button>
                </div>
            </aside>

            <main className="main-content">
                <Header />

                <div className="chat-container-main">
                    <aside className="chat-sidebar">
                        <div className="chat-sidebar-header"><h2>Mensajes</h2></div>
                        <div className="contacts-list">
                            {contactos.map(contacto => (
                                <div key={contacto.id} className={`contact-item ${chatActivo === contacto.id ? 'active' : ''}`} onClick={() => setChatActivo(contacto.id)}>
                                    <div className="contact-avatar-wrapper">
                                        <div className="contact-avatar">{contacto.avatar}</div>
                                        {contacto.online && <div className="online-indicator"></div>}
                                    </div>
                                    <div className="contact-info">
                                        <h4>{contacto.nombre}</h4><span>{contacto.rol}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </aside>

                    <section className="chat-window">
                        <div className="chat-header">
                            <div className="chat-header-info">
                                <div className="contact-avatar">{contactoActual.avatar}</div>
                                <div>
                                    <h3>{contactoActual.nombre}</h3>
                                    <p>{contactoActual.online ? 'En línea ahora' : 'Desconectado'}</p>
                                </div>
                            </div>
                            <button className="icon-btn">⋮</button>
                        </div>

                        <div className="chat-history">
                            {mensajesDelChat.length === 0 ? (
                                <div className="empty-chat-msg">Aún no hay mensajes. ¡Escribí el primero!</div>
                            ) : (
                                mensajesDelChat.map(msg => (
                                    <div key={msg.id} className={`message-wrapper ${msg.mio ? 'sent' : 'received'}`}>
                                        <div className="message-bubble">
                                            <p>{msg.texto}</p><span className="message-time">{msg.hora}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <form className="chat-input-area" onSubmit={enviarMensaje}>
                            <button type="button" className="attachment-btn">📎</button>
                            <input type="text" placeholder="Escribe tu mensaje acá..." value={nuevoMensaje} onChange={(e) => setNuevoMensaje(e.target.value)} />
                            <button type="submit" className="send-btn" disabled={!nuevoMensaje.trim()}>Enviar</button>
                        </form>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Mensajes;