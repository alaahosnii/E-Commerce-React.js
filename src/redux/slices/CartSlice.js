import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        totalQuantity: 0,
        totalPrice: 0
    },
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const productQuantity = product.quantity;
            const productBasePrice = product.price;
            const totalProductPrice = productBasePrice * productQuantity;
            const productIndex = state.products.findIndex((cartProduct) => cartProduct.id == product.id);
            if (productIndex !== -1) {
                const cartProductQuantity = state.products[productIndex].quantity;
                const updatedQuantity = cartProductQuantity + 1;
                const cartProducts = state.products.map(
                    (cartProdcut) => cartProdcut.id == product.id
                        ? {
                            ...cartProdcut, price: cartProdcut.price,
                            quantity: (product.quantity + cartProductQuantity),
                            subTotalPrice: cartProdcut.price * updatedQuantity,

                        }
                        : cartProdcut
                );
                state.products = cartProducts;
            } else {
                state.products.push(action.payload);
            }
            state.totalQuantity++;
            state.totalPrice += totalProductPrice;
        },
        changeQuantity: (state, action) => {
            const productId = action.payload.id;
            const productQuantity = action.payload.quantity;
            const productBasePrice = action.payload.basePrice;
            const totalProductPrice = productBasePrice * productQuantity;

            const cartproducts = state.products.map(
                (cartProduct) => cartProduct.id == productId
                    ? {
                        ...cartProduct,
                        quantity: productQuantity,
                        subTotalPrice: cartProduct.price * productQuantity,

                    }
                    : cartProduct
            )
            state.totalQuantity = productQuantity;
            state.totalPrice = totalProductPrice;
            state.products = cartproducts;
        },
        deleteFromCart: (state, action) => {
            const productId = action.payload.id;
            const deletedProduct = state.products.find((product) => product.id == productId);
            const filteredProducts = state.products.filter((product) => product.id != productId);
            state.totalPrice -= deletedProduct.subTotalPrice;
            state.totalQuantity -= deletedProduct.quantity;
            state.products = filteredProducts;
        }
    }
});

export const { addToCart, changeQuantity, deleteFromCart } = slice.actions;
export default slice.reducer;