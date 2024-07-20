import LoginForm from "../components/Auth/LoginForm";

const LoginPage = () => {
  const handleSuccess = () => {
    window.location.href = "/home";
  };

  return (
    <div>
      <LoginForm onSuccess={handleSuccess} />
    </div>
  );
};

export default LoginPage;
