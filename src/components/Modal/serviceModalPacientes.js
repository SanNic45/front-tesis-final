import axios from "axios";

const createPatient = async (patientData) => {
  try {
    const response = await axios.post("http://localhost:3001/api/pacient", patientData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { createPatient };