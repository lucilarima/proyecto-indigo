import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css'; // Reutilizamos los estilos de Login para mantener coherencia

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulamos el registro e inicio de sesión
        login({ name, email });
        navigate('/dashboard');
    };

    return (
        <div className="login-page">
            {/* --- MISMO FONDO VIBRANTE ESTÁTICO --- */}
            <div style={{
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1,
                backgroundColor: `hsla(197,92%,60%,1)`,
                backgroundImage: `radial-gradient(circle at 96% 96%, hsla(55,93%,54%,0.85) 5%,transparent 86%),radial-gradient(circle at 5% 90%, hsla(229,71%,68%,1) 13%,transparent 65%),radial-gradient(circle at 57% 73%, hsla(308,93%,51%,1) 3%,transparent 89%),radial-gradient(circle at 20% 4%, hsla(318,60%,76%,1) 22%,transparent 56%),radial-gradient(circle at 74% 15%, hsla(324,92%,59%,1) 13%,transparent 57%)`,
                backgroundBlendMode: `normal,normal,normal,normal,normal`
            }} />

            {/* --- TARJETA GLASSMORPHISM DE REGISTRO --- */}
            <div className="glass-card">
                <div className="card-content">

                    <div className="card-header">
                        <div className="user-info">
                            <div className="avatar">
                                <svg className="avatar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="8.5" cy="7" r="4"></circle>
                                    <line x1="20" y1="8" x2="20" y2="14"></line>
                                    <line x1="23" y1="11" x2="17" y2="11"></line>
                                </svg>
                            </div>
                            <div className="user-details">
                                <p className="user-name">Unite a Indigo</p>
                                <p className="user-role">Creá tu cuenta gratis</p>
                            </div>
                        </div>
                    </div>

                    <form className="card-body" onSubmit={handleSubmit}>
                        <h3 className="card-title">Nueva Cuenta</h3>
                        <p className="card-description">Organizá tus proyectos hoy mismo.</p>

                        <input
                            type="text"
                            className="glass-input"
                            placeholder="Tu nombre completo"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <input
                            type="email"
                            className="glass-input"
                            placeholder="Email de trabajo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <input
                            type="password"
                            className="glass-input"
                            placeholder="Contraseña segura"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <button type="submit" className="glass-button">Empezar ahora</button>
                    </form>

                    <p className="card-tip">
                        ¿Ya tenés cuenta? <Link to="/login" className="glass-link">Iniciá sesión</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;