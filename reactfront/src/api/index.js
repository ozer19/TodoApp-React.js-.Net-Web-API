// src/api/index.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5260/api/', // .NET Web API adresi
});

export default api;
