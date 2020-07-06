import socket from './ws'
import axios from 'axios'

console.log(JSON.stringify(process.env))
const instance = axios.create({
    baseURL: 'https://farm-game.herokuapp.com/api' || 'http://localhost:3000/api',
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


