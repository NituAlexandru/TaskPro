import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useDrop } from "react-dnd";
import { toast } from "react-toastify";
import Card from "../Card/TaskCard";
import AddCardButton from "../AddCardBtn/AddCardBtn";
import { useCards } from "../../../contexts/CardContext";
import { useColumns } from "../../../contexts/ColumnContext";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  ColumnContainer,
  ColumnSmallContainer,
  ColumnTitle,
  ColumnTitleContainer,
  TitleButtonContainer,
  CardsList,
} from "./Column.styled";
import EditColumnModal from "../../Portal/editColumn/EditColumnModal";
import Modal from "../../Portal/Modal";

const ItemTypes = {
  CARD: "card",
};

const Column = ({ title, columnId, filter, boardId, fetchColumns, setColumns }) => {
  const { fetchCardsForColumn, cards, deleteCard, moveCard } = useCards();
  const { deleteColumn, updateColumn } = useColumns();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [columnTitle, setColumnTitle] = useState(title);

  // Create a ref for the drop target
  const dropRef = useRef(null);

  useEffect(() => {
    if (boardId && columnId) {
      fetchCardsForColumn(boardId, columnId);
    }
  }, [fetchCardsForColumn, boardId, columnId]);

  useEffect(() => {
  }, [columnId, boardId]);

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

  const handleUpdateColumn = async (columnId, updatedData) => {
    try {
      const updatedColumn = await updateColumn(boardId, columnId, updatedData);
      setColumnTitle(updatedColumn.titleColumn);
      setIsEditModalOpen(false);
      toast.success("Column updated successfully!");
      fetchColumns();
    } catch (error) {
      console.error("Error updating column:", error);
      toast.error("Failed to update column. Please try again.");
    }
  };

  const moveCardWithinColumn = (columnCards, fromIndex, toIndex) => {
    console.log(columnCards);
    const updatedCards = Array.from(columnCards);
    const [movedCard] = updatedCards.splice(fromIndex, 1);
    updatedCards.splice(toIndex, 0, movedCard);
    console.log(updatedCards);
    return updatedCards;
  };

  const moveCardToAnotherColumn = async (item, destinationColumnId) => {
    try {
      await moveCard(
        boardId,
        item.sourceColumnId,
        item.cardId,
        destinationColumnId
      );
      fetchCardsForColumn(boardId, item.sourceColumnId);
      fetchCardsForColumn(boardId, destinationColumnId);
    } catch (error) {
      console.error("Error moving card:", error);
      toast.error("Failed to move card. Please try again.");
    }
  };

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: async (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }

      const hoverBoundingRect = dropRef.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      let hoverIndex = item.index;

      if (hoverClientY < hoverMiddleY) {
        hoverIndex = item.index - 1;
      } else {
        hoverIndex = item.index + 1;
      }

      if (item.sourceColumnId === columnId) {
        const updatedCards = moveCardWithinColumn(filteredCards, item.index, hoverIndex);
        setColumns((prevColumns) =>
          prevColumns.map((column) =>
            column._id === columnId ? { ...column, cards: updatedCards } : column
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
                collaborators={card.collaborators || []}
              />
            ))}
          </CardsList>
        </ColumnSmallContainer>
        <AddCardButton boardId={boardId} columnId={columnId} />
        {isEditModalOpen && (
          <Modal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            width="400px"
            height="auto"
            borderRadius="8px"
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
};

export default Column;

