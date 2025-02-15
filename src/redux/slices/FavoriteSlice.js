import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "favorite",
    initialState: {
        products: [],
    },

    reducers: {
        addToFavorite: (state, action) => {
            state.products.push(action.payload);
        },
        removeFromFavorite: (state, action) => {
            const filtered = state.products.filter((product) => product.id != action.payload.id);
            state.products = filtered;
        }
    }
});

export const { addToFavorite, removeFromFavorite } = slice.actions;
export default slice.reducer;