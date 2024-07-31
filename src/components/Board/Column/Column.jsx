import { useState, useEffect } from "react";
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

const Column = ({ title, columnId, filter, boardId, fetchColumns }) => {
  const { fetchCardsForColumn, cards, deleteCard, moveCard } = useCards();
  const { deleteColumn, updateColumn } = useColumns();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [columnTitle, setColumnTitle] = useState(title);

  useEffect(() => {
    if (boardId && columnId) {
      fetchCardsForColumn(boardId, columnId);
      console.log(
        `fetchCardsForColumn called with boardId: ${boardId}, columnId: ${columnId}`
      );
    }
  }, [fetchCardsForColumn, boardId, columnId]);

  useEffect(() => {
    console.log(`Column component: columnId: ${columnId}, boardId: ${boardId}`);
  }, [columnId, boardId]);

  const filteredCards = filter
    ? cards.filter(
        (card) => card.columnId === columnId && card.priorityColor === filter
      )
    : cards.filter((card) => card.columnId === columnId);

  const handleDeleteCard = async (cardId) => {
    try {
      console.log("Deleting card:", cardId);
      await deleteCard(boardId, columnId, cardId);
      fetchCardsForColumn(boardId, columnId);
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  const handleDeleteColumn = async () => {
    try {
      console.log("Deleting column:", columnId);
      await deleteColumn(boardId, columnId);
      toast.success("Column deleted successfully!");
      fetchColumns();
    } catch (error) {
      console.error("Error deleting column:", error);
      toast.error("Failed to delete column. Please try again.");
    }
  };

  const handleUpdateColumn = async (columnId, updatedData) => {
    const updatedColumn = await updateColumn(boardId, columnId, updatedData);
    setColumnTitle(updatedColumn.titleColumn);
    setIsEditModalOpen(false);
    fetchColumns();
  };

  const moveCardWithinColumn = (columnCards, fromIndex, toIndex) => {
    const updatedCards = Array.from(columnCards);
    const [movedCard] = updatedCards.splice(fromIndex, 1);
    updatedCards.splice(toIndex, 0, movedCard);
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
    }
  };

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: async (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      const hoverBoundingRect = monitor.getClientOffset();
      const hoverMiddleY =
        (hoverBoundingRect.top + hoverBoundingRect.bottom) / 2;
      const clientY = clientOffset.y;
      const hoverIndex =
        clientY > hoverMiddleY ? item.index + 1 : item.index - 1;

      console.log(
        `Dropped item: ${item.cardId} into column: ${columnId} at index: ${hoverIndex}`
      );

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
        moveCardToAnotherColumn(item, columnId, hoverIndex);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  console.log("Drop state for column:", columnId, isOver);

  return (
    <div ref={drop}>
      <ColumnContainer>
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
