import styled from "styled-components";
import { Field } from "formik";

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  width: 350px;

  @media (max-width: 400px) {
    width: 100%;
    margin: 0 auto;
  }
`;

export const FieldWrapper = styled.div`
  position: relative;
  display: flex;
`;
export const FormTitle = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 18px;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.inputTextColor};
  margin: 0;
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
`;

export const Textarea = styled(Field).attrs({ as: "textarea" })`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 100%;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  height: 120px;
  margin: 0;
  outline: none;
`;

export const SubmitButton = styled.button`
  padding: 10px;
  border-radius: 8px;
  border: none;
  background-color: ${({ theme }) => theme.buttonBackgroundColor};
  color: ${({ theme }) => theme.buttonTextColor};
  cursor: pointer;
  margin: 0;
  width: 100%;
  height: 49px;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.02em;

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
