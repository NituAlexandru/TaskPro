import axios from 'axios';

const BASE_URL = 'http://localhost:4500/api/boards';

class BoardService {
  constructor(token) {
    this.token = token;
  }

  createBoard = async (boardData) => {
    const response = await axios.post(BASE_URL, boardData, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    return response.data;
  };

  getBoardsForUser = async () => {
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    return response.data;
  };

  getBoard = async (boardId) => {
    const response = await axios.get(`${BASE_URL}/${boardId}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    return response.data;
  };

  updateBoard = async (boardId, boardData) => {
    const response = await axios.put(`${BASE_URL}/${boardId}`, boardData, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    return response.data;
  };

  deleteBoard = async (boardId) => {
    const response = await axios.delete(`${BASE_URL}/${boardId}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    return response.data;
  };
}

export default BoardService;
