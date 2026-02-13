import axiosInstance from "./axios.js";

/* =============================
   USER SERVICES
============================= */
export const fetchServices = async () => {
    try {
        const response = await axiosInstance.get("/user/services");
        return response.data;
    } catch (error) {
        throw error;
    }
};

/* =============================
   ADMIN SERVICES
============================= */
export const fetchAdminServices = async () => {
    try {
        const response = await axiosInstance.get("/admin/services");
        return response.data;
    } catch (error) {
        throw error;
    }
};

/* =============================
   SERVICE CATEGORIES
============================= */
export const fetchServiceCategories = async () => {
    try {
        const response = await axiosInstance.get("/admin/service-categories");
        return response.data;
    } catch (error) {
        throw error;
    }
};

/* =============================
   CREATE SERVICE
============================= */
export const createService = async (data) => {
    try {
        const response = await axiosInstance.post("/admin/services", {
            name: data.name,
            category_id: data.category_id,
            price: data.price,
            description: data.description
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

/* =============================
   UPDATE SERVICE
============================= */
export const updateService = async (id, data) => {
    try {
        const response = await axiosInstance.put(`/admin/services/${id}`, {
            name: data.name,
            category_id: data.category_id,
            price: data.price,
            description: data.description
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

/* =============================
   DELETE SERVICE
============================= */
export const deleteService = async (id) => {
    try {
        const response = await axiosInstance.delete(`/admin/services/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
