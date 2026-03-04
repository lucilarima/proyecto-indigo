import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { DataProvider } from './context/DataContext' // <-- IMPORTAMOS EL CEREBRO

import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ProjectDetail from './pages/ProjectDetail'
import Agenda from './pages/Agenda'
import Mensajes from './pages/Mensajes' // <-- IMPORTAMOS LA NUEVA PÁGINA DE MENSAJES

function App() {
  return (
    <AuthProvider>
      <DataProvider> {/* <-- ENVOLVEMOS LA APP */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} /> 
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/mensajes" element={<Mensajes />} /> {/* <-- AGREGAMOS LA RUTA */}
            <Route path="/proyecto/:id" element={<ProjectDetail />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  )
}

export default App