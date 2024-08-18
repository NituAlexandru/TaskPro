import { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { fetchCurrentUser } from "../../service/authService.js";

const AuthCallback = () => {
  // Get the current location (URL) and navigation function from React Router
  const location = useLocation();
  const navigate = useNavigate();
  // Extract the login function from AuthContext
  const { login } = useContext(AuthContext);

  useEffect(() => {
    // Parse URL parameters to extract token, refreshToken, and session ID
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const refreshToken = params.get("refreshToken");
    const sid = params.get("sid");

    // Check if all required parameters are present
    if (token && refreshToken && sid) {
      // Fetch the current user's details using the token
      fetchCurrentUser(token)
        .then((fetchedUser) => {
          // If successful, log the user in and navigate to the home page
          login(fetchedUser, token, refreshToken, sid);
          navigate("/home");
        })
        .catch((error) => {
          // If there's an error fetching the user, log the error and navigate to the home page
          console.error("Error fetching user:", error);
          navigate("/");
        });
    } else {
      // If any of the required parameters are missing, log an error and navigate to the home page
      console.error("Token, refreshToken, or session ID not found");
      navigate("/");
    }
  }, [location, navigate, login]); // Dependency array includes location, navigate, and login to prevent unnecessary re-renders

  return <div>Loading...</div>;
};

export default AuthCallback;
