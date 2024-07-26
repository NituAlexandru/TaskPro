import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import Column from "./Column";
import AddColumnButton from "./AddColumnBtn";
import { AuthContext } from "../../contexts/AuthContext";
import ColumnService from "../../service/columnService";
import AddCardButton from "./AddCard";

const BoardContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;

  img {
    height: 30px;
    width: 30px;
  }
`;

const ColumnsContainer = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
`;

// const BoardParagraph = styled.p`
//   font-family: "Poppins", sans-serif;
//   font-weight: 400;
//   font-size: 14px;
//   line-height: 1.28571;
//   letter-spacing: -0.02em;
//   text-align: center;
//   color: ${({ theme }) => theme.text};
//   width: 486px;

//   @media (max-width: 600px) {
//     width: 100%;
//     padding: 1rem;
//   }
// `;

const Board = ({ boardId }) => {
  const [columns, setColumns] = useState([]);
  const { token } = useContext(AuthContext);
  const columnService = new ColumnService(token);

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const data = await columnService.getColumnsForBoard(boardId);
        setColumns(data);
      } catch (error) {
        console.error("Error fetching columns:", error);
      }
    };

    fetchColumns();
  }, [token, boardId]);

  const handleColumnAdded = (newColumn) => {
    setColumns((prevColumns) => [...prevColumns, newColumn]);
  };

  return (
    <BoardContainer>
      <AddColumnButton boardId={boardId} onColumnAdded={handleColumnAdded} />
      <ColumnsContainer>
        {columns.map((column) => (
          <Column
            key={column._id}
            title={column.titleColumn}
            cards={column.cards}
            columnId={column._id}
          />
        ))}
      </ColumnsContainer>
      <AddCardButton/>
      {/* <BoardParagraph>
        Before starting your project, it is essential to create a board to
        visualize and track all the necessary tasks and milestones. This board
        serves as a powerful tool to organize the workflow and ensure effective
        collaboration among team members.
      </BoardParagraph> */}
    </BoardContainer>
  );
};

export default Board;



