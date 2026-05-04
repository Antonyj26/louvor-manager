import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use((config) => {
  const userData = localStorage.getItem("@louvor:user");

  if (userData) {
    try {
      const { token } = JSON.parse(userData);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Erro ao ler dados do usuário do localStorage:", error);
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.warn("Token expirado ou inválido. Forçando logout...");

      localStorage.removeItem("@louvor:user");

      window.location.href = "/";
    }

    return Promise.reject(error);
  },
);
