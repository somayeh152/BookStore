import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-redux-main-28d7a.firebaseio.com/'
})

export default instance; 