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

export const fetchAdminServices = async () => {
    return axios.get(`${API_URL}/admin/services`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};

export const fetchServiceCategories = () => {
    return axios.get(`${API_URL}/admin/service-categories`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};

export const createService = (data) => {
    return axios.post(`${API_URL}/admin/services`, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};

export const updateService = (id, data) => {
    return axios.put(`${API_URL}/admin/services/${id}`, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};

export const deleteService = (id) => {
    return axios.delete(`${API_URL}/admin/services/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};