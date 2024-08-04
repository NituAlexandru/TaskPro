import { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../../../contexts/AuthContext";
import {
  ErrorText,
  SubmitButton,
  Input,
  InputWrapper,
  HiddenFileInput,
  ChangeAvatarButton,
  AvatarImage,
  AvatarWrapper,
  FormWrapper,
  ModalHeader,
  Title,
  CloseButton,
  IconButton,
} from "./UserModal.styled";

const ProfileEditForm = ({ closeModal, onSubmit, user }) => {
  const { token, updateUser } = useContext(AuthContext);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatarURL || "/default-avatar.png"
  );
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setAvatar(file);
    }
  };

  const BASE_URL = "http://localhost:4500/api";

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const profileData = {
        name: values.name,
        email: values.email,
        password: values.password,
      };

      const response = await axios.patch(
        `${BASE_URL}/user/profile`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (avatar) {
        const formData = new FormData();
        formData.append("avatar", avatar);

        const avatarResponse = await axios.patch(
          `${BASE_URL}/user/avatar`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // Update the user context with the new avatar URL
        updateUser({
          ...response.data.user,
          avatarURL: avatarResponse.data.avatarURL,
        });
      } else {
        // Update the user context with the new profile data
        updateUser(response.data.user);
      }

      toast.success("Profile updated successfully!");
      onSubmit(values);
      closeModal();
    } catch (error) {
      console.error("Error updating profile", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <FormWrapper>
      <ModalHeader>
        <Title>Edit Profile</Title>
        <CloseButton onClick={closeModal}>&times;</CloseButton>
      </ModalHeader>
      <AvatarWrapper>
        <AvatarImage src={avatarPreview} alt="User Avatar" />
        <HiddenFileInput
          type="file"
          id="avatar"
          name="avatar"
          accept="image/*"
          onChange={handleAvatarChange}
        />
        <ChangeAvatarButton
          onClick={() => document.getElementById("avatar").click()}
        >
          +
        </ChangeAvatarButton>
      </AvatarWrapper>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputWrapper>
              <Field as={Input} type="text" name="name" placeholder="Name" />
              <ErrorMessage name="name" component={ErrorText} />
            </InputWrapper>
            <InputWrapper>
              <Field as={Input} type="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component={ErrorText} />
            </InputWrapper>
            <InputWrapper>
              <Field
                as={Input}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
              />
              <IconButton onClick={togglePasswordVisibility} type="button">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </IconButton>
              <ErrorMessage name="password" component={ErrorText} />
            </InputWrapper>
            <SubmitButton type="submit" disabled={isSubmitting}>
              Save
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </FormWrapper>
  );
};

ProfileEditForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    avatarURL: PropTypes.string,
  }).isRequired,
};

export default ProfileEditForm;
