import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Modal from '../Portal/Modal';
import EditBoardModal from '../Portal/EditBoardModal';
import { ThemeContext } from '../../utils/ThemeProvider';
import { useBoards } from '../../contexts/BoardContext';
import loadingIcon from '../../assets/icons/loading.svg';
import colorsIcon from '../../assets/icons/colors.svg';
import containerIcon from '../../assets/icons/container.svg';
import hexagonIcon from '../../assets/icons/hexagon.svg';
import lightningIcon from '../../assets/icons/lightning.svg';
import projectIcon from '../../assets/icons/project.svg';
import puzzlePieceIcon from '../../assets/icons/puzzle-piece.svg';
import starIcon from '../../assets/icons/star.svg';

const iconsMap = {
  loadingIcon,
  colorsIcon,
  containerIcon,
  hexagonIcon,
  lightningIcon,
  projectIcon,
  puzzlePieceIcon,
  starIcon,
};

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
  align-items: center;
`;

const IconImage = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 10px;
`;

const Paragraph = styled.p`
  font-family: 'Poppins', sans-serif;
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

const BoardList = ({ setSelectedBoardId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBoardId, setSelectedBoardIdState] = useState(null);
  const { boards, fetchBoards, deleteBoard, error } = useBoards();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchAndLogBoards = async () => {
      await fetchBoards();
      console.log('Boards:', boards);
      console.table(boards); // Log boards as a table for better visibility
      boards.forEach(board => {
        console.log(`Board ID: ${board._id}`);
        console.log(`Title: ${board.titleBoard}`);
        console.log(`Icon: ${board.icon}`);
        console.log(`Background: ${board.background}`);
        console.log(`Collaborators: ${board.collaborators}`);
        console.log('----------------------');
      });
    };

    fetchAndLogBoards();
  }, []);

  const openModal = (boardId) => {
    setSelectedBoardIdState(boardId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBoardIdState(null);
    setIsModalOpen(false);
    fetchBoards();
  };

  const handleBoardClick = (boardId) => {
    console.log("Board Clicked, ID:", boardId); // Log the clicked board ID
    setSelectedBoardId(boardId);
  };

  const handleDeleteBoard = async (boardId) => {
    try {
      await deleteBoard(boardId);
      fetchBoards(); // Refresh the board list after deletion
    } catch (error) {
      console.error('Error deleting board:', error.response?.data || error.message);
    }
  };

  return (
    <>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <BoardListWrapper>
        {boards.map((board) => (
          <BoardListItem key={board._id} onClick={() => handleBoardClick(board._id)}>
            <BoardListItemContainer>
              <IconImage src={iconsMap[board.icon]} alt={`${board.titleBoard} icon`} />
              <Paragraph>{board.titleBoard}</Paragraph>
            </BoardListItemContainer>
            <BoardListItemContainer>
              <IconButton className="edit-button" onClick={() => openModal(board._id)}>
                <FiEdit />
              </IconButton>
              <IconButton className="delete-button" onClick={() => handleDeleteBoard(board._id)}>
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
        modalBackgroundColor={theme.modalBackgroundColor}
      >
        {selectedBoardId && <EditBoardModal closeModal={closeModal} boardId={selectedBoardId} />}
      </Modal>
    </>
  );
};

export default BoardList;
