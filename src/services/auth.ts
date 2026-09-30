// Remove dados de autenticação legados do armazenamento do navegador.
export async function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('email');
  await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'same-origin',
  }).catch(() => undefined);
}

function getApiBaseUrl() {
  return '/api';
}

async function requestJson(path: string, options: RequestInit = {}) {
  const url = `${getApiBaseUrl()}${path}`;

  const res = await fetch(url, {
    ...options,
    credentials: options.credentials ?? 'same-origin',
    headers: {
      ...(options.headers || {}),
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
