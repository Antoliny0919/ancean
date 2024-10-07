import { client } from './client';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const uploadImage = ({ formData, headers }) =>
  client.post('api/uploadImage/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'X-CSRFToken': cookies.get('csrftoken'),
      ...headers,
    },
    withCredentials: false,
  });
