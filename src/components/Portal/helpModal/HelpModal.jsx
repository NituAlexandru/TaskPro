import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { FormWrapper, 
  FieldWrapper, 
  FormTitle, 
  Input, 
  Textarea, 
  SubmitButton, 
  ErrorText } from "./HelpModal.styles";
import axios from "axios";

const HelpForm = ({ onSubmit }) => {
  const initialValues = {
    email: "",
    message: "", // Change this to match the expected field name
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    message: Yup.string().required("Required"), // Change this to match the expected field name
  });

  const BASE_URL = "http://localhost:4500/api";

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.post(`${BASE_URL}/user/help-request`, values);
      onSubmit(values);
    } catch (error) {
      console.error("Error submitting help request", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <FormTitle>Need help</FormTitle>
          <FormWrapper>
            <FieldWrapper>
              <Field as={Input} type="email" name="email" placeholder="Email address" />
              <ErrorMessage name="email" component={ErrorText} />
            </FieldWrapper>

            <FieldWrapper>
              <Field as={Textarea} name="message" placeholder="Message" /> {/* Change this to match the expected field name */}
              <ErrorMessage name="message" component={ErrorText} />
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
