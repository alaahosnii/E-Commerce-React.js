import { createContext, useState } from "react";

export const ProductsInRoutesContext = createContext();

const ProductsInRoutesContextProvider = ({ children }) => {
    const [productsInRoutes, setProductsInRoutes] = useState([]);
    return (
        <ProductsInRoutesContext.Provider value={{ productsInRoutes, setProductsInRoutes }}>
            {children}
        </ProductsInRoutesContext.Provider>
    );
}

export default ProductsInRoutesContextProvider;