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

import AddProduct from "../pages/AddProduct";
import EditProduct from "../pages/EditProduct";
import Category from "../pages/Category";
import ProductDetails from "../pages/ProductDetails";
import PageShopInfo from "../pages/PageShopInfo";
import { PrivateRoute } from "../components/PrivateRoute ";
import AllProduct from "../pages/AllProduct";
import NotAuthorized from "../components/NotAuthorized";
import ShopRoute from "../components/ShopRoute";
import Checkout from "../pages/Checkout";
import OrderSuccess from "../pages/OrderSuccess";
import OrderItem from "../pages/OrderItem";
import Review from "../pages/Review";
import ReviewSuccess from "../pages/ReviewSuccess";
import ViewReview from "../pages/ViewReview";
import Analytic from "../pages/Analytic";

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
            path: "products",
            element: <AllProduct />,
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
            element: (
              <PrivateRoute>
                <RegisterShop />
              </PrivateRoute>
            ),
          },
          {
            path: "shop-management",
            element: (
              <PrivateRoute>
                <ShopRoute>
                  <DefaultShop />
                </ShopRoute>
              </PrivateRoute>
            ),
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
                path: "analytic",
                element: <Analytic />,
              },
            ],
          },
          {
            path: "account",
            element: (
              <PrivateRoute>
                <Account />
              </PrivateRoute>
            ),
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
                path: "my-order/:id",
                element: <OrderItem />,
              },
              {
                path: "address",
                element: <Address />,
              },
              {
                path: "review",
                element: <Review />,
              },
              {
                path: "view-review",
                element: <ViewReview />,
              },
              {
                path: "notifications",
                element: <Notification />,
              },
            ],
          },

          {
            path: "user-menu",
            element: <UserMenuPage />,
          },
        ],
      },
      {
        path: "cart",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      {
        path: "order-success",
        element: (
          <PrivateRoute>
            <OrderSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: "review-success",
        element: (
          <PrivateRoute>
            <ReviewSuccess />
          </PrivateRoute>
        ),
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
      {
        path: "not-authorized",
        element: <NotAuthorized />,
      },
    ],
  },
]);

export default router;
