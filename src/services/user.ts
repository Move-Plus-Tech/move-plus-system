export type CreateUserData = {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  password: string;
  createdAt?: string;
};

export async function registerUser(data: CreateUserData) {
  const response = await fetch(`/api/users/register`, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "Erro ao registrar usuário");
  }

  return resData;
}

export async function loginUser(email: string, password: string) {
  const response = await fetch(`/api/users/login`, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier: email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro ao logar");
  }

  const profileResponse = await fetch("/api/auth/me", {
    credentials: "same-origin",
    cache: "no-store",
  });
  const profile = await profileResponse.json();
  if (!profileResponse.ok) {
    throw new Error(profile.message || "Não foi possível carregar o perfil");
  }

  return { ...data, user: profile };
}

export async function updateUser(data: { name?: string; email?: string; phone?: string }) {
  const response = await fetch("/api/users/me", {
    method: "PATCH",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "Erro ao atualizar dados do usuário");
  }

  return resData;
}
