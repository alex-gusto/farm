import socket from './ws'
import axios from 'axios'


const instance = axios.create({
    baseURL: process.env.API_URL || 'http://localhost:8080/api',
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


