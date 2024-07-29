import styled from "styled-components";
import { Field } from "formik";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.modalBackgroundColor};
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  height: auto;
  position: relative;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.modalTextColor};
  font-size: 20px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    transform: scale(1.2);
    background-color: ${({ theme }) => theme.modalBackgroundColor};
  }
`;

export const FormTitle = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 18px;
  letter-spacing: -0.02em;
  color: #fff;
  margin: 0;
  margin-bottom: 20px;
  text-align: left;
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
