import styled from "styled-components";
import PropTypes from "prop-types";
import Card from "./TaskCard";
import AddCardButton from "./AddCardBtn";
import { useCards } from "../../contexts/CardContext";
import { useEffect, useMemo } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const ColumnContainer = styled.div`
  background-color: ${({ theme }) => theme.columnBackground};
  border-radius: 8px;
  padding: 0;
  width: 334px;
  margin: 0;
`;

const ColumnTitleContainer = styled.div`
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.elementBackgroundColor};
  margin: 0;
  border-radius: 8px;
  width: 334px;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const ColumnTitle = styled.h2`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 18px;
`;
const TitleButtonContainer = styled.div`
  display: flex;
  gap: 10px;

  svg {
    cursor: pointer;
    stroke: rgba(255, 255, 255, 0.5);
  }
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
      <ColumnTitleContainer>
        <ColumnTitle>{title}</ColumnTitle>
        <TitleButtonContainer>
          <FiEdit />
          <FiTrash2 />
        </TitleButtonContainer>
      </ColumnTitleContainer>
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
