import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import GlobalStyles from "./utils/GlobalStyles";
import { ThemeProvider } from "./utils/ThemeProvider";
import { AuthProvider } from "./contexts/AuthContext";
import AuthCallback from "./components/Auth/AuthCallback.jsx";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <GlobalStyles />
        <Router>
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

