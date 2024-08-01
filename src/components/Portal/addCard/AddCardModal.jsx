import { useState } from "react";
import { Formik, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import CustomCalendar from "../../CustomCalendar/CustomCalendar";
import "react-calendar/dist/Calendar.css";
import { FaCaretDown, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { useCards } from "../../../contexts/CardContext";
import {getUserDetailsByEmail} from "../../../service/authService";
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
  CollaboratorsInputWrapper,
  CollaboratorsInput,
  CollaboratorsList,
  CollaboratorItem,
  // CollaboratorDetails,
  RemoveCollaboratorButton,
} from "./AddCardModal.styled";

const validationSchema = Yup.object({
  titleCard: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  collaborators: Yup.array().of(
    Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      userId: Yup.string().required("User ID is required"),
      name: Yup.string().required("Name is required"),
      avatar: Yup.string().required("Avatar is required"),
    })
  ),
});

const AddCardForm = ({ closeModal, boardId, columnId }) => {
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
          collaborators: [],
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          console.log("Form values on submit:", values); // Debugging log
          try {
            const collaboratorIds = values.collaborators.map(collaborator => collaborator.userId);

            const newCard = {
              ...values,
              priority: priorityMapping[priority],
              deadline,
              priorityColor: priority,
              columnId,
              collaborators: collaboratorIds,
            };

            console.log("New card to be added:", newCard); // Debugging log

            await addCard(boardId, columnId, newCard);
            toast.success("Card added successfully!");
            closeModal();
          } catch (error) {
            console.error("Error adding card:", error);
            toast.error("Failed to add card. Please try again.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <StyledForm>
            <InputWrapper>
              <Input type="text" name="titleCard" placeholder="Title" autoComplete="off"/>
              <ErrorMessage name="titleCard" component={ErrorMessageStyled} />
            </InputWrapper>
            <CollaboratorsInputWrapper>
              <FieldArray
                name="collaborators"
                render={(arrayHelpers) => (
                  <>
                    <CollaboratorsInput
                    autoComplete="off"
                      type="email"
                      placeholder="Enter collaborator email"
                      onKeyDown={async (e) => {
                        console.log("Key down event:", e); // Debugging log
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (e.target.value) {
                            const email = e.target.value;
                            console.log("Email entered:", email); // Debugging log
                            try {
                              const userDetails = await getUserDetailsByEmail(email);
                              console.log("User details fetched:", userDetails); // Debugging log
                              if (userDetails) {
                                arrayHelpers.push({
                                  email,
                                  userId: userDetails.userId,
                                  name: userDetails.name,
                                  avatar: userDetails.avatar,
                                });
                                console.log("Collaborators array after push:", values.collaborators); // Debugging log
                              } else {
                                toast.error(`User with email ${email} not found`);
                              }
                            } catch (error) {
                              console.error("Error fetching user details:", error);
                              toast.error("Error fetching user details. Please try again.");
                            }
                            e.target.value = '';
                          }
                        }
                      }}
                    />
                    <ErrorMessage name="collaborators" component={ErrorMessageStyled} />
                    <CollaboratorsList>
                      {values.collaborators.map((collaborator, index) => (
                        <CollaboratorItem key={index}>
                          <img src={collaborator.avatar} alt={collaborator.name} style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight: "10px" }} />
                          {/* <CollaboratorDetails>
                            <div>{collaborator.name}</div>
                            <div>{collaborator.email}</div>
                          </CollaboratorDetails> */}
                          <RemoveCollaboratorButton
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            &times;
                          </RemoveCollaboratorButton>
                        </CollaboratorItem>
                      ))}
                    </CollaboratorsList>
                  </>
                )}
              />
            </CollaboratorsInputWrapper>
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
};

export default AddCardForm;