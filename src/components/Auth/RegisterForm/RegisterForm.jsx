// src/components/Auth/RegisterForm.jsx
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
} from "./RegisterForm.styles";

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

const RegisterForm = ({ onSuccess }) => {
  const { registerUser } = useContext(AuthContext);
  const { showLoader, hideLoader } = useLoader();
  const navigate = useNavigate();

  return (
    <FormContainer>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          showLoader();
          try {
            await registerUser(values);
            onSuccess();
          } catch (error) {
            console.error("Registration failed", error);
          } finally {
            setSubmitting(false);
            hideLoader();
          }
        }}
      >
        {({ isSubmitting }) => (
          <StyledForm>
            <div className="toggle-container">
              <Title>Registration</Title>
              <ToggleLink onClick={() => navigate("/login")}>Log In</ToggleLink>
            </div>
            <Input type="text" name="name" placeholder="Enter your name" />
            <StyledErrorMessage name="name" component="div" />
            <Input type="email" name="email" placeholder="Enter your email" />
            <StyledErrorMessage name="email" component="div" />
            <Input
              type="password"
              name="password"
              placeholder="Create a password"
            />
            <StyledErrorMessage name="password" component="div" />
            <SubmitButton type="submit" disabled={isSubmitting}>
              Register Now
            </SubmitButton>
            <GoogleButton href={`http://localhost:4500/api/auth/google`}>
              <FaGoogle /> Register with Google
            </GoogleButton>
          </StyledForm>
        )}
      </Formik>
    </FormContainer>
  );
};

RegisterForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default RegisterForm;
