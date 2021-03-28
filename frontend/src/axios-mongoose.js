import axios from 'axios';

// added a proxy to the package json to support cookies
const instance = axios.create({
    baseURL: '/'
});

export default instance;