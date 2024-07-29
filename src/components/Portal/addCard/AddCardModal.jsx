import { useState } from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import CustomCalendar from "../../../utils/CustomCalendar";
import "react-calendar/dist/Calendar.css";
import { FaCaretDown, FaPlus } from "react-icons/fa";
// import { AuthContext } from "../../contexts/AuthContext";
import { useCards } from "../../../contexts/CardContext";
import { ModalHeader, FormWrapper, Title, CloseButton,StyledForm, InputWrapper, Input, IconWrapper,TextareaWrapper, Textarea, ErrorMessageStyled, LabelColorContainer, Label, ColorOption, DatePickerWrapper, CalendarToggle, CalendarPopup, SubmitButton } from "./AddCardModal.styled";

const validationSchema = Yup.object({
  titleCard: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

const AddCardForm = ({ closeModal, columnId }) => {
  const [priority, setPriority] = useState("#797b78");
  const [deadline, setDeadline] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const labelColors = ["#797b78", "#8fa1d0", "#e09cb5", "#bedbb0"];
  const priorityMapping = {
    "#797b78": "without",
    "#8fa1d0": "low",
    "#e09cb5": "medium",
    "#bedbb0": "high",
  };
  // const { token } = useContext(AuthContext);
  const { addCard } = useCards();
  const toggleCalendar = () => setIsCalendarOpen(!isCalendarOpen);

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
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const newCard = {
              ...values,
              priority: priorityMapping[priority],
              deadline,
              priorityColor: priority, // Add priorityColor here
              columnId,
            };
            console.log("New Card Data: ", newCard);
            await addCard(columnId, newCard);
            closeModal();
          } catch (error) {
            console.error("Error adding card:", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <StyledForm>
            <InputWrapper>
              <Input type="text" name="titleCard" placeholder="Title" />
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
  columnId: PropTypes.string.isRequired,
};

export default AddCardForm;