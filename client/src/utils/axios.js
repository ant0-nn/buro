import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://139.28.37.125:8000/api',
});

export default instance;
