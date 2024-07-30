import axios from 'axios';

const BASE_URL = 'http://localhost:4500/api';

class CardService {
  constructor(token) {
    this.token = token;
  }

  getCardsForColumn = async (boardId, columnId) => {
    const response = await axios.get(`${BASE_URL}/boards/${boardId}/columns/${columnId}/cards`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    return response.data;
  };

  addCard = async (boardId, columnId, cardData) => {
    const response = await axios.post(`${BASE_URL}/boards/${boardId}/columns/${columnId}/cards`, cardData, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    return response.data;
  };

  updateCard = async (boardId, columnId, cardId, cardData) => {
    const response = await axios.put(`${BASE_URL}/boards/${boardId}/columns/${columnId}/cards/${cardId}`, cardData, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    return response.data;
  };

  deleteCard = async (boardId, columnId, cardId) => {
    const response = await axios.delete(`${BASE_URL}/boards/${boardId}/columns/${columnId}/cards/${cardId}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    return response.data;
  };

  moveCard = async (boardId, sourceColumnId, cardId, destinationColumnId) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/boards/${boardId}/columns/${sourceColumnId}/cards/${cardId}/move`,
        { newColumnId: destinationColumnId },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error moving card:", error);
      throw error; // Ensure errors are propagated
    }
  };
};

export default CardService;