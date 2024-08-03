import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import ColumnService from "../service/columnService";
import { AuthContext } from "./AuthContext";

export const ColumnContext = createContext();

export const ColumnProvider = ({ children }) => {
  const [columns, setColumns] = useState([]);
  const [error, setError] = useState("");
  const { token } = useContext(AuthContext);
  const columnService = new ColumnService(token);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  const fetchColumnsForBoard = async (boardId) => {
    try {
      const data = await columnService.getColumnsForBoard(boardId);
      setColumns(data);
    } catch (err) {
      handleError(err, "Failed to fetch columns.");
    }
  };

  const addColumn = async (boardId, columnData) => {
    try {
      const newColumn = await columnService.addColumn(boardId, columnData);
      setColumns((prevColumns) => [...prevColumns, newColumn]);
      return newColumn;
    } catch (err) {
      handleError(err, "Failed to add column.");
      throw err;
    }
  };

  const updateColumn = async (boardId, columnId, columnData) => {
    try {
      const updatedColumn = await columnService.updateColumn(
        boardId,
        columnId,
        columnData
      );
      setColumns((prevColumns) =>
        prevColumns.map((column) =>
          column._id === columnId ? updatedColumn : column
        )
      );
      return updatedColumn;
    } catch (err) {
      handleError(err, "Failed to update column.");
      throw err;
    }
  };

  const deleteColumn = async (boardId, columnId) => {
    try {
      await columnService.deleteColumn(boardId, columnId);
      setColumns((prevColumns) =>
        prevColumns.filter((column) => column._id !== columnId)
      );
    } catch (err) {
      handleError(err, "Failed to delete column.");
      throw err;
    }
  };

  const handleError = (err, defaultMessage) => {
    const message = err.response?.data || err.message || defaultMessage;
    console.error(message);
    setError(message);
  };

  return (
    <ColumnContext.Provider
      value={{
        columns,
        error,
        fetchColumnsForBoard,
        addColumn,
        updateColumn,
        deleteColumn,
      }}
    >
      {children}
    </ColumnContext.Provider>
  );
};

ColumnProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useColumns = () => useContext(ColumnContext);
