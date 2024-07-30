import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "../../Portal/Modal";
import AddColumnModal from "../../Portal/AddColumnModal";
import {
  ButtonContainer,
  IconButton,
  AddParagraph,
} from "../AddColumnBtn/AddColumnBtn.styled";

const AddColumnButton = ({ boardId, onColumnAdded }) => {
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
