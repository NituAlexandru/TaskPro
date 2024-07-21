import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom, #ffffff, #d7f3d7);

  form {
    background-color: #151515;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-radius: 8px;
    width: 424px;
    height: auto;
    padding: 2rem;
    box-shadow: 0 4px 16px 0 rgba(22, 22, 22, 0.08);

    div {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-weight: 500;
      font-size: 18px;
      letter-spacing: -0.02em;
      color: rgba(255, 255, 255, 0.3);
      cursor: pointer;
    }
  }

  input {
    border: 1px solid #bedbb0;
    border-radius: 8px;
    width: 344px;
    height: 49px;
    box-shadow: 0 4px 16px 0 rgba(22, 22, 22, 0.08);
    background: #1f1f1f;
    opacity: 0.4;
    padding: 0.5rem;
    color: #fff;
  }

  button {
    font-family: "Poppins", sans-serif;
    border-radius: 8px;
    width: 344px;
    height: 49px;
    background: #bedbb0;
    cursor: pointer;
    font-weight: 500;
    font-size: 14px;
    letter-spacing: -0.02em;
    text-align: center;
    color: #161616;
    border: none;

    &:hover {
      background: #9dc888;
    }
  }

  h2 {
    font-weight: 500;
    font-size: 18px;
    letter-spacing: -0.02em;
    color: #fff;
  }
`;

const GoogleButton = styled.a`
  display: block;
  background-color: #4285f4;
  color: white;
  text-align: center;
  padding: 10px 0;
  border-radius: 8px;
  text-decoration: none;
  width: 344px;
  height: 49px;

  &:hover {
    background-color: #357ae8;
  }
`;

const RegisterForm = ({ onSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ name, email, password });
      onSuccess();
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Registration</h2>{" "}
          <div className="toggle" onClick={() => navigate("/login")}>
            Log In
          </div>
        </div>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register Now</button>
        <GoogleButton href={`http://localhost:4500/api/auth/google`}>
          Register with Google
        </GoogleButton>
      </form>
    </FormContainer>
  );
};

RegisterForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default RegisterForm;
