import { createContext, useState, useContext, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import CardService from "../service/cardService";
import { AuthContext } from "./AuthContext";

const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");
  const { token } = useContext(AuthContext);

  const cardService = useMemo(() => new CardService(token), [token]);

  const fetchCardsForColumn = useCallback(
    async (boardId, columnId) => {
      try {
        const data = await cardService.getCardsForColumn(boardId, columnId);
        setCards((prevCards) => {
          const filteredCards = prevCards.filter((card) => card.columnId !== columnId);
          return [...filteredCards, ...data];
        });
      } catch (error) {
        console.error("Error fetching cards:", error.response?.data || error.message);
        setError("Failed to fetch cards. Please try again later.");
      }
    },
    [cardService]
  );

  const fetchCardData = useCallback(
    async (boardId, columnId, cardId) => {
      try {
        const data = await cardService.getCardData(boardId, columnId, cardId);
        return data;
      } catch (error) {
        console.error("Error fetching card data:", error.response?.data || error.message);
        return null;
      }
    },
    [cardService]
  );

  const addCard = async (boardId, columnId, cardData) => {
    try {
      const newCard = await cardService.addCard(boardId, columnId, cardData);
      setCards((prevCards) => [...prevCards, newCard]);
      return newCard;
    } catch (error) {
      console.error("Error adding card:", error.response?.data || error.message);
      setError("Failed to add card. Please try again later.");
      throw error;
    }
  };

  const updateCard = async (boardId, columnId, cardId, cardData) => {
    try {
      const updatedCard = await cardService.updateCard(boardId, columnId, cardId, cardData);
      setCards((prevCards) => prevCards.map((card) => (card._id === cardId ? updatedCard : card)));
      return updatedCard;
    } catch (error) {
      console.error("Error updating card:", error.response?.data || error.message);
      setError("Failed to update card. Please try again later.");
      throw error;
    }
  };

  const deleteCard = async (boardId, columnId, cardId) => {
    try {
      await cardService.deleteCard(boardId, columnId, cardId);
      setCards((prevCards) => prevCards.filter((card) => card._id !== cardId));
    } catch (error) {
      console.error("Error deleting card:", error.response?.data || error.message);
      setError("Failed to delete card. Please try again later.");
      throw error;
    }
  };

  const moveCardToColumn = async (boardId, columnId, cardId, newColumnId) => {
    try {
      const movedCard = await cardService.moveCard(boardId, columnId, cardId, newColumnId);
      setCards((prevCards) => prevCards.map((card) => (card._id === cardId ? movedCard : card)));
      return movedCard;
    } catch (error) {
      console.error("Error moving card:", error.response?.data || error.message);
      setError("Failed to move card. Please try again later.");
      throw error;
    }
  };

  return (
    <CardContext.Provider
      value={{
        cards,
        error,
        fetchCardsForColumn,
        fetchCardData,
        addCard,
        updateCard,
        deleteCard,
        moveCardToColumn,
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
