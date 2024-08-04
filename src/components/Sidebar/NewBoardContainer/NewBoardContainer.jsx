import { useState } from "react";
import Modal from "../../Portal/Modal";
import NewBoardModal from "../../Portal/AddBoardModal/AddBoardModal";
import { useBoards } from "../../../contexts/BoardContext";
import {
  NewBoardContainerWrapper,
  Paragraph,
  AddBoardBtn,
} from "./NewBoardContainer.styled";

const NewBoardContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createBoard } = useBoards();

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
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <NewBoardModal closeModal={closeModal} createBoard={createBoard} />
        </Modal>
      )}
    </>
  );
};

export default NewBoardContainer;
