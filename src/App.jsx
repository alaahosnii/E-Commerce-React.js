import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styles from "./App.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import ThemeContextProvider from "./contexts/ThemeModeContext";

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
        }
      ]
    }
  ]);
  return (
    <ThemeContextProvider >
      <RouterProvider router={routes} />

    </ThemeContextProvider>
  )
}

export default App
