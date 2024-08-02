import styled from "styled-components";
import { Form, Field } from "formik";

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const Title = styled.h2`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 18px;
  color: ${({ theme }) => theme.modalTextColor};
  margin: 0;
`;

export const CloseButton = styled.button`
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

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Input = styled(Field)`
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

export const ErrorMessageStyled = styled.div`
  position: absolute;
  top: -20px;
  left: 0;
  font-size: 12px;
  color: ${({ theme }) => theme.modalCreateBtnBackgroundColor};
`;

export const TextareaWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Textarea = styled(Field)`
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

export const Label = styled.label`
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 12px;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.modalTextColor};
`;

export const LabelColorContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const ColorOption = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  cursor: pointer;
  border: 2px solid ${({ selected }) => (selected ? "#fff" : "transparent")};
`;

export const DatePickerWrapper = styled.div`
  position: relative;
`;

export const CalendarToggle = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.buttonBackground};
  display: flex;
  align-items: center;
`;

export const CalendarPopup = styled.div`
  position: absolute;
  top: 40px;
  z-index: 10;
`;

export const SubmitButton = styled.button`
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

export const IconWrapper = styled.div`
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
export const CollaboratorsInputWrapper = styled.div`
  margin-bottom: 10px;
`;

export const CollaboratorSelectList = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const CollaboratorSelectItem = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid ${({ selected }) => (selected ? "#007BFF" : "transparent")};
  transition: border-color 0.3s;

  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
`;
