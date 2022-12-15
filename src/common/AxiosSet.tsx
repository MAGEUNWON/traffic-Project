import axios from 'axios';

const axiosSet = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  headers: {
    'Content-Type': 'application/xml ',    
  },
  withCredentials: true,
});

export default axiosSet;