import axios from "axios";
import API_BASE_URL from "../utils/apiConfig";

const BASE_URL = `${API_BASE_URL}/api/boards`;

class BoardService {
  constructor(token) {
    this.token = token;
  }

  // Create a new board
  createBoard = async (boardData) => {
    const response = await axios.post(BASE_URL, boardData, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    return response.data;
  };

  // Get all boards for the current user
  getBoardsForUser = async () => {
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    return response.data;
  };

  // Get a specific board by ID
  getBoard = async (boardId) => {
    const response = await axios.get(`${BASE_URL}/${boardId}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    return response.data;
  };

  // Update a specific board by ID
  updateBoard = async (boardId, boardData) => {
    const response = await axios.put(`${BASE_URL}/${boardId}`, boardData, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    return response.data;
  };

  // Delete a specific board by ID
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
