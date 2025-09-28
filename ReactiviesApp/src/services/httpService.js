import axios from "axios";

const BASE_URL = 'https://localhost:7170/api';

const app = axios.create({
    baseURL: BASE_URL,
    withCredentials:true, //http-only => cookie
});

const responseBody = (response) => response.data;

const requests = {
    get: (url) => app.get(url).then(responseBody),
    post: (url, body) => app.post(url, body).then(responseBody),
    put: (url, body) => app.put(url, body).then(responseBody),
    patch: (url, body) => app.patch(url, body).then(responseBody),
    delete: (url) => app.delete(url).then(responseBody),
};

const http = {
    get: requests.get,
    post: requests.post,
    put: requests.put,
    patch : requests.patch,
    delete: requests.delete,
};

export default http;