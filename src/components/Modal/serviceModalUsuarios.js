import axios from "axios";

const createUser = async (userData) => {
  try {
    const response = await axios.post("http://localhost:3001/api/users/", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { createUser };
