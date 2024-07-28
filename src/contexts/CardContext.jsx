import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import CardService from '../service/cardService';
import { AuthContext } from './AuthContext';

const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext);
  const cardService = new CardService(token);

  const fetchCardsForColumn = async (columnId) => {
    try {
      const data = await cardService.getCardsForColumn(columnId);
      setCards(data);
    } catch (error) {
      console.error('Error fetching cards:', error.response?.data || error.message);
      setError('Failed to fetch cards. Please try again later.');
    }
  };

  const addCard = async (columnId, cardData) => {
    try {
      const newCard = await cardService.addCard(columnId, cardData);
      setCards((prevCards) => [...prevCards, newCard]);
      return newCard;
    } catch (error) {
      console.error('Error adding card:', error.response?.data || error.message);
      setError('Failed to add card. Please try again later.');
      throw error;
    }
  };

  const updateCard = async (cardId, cardData) => {
    try {
      const updatedCard = await cardService.updateCard(cardId, cardData);
      setCards((prevCards) =>
        prevCards.map((card) => (card._id === cardId ? updatedCard : card))
      );
      return updatedCard;
    } catch (error) {
      console.error('Error updating card:', error.response?.data || error.message);
      setError('Failed to update card. Please try again later.');
      throw error;
    }
  };

  const deleteCard = async (cardId) => {
    try {
      await cardService.deleteCard(cardId);
      setCards((prevCards) => prevCards.filter((card) => card._id !== cardId));
    } catch (error) {
      console.error('Error deleting card:', error.response?.data || error.message);
      setError('Failed to delete card. Please try again later.');
      throw error;
    }
  };

  return (
    <CardContext.Provider
      value={{
        cards,
        error,
        fetchCardsForColumn,
        addCard,
        updateCard,
        deleteCard,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

CardProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCards = () => useContext(CardContext);
