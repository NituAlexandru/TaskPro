import { useState } from "react";
import styled from "styled-components";
import Modal from "../Portal/Modal";
import AddColumnModal from "../Portal/AddColumnModal";
const IconButton = styled.button`
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
const AddParagraph = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.addColumnBtnBackground};
  margin: 0;
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.addColumnBtnHoverBackground};
  border-radius: 8px;
  width: 334px;
  height: 56px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.addColumnBtnBackground};

    ${IconButton} {
      background: ${({ theme }) => theme.addColumnBackground};
      color: ${({ theme }) => theme.addColumnBtnBackground};
    }

    ${AddParagraph} {
      color: ${({ theme }) => theme.addColumnBtnColor};
    }
  }

  @media (max-width: 500px) {
    width: 100%;
  }
`;

const AddColumnButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <ButtonContainer onClick={openModal}>
        <IconButton>+</IconButton>
        <AddParagraph>Add another column</AddParagraph>
      </ButtonContainer>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          width="350px"
          height="221px"
          border="1px solid rgba(190, 219, 176, 0.5)"
          borderRadius="8px"
        >
          <AddColumnModal closeModal={closeModal} />
        </Modal>
      )}
    </>
  );
};

export default AddColumnButton;
