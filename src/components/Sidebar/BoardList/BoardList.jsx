import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "../../Portal/Modal";
import EditBoardModal from "../../Portal/EditBoardModal";
import { ThemeContext } from "../../../utils/ThemeProvider";
import { useBoards } from "../../../contexts/BoardContext";
import { BoardListItem, BoardListWrapper, BoardListItemContainer, IconButton, IconImage, Paragraph } from "./BoardList.styled";
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

const BoardList = ({ setSelectedBoardId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBoardId, setSelectedBoardIdState] = useState(null);
  const { boards, fetchBoards, deleteBoard, error } = useBoards();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    fetchBoards();
  }, []); // Empty dependency array ensures this runs only once

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
    console.log("Board Clicked, ID:", boardId); // Log the clicked board ID
    setSelectedBoardId(boardId, titleBoard);
  };

  const handleDeleteBoard = async (boardId) => {
    try {
      await deleteBoard(boardId);
      fetchBoards(); // Refresh the board list after deletion
    } catch (error) {
      console.error("Error deleting board:", error.response?.data || error.message);
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
          </BoardListItem>
        ))}
      </BoardListWrapper>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          width="350px"
          height="500px"
          border="1px solid rgba(190, 219, 176, 0.5)"
          borderRadius="8px"
          modalBackgroundColor={theme.modalBackgroundColor}
        >
          {selectedBoardId && (
            <EditBoardModal closeModal={closeModal} boardId={selectedBoardId} />
          )}
        </Modal>
      )}
    </>
  );
};

BoardList.propTypes = {
  setSelectedBoardId: PropTypes.func.isRequired,
};

export default BoardList;
