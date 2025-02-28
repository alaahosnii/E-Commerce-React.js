import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance.js";

export const getClientSecret = createAsyncThunk(
    "payment/getClientSecret",
    async (paymentData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/payment/clientSecret", {
                params: paymentData
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
)

const paymentSlice = createSlice({
    name: "payment",
    initialState: {
        clientSecret: null,
        getClientSecretError: null,
        getClientSecretLoading: false
    },

    extraReducers: (builder) => {
        builder
            .addCase(getClientSecret.pending, (state) => {
                state.getClientSecretLoading = true;
                state.getClientSecretError = null;
            })
            .addCase(getClientSecret.rejected, (state, action) => {
                state.getClientSecretLoading = false;
                state.getClientSecretError = action.payload
            })
            .addCase(getClientSecret.fulfilled, (state, action) => {
                state.getClientSecretLoading = false;
                state.getClientSecretError = null;
                state.clientSecret = action.payload.clientSecret
            });
    }
})

export default paymentSlice.reducer;