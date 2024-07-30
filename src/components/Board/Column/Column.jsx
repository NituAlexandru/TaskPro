import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Droppable, Draggable } from "react-beautiful-dnd";
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

const Column = ({ title, columnId, filter, boardId, fetchColumns }) => {
  const { fetchCardsForColumn, cards, deleteCard } = useCards();
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

  const filteredCards = useMemo(() => {
    return filter
      ? cards.filter(
          (card) => card.columnId === columnId && card.priorityColor === filter
        )
      : cards.filter((card) => card.columnId === columnId);
  }, [cards, columnId, filter]);

  const handleDeleteCard = async (cardId) => {
    try {
      await deleteCard(boardId, columnId, cardId);
      fetchCardsForColumn(boardId, columnId);
    } catch (error) {
      console.error("Error deleting card:", error);
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
    const updatedColumn = await updateColumn(boardId, columnId, updatedData);
    setColumnTitle(updatedColumn.titleColumn);
    setIsEditModalOpen(false);
    fetchColumns();
  };

  return (
    <Droppable droppableId={columnId} type="task" direction="vertical">
      {(provided) => (
        <ColumnContainer {...provided.droppableProps} ref={provided.innerRef}>
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
                <Draggable key={card._id} draggableId={card._id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Card
                        cardId={card._id}
                        titleCard={card.titleCard}
                        description={card.description}
                        priority={card.priority}
                        deadline={card.deadline}
                        priorityColor={card.priorityColor}
                        onDelete={handleDeleteCard}
                        boardId={boardId}
                        columnId={columnId}
                        index={index} // Ensure index is passed here
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
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
      )}
    </Droppable>
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
