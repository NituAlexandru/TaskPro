import styled from "styled-components";
import PropTypes from "prop-types";
import Card from "./TaskCard";
import AddCardButton from "./AddCardBtn";
import { useCards } from "../../contexts/CardContext";
import { useEffect, useMemo } from "react";

const ColumnContainer = styled.div`
  background-color: ${({ theme }) => theme.columnBackground};
  border-radius: 8px;
  padding: 20px;
  width: 300px;
  margin: 10px;
`;

const ColumnTitle = styled.h2`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 18px;
  color: ${({ theme }) => theme.text};
  margin: 0 0 10px;
`;

const CardsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Column = ({ title, columnId }) => {
  const { fetchCardsForColumn, cards, deleteCard } = useCards();

  useEffect(() => {
    fetchCardsForColumn(columnId);
  }, [fetchCardsForColumn, columnId]);

  const filteredCards = useMemo(() => {
    return cards.filter((card) => card.columnId === columnId);
  }, [cards, columnId]);

  const handleDeleteCard = async (cardId) => {
    await deleteCard(cardId);
    fetchCardsForColumn(columnId);
  };

  return (
    <ColumnContainer>
      <ColumnTitle>{title}</ColumnTitle>
      <CardsList>
        {filteredCards.map((card) => (
          <Card
            key={card._id}
            cardId={card._id}
            title={card.title}
            description={card.description}
            priority={card.priority}
            deadline={card.deadline}
            onDelete={handleDeleteCard}
          />
        ))}
      </CardsList>
      <AddCardButton columnId={columnId} />
    </ColumnContainer>
  );
};

Column.propTypes = {
  title: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired,
};

export default Column;
