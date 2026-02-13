import axiosInstance from "./axios.js";

/* =============================
   CREATE BOOKING FROM QUOTE
============================= */
export const createBooking = async (quoteId, data) => {
    try {

        const response = await axiosInstance.post(
            `/quotes/${quoteId}/book`,
            {
                date: data.date,
                time: data.time,
                address: data.address,
                notes: data.notes || null
            }
        );

        return response.data;

    } catch (error) {
        throw error;
    }
};

/* =============================
   GET USER BOOKINGS
============================= */
export const getMyBookings = async () => {
    try {
        const response = await axiosInstance.get("/bookings/my");
        return response.data;

    } catch (error) {
        throw error;
    }
};
