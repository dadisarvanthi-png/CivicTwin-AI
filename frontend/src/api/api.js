import axios from "axios";

const api = axios.create({
  baseURL: "civictwin-ai-production.up.railway.app",
});

export default api;