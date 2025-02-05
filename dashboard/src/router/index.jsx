import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotAuthorized from "../pages/NotAuthorized"; // Trang không có quyền

import Category from "../pages/Category";
import SubCategory from "../pages/SubCategory";
import Product from "../pages/Product";
import Order from "../pages/Order";
import Customer from "../pages/Customer";
import Marketing from "../pages/Marketing";
import Shop from "../pages/Shop";
import Calendar from "../pages/Calendar";
import Analytic from "../pages/Analytic";
import System from "../pages/System";
import ContentManagement from "../pages/ContentManagement";
import Search from "../pages/Search";
import GuestRoute from "../components/GuestRoute";
import PrivateRoute from "../components/PrivateRouter";
import Attributes from "../pages/Attributes";
import DefaultLayout from "../layout/DefaultLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/",
            element: <App />,
            children: [
              {
                path: "/",
                element: <Home />,
              },
              {
                path: "/search",
                element: <Search />,
              },
              {
                path: "/category",
                element: <Category />,
              },
              {
                path: "/sub-category",
                element: <SubCategory />,
              },
              {
                path: "/products",
                element: <Product />,
              },
              {
                path: "/order",
                element: <Order />,
              },
              {
                path: "/customers",
                element: <Customer />,
              },
              {
                path: "/marketing",
                element: <Marketing />,
              },
              {
                path: "/shops",
                element: <Shop />,
              },
              {
                path: "/attributes",
                element: <Attributes />,
              },
              {
                path: "/calendar",
                element: <Calendar />,
              },
              {
                path: "/analytics",
                element: <Analytic />,
              },
              {
                path: "/system",
                element: <System />,
              },
              {
                path: "/content-management",
                element: <ContentManagement />,
              },
            ],
          },
        ],
      },
      {
        path: "login",
        element: (
          <GuestRoute>
            <Login />
          </GuestRoute>
        ),
      },
      {
        path: "/not-authorized",
        element: <NotAuthorized />,
      },
    ],
  },
]);

export default router;
