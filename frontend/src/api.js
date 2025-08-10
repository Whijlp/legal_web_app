// Usamos la variable de entorno configurada en .env
const API_URL = import.meta.env.VITE_API_URL;

// Función para login
export async function login(usuario, contraseña) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, contraseña })
  });

  if (!res.ok) {
    throw new Error('Error en login');
  }

  return res.json();
}

// Función para registrar
export async function register(usuario, contraseña) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, contraseña })
  });

  if (!res.ok) {
    throw new Error('Error en registro');
  }

  return res.json();
}
