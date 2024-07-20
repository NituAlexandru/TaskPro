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
    height: 332px;
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

const LoginForm = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser({ email, password });
      onSuccess();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Log In</h2>{" "}
          <div className="toggle" onClick={() => navigate("/register")}>
            Registration
          </div>
        </div>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In Now</button>
      </form>
    </FormContainer>
  );
};

LoginForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default LoginForm;
