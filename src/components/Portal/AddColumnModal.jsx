import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FaCaretDown, FaPlus } from "react-icons/fa";

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 18px;
  color: ${({ theme }) => theme.modalTextColor};
  margin: 0;
`;

const CloseButton = styled.button`
  border: none;
  background: none;
  color: ${({ theme }) => theme.modalTextColor};
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  margin: 0;
`;

const Input = styled.input`
  border: 1px solid #bedbb0;
  border-radius: 8px;
  width: 100%;
  height: 49px;
  box-shadow: 0 4px 16px 0 rgba(22, 22, 22, 0.08);
  background-color: ${({ theme }) => theme.modalBackgroundColor};
  opacity: 0.4;
  margin: 10px 0;
  padding: 10px;
  color: ${({ theme }) => theme.modalTextColor};
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: ${({ theme }) => theme.modalCreateBtnBackgroundColor};
  color: ${({ theme }) => theme.modalCreateBtnColor};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 14px;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) =>
      theme.modalCreateBtnHoverBackgroundColor};
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: ${({ theme }) => theme.addCardButtonIconBackground};
  color: ${({ theme }) => theme.addCardButtonIcon};
  border-radius: 6px;
  margin-right: 10px;
`;

const AddColumnModal = ({ closeModal, addColumn }) => {
  const [title, setTitle] = useState("");

  const handleAddColumn = () => {
    if (title.trim()) {
      addColumn(title);
      closeModal();
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
  addColumn: PropTypes.func.isRequired,
};

export default AddColumnModal;
