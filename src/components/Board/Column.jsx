import styled from "styled-components";
import Card from "./TaskCard";
import AddCardButton from "./AddCardBtn";

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

const Column = ({ title, cards, columnId }) => {
  const handleCardAdded = (newCard) => {
    console.log("New Card Added to Column:", newCard); // Log the new card added
    // Update the state or props to reflect the new card addition
  };

  console.log("Rendering Column:", columnId); // Log the column ID being rendered

  return (
    <ColumnContainer>
      <ColumnTitle>{title}</ColumnTitle>
      <CardsList>
        {cards.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </CardsList>
      <AddCardButton columnId={columnId} onCardAdded={handleCardAdded} />
    </ColumnContainer>
  );
};

export default Column;
