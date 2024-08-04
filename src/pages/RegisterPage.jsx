import RegisterForm from "../components/Auth/RegisterForm/RegisterForm";
import { useLoader } from "../hooks/useLoader";

const RegisterPage = () => {
  const { hideLoader } = useLoader();

  const handleSuccess = () => {
    hideLoader();
  };

  return (
    <div>
      <RegisterForm onSuccess={handleSuccess} />
    </div>
  );
};

export default RegisterPage;
