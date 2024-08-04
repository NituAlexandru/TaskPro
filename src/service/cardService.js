import axios from "axios";
import API_BASE_URL from "../utils/apiConfig";

const BASE_URL = `${API_BASE_URL}/api`;

class CardService {
  constructor(token) {
    this.token = token;
  }

  getCardsForColumn = async (boardId, columnId) => {
    const response = await axios.get(
      `${BASE_URL}/boards/${boardId}/columns/${columnId}/cards`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
    return response.data;
  };

  getCardData = async (boardId, columnId, cardId) => {
    const response = await axios.get(
      `${BASE_URL}/boards/${boardId}/columns/${columnId}/cards/${cardId}`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
    return response.data;
  };

  addCard = async (boardId, columnId, cardData) => {
    const response = await axios.post(
      `${BASE_URL}/boards/${boardId}/columns/${columnId}/cards`,
      cardData,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
    return response.data;
  };

  updateCard = async (boardId, columnId, cardId, cardData) => {
    const response = await axios.put(
      `${BASE_URL}/boards/${boardId}/columns/${columnId}/cards/${cardId}`,
      cardData,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
    return response.data;
  };

  deleteCard = async (boardId, columnId, cardId) => {
    const response = await axios.delete(
      `${BASE_URL}/boards/${boardId}/columns/${columnId}/cards/${cardId}`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
    return response.data;
  };

  moveCard = async (boardId, sourceColumnId, cardId, newColumnId) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/boards/${boardId}/columns/${sourceColumnId}/cards/${cardId}/move`,
        { newColumnId },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error moving card:", error);
      throw error;
    }
  };
}

export default CardService;
