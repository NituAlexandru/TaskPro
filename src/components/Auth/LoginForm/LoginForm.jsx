// src/components/Auth/LoginForm.jsx
import { useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { FaGoogle } from "react-icons/fa";
import { useLoader } from "../../../hooks/useLoader";
import {
  FormContainer,
  StyledForm,
  Title,
  ToggleLink,
  Input,
  StyledErrorMessage,
  SubmitButton,
  GoogleButton,
} from "./LoginForm.styles";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

const LoginForm = ({ onSuccess }) => {
  const { loginUser } = useContext(AuthContext);
  const { showLoader, hideLoader } = useLoader();
  const navigate = useNavigate();

  return (
    <FormContainer>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          showLoader();
          try {
            await loginUser(values);
            onSuccess();
          } catch (error) {
            console.error("Login failed", error);
          } finally {
            setSubmitting(false);
            hideLoader();
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
              placeholder="Enter your password"
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
