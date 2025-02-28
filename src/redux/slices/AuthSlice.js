import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance.js";

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (user, {rejectWithValue}) => {
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


export const updateUser = createAsyncThunk(
    "auth/updateUser",
    async (updatedUser, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch("/auth/updateUser", updatedUser);
            return response.data;
        } catch (error) {
            console.log("update error", error);
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
        getLoggedInUserLoading: false,
        token: null,
        updateUserError: null,
        updateUserLoading: false,
        updateUserSuccess: false
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
                state.token = action.payload.token;
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
                state.token = localStorage.getItem("token");
                state.user = action.payload;
                state.getLoggedInUserLoading = false;
                state.getLoggedInUserError = null;
            })
            .addCase(getLoggedInUser.rejected, (state, action) => {
                state.getLoggedInUserError = action.payload;
                state.getLoggedInUserLoading = false;
            })
            .addCase(updateUser.pending, (state) => {
                state.updateUserLoading = true;
                state.updateUserError = null;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.updateUserLoading = false;
                state.updateUserError = action.payload;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                localStorage.setItem("token", action.payload.token);
                state.updateUserLoading = false;
                state.updateUserSuccess = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })

    }
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;