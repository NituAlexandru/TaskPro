// React and PropTypes imports
import { useState } from "react";
import PropTypes from "prop-types";

// Notification and modal imports
import { toast } from "react-toastify";
import Modal from "../../Portal/Modal";
import AddCardForm from "../../Portal/addCard/AddCardModal";

// Context import
import { useCards } from "../../../contexts/CardContext";

// Style imports
import {
  ButtonContainer,
  IconButton,
  AddParagraph,
} from "../AddCardBtn/AddCardBtn.styled";

const AddCardButton = ({ boardId, columnId, collaborators }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { fetchCardsForColumn, addCard } = useCards();

  // Open modal
  const openModal = () => setIsModalOpen(true);

  // Close modal
  const closeModal = () => setIsModalOpen(false);

  // Handle card addition
  const handleCardAdded = async (cardData) => {
    try {
      await addCard(boardId, columnId, cardData);
      await fetchCardsForColumn(boardId, columnId);
      toast.success("Card added successfully!");
      closeModal();
    } catch (error) {
      console.error("Error adding card:", error);
      toast.error("Failed to add card. Please try again.");
    }
  };

  return (
    <>
      <ButtonContainer onClick={openModal}>
        <IconButton>+</IconButton>
        <AddParagraph>Add another card</AddParagraph>
      </ButtonContainer>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <AddCardForm
            closeModal={closeModal}
            onCardAdded={handleCardAdded}
            boardId={boardId}
            columnId={columnId}
            collaborators={collaborators}
          />
        </Modal>
      )}
    </>
  );
};

AddCardButton.propTypes = {
  boardId: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired,
  collaborators: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatarURL: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default AddCardButton;
