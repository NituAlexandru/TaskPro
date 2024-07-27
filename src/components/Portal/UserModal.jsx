import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import PropTypes from "prop-types";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.modalBackgroundColor};
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  height: auto;
  position: relative;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.modalTextColor};
  font-size: 20px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    transform: scale(1.2);
    background-color: ${({ theme }) => theme.modalBackgroundColor};
  }
`;

const FormTitle = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 18px;
  letter-spacing: -0.02em;
  color: #fff;
  margin: 0;
  margin-bottom: 20px;
  text-align: left;
`;

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
  width: 68px;
  margin: 0 auto;
  margin-bottom: 20px;
`;

const AvatarImage = styled.img`
  width: 68px;
  height: 68px;
  border-radius: 8px;
`;

const ChangeAvatarButton = styled.button`
  position: absolute;
  bottom: -10px;
  right: 50%;
  transform: translateX(50%);
  background-color: ${({ theme }) => theme.buttonBackgroundColor};
  color: ${({ theme }) => theme.buttonTextColor};
  border: none;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0;
  width: 24px;
  height: 24px;
  padding: 0;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHoverBackgroundColor};
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 30px;
`;

const Input = styled(Field)`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 100%;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputTextColor};
  margin: 0;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.focusBorderColor};
  }
`;

const SubmitButton = styled.button`
  padding: 10px;
  border-radius: 8px;
  border: none;
  background-color: ${({ theme }) => theme.buttonBackgroundColor};
  color: ${({ theme }) => theme.buttonTextColor};
  cursor: pointer;
  width: 100%;
  height: 49px;
  font-weight: 500;
  font-size: 14px;
  margin: 0;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHoverBackgroundColor};
  }
`;

const ErrorText = styled.div`
  color: ${({ theme }) => theme.errorColor};
  font-size: 12px;
  position: absolute;
  bottom: -20px;
  left: 0;
`;

const ProfileEditForm = ({ onSubmit, onClose, user }) => {
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
    password: Yup.string().min(8, "Password must be at least 8 characters"),
  });

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    // Handle the file upload logic here
    console.log("Selected file:", file);
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <FormTitle>Edit Profile</FormTitle>
        <AvatarWrapper>
          <AvatarImage
            src={user?.avatarURL || "/default-avatar.png"}
            alt="User Avatar"
          />
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
          onSubmit={(values, { setSubmitting }) => {
            onSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputWrapper>
                <Input type="text" name="name" placeholder="Name" />
                <ErrorMessage name="name" component={ErrorText} />
              </InputWrapper>
              <InputWrapper>
                <Input type="email" name="email" placeholder="Email" />
                <ErrorMessage name="email" component={ErrorText} />
              </InputWrapper>
              <InputWrapper>
                <Input type="password" name="password" placeholder="Password" />
                <ErrorMessage name="password" component={ErrorText} />
              </InputWrapper>
              <SubmitButton type="submit" disabled={isSubmitting}>
                Save
              </SubmitButton>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </ModalOverlay>
  );
};

ProfileEditForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default ProfileEditForm;
