import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import Modal from "../../Portal/Modal";
import AddCardForm from "../../Portal/addCard/AddCardModal";
import { useCards } from "../../../contexts/CardContext";
import {
  ButtonContainer,
  IconButton,
  AddParagraph,
} from "../AddCardBtn/AddCardBtn.styled";

const AddCardButton = ({ boardId, columnId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { fetchCardsForColumn, addCard } = useCards(); // Destructurează addCard din useCards

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCardAdded = async (cardData) => {
    try {
      await addCard(boardId, columnId, cardData); // Adaugă cardul
      await fetchCardsForColumn(boardId, columnId); // Actualizează cardurile din coloană
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
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          width="350px"
          height="522px"
          border="1px solid rgba(190, 219, 176, 0.5)"
          borderRadius="8px"
        >
          <AddCardForm
            closeModal={closeModal}
            onCardAdded={handleCardAdded}
            boardId={boardId}
            columnId={columnId}
          />
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
