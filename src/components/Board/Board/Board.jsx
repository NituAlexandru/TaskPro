import { useState, useEffect, useMemo, useCallback, useContext, useRef } from "react";
import PropTypes from "prop-types";
import {
  FilterButton,
  ColumnsContainer,
  AddTitleFilterContainer,
  BoardContainer,
  BoardHeader,
} from "./Board.styled";

import Column from "../Column/Column";
import AddColumnButton from "../AddColumnBtn/AddColumnBtn";
import FilterModal from "../../Portal/FilterModal/FilterModal";
import { FiFilter } from "react-icons/fi";
import ColumnService from "../../../service/columnService";
import BoardService from "../../../service/boardService"; // Import BoardService
import { AuthContext } from "../../../contexts/AuthContext";
import Collaborators from "../Collaborators";
import CardService from "../../../service/cardService";

const Board = ({ boardId, titleBoard }) => {
  const [columns, setColumns] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const { token } = useContext(AuthContext);
  const columnService = useMemo(() => new ColumnService(token), [token]);
  const cardService = useMemo(() => new CardService(token), [token]);
  const boardService = useMemo(() => new BoardService(token), [token]); // Initialize BoardService
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filter, setFilter] = useState(null);
  const filterButtonRef = useRef(null);

  const fetchBoardData = useCallback(async () => {
    try {
      const boardData = await boardService.getBoard(boardId);
      console.log(boardData);
      setColumns(boardData.columns);
      setCollaborators(boardData.collaborators);
    } catch (error) {
      console.error("Failed to fetch board data:", error);
    }
  }, [boardId, boardService]);

  useEffect(() => {
    if (boardId) {
      fetchBoardData();
    }
  }, [boardId, fetchBoardData]);

  const handleColumnAdded = (newColumn) => {
    setColumns((prevColumns) => [...prevColumns, newColumn]);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setIsFilterModalOpen(false);
  };

  const onDrop = async (item, monitor) => {
    const { sourceColumnId, cardId } = item;
    const destinationColumnId = monitor.getDropResult()?.columnId;

    if (!destinationColumnId || sourceColumnId === destinationColumnId) {
      return;
    }

    try {
      await cardService.moveCard(boardId, sourceColumnId, cardId, destinationColumnId);
      fetchBoardData(); // Refetch the board data to update the state
    } catch (error) {
      console.error("Error moving card:", error);
    }
  };

  return (
    <BoardContainer>
      <BoardHeader>
        <AddTitleFilterContainer>
          <h2>{titleBoard}</h2>
          <Collaborators collaborators={collaborators} />
        </AddTitleFilterContainer>

        <FilterButton ref={filterButtonRef} onClick={() => setIsFilterModalOpen(true)}>
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
        {columns.map((column, index) => (
          <Column
            key={column._id}
            title={column.titleColumn}
            columnId={column._id}
            filter={filter}
            boardId={boardId}
            fetchColumns={fetchBoardData}
            setColumns={setColumns} // Pass setColumns down to Column
            collaborators={collaborators} // Pass collaborators down to Column
            index={index}
            onDrop={onDrop}
          />
        ))}
        <AddColumnButton boardId={boardId} onColumnAdded={handleColumnAdded} />
      </ColumnsContainer>
    </BoardContainer>
  );
};

Board.propTypes = {
  boardId: PropTypes.string.isRequired,
  titleBoard: PropTypes.string.isRequired,
};

export default Board;
