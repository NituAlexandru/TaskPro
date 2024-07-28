import axios from 'axios';

const BASE_URL = 'http://localhost:4500/api/boards';

class ColumnService {
  constructor(token) {
    this.token = token;
  }

  addColumn = async (boardId, columnData) => {
    const response = await axios.post(`${BASE_URL}/${boardId}/columns`, columnData, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    return response.data;
  };

  updateColumn = async (boardId, columnId, columnData) => {
    const response = await axios.put(`${BASE_URL}/${boardId}/columns/${columnId}`, columnData, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    return response.data;
  };

  deleteColumn = async (boardId, columnId) => {
    const response = await axios.delete(`${BASE_URL}/${boardId}/columns/${columnId}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    return response.data;
  };

  getColumnsForBoard = async (boardId) => {
    const response = await axios.get(`${BASE_URL}/${boardId}/columns`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    return response.data;
  };
}

export default ColumnService;
