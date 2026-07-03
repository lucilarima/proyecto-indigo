// Capa de comunicación con el backend de Indigo.
// La URL base sale de la variable de entorno VITE_API_URL (ver .env).
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

const getToken = () => localStorage.getItem('indigo_token')

const request = async (path, { method = 'GET', body, auth = true } = {}) => {
    const headers = { 'Content-Type': 'application/json' }
    if (auth) {
        const token = getToken()
        if (token) headers.Authorization = `Bearer ${token}`
    }

    const res = await fetch(`${API_URL}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined
    })

    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
        throw new Error(data.message || 'Hubo un error en la petición')
    }
    return data
}

const api = {
    // --- Auth ---
    register: (nombre, email, password) =>
        request('/auth/register', { method: 'POST', auth: false, body: { nombre, email, password } }),
    login: (email, password) =>
        request('/auth/login', { method: 'POST', auth: false, body: { email, password } }),
    guest: () =>
        request('/auth/guest', { method: 'POST', auth: false }),

    // --- Proyectos ---
    getProyectos: () => request('/proyectos'),
    crearProyecto: (nombre) => request('/proyectos', { method: 'POST', body: { nombre } }),
    borrarProyecto: (id) => request(`/proyectos/${id}`, { method: 'DELETE' }),

    // --- Tareas ---
    getTareas: () => request('/tareas'),
    crearTarea: (data) => request('/tareas', { method: 'POST', body: data }),
    actualizarTarea: (id, data) => request(`/tareas/${id}`, { method: 'PUT', body: data }),
    borrarTarea: (id) => request(`/tareas/${id}`, { method: 'DELETE' })
}

export default api
