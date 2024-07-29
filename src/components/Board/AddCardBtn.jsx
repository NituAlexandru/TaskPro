import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Modal from "../Portal/Modal";
import AddCardForm from "../Portal/addCard/AddCardModal";
import { useCards } from "../../contexts/CardContext";

const ButtonContainer = styled.div`
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

const AddCardButton = ({ boardId, columnId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addCard, fetchCardsForColumn } = useCards();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCardAdded = async () => {
    await fetchCardsForColumn(boardId, columnId);
    closeModal();
  };

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
          <AddCardForm closeModal={handleCardAdded} boardId={boardId} columnId={columnId} />
        </Modal>
      )}
    </>
  );
};

AddCardButton.propTypes = {
  boardId: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired,
};

export default AddCardButton;

