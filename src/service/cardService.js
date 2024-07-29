import axios from 'axios';

const BASE_URL = 'http://localhost:4500/api';

class CardService {
  constructor(token) {
    this.token = token;
  }

  getCardsForColumn = async (columnId) => {
    const response = await axios.get(`${BASE_URL}/columns/${columnId}/cards`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    return response.data;
  };

  addCard = async (columnId, cardData) => {
    const response = await axios.post(`${BASE_URL}/columns/${columnId}/cards`, cardData, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    return response.data;
  };

  updateCard = async (cardId, cardData) => {
    const response = await axios.put(`${BASE_URL}/cards/${cardId}`, cardData, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    return response.data;
  };

  deleteCard = async (cardId) => {
    const response = await axios.delete(`${BASE_URL}/cards/${cardId}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    return response.data;
  };

  moveCard = async (cardId, newColumnId) => {
    const response = await axios.patch(`${BASE_URL}/cards/${cardId}/move`, { newColumnId }, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    return response.data;
  };
};

export default CardService;
