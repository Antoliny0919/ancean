import { client } from './client';

export const signin = ({ email, password }) =>
  client.post('api/token/', { email, password });

export const reIssueAccessToken = ({ refresh }) =>
  client.post('api/token/refresh/', { refresh });

export const getUserData = ({ headers }) =>
  client.get(`api/users/`, {
    headers: headers,
  });
