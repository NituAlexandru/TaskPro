import React, { useState, useEffect, useMemo, useCallback, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { FilterButton, ColumnsContainer, AddTitleFilterContainer, BoardContainer, BoardHeader } from "./Board.styled";

import Column from "../Column/Column";
import AddColumnButton from "../AddColumnBtn/AddColumnBtn";
import FilterModal from "../../Portal/FilterModal";
import { FiFilter } from "react-icons/fi";
import ColumnService from "../../../service/columnService";
import { AuthContext } from "../../../contexts/AuthContext";
import Collaborators from "../Colaborators";
import CardService from "../../../service/cardService";

const Board = ({ boardId, titleBoard }) => {
  const [columns, setColumns] = useState([]);
  const { token } = useContext(AuthContext);
  const columnService = useMemo(() => new ColumnService(token), [token]);
  const cardService = useMemo(() => new CardService(token), [token]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filter, setFilter] = useState(null);
  const filterButtonRef = useRef(null);

  const fetchColumns = useCallback(async () => {
    try {
      console.log("Fetching columns for board:", boardId); // Debugging log
      const data = await columnService.getColumnsForBoard(boardId);
      setColumns(data);
    } catch (error) {
      console.error("Error fetching columns:", error);
    }
  }, [boardId, columnService]);

  useEffect(() => {
    if (boardId) {
      console.log("useEffect triggered with boardId:", boardId); // Debugging log
      fetchColumns();
    }
  }, [boardId, fetchColumns]);

  const handleColumnAdded = (newColumn) => {
    console.log("Column added:", newColumn); // Debugging log
    setColumns((prevColumns) => [...prevColumns, newColumn]);
  };

  const handleFilterChange = (newFilter) => {
    console.log("Filter changed to:", newFilter); // Debugging log
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
      fetchColumns();
    } catch (error) {
      console.error("Error moving card:", error);
    }
  };

  return (
  
      <BoardContainer>
        <BoardHeader>
          <AddTitleFilterContainer>
            <h2>{titleBoard}</h2>
            <Collaborators />
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
              fetchColumns={fetchColumns}
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
