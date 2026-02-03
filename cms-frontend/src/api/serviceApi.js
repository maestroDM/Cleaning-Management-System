import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export const fetchServices = async () => {
    return axios.get(`${API_URL}/user/services`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    }
    );
};