import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
});

apiClient.interceptors.request.use((config) => {
  const stored = localStorage.getItem("zoomride-auth");
  if (stored) {
    try {
      const { token } = JSON.parse(stored);
      if (token) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Failed to attach auth token", error);
    }
  }
  return config;
});

export default apiClient;

