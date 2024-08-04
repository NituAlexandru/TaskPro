// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  HashRouter as Router,
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StartPage from "./pages/StartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage/HomePage.jsx";
import GlobalStyles from "./utils/GlobalStyles";
import { ThemeProvider } from "./utils/ThemeProvider";
import { AuthProvider } from "./contexts/AuthContext";
import { BoardProvider } from "./contexts/BoardContext";
import AuthCallback from "./components/Auth/AuthCallback.jsx";
import { LoaderProvider } from "./contexts/LoaderContext.jsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <AuthProvider>
        <ThemeProvider>
          <GlobalStyles />
          <LoaderProvider>
            <BoardProvider>
              <HashRouter>
                <Routes>
                  <Route path="/" element={<StartPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/auth/callback" element={<AuthCallback />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/home/:titleBoard" element={<HomePage />} />
                </Routes>
              </HashRouter>
            </BoardProvider>
          </LoaderProvider>
          <ToastContainer />
        </ThemeProvider>
      </AuthProvider>
    </DndProvider>
  );
}

export default App;
