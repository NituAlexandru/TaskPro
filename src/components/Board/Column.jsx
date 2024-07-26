import styled from "styled-components";
import Card from "./TaskCard";
import AddColumnButton from "./AddColumnBtn";

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
  return (
    <ColumnContainer>
      <ColumnTitle>{title}</ColumnTitle>
      <CardsList>
        {cards.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </CardsList>
      <AddColumnButton columnId={columnId} />
    </ColumnContainer>
  );
};

export default Column;

  