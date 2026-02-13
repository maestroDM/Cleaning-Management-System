import axiosInstance from "./axios.js";

/* =============================
   CREATE QUOTE
============================= */
export const createQuote = async (data) => {
    try {
        const response = await axiosInstance.post("/user/quotes", data);

        return response.data;

    } catch (error) {
        throw error;
    }
};

/* =============================
   GET USER QUOTES
============================= */
export const getMyQuotes = async () => {
    try {
        const response = await axiosInstance.get("/quotes/my");
        return response.data;

    } catch (error) {
        throw error;
    }
};

/* =============================
   GET SINGLE QUOTE
============================= */
export const getQuoteById = async (id) => {
    try {
        const response = await axiosInstance.get(`/quotes/${id}`);
        return response.data;

    } catch (error) {
        throw error;
    }
};


