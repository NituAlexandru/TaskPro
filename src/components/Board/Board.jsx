import { useState, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import Column from "./Column";
import AddColumnButton from "./AddColumnBtn";
import { AuthContext } from "../../contexts/AuthContext";
import { useBoards } from "../../contexts/BoardContext";
import { useColumns } from "../../contexts/ColumnContext";
import FilterModal from "../Portal/FilterModal";
import { FiFilter } from "react-icons/fi";

const BoardContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
`;

const ColumnsContainer = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
`;

const FilterButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.body};
  }
  &:active {
    background-color: ${({ theme }) => theme.body};
  }

  &:focus {
    background-color: ${({ theme }) => theme.body};
    outline: none;
  }
`;

const Board = () => {
  const [columns, setColumns] = useState([]);
  const { token } = useContext(AuthContext);
  const { boardId, getBoard } = useBoards();
  const { fetchColumnsForBoard, addColumn } = useColumns();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const filterButtonRef = useRef(null);

  useEffect(() => {
    const fetchBoardDetails = async () => {
      try {
        const board = await getBoard(boardId);
        setColumns(board.columns);
      } catch (error) {
        console.error("Error fetching board details:", error);
      }
    };

    if (boardId) {
      fetchBoardDetails();
    }
  }, [token, boardId, getBoard]);

  const handleColumnAdded = async (title) => {
    try {
      const newColumn = await addColumn(boardId, { titleColumn: title });
      setColumns((prevColumns) => [...prevColumns, newColumn]);
    } catch (error) {
      console.error("Error adding column:", error);
    }
  };

  const handleFilterChange = (filter) => {
    setIsFilterModalOpen(false);
  };

  return (
    <BoardContainer>
      <AddColumnButton onColumnAdded={handleColumnAdded} />
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
      <FilterButton
        ref={filterButtonRef}
        onClick={() => setIsFilterModalOpen(true)}
      >
        <FiFilter />
        Filters
      </FilterButton>
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onFilterChange={handleFilterChange}
        buttonRef={filterButtonRef}
      />
    </BoardContainer>
  );
};

export default Board;
