import LoginForm from "../components/Auth/LoginForm/LoginForm";
import { useLoader } from "../hooks/useLoader";

const LoginPage = () => {
  const { hideLoader } = useLoader();

  const handleSuccess = () => {
    hideLoader();
    window.location.href = "/home";
  };

  return (
    <div>
      <LoginForm onSuccess={handleSuccess} />
    </div>
  );
};

export default LoginPage;
