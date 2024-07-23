import styled from "styled-components";

const ButtonContainer = styled.div`
  border-radius: 8px;
  width: 334px;
  height: 56px;
  background: ${({ theme }) => theme.addColumnBackground};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.addColumnBtnHoverBackground};
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 500px) {
    width: 100%;
  }
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: ${({ theme }) => theme.addColumnBtnBackground};
  border: none;
  border-radius: 6px;
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.addColumnBtnColor};
`;

const IconImage = styled.span`
  width: 14px;
  height: 14px;
`;

const AddParagraph = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.addColumnBtnBackground};
`;

const AddColumnButton = () => {
  return (
    <ButtonContainer>
      <IconButton>
        <IconImage>+</IconImage>
      </IconButton>
      <AddParagraph>Add another column</AddParagraph>
    </ButtonContainer>
  );
};

export default AddColumnButton;
