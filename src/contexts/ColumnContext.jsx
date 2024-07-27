import React, { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import ColumnService from '../service/columnService';
import { AuthContext } from './AuthContext';

export const ColumnContext = createContext();

export const ColumnProvider = ({ children }) => {
  const [columns, setColumns] = useState([]);
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext);
  const columnService = new ColumnService(token);

  const fetchColumnsForBoard = async (boardId) => {
    try {
      const data = await columnService.getColumnsForBoard(boardId);
      setColumns(data);
    } catch (error) {
      console.error('Error fetching columns:', error.response?.data || error.message);
      setError('Failed to fetch columns. Please try again later.');
    }
  };

  const addColumn = async (boardId, columnData) => {
    try {
      const newColumn = await columnService.addColumn(boardId, columnData);
      setColumns((prevColumns) => [...prevColumns, newColumn]);
      return newColumn;
    } catch (error) {
      console.error('Error adding column:', error.response?.data || error.message);
      setError('Failed to add column. Please try again later.');
      throw error;
    }
  };

  const updateColumn = async (boardId, columnId, columnData) => {
    try {
      const updatedColumn = await columnService.updateColumn(boardId, columnId, columnData);
      setColumns((prevColumns) =>
        prevColumns.map((column) =>
          column._id === columnId ? updatedColumn : column
        )
      );
      return updatedColumn;
    } catch (error) {
      console.error('Error updating column:', error.response?.data || error.message);
      setError('Failed to update column. Please try again later.');
      throw error;
    }
  };

  const deleteColumn = async (boardId, columnId) => {
    try {
      await columnService.deleteColumn(boardId, columnId);
      setColumns((prevColumns) => prevColumns.filter((column) => column._id !== columnId));
    } catch (error) {
      console.error('Error deleting column:', error.response?.data || error.message);
      setError('Failed to delete column. Please try again later.');
      throw error;
    }
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
