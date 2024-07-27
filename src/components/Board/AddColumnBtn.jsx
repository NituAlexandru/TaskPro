import { useState, useContext } from "react";
import styled from "styled-components";
import Modal from "../Portal/Modal";
import AddColumnModal from "../Portal/AddColumnModal";
import { useBoards } from "../../contexts/BoardContext";

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
  background-color: ${({ theme }) => theme.addColumnBackground};
  border-radius: 8px;
  width: 334px;
  height: 56px;
  cursor: pointer;

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

const AddColumnButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { boardId } = useBoards();

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
          <AddColumnModal closeModal={closeModal} boardId={boardId} />
        </Modal>
      )}
    </>
  );
};

export default AddColumnButton;

