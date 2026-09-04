import axios from 'axios';

const rawBase = import.meta.env.VITE_API_URL || 'https://gernta-production.up.railway.app';

if (!/^https?:\/\//.test(rawBase)) {
  throw new Error(`VITE_API_URL is malformed (missing scheme): "${rawBase}"`);
}

export const api = axios.create({
  baseURL: rawBase,
  timeout: 15000
});