import axios from 'axios';

const BASE_URL = 'http://localhost:4500/api/user';

export const getCollaboratorIdByName = async (name) => {
  const response = await axios.get(`${BASE_URL}?name=${name}`);
  return response.data._id;
};
