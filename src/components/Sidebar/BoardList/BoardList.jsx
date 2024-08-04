import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import Modal from "../../Portal/Modal";
import EditBoardModal from "../../Portal/EditBoardModal/EditBoardModal";
import { useBoards } from "../../../contexts/BoardContext";
import {
  BoardListItem,
  BoardListWrapper,
  BoardListItemContainer,
  IconButton,
  IconImage,
  Paragraph,
} from "./BoardList.styled";

import loadingIcon from "../../../assets/icons/loading.svg";
import colorsIcon from "../../../assets/icons/colors.svg";
import containerIcon from "../../../assets/icons/container.svg";
import hexagonIcon from "../../../assets/icons/hexagon.svg";
import lightningIcon from "../../../assets/icons/lightning.svg";
import projectIcon from "../../../assets/icons/project.svg";
import puzzlePieceIcon from "../../../assets/icons/puzzle-piece.svg";
import starIcon from "../../../assets/icons/star.svg";

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

const BoardList = ({
  setSelectedBoardId,
  navigateHome,
  onCollaboratorUpdate,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBoardId, setSelectedBoardIdState] = useState(null);
  const [currentBoardId, setCurrentBoardId] = useState(null);
  const { boards, fetchBoards, deleteBoard, error } = useBoards();

  useEffect(() => {
    fetchBoards();
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

  const handleBoardClick = (boardId, titleBoard) => {
    setSelectedBoardId(boardId, titleBoard);
    setCurrentBoardId(boardId);
  };

  const handleDeleteBoard = async (boardId) => {
    try {
      await deleteBoard(boardId);
      toast.success("Board deleted successfully!");
      fetchBoards();
      if (boardId === currentBoardId) {
        setCurrentBoardId(null);
        navigateHome();
      }
    } catch (error) {
      console.error(
        "Error deleting board:",
        error.response?.data || error.message
      );
      toast.error("Failed to delete board. Please try again.");
    }
  };

  return (
    <>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <BoardListWrapper>
        {boards.map((board) => (
          <BoardListItem
            key={board._id}
            onClick={() => handleBoardClick(board._id, board.titleBoard)}
          >
            <BoardListItemContainer>
              <IconImage
                src={iconsMap[board.icon]}
                alt={`${board.titleBoard} icon`}
              />
              <Paragraph>{board.titleBoard}</Paragraph>
            </BoardListItemContainer>
            {currentBoardId === board._id && (
              <BoardListItemContainer>
                <IconButton
                  className="edit-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(board._id);
                  }}
                >
                  <FiEdit />
                </IconButton>
                <IconButton
                  className="delete-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteBoard(board._id);
                  }}
                >
                  <FiTrash2 />
                </IconButton>
              </BoardListItemContainer>
            )}
          </BoardListItem>
        ))}
      </BoardListWrapper>
      {isModalOpen && selectedBoardId && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <EditBoardModal
            closeModal={closeModal}
            boardId={selectedBoardId}
            onCollaboratorUpdate={onCollaboratorUpdate}
          />
        </Modal>
      )}
    </>
  );
};

BoardList.propTypes = {
  setSelectedBoardId: PropTypes.func.isRequired,
  navigateHome: PropTypes.func.isRequired,
  onCollaboratorUpdate: PropTypes.func.isRequired,
};

export default BoardList;
