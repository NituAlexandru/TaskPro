import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";
import Card from "../Card/TaskCard";
import AddCardButton from "../AddCardBtn";
import { useCards } from "../../../contexts/CardContext";
import { useColumns } from "../../../contexts/ColumnContext";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { ColumnContainer, ColumnSmallContainer, ColumnTitle, ColumnTitleContainer, TitleButtonContainer, CardsList } from "./Column.styled";
import EditColumnModal from "../../Portal/editColumn/EditColumnModal";
import Modal from "../../Portal/Modal";

const Column = ({ title, columnId, filter, boardId, fetchColumns, index }) => {
  const { fetchCardsForColumn, cards, deleteCard, updateCard } = useCards();
  const { deleteColumn, updateColumn } = useColumns();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [columnTitle, setColumnTitle] = useState(title);

  useEffect(() => {
    fetchCardsForColumn(columnId);
    console.log(`fetchCardsForColumn called with columnId: ${columnId}`);
  }, [fetchCardsForColumn, columnId]);

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
    await deleteCard(cardId);
    fetchCardsForColumn(columnId);
  };

  const handleDeleteColumn = async () => {
    await deleteColumn(boardId, columnId);
    fetchColumns();
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
                <Card
                  key={card._id}
                  cardId={card._id}
                  titleCard={card.titleCard}
                  description={card.description}
                  priority={card.priority}
                  deadline={card.deadline}
                  priorityColor={card.priorityColor}
                  onDelete={() => handleDeleteCard(card._id)}
                  fetchCardsForColumn={fetchCardsForColumn}
                  columnId={columnId}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </CardsList>
          </ColumnSmallContainer>

          <AddCardButton columnId={columnId} />
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
  index: PropTypes.number.isRequired,
};

export default Column;



