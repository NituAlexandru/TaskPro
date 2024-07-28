import { useState } from "react";
import styled from "styled-components";
import Modal from "../Portal/Modal";
import AddCardForm from "../Portal/AddCardModal";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.addCardButtonBackground};
  border-radius: 8px;
  width: 334px;
  height: 56px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.addCardButtonHoverBackground};
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

const AddParagraph = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.addCardButtonText};
  margin: 0;
`;

const AddCardButton = ({ columnId, onCardAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    console.log("Opening AddCardForm modal for columnId:", columnId);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <ButtonContainer onClick={openModal}>
        <IconButton>+</IconButton>
        <AddParagraph>Add another card</AddParagraph>
      </ButtonContainer>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          width="350px"
          height="522px"
          border="1px solid rgba(190, 219, 176, 0.5)"
          borderRadius="8px"
        >
          <AddCardForm columnId={columnId} onCardAdded={onCardAdded} closeModal={closeModal} />
        </Modal>
      )}
    </>
  );
};

export default AddCardButton;
