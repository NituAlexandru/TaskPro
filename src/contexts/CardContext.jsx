import {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import CardService from "../service/cardService";
import { AuthContext } from "./AuthContext";

const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");
  const { token } = useContext(AuthContext);

  // Using useMemo to create cardService instance
  const cardService = useMemo(() => new CardService(token), [token]);

  const fetchCardsForColumn = useCallback(
    async (columnId) => {
      console.log(`fetchCardsForColumn called with columnId: ${columnId}`);
      try {
        const data = await cardService.getCardsForColumn(columnId);
        console.log(`Fetched cards:`, data);
        setCards((prevCards) => {
          const filteredCards = prevCards.filter(
            (card) => card.columnId !== columnId
          );
          const newCards = [...filteredCards, ...data];
          if (JSON.stringify(prevCards) !== JSON.stringify(newCards)) {
            console.log(
              `Updating state with new cards for columnId: ${columnId}`
            );
            return newCards;
          }
          return prevCards;
        });
      } catch (error) {
        console.error(
          "Error fetching cards:",
          error.response?.data || error.message
        );
        setError("Failed to fetch cards. Please try again later.");
      }
    },
    [cardService]
  );

  const addCard = async (columnId, cardData) => {
    try {
      const newCard = await cardService.addCard(columnId, cardData);
      setCards((prevCards) => [...prevCards, newCard]);
      return newCard;
    } catch (error) {
      console.error(
        "Error adding card:",
        error.response?.data || error.message
      );
      setError("Failed to add card. Please try again later.");
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
