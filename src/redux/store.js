import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/CartSlice";
import favoriteReducer from "./slices/FavoriteSlice";
const store = configureStore({
    reducer: {
        "cart": cartReducer,
        "favorite": favoriteReducer,

    },
});

export default store;