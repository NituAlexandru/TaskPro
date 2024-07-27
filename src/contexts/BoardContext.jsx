// BoardContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import BoardService from '../service/boardService';
import { AuthContext } from '../contexts/AuthContext';

const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [boards, setBoards] = useState([]);
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext);
  const boardService = new BoardService(token);

  const fetchBoards = async () => {
    try {
      const data = await boardService.getBoardsForUser();
      setBoards(data);
    } catch (error) {
      console.error('Error fetching boards:', error.response?.data || error.message);
      setError('Failed to fetch boards. Please try again later.');
    }
  };

  const createBoard = async (boardData) => {
    try {
      const newBoard = await boardService.createBoard(boardData);
      setBoards((prevBoards) => [...prevBoards, newBoard]);
    } catch (error) {
      console.error('Error creating board:', error.response?.data || error.message);
      setError('Failed to create board. Please try again later.');
    }
  };

  const getBoard = async (boardId) => {
    try {
      return await boardService.getBoard(boardId);
    } catch (error) {
      console.error('Error getting board:', error.response?.data || error.message);
      setError('Failed to get board. Please try again later.');
    }
  };

  const updateBoard = async (boardId, boardData) => {
    try {
      const updatedBoard = await boardService.updateBoard(boardId, boardData);
      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board.id === boardId ? updatedBoard : board
        )
      );
    } catch (error) {
      console.error('Error updating board:', error.response?.data || error.message);
      setError('Failed to update board. Please try again later.');
    }
  };

  const deleteBoard = async (boardId) => {
    try {
      await boardService.deleteBoard(boardId);
      setBoards((prevBoards) => prevBoards.filter((board) => board.id !== boardId));
      fetchBoards();
    } catch (error) {
      console.error('Error deleting board:', error.response?.data || error.message);
      setError('Failed to delete board. Please try again later.');
    }
  };

  useEffect(() => {
    if (token) {
      fetchBoards();
    }
  }, [token]);

  return (
    <BoardContext.Provider
      value={{
        boards,
        error,
        fetchBoards,
        createBoard,
        getBoard,
        updateBoard,
        deleteBoard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

BoardProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useBoards = () => useContext(BoardContext);
