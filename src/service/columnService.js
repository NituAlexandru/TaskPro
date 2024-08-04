import axios from "axios";
import API_BASE_URL from "../utils/apiConfig";

const BASE_URL = `${API_BASE_URL}/api/boards`;

class ColumnService {
  constructor(token) {
    this.token = token;
    this.headers = {
      Authorization: `Bearer ${this.token}`,
    };
  }

  addColumn = async (boardId, columnData) => {
    const response = await axios.post(
      `${BASE_URL}/${boardId}/columns`,
      columnData,
      {
        headers: this.headers,
      }
    );
    return response.data;
  };

  updateColumn = async (boardId, columnId, columnData) => {
    const response = await axios.put(
      `${BASE_URL}/${boardId}/columns/${columnId}`,
      columnData,
      {
        headers: this.headers,
      }
    );
    return response.data;
  };

  deleteColumn = async (boardId, columnId) => {
    const response = await axios.delete(
      `${BASE_URL}/${boardId}/columns/${columnId}`,
      {
        headers: this.headers,
      }
    );
    return response.data;
  };

  getColumnsForBoard = async (boardId) => {
    const response = await axios.get(`${BASE_URL}/${boardId}/columns`, {
      headers: this.headers,
    });
    return response.data;
  };
}

export default ColumnService;
