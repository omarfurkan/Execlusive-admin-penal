import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import Products from "./pages/products/Products";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";

const Layout = () => {
  return;
  <div className="main">
    <Navbar />
    <div className="menuContainer">
      <Menu />
    </div>
    <div className="contentContainer"></div>
    <Footer />
  </div>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "users",
    element: <Users />,
  },
  {
    path: "products",
    element: <Products />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
