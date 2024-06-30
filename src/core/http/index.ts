import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'https://your-api.com',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default httpClient;
