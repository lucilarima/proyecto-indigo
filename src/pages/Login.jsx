import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulamos el login y vamos al dashboard
        login({ name: email.split('@')[0], email });
        navigate('/dashboard');
    };

    return (
        <div className="login-page">
            {/* --- EL MISMO FONDO VIBRANTE PARA QUE EL VIDRIO SE LUZCA --- */}
            <div style={{
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1,
                backgroundColor: `hsla(197,92%,60%,1)`,
                backgroundImage: `radial-gradient(circle at 96% 96%, hsla(55,93%,54%,0.85) 5%,transparent 86%),radial-gradient(circle at 5% 90%, hsla(229,71%,68%,1) 13%,transparent 65%),radial-gradient(circle at 57% 73%, hsla(308,93%,51%,1) 3%,transparent 89%),radial-gradient(circle at 20% 4%, hsla(318,60%,76%,1) 22%,transparent 56%),radial-gradient(circle at 74% 15%, hsla(324,92%,59%,1) 13%,transparent 57%)`,
                backgroundBlendMode: `normal,normal,normal,normal,normal`
            }} />

            {/* --- TU TARJETA GLASSMORPHISM --- */}
            <div className="glass-card">
                <div className="card-content">

                    <div className="card-header">
                        <div className="user-info">
                            <div className="avatar">
                                <svg className="avatar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <div className="user-details">
                                <p className="user-name">Bienvenida/o</p>
                                <p className="user-role">Ingresá a tu espacio</p>
                            </div>
                        </div>
                    </div>

                    <form className="card-body" onSubmit={handleSubmit}>
                        <h3 className="card-title">Iniciar Sesión</h3>
                        <p className="card-description">Completá tus datos para continuar.</p>

                        <input
                            type="email"
                            className="glass-input"
                            placeholder="Tu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <input
                            type="password"
                            className="glass-input"
                            placeholder="Tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <button type="submit" className="glass-button">Entrar a Indigo</button>
                    </form>

                    <p className="card-tip">
                        ¿No tenés cuenta? <Link to="/register" className="glass-link">Creala acá</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;