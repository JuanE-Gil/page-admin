import Home from "./pages/home/Home";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Users from "./pages/users/Users";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import "./styles/global.scss";
import tokenUtils from "./tokenUtils";
import Categories from "./pages/categories/Categories";
import Sales from "./pages/sales/Sales";
import Vehicles from "./pages/vehicles/Vehicles";

const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return false;
  }

  const decodedToken = tokenUtils.decodeToken(token);

  const expirationDate = decodedToken.exp * 1000;
  if (expirationDate < Date.now()) {
    return false;
  }

  const users = decodedToken.sub;

  const allowedRoles = ["ThMonkey02", "Arima"]; // usuarios permitidos para la ruta actual
  if (!allowedRoles.includes(users)) {
    return false;
  }

  return true;
};

function App() {
  const Layout = () => {
    if (!isAuthenticated()) {
      return <Navigate to="/login" replace />;
    }

    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/vehicles",
          element: <Vehicles />,
        },
        {
          path: "/categories",
          element: <Categories />,
        },
        {
          path: "/sales",
          element: <Sales />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
