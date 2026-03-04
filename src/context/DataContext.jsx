import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    // 1. Proyectos globales
    const [proyectos, setProyectos] = useState([
        { id: 1, nombre: "Rediseño Web" },
        { id: 2, nombre: "App Mobile" },
        { id: 3, nombre: "Campaña Marketing" }
    ]);

    // 2. Tareas globales (con todos los datos necesarios para el Dashboard y la Agenda)
    const [tareas, setTareas] = useState([
        { id: 1, titulo: "Revisar paleta de colores", fecha: "2026-03-01", completada: false, proyectoId: 1, hora: "10:00", programada: true },
        { id: 2, titulo: "Entregar wireframes", fecha: "2026-03-01", completada: false, proyectoId: 2, hora: "", programada: false }
    ]);

    return (
        <DataContext.Provider value={{ proyectos, setProyectos, tareas, setTareas }}>
            {children}
        </DataContext.Provider>
    );
};