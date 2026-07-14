// Retorna o usuário logado do localStorage
export function getLoggedUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

// Retorna o token JWT
export function getToken() {
  return localStorage.getItem('token');
}

// Remove usuário e token (logout)
export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

function getApiBaseUrl() {
  return '/api';
}

async function requestJson(path: string, options: RequestInit = {}) {
  const url = `${getApiBaseUrl()}${path}`;
  const token = getToken();

  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.method && options.method !== 'GET' ? { 'Content-Type': 'application/json' } : {}),
    },
  });

  if (!res.ok) {
    let message = 'Erro na requisição';
    try {
      const errorPayload = await res.json();
      message = errorPayload.message || message;
    } catch {
      // ignore
    }
    throw new Error(message);
  }

  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return null;
  }

  return res.json();
}

// Função para fazer requisições autenticadas
export async function fetchWithAuth(path: string, options: RequestInit = {}) {
  return requestJson(path, options);
}
