import { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { useDrop } from "react-dnd";
import { toast } from "react-toastify";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Card from "../Card/TaskCard";
import AddCardButton from "../AddCardBtn/AddCardBtn";
import EditColumnModal from "../../Portal/editColumn/EditColumnModal";
import Modal from "../../Portal/Modal";
import { useCards } from "../../../contexts/CardContext";
import { useColumns } from "../../../contexts/ColumnContext";
import {
  ColumnContainer,
  ColumnSmallContainer,
  ColumnTitle,
  ColumnTitleContainer,
  TitleButtonContainer,
  CardsList,
} from "./Column.styled";

// Define the type of item for drag-and-drop
const ItemTypes = {
  CARD: "card",
};

const Column = ({
  title,
  columnId,
  filter,
  boardId,
  fetchColumns,
  setColumns,
  collaborators,
  columns,
}) => {
  const { fetchCardsForColumn, cards, deleteCard, moveCardToColumn } =
    useCards();
  const { deleteColumn, updateColumn } = useColumns();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [columnTitle, setColumnTitle] = useState(title);
  const dropRef = useRef(null);

  // Fetch cards for the column on mount and every 15 seconds
  useEffect(() => {
    if (boardId && columnId) {
      fetchCardsForColumn(boardId, columnId);
    }

    const intervalId = setInterval(() => {
      fetchCardsForColumn(boardId, columnId);
    }, 120000); 

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [fetchCardsForColumn, boardId, columnId]);

  const filteredCards = filter
    ? cards.filter(
        (card) => card.columnId === columnId && card.priorityColor === filter
      )
    : cards.filter((card) => card.columnId === columnId);

  const handleDeleteCard = async (cardId) => {
    try {
      await deleteCard(boardId, columnId, cardId);
      toast.success("Card deleted successfully!");
      fetchCardsForColumn(boardId, columnId);
    } catch (error) {
      console.error("Error deleting card:", error);
      toast.error("Failed to delete card. Please try again.");
    }
  };

  const handleDeleteColumn = async () => {
    try {
      await deleteColumn(boardId, columnId);
      toast.success("Column deleted successfully!");
      fetchColumns();
    } catch (error) {
      console.error("Error deleting column:", error);
      toast.error("Failed to delete column. Please try again.");
    }
  };

  const handleUpdateColumn = async (updatedTitle) => {
    if (!updatedTitle.trim()) {
      toast.warn("Title cannot be empty.");
      return;
    }

    try {
      await updateColumn(boardId, columnId, { titleColumn: updatedTitle });
      setColumnTitle(updatedTitle);
      toast.success("Column title updated successfully!");
      setIsEditModalOpen(false); // Close the modal after successful update
      fetchColumns();
    } catch (error) {
      console.error("Error updating column:", error);
      toast.error("Failed to update column. Please try again.");
    }
  };

  const moveCardWithinColumn = useCallback(
    (columnCards, fromIndex, toIndex) => {
      const updatedCards = Array.from(columnCards);
      const [movedCard] = updatedCards.splice(fromIndex, 1);
      updatedCards.splice(toIndex, 0, movedCard);
      return updatedCards;
    },
    []
  );

  const moveCardToAnotherColumn = useCallback(
    async (item, newColumnId) => {
      try {
        await moveCardToColumn(
          boardId,
          item.columnId,
          item.cardId,
          newColumnId
        );
        fetchCardsForColumn(boardId, item.columnId);
        fetchCardsForColumn(boardId, newColumnId);
      } catch (error) {
        console.error("Error moving card:", error);
        toast.error("Failed to move card. Please try again.");
      }
    },
    [boardId, fetchCardsForColumn, moveCardToColumn]
  );

  // Handle drop event for drag-and-drop
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: async (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }

      const hoverBoundingRect = dropRef.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      let hoverIndex = item.index;

      if (hoverClientY < hoverMiddleY) {
        hoverIndex = item.index - 1;
      } else {
        hoverIndex = item.index + 1;
      }

      if (item.sourceColumnId === columnId) {
        const updatedCards = moveCardWithinColumn(
          filteredCards,
          item.index,
          hoverIndex
        );
        setColumns((prevColumns) =>
          prevColumns.map((column) =>
            column._id === columnId
              ? { ...column, cards: updatedCards }
              : column
          )
        );
      } else {
        await moveCardToAnotherColumn(item, columnId);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={dropRef}>
      <ColumnContainer ref={drop}>
        <ColumnSmallContainer>
          <ColumnTitleContainer>
            <ColumnTitle>{columnTitle}</ColumnTitle>
            <TitleButtonContainer>
              <FiEdit onClick={() => setIsEditModalOpen(true)} />
              <FiTrash2 onClick={handleDeleteColumn} />
            </TitleButtonContainer>
          </ColumnTitleContainer>
          <CardsList>
            {filteredCards.map((card, index) => (
              <Card
                key={card._id}
                cardId={card._id}
                titleCard={card.titleCard}
                description={card.description}
                priority={card.priority}
                deadline={card.deadline}
                priorityColor={card.priorityColor}
                onDelete={handleDeleteCard}
                boardId={boardId}
                columnId={columnId}
                index={index}
                collaborators={collaborators}
                columns={columns}
              />
            ))}
          </CardsList>
        </ColumnSmallContainer>
        <AddCardButton
          boardId={boardId}
          columnId={columnId}
          collaborators={collaborators}
        />
        {isEditModalOpen && (
          <Modal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
          >
            <EditColumnModal
              closeModal={() => setIsEditModalOpen(false)}
              updateColumn={handleUpdateColumn}
              initialTitle={columnTitle}
              columnId={columnId}
            />
          </Modal>
        )}
      </ColumnContainer>
    </div>
  );
};

Column.propTypes = {
  title: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired,
  filter: PropTypes.string,
  boardId: PropTypes.string.isRequired,
  fetchColumns: PropTypes.func.isRequired,
  setColumns: PropTypes.func.isRequired,
  collaborators: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatarURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      titleColumn: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Column;
