import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import PropTypes from "prop-types";

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

const FieldWrapper = styled.div`
  position: relative;
  display: flex;
`;
const FormTitle = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 18px;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.inputTextColor};
  margin: 0;
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
`;

const Textarea = styled(Field).attrs({ as: "textarea" })`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 100%;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  height: 120px;
  margin: 0;
  outline: none;
`;

const SubmitButton = styled.button`
  padding: 10px;
  border-radius: 8px;
  border: none;
  background-color: ${({ theme }) => theme.buttonBackgroundColor};
  color: ${({ theme }) => theme.buttonTextColor};
  cursor: pointer;
  margin: 0;
  width: 100%;
  height: 49px;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.02em;

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

const HelpForm = ({ onSubmit }) => {
  const initialValues = {
    email: "",
    comment: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    comment: Yup.string().required("Required"),
  });

  return (
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
          <FormTitle>Need help</FormTitle>
          <FormWrapper>
            <FieldWrapper>
              <Input type="email" name="email" placeholder="Email address" />
              <ErrorMessage name="email" component={ErrorText} />
            </FieldWrapper>

            <FieldWrapper>
              <Textarea name="comment" placeholder="Comment" />
              <ErrorMessage name="comment" component={ErrorText} />
            </FieldWrapper>

            <SubmitButton type="submit" disabled={isSubmitting}>
              Send
            </SubmitButton>
          </FormWrapper>
        </Form>
      )}
    </Formik>
  );
};

HelpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default HelpForm;
