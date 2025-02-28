import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/redux/slices/CartSlice";
import favoriteReducer from "@/redux/slices/FavoriteSlice";
import authSlice from "@/redux/slices/AuthSlice";
import paymentSlice from "@/redux/slices/paymentSlice";
const store = configureStore({
    reducer: {
        "cart": cartReducer,
        "favorite": favoriteReducer,
        "auth": authSlice,
        "payment": paymentSlice
    },
});

export default store;