import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (user, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/auth/login", user);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (user, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/auth/register", user);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getLoggedInUser = createAsyncThunk(
    "auth/getLoggedInUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/auth/loggedInUser", {
            });
            return response.data.user;
        } catch (error) {
            console.log(error);

            return rejectWithValue(error);
        }
    }
)
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isLoginLoading: false,
        isRegisterLoading: false,
        loginError: null,
        registerError: null,
        registerStatus: false,
        getLoggedInUserError: null,
        getLoggedInUserLoading: false

    },

    reducers: {
        logoutUser: (state) => {
            state.user = null;
            localStorage.removeItem("token");
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoginLoading = true;
                state.loginError = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                localStorage.setItem("token", action.payload.token);
                state.isLoginLoading = false;
                state.loginError = null;
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoginLoading = false;
                state.loginError = action.payload;
            })
            .addCase(registerUser.pending, (state) => {
                state.isRegisterLoading = true;
                state.registerError = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isRegisterLoading = false;
                state.registerError = null;
                state.registerStatus = action.payload.status;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isRegisterLoading = false;
                state.registerError = action.payload;
            })
            .addCase(getLoggedInUser.pending, (state) => {
                state.getLoggedInUserLoading = true;
                state.getLoggedInUserError = null;
            })
            .addCase(getLoggedInUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.getLoggedInUserLoading = false;
                state.getLoggedInUserError = null;
            })
            .addCase(getLoggedInUser.rejected, (state, action) => {
                state.getLoggedInUserError = action.payload;
                state.getLoggedInUserLoading = false;
            })

    }
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;