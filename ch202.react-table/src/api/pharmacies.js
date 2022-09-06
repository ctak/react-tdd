import axios from 'axios';

export const getPharmacies = async () => {
  const response = await axios.get('/pharmacies');
  return response.data;
}

export const getPharmacyById = async id => {
  const response = await axios.get('/pharmacies/1');
  return response.data;
}
