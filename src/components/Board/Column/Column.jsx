import { useState } from "react";
import PropTypes from "prop-types";
import Card from "..//Card/TaskCard";
import AddCardButton from "../AddCardBtn";
import { useCards } from "../../../contexts/CardContext";
import { useColumns } from "../../../contexts/ColumnContext";
import { useEffect, useMemo } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { ColumnContainer, ColumnSmallContainer, ColumnTitle, ColumnTitleContainer, TitleButtonContainer, CardsList } from "./Column.styled";
import EditColumnModal from "../../Portal/editColumn/EditColumnModal";
import Modal from "../../Portal/Modal"; // Ensure the correct path to your Modal component

const Column = ({ title, columnId, filter, boardId, fetchColumns }) => {
  const { fetchCardsForColumn, cards, deleteCard } = useCards();
  const { deleteColumn, updateColumn } = useColumns();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [columnTitle, setColumnTitle] = useState(title);

  useEffect(() => {
    fetchCardsForColumn(columnId);
    console.log(`fetchCardsForColumn called with columnId: ${columnId}`); // Debugging log
  }, [fetchCardsForColumn, columnId]);

  useEffect(() => {
    console.log(`Column component: columnId: ${columnId}, boardId: ${boardId}`); // Debugging log
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
          {filteredCards.map((card) => (
            <Card
              key={card._id}
              cardId={card._id}
              titleCard={card.titleCard}
              description={card.description}
              priority={card.priority}
              deadline={card.deadline}
              priorityColor={card.priorityColor}
              onDelete={handleDeleteCard}
              fetchCardsForColumn={fetchCardsForColumn}
              columnId={columnId}
            />
          ))}
        </CardsList>
      </ColumnSmallContainer>

      <AddCardButton columnId={columnId} />
      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          width="400px" // Adjust width as needed
          height="auto"
          borderRadius="8px"
        >
          <EditColumnModal
            closeModal={() => setIsEditModalOpen(false)}
            updateColumn={handleUpdateColumn} // Pass the updateColumn function
            initialTitle={columnTitle}
            columnId={columnId} // Pass the columnId to the modal
          />
        </Modal>
      )}
    </ColumnContainer>
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
