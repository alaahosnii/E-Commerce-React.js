import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

export const addFavoritesToDB = createAsyncThunk(
    "favorite/addFavoritesToDB",
    async (products, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/user/favorites", products);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getFavoritesFromDB = createAsyncThunk(
    "favorite/getFavoritesFromDB",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/user/favorites");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

const slice = createSlice({
    name: "favorite",
    initialState: {
        products: [],
        addFavoritesToDBError: null,
        addFavoritesToDBLoading: false,
        getFavoritesFromDBError: null,
        getFavoritesFromDBLoading: false,
        addFavoritesToDBSuccess: false,
        getFavoritesFromDBSuccess: false,
        isChangeInLocalFavorite: false
    },

    reducers: {
        resetIsChangeInLocalFavorite: (state) => {
            state.isChangeInLocalFavorite = false
        },
        addToFavorite: (state, action) => {
            state.products.push(action.payload);
            state.isChangeInLocalFavorite = true
        },
        removeFromFavorite: (state, action) => {
            const filtered = state.products.filter((product) => product.id != action.payload.id);
            state.products = filtered;
            state.isChangeInLocalFavorite = true
        }
    },

    extraReducers: (builder) => {
        builder

            .addCase(addFavoritesToDB.pending, (state) => {
                state.addFavoritesToDBLoading = true;
                state.addFavoritesToDBError = null;
            })
            .addCase(addFavoritesToDB.rejected, (state, action) => {
                state.addFavoritesToDBLoading = false;
                state.addFavoritesToDBError = action.payload;
            })
            .addCase(addFavoritesToDB.fulfilled, (state, action) => {
                state.addFavoritesToDBLoading = false;
                state.addFavoritesToDBError = null;
                state.addFavoritesToDBSuccess = true;
            })
            .addCase(getFavoritesFromDB.pending, (state) => {
                state.getFavoritesFromDBLoading = true;
                state.getFavoritesFromDBError = null;
            })
            .addCase(getFavoritesFromDB.rejected, (state, action) => {
                state.getFavoritesFromDBLoading = false;
                state.getFavoritesFromDBError = action.payload;
            })
            .addCase(getFavoritesFromDB.fulfilled, (state, action) => {
                state.products = action.payload.products;
                state.getFavoritesFromDBLoading = false;
                state.getFavoritesFromDBError = null;
                state.getFavoritesFromDBSuccess = true;
            });
    }
});

export const { addToFavorite , resetIsChangeInLocalFavorite, removeFromFavorite } = slice.actions;
export default slice.reducer;