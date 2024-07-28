import {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Column from "./Column/Column";
import AddColumnButton from "./AddColumnBtn";
import { AuthContext } from "../../contexts/AuthContext";
import ColumnService from "../../service/columnService";
import FilterModal from "../Portal/FilterModal";
import { FiFilter } from "react-icons/fi";
import Collaborators from "./Colaborators";

const BoardContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  img {
    height: 30px;
    width: 30px;
  }
`;

const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
const AddTitleFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px;
  align-items: center;
`;

const ColumnsContainer = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  height: 100%;
  width: 100%;

  /* Scrollbar styling */
  &::-webkit-scrollbar {
    height: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #2d2d2d;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #555555;
    border-radius: 10px;
    border: 2px solid #2d2d2d;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #777777;
  }
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
  const columnService = useMemo(() => new ColumnService(token), [token]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filter, setFilter] = useState(null);
  const filterButtonRef = useRef(null);

  const fetchColumns = useCallback(async () => {
    try {
      const data = await columnService.getColumnsForBoard(boardId);
      setColumns(data);
    } catch (error) {
      console.error("Error fetching columns:", error);
    }
  }, [boardId, columnService]);

  useEffect(() => {
    if (boardId) {
      console.log("Board ID in Board component:", boardId); // Log the board ID received
      fetchColumns();
    }
  }, [fetchColumns, boardId]);

  const handleColumnAdded = (newColumn) => {
    setColumns((prevColumns) => [...prevColumns, newColumn]);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setIsFilterModalOpen(false);
  };

  return (
    <BoardContainer>
      <BoardHeader>
        <AddTitleFilterContainer>
          <h2>Project title</h2>
          <Collaborators />
        </AddTitleFilterContainer>

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
      </BoardHeader>

      <ColumnsContainer>
        {columns.map((column) => (
          <Column
            key={column._id}
            title={column.titleColumn}
            cards={column.cards}
            columnId={column._id}
            filter={filter}
            boardId={boardId} // Pass the boardId to Column component
            fetchColumns={fetchColumns} // Pass the fetchColumns function to Column component
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
