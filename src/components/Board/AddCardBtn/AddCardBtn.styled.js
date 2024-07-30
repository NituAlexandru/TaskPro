import styled from "styled-components";

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.addCardButtonBackground};
  border-radius: 8px;
  width: 334px;
  height: 56px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: ${({ theme }) => theme.addCardButtonHoverBackground};
  }

  @media (max-width: 500px) {
    width: 100%;
  }
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: ${({ theme }) => theme.addCardButtonIconBackground};
  border: none;
  border-radius: 6px;
  margin: 0 15px;
  padding: 0;
  cursor: pointer;
  color: ${({ theme }) => theme.addCardButtonIcon};

  &:hover {
    background: ${({ theme }) => theme.addCardButtonIconBackground};
  }

  &:focus {
    outline: none;
  }
`;

export const AddParagraph = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.addCardButtonText};
  margin: 0;
`;
