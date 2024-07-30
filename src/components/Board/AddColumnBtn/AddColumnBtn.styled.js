import styled from "styled-components";

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: ${({ theme }) => theme.addColumnBtnBackground};
  border: none;
  border-radius: 6px;
  margin: 0 15px;
  padding: 0;
  cursor: pointer;
  color: ${({ theme }) => theme.addColumnBackground};

  &:focus {
    outline: none;
  }
`;

export const AddParagraph = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.addColumnBtnBackground};
  margin: 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.addColumnBackground};
  border-radius: 8px;
  width: 334px;
  height: 56px;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    background-color: ${({ theme }) => theme.addColumnBtnHoverBackground};
    color: ${({ theme }) => theme.addColumnBtnBackground};

    ${IconButton} {
      background: ${({ theme }) => theme.addColumnBtnBackground};
      color: ${({ theme }) => theme.addColumnBtnColor};
    }

    ${AddParagraph} {
      color: ${({ theme }) => theme.addColumnBtnBackground};
    }
  }

  @media (max-width: 500px) {
    width: 100%;
  }
`;
