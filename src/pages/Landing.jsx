import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
    return (
        <>
            {/* --- NUEVO FONDO VIBRANTE ESTÁTICO --- */}
            <div style={{
                position: 'fixed',    /* Fijo en el fondo */
                top: 0,
                left: 0,
                width: '100vw',       /* Ocupa todo el ancho */
                height: '100vh',      /* Ocupa todo el alto */
                zIndex: -1,           /* Por detrás del texto */
                backgroundColor: `hsla(197,92%,60%,1)`,
                backgroundImage: `radial-gradient(circle at 96% 96%, hsla(55,93%,54%,0.85) 5%,transparent 86%),radial-gradient(circle at 5% 90%, hsla(229,71%,68%,1) 13%,transparent 65%),radial-gradient(circle at 57% 73%, hsla(308,93%,51%,1) 3%,transparent 89%),radial-gradient(circle at 20% 4%, hsla(318,60%,76%,1) 22%,transparent 56%),radial-gradient(circle at 74% 15%, hsla(324,92%,59%,1) 13%,transparent 57%)`,
                backgroundBlendMode: `normal,normal,normal,normal,normal`
            }} />

            {/* --- TU CONTENIDO (Maquetación original) --- */}
            <div className="landing-container">
                <nav className="landing-nav">
                    <div className="landing-logo">Indigo.</div>
                    <Link to="/login" className="nav-signin">Sign in</Link>
                </nav>

                <main className="landing-hero">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Manage <br />
                            your projects <br />
                            and increase <br />
                            your creativity.
                        </h1>

                        <p className="hero-description">
                            Te ayudamos a organizar de forma segura todas tus tareas personales y profesionales.
                            Sin desorden. Sin estrés. Solo pura productividad para que te enfoques en diseñar.
                        </p>

                        <div className="hero-buttons">
                            <Link to="/login" className="btn-violet">Iniciar sesión</Link>
                            <Link to="/register" className="btn-outline">Crear tu cuenta</Link>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Landing;