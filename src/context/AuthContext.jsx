import React, { createContext, useState, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Recuperamos la sesión guardada (si existe) para no perderla al refrescar.
    const [user, setUser] = useState(() => {
        const guardado = localStorage.getItem('indigo_user');
        return guardado ? JSON.parse(guardado) : null;
    });

    const guardarSesion = (token, userData) => {
        localStorage.setItem('indigo_token', token);
        localStorage.setItem('indigo_user', JSON.stringify(userData));
        setUser(userData);
    };

    // Login real contra la API. Devuelve el usuario o lanza error (credenciales / mail sin verificar).
    const login = async (email, password) => {
        const res = await api.login(email, password);
        guardarSesion(res.data.token, res.data.user);
        return res.data.user;
    };

    // Registro real. No inicia sesión (falta verificar el mail); devuelve los datos del registro.
    const register = async (nombre, email, password) => {
        const res = await api.register(nombre, email, password);
        return res.data.user;
    };

    // Ingreso como invitado (usuario demo).
    const loginInvitado = async () => {
        const res = await api.guest();
        guardarSesion(res.data.token, res.data.user);
        return res.data.user;
    };

    const logout = () => {
        localStorage.removeItem('indigo_token');
        localStorage.removeItem('indigo_user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, loginInvitado, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
