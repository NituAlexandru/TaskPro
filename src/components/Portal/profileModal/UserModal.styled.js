import styled from "styled-components";
import { Field } from "formik";


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

export const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
  width: 68px;
  margin: 0 auto;
  margin-bottom: 20px;
`;

export const AvatarImage = styled.img`
  width: 68px;
  height: 68px;
  border-radius: 8px;
`;

export const ChangeAvatarButton = styled.button`
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

export const HiddenFileInput = styled.input`
  display: none;
`;

export const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 30px;
`;

export const Input = styled(Field)`
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

export const IconButton = styled.button`
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: #fff;
  margin: 0;

  &:hover {
    background-color: transparent;
  }
  &:active {
    background-color: transparent;
  }

  &:focus {
    background-color: transparent;
  }
`;

export const SubmitButton = styled.button`
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

export const ErrorText = styled.div`
  color: ${({ theme }) => theme.errorColor};
  font-size: 12px;
  position: absolute;
  bottom: -20px;
  left: 0;
`;
