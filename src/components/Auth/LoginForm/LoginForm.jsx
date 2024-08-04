// React and PropTypes imports
import { useState, useContext } from "react";
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
} from "./LoginForm.styles";
import { toast } from "react-toastify";
import API_BASE_URL from "../../../utils/apiConfig";

// Validation schema for the form
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

const LoginForm = ({ onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const { loginUser } = useContext(AuthContext);
  const { showLoader, hideLoader } = useLoader();
  const navigate = useNavigate();

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    showLoader();
    try {
      await loginUser(values);
      toast.success("Logged in successfully!");
      onSuccess();
    } catch (error) {
      toast.error("Login failed. Please check your email and password.");
      console.error("Login failed", error);
    } finally {
      setSubmitting(false);
      hideLoader();
    }
  };

  return (
    <FormContainer>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <StyledForm>
            <div className="toggle-container">
              <ToggleLink onClick={() => navigate("/register")}>
                Registration
              </ToggleLink>
              <Title>Log In</Title>
            </div>
            <Input type="email" name="email" placeholder="Enter your email" />
            <StyledErrorMessage name="email" component="div" />
            <InputWrapper>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                onChange={(e) => {
                  setFieldValue("password", e.target.value);
                  setPassword(e.target.value);
                }}
              />
              <IconButton onClick={togglePasswordVisibility} type="button">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </IconButton>
            </InputWrapper>
            <PasswordStrengthBar password={password} />
            <StyledErrorMessage name="password" component="div" />
            <SubmitButton type="submit" disabled={isSubmitting}>
              Log In Now
            </SubmitButton>
            <GoogleButton href={`${API_BASE_URL}/api/auth/google`}>
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
