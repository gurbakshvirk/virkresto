import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export const getAvailableTables = async (date, time, guests) => {
  const res = await axios.get(`${API}/api/reservations/available`, {
    params: { date, time, guests }
  });
  return res.data;
};

export const createReservation = async (data) => {
  const res = await axios.post(`${API}/api/reservations`, data);
  return res.data;
};
