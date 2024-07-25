import { useContext, useState } from "react";
import styled from "styled-components";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "../Portal/Modal"; // Importă componenta Modal
import EditBoardModal from "../Portal/EditBoardModal"; // Importă componenta NewBoardModal
import { ThemeContext } from "../../utils/ThemeProvider";

const BoardListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.scrollbarTrack};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.scrollbarThumb};
    border-radius: 8px;
    border: 2px solid ${({ theme }) => theme.scrollbarTrack};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.scrollbarThumbHover};
  }
`;

const BoardListItem = styled.li`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const BoardListItemContainer = styled.div`
  display: flex;
`;

const Paragraph = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.sidebarTextColor};
  margin: 0;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 16px;
    height: 16px;
    color: ${({ theme }) => theme.sidebarTextColor};

    &:hover {
      color: ${({ theme }) => theme.sidebarTextColor};
    }
  }

  &.edit-button svg,
  &.delete-button svg {
    color: ${({ theme }) => theme.sidebarTextColor};
  }
`;

const BoardList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { theme } = useContext(ThemeContext);

  return (
    <>
      <BoardListWrapper>
        {Array.from({ length: 8 }).map((_, index) => (
          <BoardListItem key={index}>
            <BoardListItemContainer>
              <Paragraph>Project office</Paragraph>
            </BoardListItemContainer>
            <BoardListItemContainer>
              <IconButton className="edit-button" onClick={openModal}>
                <FiEdit />
              </IconButton>
              <IconButton className="delete-button">
                <FiTrash2 />
              </IconButton>
            </BoardListItemContainer>
          </BoardListItem>
        ))}
      </BoardListWrapper>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        width="350px"
        height="500px"
        border="1px solid rgba(190, 219, 176, 0.5)"
        borderRadius="8px"
        modalBackgroundColor={theme.backgroundColor}
      >
        <EditBoardModal closeModal={closeModal} />
      </Modal>
    </>
  );
};

export default BoardList;
