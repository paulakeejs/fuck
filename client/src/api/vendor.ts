import axios from 'axios';

const vendorApi = axios.create({
  baseURL: '/api/vendor',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default vendorApi; 

