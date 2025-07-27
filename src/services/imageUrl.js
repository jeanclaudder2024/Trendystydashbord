import axios from '../api/axios'; // Axios instance with baseURL configured

export const getImageUrl = (imageFileId) => {
  if (!imageFileId) return '/no-image.png';

  // Extract baseURL from your custom axios instance
  const baseURL = axios.defaults.baseURL || '';

  return `${baseURL}/items/image/file/${imageFileId}`;
};
