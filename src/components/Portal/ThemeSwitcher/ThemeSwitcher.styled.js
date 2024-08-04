import styled from "styled-components";

export const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownButton = styled.button`
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonText};
  padding: 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 40px;
  width: 100px;
  border-radius: 4px;

  @media (max-width: 400px) {
    font-size: 14px;
    letter-spacing: -0.02em;
  }
`;

export const DropdownContent = styled.div`
  display: ${({ $show }) => ($show ? "block" : "none")};
  position: absolute;
  background-color: ${({ theme }) => theme.body};
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  min-width: 140px;
  right: 0;
  border-radius: 8px;

  & button {
    color: ${({ theme }) => theme.text};
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    margin: 0;
    padding: 10px;
    width: 100%;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-size: 14px;
    letter-spacing: -0.02em;
   
  }

  & button:hover {
    background-color: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.body};
  }
`;
