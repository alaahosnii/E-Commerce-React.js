import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/CartSlice";
import favoriteReducer from "./slices/FavoriteSlice";
import authSlice from "./slices/AuthSlice";
const store = configureStore({
    reducer: {
        "cart": cartReducer,
        "favorite": favoriteReducer,
        "auth": authSlice,
    },
});

export default store;