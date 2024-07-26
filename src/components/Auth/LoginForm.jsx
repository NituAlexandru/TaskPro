import { useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaGoogle } from "react-icons/fa";

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 9%,
    rgba(246, 246, 246, 1) 22%,
    rgba(184, 218, 168, 1) 81%
  );
`;

const StyledForm = styled(Form)`
  background-color: #151515;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 8px;
  width: 424px;
  height: auto;
  padding: 2rem;
  box-shadow: 0 4px 16px 0 rgba(22, 22, 22, 0.08);

  .toggle-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
    font-weight: 500;
    font-size: 18px;
    letter-spacing: -0.02em;
    color: rgba(255, 255, 255, 0.3);
    cursor: pointer;
  }

  @media (max-width: 500px) {
    width: 80%;
    padding: 1rem;
  }

  @media (max-width: 320px) {
    width: 98%;
    padding: 1rem;
  }
`;

const Title = styled.h2`
  font-weight: 500;
  font-size: 18px;
  letter-spacing: -0.02em;
  color: #fff;
`;

const ToggleLink = styled.div`
  cursor: pointer;
  font-weight: 500;
  font-size: 18px;
  letter-spacing: -0.02em;
  color: rgba(255, 255, 255, 0.3);
`;

const Input = styled(Field)`
  border: 1px solid #bedbb0;
  border-radius: 8px;
  width: 344px;
  height: 49px;
  box-shadow: 0 4px 16px 0 rgba(22, 22, 22, 0.08);
  background: #1f1f1f;
  opacity: 0.4;
  padding: 0.5rem;
  color: #fff;
  margin: 0;

  @media (max-width: 500px) {
    width: auto;
    padding: 1rem;
  }
`;

const StyledErrorMessage = styled(ErrorMessage)`
  color: red;
  font-size: 12px;
  margin-top: -10px;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
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
  margin: 0;

  &:hover {
    background: #9dc888;
  }

  @media (max-width: 500px) {
    width: 100%;
    padding: 1rem;
  }
`;

const GoogleButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4285f4;
  color: white;
  text-align: center;
  padding: 10px 0;
  border-radius: 8px;
  text-decoration: none;
  width: 344px;
  height: 49px;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.02em;
  text-align: center;
  gap: 10px;

  &:hover {
    background-color: #357ae8;
  }

  @media (max-width: 500px) {
    width: 100%;
    padding: 1rem;
  }
`;

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

const LoginForm = ({ onSuccess }) => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <FormContainer>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await loginUser(values);
            onSuccess();
          } catch (error) {
            console.error("Login failed", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <StyledForm>
            <div className="toggle-container">
              <ToggleLink onClick={() => navigate("/register")}>
                Registration
              </ToggleLink>
              <Title>Log In</Title>
            </div>
            <Input type="email" name="email" placeholder="Enter your email" />
            <StyledErrorMessage name="email" component="div" />
            <Input
              type="password"
              name="password"
              placeholder="Confirm password"
            />
            <StyledErrorMessage name="password" component="div" />
            <SubmitButton type="submit" disabled={isSubmitting}>
              Log In Now
            </SubmitButton>
            <GoogleButton href={`http://localhost:4500/api/auth/google`}>
              <FaGoogle /> Login with Google
            </GoogleButton>
          </StyledForm>
        )}
      </Formik>
    </FormContainer>
  );
};

LoginForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default LoginForm;
