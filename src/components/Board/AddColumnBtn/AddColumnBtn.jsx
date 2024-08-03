// React and PropTypes imports
import { useState } from "react";
import PropTypes from "prop-types";

// Modal imports
import Modal from "../../Portal/Modal";
import AddColumnModal from "../../Portal/AddColumnModal/AddColumnModal";

// Style imports
import {
  ButtonContainer,
  IconButton,
  AddParagraph,
} from "../AddColumnBtn/AddColumnBtn.styled";

const AddColumnButton = ({ boardId, onColumnAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open modal
  const openModal = () => setIsModalOpen(true);

  // Close modal
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <ButtonContainer onClick={openModal}>
        <IconButton>+</IconButton>
        <AddParagraph>Add another column</AddParagraph>
      </ButtonContainer>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <AddColumnModal
            closeModal={closeModal}
            boardId={boardId}
            onColumnAdded={onColumnAdded}
          />
        </Modal>
      )}
    </>
  );
};

AddColumnButton.propTypes = {
  boardId: PropTypes.string.isRequired,
  onColumnAdded: PropTypes.func.isRequired,
};

export default AddColumnButton;
