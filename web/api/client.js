import axios from 'axios';

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export const server = axios.create();

export const client = axios.create();

server.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER;
client.defaults.baseURL = process.env.NEXT_PUBLIC_CLIENT;
client.defaults.withCredentials = true;
