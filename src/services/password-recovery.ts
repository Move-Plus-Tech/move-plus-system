// Solicitar código de recuperação de senha
export async function requestPasswordReset(email: string) {
  const response = await fetch(`/api/password/request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao solicitar código");
  }

  return response.json();
}

// Validar código de recuperação
export async function validateResetCode(email: string, code: string) {
  const response = await fetch(`/api/password/validate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Código inválido");
  }

  return response.json();
}

// Redefinir senha
export async function resetPassword(
  email: string,
  code: string,
  newPassword: string
) {
  const response = await fetch(`/api/password/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code, newPassword }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao redefinir senha");
  }

  return response.json();
}

// Reenviar código
export async function resendPasswordResetCode(email: string) {
  const response = await fetch(
    `/api/auth/resend-password-reset-code`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao reenviar código");
  }

  return response.json();
}
