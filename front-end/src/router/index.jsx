import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import Home from "../pages/Home";
import About from "../pages/About";
import VerifyEmail from "../pages/VerifyEmail";
import PageSearch from "../pages/PageSearch";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";

import SocialCallback from "../components/SocialCallback";
import Profile from "../pages/Profile";
import Cart from "../pages/Cart";
import MyOrder from "../pages/MyOrder";
import Address from "../pages/Address";
import UserMenuPage from "../pages/UserMenuPage";
import Account from "../layout/Account";
import Notification from "../pages/Notification";
import GuestRoute from "../components/GuestRoute";
import ShopManagement from "../pages/ShopManagement";
import RegisterShop from "../pages/RegisterShop";

import ShopOrder from "../pages/ShopOrder";
import ResendVerifyEmail from "../pages/ResendVerifyEmail";
import ResetPassword from "../pages/ResetPassword";
import VerifyOtp from "../pages/VerifyOtp";
import DefaultLayout from "../layout/DefaultLayout";
import DefaultShop from "../layout/DefaultShop";
import ShopProduct from "../pages/ShopProduct";
import ShopReview from "../pages/ShopReview";
import AddProduct from "../pages/AddProduct";
import EditProduct from "../pages/EditProduct";
import Category from "../pages/Category";
import ProductDetails from "../pages/ProductDetails";
import PageShopInfo from "../pages/PageShopInfo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
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
            path: ":categoryId",
            element: <Category />,
          },
          {
            path: "about",
            element: <About />,
          },
          {
            path: "product/:id",
            element: <ProductDetails />,
          },
          {
            path: "shop/:id",
            element: <PageShopInfo />,
          },
          {
            path: "search",
            element: <PageSearch />,
          },
          {
            path: "register-shop",
            element: <RegisterShop />,
          },
          {
            path: "shop-management",
            element: <DefaultShop />,
            children: [
              {
                path: "shop",
                element: <ShopManagement />,
              },

              {
                path: "add-product",
                element: <AddProduct />,
              },
              {
                path: "edit-product/:productId",
                element: <EditProduct />,
              },
              {
                path: "products",
                element: <ShopProduct />,
              },
              {
                path: "order",
                element: <ShopOrder />,
              },
              {
                path: "review",
                element: <ShopReview />,
              },
            ],
          },
          {
            path: "account",
            element: <Account />,
            children: [
              {
                path: "profile",
                element: <Profile />,
              },
              {
                path: "my-order",
                element: <MyOrder />,
              },
              {
                path: "address",
                element: <Address />,
              },
              {
                path: "address",
                element: <Address />,
              },
              {
                path: "notifications",
                element: <Notification />,
              },
            ],
          },
          {
            path: "cart",
            element: <Cart />,
          },
          {
            path: "user-menu",
            element: <UserMenuPage />,
          },
        ],
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "verification-otp",
        element: <VerifyOtp />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/auth/callback/:provider",
        element: <SocialCallback />,
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
        path: "register",
        element: <Register />,
      },
      {
        path: "verify-email",
        element: <VerifyEmail />,
      },
      {
        path: "resendVerifyEmail",
        element: <ResendVerifyEmail />,
      },
    ],
  },
]);

export default router;
