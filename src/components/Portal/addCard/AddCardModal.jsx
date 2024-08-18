import { useState } from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import CustomCalendar from "../../CustomCalendar/CustomCalendar";
import "react-calendar/dist/Calendar.css";
import { FaCaretDown, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { useCards } from "../../../contexts/CardContext";
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
} from "./AddCardModal.styled";

// Validation schema for form validation
const validationSchema = Yup.object({
  titleCard: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  collaborators: Yup.array().of(
    Yup.object({
      userId: Yup.string().required("User ID is required"),
      name: Yup.string().required("Name is required"),
      avatar: Yup.string().required("Avatar is required"),
    })
  ),
});

const labelColors = ["#797b78", "#8fa1d0", "#e09cb5", "#bedbb0"];
const priorityMapping = {
  "#797b78": "without",
  "#8fa1d0": "low",
  "#e09cb5": "medium",
  "#bedbb0": "high",
};

const AddCardForm = ({ closeModal, boardId, columnId }) => {
  const [priority, setPriority] = useState("#797b78");
  const [deadline, setDeadline] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { addCard } = useCards();

  // Handler to toggle calendar visibility
  const toggleCalendar = () => setIsCalendarOpen(!isCalendarOpen);

  // Handler for form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const newCard = {
        ...values,
        priority: priorityMapping[priority],
        deadline,
        priorityColor: priority,
        columnId,
        collaborators: values.collaborators,
      };

      await addCard(boardId, columnId, newCard);
      toast.success("Card added successfully!");
      closeModal();
    } catch (error) {
      console.error("Error adding card:", error);
      toast.error("Failed to add card. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormWrapper>
      <ModalHeader>
        <Title>Add card</Title>
        <CloseButton onClick={closeModal}>&times;</CloseButton>
      </ModalHeader>
      <Formik
        initialValues={{
          titleCard: "",
          description: "",
          collaborators: [],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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

            <Label>Priority</Label>
            <LabelColorContainer>
              {labelColors.map((color) => (
                <ColorOption
                  key={color}
                  color={color}
                  selected={priority === color}
                  onClick={() => setPriority(color)}
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
              Add
            </SubmitButton>
          </StyledForm>
        )}
      </Formik>
    </FormWrapper>
  );
};

AddCardForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
  boardId: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired,
  collaborators: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.string,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    })
  ),
};

export default AddCardForm;
