import ReactDOM from "react-dom/client";
import App from "./src/App.jsx";
import "./index.css";
import { HashRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter basename="/TaskPro">
    <App />
  </HashRouter>
);
