import { useState } from "react";
import PropTypes from "prop-types";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  IconWrapper,
  SubmitButton,
  Input,
  CloseButton,
  Title,
  ModalHeader,
  FormWrapper,
} from "./EditColumnModal.styled";

const EditColumnModal = ({
  closeModal,
  updateColumn,
  initialTitle,
  columnId,
}) => {
  const [title, setTitle] = useState(initialTitle);

  const handleUpdateColumn = async () => {
    if (title.trim()) {
      try {
        await updateColumn(columnId, { titleColumn: title }); // Send the titleColumn correctly
        toast.success("Column title updated successfully!");
        closeModal();
      } catch (error) {
        console.error("Error updating column:", error);
        toast.error("Failed to update column. Please try again.");
      }
    } else {
      toast.warn("Title cannot be empty."); // Notification for empty title
    }
  };

  return (
    <FormWrapper>
      <ModalHeader>
        <Title>Edit Column</Title>
        <CloseButton onClick={closeModal}>&times;</CloseButton>
      </ModalHeader>
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Column Title"
      />
      <SubmitButton onClick={handleUpdateColumn}>
        <IconWrapper>
          <FaPlus />
        </IconWrapper>
        Save
      </SubmitButton>
    </FormWrapper>
  );
};

EditColumnModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  updateColumn: PropTypes.func.isRequired,
  initialTitle: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired, // Ensure columnId is received as a prop
};

export default EditColumnModal;
