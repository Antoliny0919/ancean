import { client } from './client';

export const getPost = ({ query, headers = {} }) =>
  client.get(`api/posts/?${query}`, { headers: headers });

export const getRetrievePost = ({ id, headers = {} }) =>
  client.get(`api/posts/${id}/`, { headers: headers });

export const createPost = ({ body, headers }) =>
  client.post(
    'api/posts/',
    {
      ...body,
    },
    {
      headers: headers,
    },
  );

export const patchPost = ({ id, body, headers }) =>
  client.patch(
    `api/posts/${id}/`,
    {
      ...body,
    },
    {
      headers: headers,
    },
  );

export const deletePost = ({ id, headers }) =>
  client.delete(`api/posts/${id}/`, {
    headers: headers,
  });
