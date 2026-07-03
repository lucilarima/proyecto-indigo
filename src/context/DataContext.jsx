import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

// Adaptamos la forma que devuelve la API a la forma que ya usan los componentes
// (id, proyectoId) para no tener que reescribir todo el frontend.
const mapProyecto = (p) => ({ id: p._id, nombre: p.nombre });
const mapTarea = (t) => ({
    id: t._id,
    titulo: t.titulo,
    fecha: t.fecha,
    completada: t.completada,
    hora: t.hora || '',
    programada: t.programada,
    proyectoId: t.fk_proyecto ? t.fk_proyecto._id : null,
    proyectoNombre: t.fk_proyecto ? t.fk_proyecto.nombre : null
});

export const DataProvider = ({ children }) => {
    const { user } = useAuth();
    const [proyectos, setProyectos] = useState([]);
    const [tareas, setTareas] = useState([]);
    const [cargando, setCargando] = useState(false);

    const refrescar = async () => {
        if (!localStorage.getItem('indigo_token')) return;
        setCargando(true);
        try {
            const [rp, rt] = await Promise.all([api.getProyectos(), api.getTareas()]);
            setProyectos(rp.data.proyectos.map(mapProyecto));
            setTareas(rt.data.tareas.map(mapTarea));
        } catch (error) {
            console.error('Error cargando datos:', error.message);
        } finally {
            setCargando(false);
        }
    };

    // Cargamos los datos cuando hay usuario logueado; los limpiamos al salir.
    useEffect(() => {
        if (user) {
            refrescar();
        } else {
            setProyectos([]);
            setTareas([]);
        }
    }, [user]);

    const crearProyecto = async (nombre) => {
        const res = await api.crearProyecto(nombre);
        setProyectos((prev) => [mapProyecto(res.data.proyecto), ...prev]);
    };

    const crearTarea = async ({ titulo, fecha, proyectoId }) => {
        const body = { titulo, fecha };
        if (proyectoId) body.fk_proyecto = proyectoId;
        const res = await api.crearTarea(body);
        setTareas((prev) => [...prev, mapTarea(res.data.tarea)]);
    };

    const actualizarTarea = async (id, cambios) => {
        const body = { ...cambios };
        // Traducimos proyectoId (front) -> fk_proyecto (API) si viene en los cambios.
        if ('proyectoId' in body) {
            body.fk_proyecto = body.proyectoId;
            delete body.proyectoId;
        }
        const res = await api.actualizarTarea(id, body);
        setTareas((prev) => prev.map((t) => (t.id === id ? mapTarea(res.data.tarea) : t)));
    };

    const borrarTarea = async (id) => {
        await api.borrarTarea(id);
        setTareas((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <DataContext.Provider value={{
            proyectos, tareas, cargando,
            refrescar, crearProyecto, crearTarea, actualizarTarea, borrarTarea
        }}>
            {children}
        </DataContext.Provider>
    );
};
