import axios from '../api/axios'; 

export const fetchItems = async () => {
  const res = await axios.get('/items');
  return res.data;
};

export const addItem = async (formData) => {
  const res = await axios.post('/items', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const updateItem = async (id, formData) => {
  const res = await axios.put(`/items/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const deleteItem = async (id) => {
  const res = await axios.delete(`/items/${id}`);
  return res.data;
};
