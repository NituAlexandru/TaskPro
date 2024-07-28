import { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Column from "./Column";
import AddColumnButton from "./AddColumnBtn";
import { AuthContext } from "../../contexts/AuthContext";
import ColumnService from "../../service/columnService";
import FilterModal from "../Portal/FilterModal";
import { FiFilter } from "react-icons/fi";

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

const AddTitleFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
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

const Board = ({ boardId }) => {
  const [columns, setColumns] = useState([]);
  const { token } = useContext(AuthContext);
  const columnService = new ColumnService(token);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const filterButtonRef = useRef(null);

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const data = await columnService.getColumnsForBoard(boardId);
        setColumns(data);
      } catch (error) {
        console.error("Error fetching columns:", error);
      }
    };

    if (boardId) {
      console.log("Board ID in Board component:", boardId); // Log the board ID received
      fetchColumns();
    }
  }, [token, boardId, columnService]);

  const handleColumnAdded = (newColumn) => {
    setColumns((prevColumns) => [...prevColumns, newColumn]);
  };

  const handleFilterChange = (filter) => {
    setIsFilterModalOpen(false);
  };

  return (
    <BoardContainer>
      <AddTitleFilterContainer>
        <h2>Project title</h2>
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
      </AddTitleFilterContainer>

      <ColumnsContainer>
        {columns.map((column) => (
          <Column
            key={column._id}
            title={column.titleColumn}
            cards={column.cards}
            columnId={column._id}
          />
        ))}
        <AddColumnButton boardId={boardId} onColumnAdded={handleColumnAdded} />
      </ColumnsContainer>
    </BoardContainer>
  );
};

Board.propTypes = {
  boardId: PropTypes.string.isRequired,
};

export default Board;
