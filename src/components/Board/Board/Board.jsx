import React, { useState, useEffect, useMemo, useCallback, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { FilterButton, ColumnsContainer, AddTitleFilterContainer, BoardContainer, BoardHeader } from "./Board.styled";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "../Column/Column";
import AddColumnButton from "../AddColumnBtn";
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
      const data = await columnService.getColumnsForBoard(boardId);
      setColumns(data);
    } catch (error) {
      console.error("Error fetching columns:", error);
    }
  }, [boardId, columnService]);

  useEffect(() => {
    if (boardId) {
      console.log("Board ID in Board component:", boardId); // Debugging step
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

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    const sourceColumn = columns.find((column) => column._id === source.droppableId);
    const destColumn = columns.find((column) => column._id === destination.droppableId);

    if (source.droppableId === destination.droppableId) {
      const reorderedCards = Array.from(sourceColumn.cards);
      const [movedCard] = reorderedCards.splice(source.index, 1);
      reorderedCards.splice(destination.index, 0, movedCard);

      setColumns((prevColumns) =>
        prevColumns.map((column) =>
          column._id === sourceColumn._id ? { ...column, cards: reorderedCards } : column
        )
      );
    } else {
      const sourceCards = Array.from(sourceColumn.cards);
      const [movedCard] = sourceCards.splice(source.index, 1);
      const destCards = Array.from(destColumn.cards);
      destCards.splice(destination.index, 0, movedCard);

      try {
        await cardService.moveCard(draggableId, destination.droppableId);
        setColumns((prevColumns) =>
          prevColumns.map((column) => {
            if (column._id === sourceColumn._id) {
              return { ...column, cards: sourceCards };
            } else if (column._id === destColumn._id) {
              return { ...column, cards: destCards };
            } else {
              return column;
            }
          })
        );
      } catch (error) {
        console.error("Error updating card column:", error);
      }
    }
  };

  return (
    <BoardContainer>
      <BoardHeader>
        <AddTitleFilterContainer>
          <h2>{titleBoard}</h2> {/* Display titleBoard here */}
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

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-columns" direction="horizontal" type="column">
          {(provided) => (
            <ColumnsContainer {...provided.droppableProps} ref={provided.innerRef}>
              {columns.map((column, index) => (
                <Column
                  key={column._id}
                  title={column.titleColumn}
                  cards={column.cards}
                  columnId={column._id}
                  filter={filter}
                  boardId={boardId}
                  fetchColumns={fetchColumns}
                  index={index}
                />
              ))}
              {provided.placeholder}
              <AddColumnButton boardId={boardId} onColumnAdded={handleColumnAdded} /> {/* Pass boardId */}
            </ColumnsContainer>
          )}
        </Droppable>
      </DragDropContext>
    </BoardContainer>
  );
};

Board.propTypes = {
  boardId: PropTypes.string.isRequired,
  titleBoard: PropTypes.string.isRequired, // Add titleBoard to PropTypes
};

export default Board;
