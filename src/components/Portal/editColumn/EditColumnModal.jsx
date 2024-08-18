import { useState } from "react";
import PropTypes from "prop-types";
import { FaPlus } from "react-icons/fa";
import {
  IconWrapper,
  SubmitButton,
  Input,
  CloseButton,
  Title,
  ModalHeader,
  FormWrapper,
} from "./EditColumnModal.styled";

const EditColumnModal = ({ closeModal, updateColumn, initialTitle }) => {
  const [title, setTitle] = useState(initialTitle);

  const handleSubmit = () => {
    updateColumn(title);
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
      <SubmitButton onClick={handleSubmit}>
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
  columnId: PropTypes.string.isRequired,
};

export default EditColumnModal;
