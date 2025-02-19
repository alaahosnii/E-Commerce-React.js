import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styles from "./App.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import ThemeContextProvider from "./contexts/ThemeModeContext";
import Cart from "./components/Cart/Cart";
import { Provider } from "react-redux";
import store from "./redux/store";
import LanguageContextProvider from "./contexts/LanguageContext";
import WishList from "./components/WishList/WishList";
import { ProductsContextProvider } from "./contexts/ProductsContex";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function App() {
  let routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "/about",
          element: <About />
        },
        {
          path: "/contact",
          element: <Contact />
        },
        {
          path: "/cart",
          element: <Cart />
        },
        {
          path: "/wishlist",
          element: <WishList />
        },
        {
          path: "product/:id",
          element: <ProductDetails />
        }
      ]
    }
  ]);
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <ThemeContextProvider >
        <LanguageContextProvider>
          <ProductsContextProvider>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={routes} />
            </QueryClientProvider>
          </ProductsContextProvider>
        </LanguageContextProvider>
      </ThemeContextProvider>
    </Provider>
  )
}

export default App
