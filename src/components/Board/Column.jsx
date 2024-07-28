import styled from "styled-components";
import Card from "./TaskCard";
import AddCardButton from "./AddCardBtn";
import { useCards } from '../../contexts/CardContext';
import { useEffect } from 'react';

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
  const { fetchCardsForColumn, cards } = useCards();

  useEffect(() => {
    fetchCardsForColumn(columnId);
  }, [fetchCardsForColumn, columnId]); // Add dependencies to prevent infinite loop

  return (
    <ColumnContainer>
      <ColumnTitle>{title}</ColumnTitle>
      <CardsList>
        {cards
          .filter(card => card.columnId === columnId)
          .map((card) => (
            <Card key={card._id} {...card} />
          ))}
      </CardsList>
      <AddCardButton columnId={columnId} />
    </ColumnContainer>
  );
};

export default Column;
