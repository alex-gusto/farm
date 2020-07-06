import socket from './ws'
import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

instance.interceptors.request.use(function (config) {
    // connect socket to request
    config.headers.common['Socket-user'] = socket.id

    return config;
}, function (error) {
    return Promise.reject(error);
});

export default instance


