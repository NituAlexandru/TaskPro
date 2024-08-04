import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from "axios";
import {
  FormWrapper,
  FieldWrapper,
  FormTitle,
  Input,
  Textarea,
  SubmitButton,
  ErrorText,
} from "./HelpModal.styles";
import API_BASE_URL from "../../../utils/apiConfig";

const HelpForm = ({ onSubmit }) => {
  // Initial form values
  const initialValues = {
    email: "",
    message: "",
  };

  // Validation schema for the form
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    message: Yup.string().required("Required"),
  });

  // Base URL for the API
  const BASE_URL = `${API_BASE_URL}/api`;

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.post(`${BASE_URL}/user/help-request`, values);
      toast.success("Help request sent successfully!");
      onSubmit(values);
    } catch (error) {
      console.error("Error submitting help request", error);
      toast.error("Failed to send help request. Please try again.");
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
              <Field
                as={Input}
                type="email"
                name="email"
                placeholder="Email address"
              />
              <ErrorMessage name="email" component={ErrorText} />
            </FieldWrapper>

            <FieldWrapper>
              <Field
                as={Textarea}
                name="message"
                placeholder="Please enter a message (at least 10 characters)"
              />
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
