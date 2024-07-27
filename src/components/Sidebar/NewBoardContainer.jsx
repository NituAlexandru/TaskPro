import styled from "styled-components";
import Modal from "../Portal/Modal";
import NewBoardModal from "../Portal/AddBoardModal";
import { useState, useContext } from "react";
import { ThemeContext } from "../../utils/ThemeProvider";
import { useBoards } from '../../contexts/BoardContext';

const NewBoardContainerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 15px;
`;

const Paragraph = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.sidebarTextColor};
  margin: 0;
`;

const AddBoardBtn = styled.button`
  border-radius: 6px;
  width: 40px;
  height: 36px;
  border: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.addBoardBtn};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NewBoardContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { theme } = useContext(ThemeContext);
  const { createBoard, fetchBoards } = useBoards();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <NewBoardContainerWrapper>
        <Paragraph>
          Create a <br /> new board
        </Paragraph>
        <AddBoardBtn onClick={openModal}>+</AddBoardBtn>
      </NewBoardContainerWrapper>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        width="350px"
        height="500px"
        border="1px solid rgba(190, 219, 176, 0.5)"
        borderRadius="8px"
        background={theme.modalBackgroundColor}
      >
        <NewBoardModal closeModal={closeModal} createBoard={createBoard} fetchBoards={fetchBoards} />
      </Modal>
    </>
  );
};

export default NewBoardContainer;
