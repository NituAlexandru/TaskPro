import { useState } from "react";
import PropTypes from "prop-types";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaCaretDown, FaPlus } from "react-icons/fa";
import CustomCalendar from "../../CustomCalendar/CustomCalendar";
import "react-calendar/dist/Calendar.css";
import {
  ModalHeader,
  FormWrapper,
  Title,
  CloseButton,
  StyledForm,
  InputWrapper,
  Input,
  IconWrapper,
  TextareaWrapper,
  Textarea,
  ErrorMessageStyled,
  LabelColorContainer,
  Label,
  ColorOption,
  DatePickerWrapper,
  CalendarToggle,
  CalendarPopup,
  SubmitButton,
} from "./EditCardModal.styled";

// Validation schema for form validation
const validationSchema = Yup.object({
  titleCard: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

const labelColors = ["#8fa1d0", "#e09cb5", "#bedbb0", "#797b78"];
const priorityMapping = {
  "#8fa1d0": "low",
  "#e09cb5": "medium",
  "#bedbb0": "high",
  "#797b78": "without",
};

const EditCardForm = ({ closeModal, initialValues, onSubmit }) => {
  const [labelColor, setLabelColor] = useState(
    initialValues.priorityColor || "#e09cb5"
  );
  const [deadline, setDeadline] = useState(new Date(initialValues.deadline));
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Handler to toggle calendar visibility
  const toggleCalendar = () => setIsCalendarOpen(!isCalendarOpen);

  // Handler for form submission
  const handleFormSubmit = (values, { setSubmitting }) => {
    const { collaborators, ...otherValues } = values;
    const updatedValues = {
      ...otherValues,
      priority: priorityMapping[labelColor],
      priorityColor: labelColor,
      deadline,
      columnId: initialValues.columnId,
    };
    onSubmit(updatedValues);
    setSubmitting(false);
  };

  return (
    <FormWrapper>
      <ModalHeader>
        <Title>Edit card</Title>
        <CloseButton onClick={closeModal}>&times;</CloseButton>
      </ModalHeader>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ isSubmitting }) => (
          <StyledForm>
            <InputWrapper>
              <Input
                type="text"
                name="titleCard"
                placeholder="Title"
                autoComplete="off"
              />
              <ErrorMessage name="titleCard" component={ErrorMessageStyled} />
            </InputWrapper>

            <TextareaWrapper>
              <Textarea
                name="description"
                component="textarea"
                placeholder="Description"
              />
              <ErrorMessage name="description" component={ErrorMessageStyled} />
            </TextareaWrapper>

            <Label>Label color</Label>
            <LabelColorContainer>
              {labelColors.map((color) => (
                <ColorOption
                  key={color}
                  color={color}
                  selected={labelColor === color}
                  onClick={() => setLabelColor(color)}
                />
              ))}
            </LabelColorContainer>

            <Label>Deadline</Label>
            <DatePickerWrapper>
              <CalendarToggle onClick={toggleCalendar}>
                {deadline.toDateString()}
                <FaCaretDown style={{ marginLeft: "10px" }} />
              </CalendarToggle>
              {isCalendarOpen && (
                <CalendarPopup>
                  <CustomCalendar
                    value={deadline}
                    onChange={(date) => {
                      setDeadline(date);
                      setIsCalendarOpen(false);
                    }}
                  />
                </CalendarPopup>
              )}
            </DatePickerWrapper>

            <SubmitButton type="submit" disabled={isSubmitting}>
              <IconWrapper>
                <FaPlus />
              </IconWrapper>
              Edit
            </SubmitButton>
          </StyledForm>
        )}
      </Formik>
    </FormWrapper>
  );
};

EditCardForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    titleCard: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    priority: PropTypes.string,
    deadline: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]).isRequired,
    priorityColor: PropTypes.string,
    columnId: PropTypes.string.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default EditCardForm;
