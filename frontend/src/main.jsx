import { createRoot } from "react-dom/client";

import "./index.css";
import "leaflet/dist/leaflet.css";
import "react-toastify/dist/ReactToastify.css";

import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>

    <App />

    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      pauseOnHover
      draggable
      theme="colored"
    />

  </ThemeProvider>
);