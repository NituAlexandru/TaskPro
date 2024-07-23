import styled from "styled-components";
import Card from "./TaskCard";
import AddColumnButton from "./AddColumnBtn";

const BoardContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    height: 30px;
    width: 30px;
  }
`;

const BoardParagraph = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.28571;
  letter-spacing: -0.02em;
  text-align: center;
  color: ${({ theme }) => theme.text};
  width: 486px;

  @media (max-width: 600px) {
    width: 100%;
    padding: 1rem;
  }
`;
const Board = () => {
  return (
    <BoardContainer>
      <AddColumnButton></AddColumnButton>
      <Card></Card>
      <BoardParagraph>
        Before starting your project, it is essential to create a board to
        visualize and track all the necessary tasks and milestones. This board
        serves as a powerful tool to organize the workflow and ensure effective
        collaboration among team members.
      </BoardParagraph>
    </BoardContainer>
  );
};

export default Board;
