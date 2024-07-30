import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    margin: 0;
    font-family: "Poppins", sans-serif;
  }

  button {
    background-color: ${({ theme }) => theme.buttonBackground};
    color: ${({ theme }) => theme.buttonText};
    border: none;
    padding: 10px 20px;
    margin: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${({ theme }) => theme.buttonBackgroundHover};
    }

    &:active {
      background-color: ${({ theme }) => theme.buttonBackgroundActive};
    }

    &:focus {
      background-color: ${({ theme }) => theme.buttonBackgroundFocus};
      outline: none;
    }
  }

  input {
    background-color: ${({ theme }) => theme.inputBackground};
    color: ${({ theme }) => theme.inputText};
    border: 1px solid ${({ theme }) => theme.text};
    padding: 10px;
    margin: 5px;
    box-shadow: ${({ theme }) => theme.inputBoxShadow};
  }

  header {
    background-color: ${({ theme }) => theme.headerBackground};
    color: ${({ theme }) => theme.headerText};
    padding: 10px;
  }

 /* Global scrollbar styling */
  ::-webkit-scrollbar {
    height: 12px;
    width: 12px; /* For vertical scrollbar */
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.scrollbarTrack};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
     background-color: ${({ theme }) => theme.scrollbarThumb};
      border-radius: 8px;
      border: 2px solid ${({ theme }) => theme.scrollbarTrack};
  }

  ::-webkit-scrollbar-thumb:hover {
     background: ${({ theme }) => theme.scrollbarThumbHover};
  }



`;

export default GlobalStyles;
