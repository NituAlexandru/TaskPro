import styled from "styled-components";
import { Form, Field, ErrorMessage } from "formik";

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 9%,
    rgba(246, 246, 246, 1) 22%,
    rgba(184, 218, 168, 1) 81%
  );
`;

export const StyledForm = styled(Form)`
  background-color: #151515;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 8px;
  width: 424px;
  height: auto;
  padding: 2rem;
  box-shadow: 0 4px 16px 0 rgba(22, 22, 22, 0.08);

  .toggle-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
    font-weight: 500;
    font-size: 18px;
    letter-spacing: -0.02em;
    color: rgba(255, 255, 255, 0.3);
    cursor: pointer;
  }

  @media (max-width: 500px) {
    width: 80%;
    padding: 1rem;
  }

  @media (max-width: 320px) {
    width: 98%;
    padding: 1rem;
  }
`;

export const Title = styled.h2`
  font-weight: 500;
  font-size: 18px;
  letter-spacing: -0.02em;
  color: #fff;
`;

export const ToggleLink = styled.div`
  cursor: pointer;
  font-weight: 500;
  font-size: 18px;
  letter-spacing: -0.02em;
  color: rgba(255, 255, 255, 0.3);
`;

export const Input = styled(Field)`
  border: 1px solid #bedbb0;
  border-radius: 8px;
  width: 100%;
  height: 49px;
  box-shadow: 0 4px 16px 0 rgba(22, 22, 22, 0.08);
  background: #1f1f1f;
  opacity: 0.4;
  padding: 0.5rem;
  color: #fff;
  margin: 0;

  @media (max-width: 500px) {
    width: 100%;
    padding: 1rem;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
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

export const StyledErrorMessage = styled(ErrorMessage)`
  color: red;
  font-size: 12px;
  margin-top: -10px;
  margin-bottom: 10px;
`;

export const SubmitButton = styled.button`
  font-family: "Poppins", sans-serif;
  border-radius: 8px;
  width: 100%;
  height: 49px;
  background: #bedbb0;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.02em;
  text-align: center;
  color: #161616;
  border: none;
  margin: 0;

  &:hover {
    background: #9dc888;
  }

  @media (max-width: 500px) {
    width: 100%;
    padding: 1rem;
  }
`;

export const GoogleButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4285f4;
  color: white;
  text-align: center;
  padding: 10px 0;
  border-radius: 8px;
  text-decoration: none;
  width: 100%;
  height: 49px;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.02em;
  text-align: center;
  gap: 10px;

  &:hover {
    background-color: #357ae8;
  }

  @media (max-width: 500px) {
    width: 100%;
    padding: 1rem;
  }
`;
