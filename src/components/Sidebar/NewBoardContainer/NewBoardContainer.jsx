import { useState, useContext } from "react";
import Modal from "../../Portal/Modal";
import NewBoardModal from "../../Portal/AddBoardModal/AddBoardModal";
import { ThemeContext } from "../../../utils/ThemeProvider";
import { useBoards } from "../../../contexts/BoardContext";
import {
  NewBoardContainerWrapper,
  Paragraph,
  AddBoardBtn,
} from "./NewBoardContainer.styled";

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
        <NewBoardModal
          closeModal={closeModal}
          createBoard={createBoard}
          fetchBoards={fetchBoards}
        />
      </Modal>
    </>
  );
};

export default NewBoardContainer;
