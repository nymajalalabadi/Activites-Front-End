import axios from "axios";

const BASE_URL = 'https://localhost:7170/api';

const app = axios.create({
    baseURL: BASE_URL,
    withCredentials:true, //http-only => cookie
});

const http = {
    get: app.get,
    post: app.post,
    put: app.put,
    patch : app.patch,
    delete: app.delete,
};

export default http;