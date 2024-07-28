import { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { fetchCurrentUser } from "../../service/authService.js";

const AuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const refreshToken = params.get("refreshToken");
    const sid = params.get("sid");

    if (token && refreshToken && sid) {
      fetchCurrentUser(token)
        .then((fetchedUser) => {
          login(fetchedUser, token, refreshToken, sid);
          navigate("/home");
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
          navigate("/");
        });
    } else {
      console.error("Token, refreshToken, or session ID not found");
      navigate("/");
    }
  }, [location, navigate, login]);

  return <div>Loading...</div>;
};

export default AuthCallback;
