import axios from "axios";

const api = axios.create({
  baseURL: "https://civictwin-ai-backend.onrender.com",
});

export default api;