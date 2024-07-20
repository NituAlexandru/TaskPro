import RegisterForm from "../components/Auth/RegisterForm";

const RegisterPage = () => {
  const handleSuccess = () => {
    window.location.href = "/home";
  };

  return (
    <div>
      <RegisterForm onSuccess={handleSuccess} />
    </div>
  );
};

export default RegisterPage;
