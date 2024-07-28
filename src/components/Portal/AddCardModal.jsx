import { useState, useContext } from "react";
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import CustomCalendar from "../../utils/CustomCalendar";
import "react-calendar/dist/Calendar.css";
import { FaCaretDown, FaPlus } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext";
import CardService from "../../service/cardService";

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const Title = styled.h2`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 18px;
  color: ${({ theme }) => theme.modalTextColor};
  margin: 0;
`;

const CloseButton = styled.button`
  border: none;
  background: none;
  color: ${({ theme }) => theme.modalTextColor};
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  margin: 0;
  transition: all 150ms ease-in-out;

  &:hover {
    background: ${({ theme }) => theme.modalBackgroundColor};
    transform: scale(1.2);
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Input = styled(Field)`
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: -0.02em;
  border: 1px solid #bedbb0;
  border-radius: 8px;
  width: 302px;
  height: 49px;
  box-shadow: 0 4px 16px 0 rgba(22, 22, 22, 0.08);
  opacity: 0.4;
  margin: 0;
  background-color: ${({ theme }) => theme.modalBackgroundColor};
  color: ${({ theme }) => theme.modalTextColor};
  padding: 10px;
`;

const ErrorMessageStyled = styled.div`
  position: absolute;
  top: -20px;
  left: 0;
  font-size: 12px;
  color: ${({ theme }) => theme.modalCreateBtnBackgroundColor};
`;

const TextareaWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Textarea = styled(Field)`
  border: 1px solid #bedbb0;
  border-radius: 8px;
  width: 302px;
  height: 154px;
  box-shadow: 0 4px 16px 0 rgba(22, 22, 22, 0.08);
  opacity: 0.4;
  background-color: ${({ theme }) => theme.modalBackgroundColor};
  color: ${({ theme }) => theme.modalTextColor};
  padding: 10px;
`;

const Label = styled.label`
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 12px;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.modalTextColor};
`;

const LabelColorContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const ColorOption = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  cursor: pointer;
  border: 2px solid ${({ selected }) => (selected ? "#fff" : "transparent")};
`;

const DatePickerWrapper = styled.div`
  position: relative;
`;

const CalendarToggle = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.buttonBackground};
  display: flex;
  align-items: center;
`;

const CalendarPopup = styled.div`
  position: absolute;
  top: 40px;
  z-index: 10;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: ${({ theme }) => theme.modalCreateBtnBackgroundColor};
  color: ${({ theme }) => theme.modalCreateBtnColor};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 14px;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) =>
      theme.modalCreateBtnHoverBackgroundColor};
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: ${({ theme }) => theme.addCardButtonIconBackground};
  color: ${({ theme }) => theme.addCardButtonIcon};
  border-radius: 6px;
  margin-right: 10px;
`;

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

const AddCardForm = ({ closeModal, columnId, onCardAdded }) => {
  const [labelColor, setLabelColor] = useState("pink");
  const [deadline, setDeadline] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const labelColors = ["#797b78", "#8fa1d0", "#e09cb5", "#bedbb0"];
  const { token } = useContext(AuthContext);
  const cardService = new CardService(token);

  const toggleCalendar = () => setIsCalendarOpen(!isCalendarOpen);

  console.log("Column ID in AddCardForm:", columnId); // Log the column ID received

  return (
    <FormWrapper>
      <ModalHeader>
        <Title>Add card</Title>
        <CloseButton onClick={closeModal}>&times;</CloseButton>
      </ModalHeader>
      <Formik
        initialValues={{
          title: "",
          description: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const newCard = {
              ...values,
              labelColor,
              deadline,
            };
            const addedCard = await cardService.addCard(columnId, newCard);
            console.log("Added Card:", addedCard); // Log the added card
            onCardAdded(addedCard);
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
              <Input type="text" name="title" placeholder="Title" />
              <ErrorMessage name="title" component={ErrorMessageStyled} />
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
  onCardAdded: PropTypes.func.isRequired,
};

export default AddCardForm;
