import { useState } from "react";
import PropTypes from "prop-types";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { useColumns } from "../../../contexts/ColumnContext";
import {
  FormWrapper,
  ModalHeader,
  Title,
  CloseButton,
  Input,
  SubmitButton,
  IconWrapper,
} from "./AddColumnModal.styled";

const AddColumnModal = ({ closeModal, boardId, onColumnAdded }) => {
  const [title, setTitle] = useState("");
  const { addColumn } = useColumns();

  // Handler for adding a column
  const handleAddColumn = async () => {
    if (!title.trim()) {
      toast.error("Column title cannot be empty.");
      return;
    }

    try {
      const newColumn = await addColumn(boardId, {
        titleColumn: title,
        boardId,
      });
      onColumnAdded(newColumn); // Update the columns in the parent component
      toast.success("Column added successfully!");
      closeModal();
    } catch (error) {
      console.error("Error adding column:", error);
      toast.error("Failed to add column. Please try again.");
    }
  };

  return (
    <FormWrapper>
      <ModalHeader>
        <Title>Add Column</Title>
        <CloseButton onClick={closeModal}>&times;</CloseButton>
      </ModalHeader>
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter column title"
      />
      <SubmitButton onClick={handleAddColumn}>
        <IconWrapper>
          <FaPlus />
        </IconWrapper>
        Add
      </SubmitButton>
    </FormWrapper>
  );
};

AddColumnModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  boardId: PropTypes.string.isRequired,
  onColumnAdded: PropTypes.func.isRequired,
};

export default AddColumnModal;
