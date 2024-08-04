// React and PropTypes imports
import { useContext, useState } from "react";
import PropTypes from "prop-types";

// Context and hooks imports
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../../../hooks/useLoader";

// Form and validation imports
import { Formik } from "formik";
import * as Yup from "yup";

// Icon imports
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import PasswordStrengthBar from "react-password-strength-bar";

// Style and notification imports
import {
  FormContainer,
  StyledForm,
  Title,
  ToggleLink,
  Input,
  InputWrapper,
  IconButton,
  StyledErrorMessage,
  SubmitButton,
  GoogleButton,
} from "./RegisterForm.styles";
import { toast } from "react-toastify";
import API_BASE_URL from "../../../utils/apiConfig";

// Validation schema for the form
const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

const RegisterForm = ({ onSuccess }) => {
  const { registerUser } = useContext(AuthContext);
  const { showLoader, hideLoader } = useLoader();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    showLoader();
    try {
      await registerUser(values);
      toast.success("Registration successful!");
      onSuccess();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("User already registered. Redirecting to login.");
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Redirect to login after 2 seconds
      } else {
        toast.error("Registration failed. Please try again.");
      }
      console.error("Registration failed", error);
    } finally {
      setSubmitting(false);
      hideLoader();
    }
  };

  return (
    <FormContainer>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, handleChange, values }) => (
          <StyledForm>
            <div className="toggle-container">
              <ToggleLink onClick={() => navigate("/login")}>Log In</ToggleLink>
              <Title>Registration</Title>
            </div>
            <Input type="text" name="name" placeholder="Enter your name" />
            <StyledErrorMessage name="name" component="div" />
            <Input type="email" name="email" placeholder="Enter your email" />
            <StyledErrorMessage name="email" component="div" />
            <InputWrapper>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                onChange={handleChange}
              />
              <IconButton type="button" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </IconButton>
            </InputWrapper>
            <PasswordStrengthBar password={values.password} />
            <StyledErrorMessage name="password" component="div" />
            <SubmitButton type="submit" disabled={isSubmitting}>
              Register Now
            </SubmitButton>
            <GoogleButton href={`${API_BASE_URL}/api/auth/google`}>
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


