export type CreateUserData = {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  password: string;
};

export async function registerUser(data: CreateUserData) {
  const response = await fetch(`${process.env.API_URL}/users/register`, {
    method: "POST",
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
  const response = await fetch(`${process.env.API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier: email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro ao logar");
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  document.cookie = `token=${data.token}; path=/; max-age=86400; samesite=lax`;

  return data;
}
