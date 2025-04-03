import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { loadPyodide } from './lib/pythonInterpreter';

// Load Pyodide in the background
loadPyodide();

createRoot(document.getElementById("root")!).render(<App />);
