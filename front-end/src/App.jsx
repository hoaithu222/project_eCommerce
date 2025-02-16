import { useEffect } from "react";
import { useDispatch } from "react-redux";
import api, { setupAxiosInterceptors } from "./utils/api";

import { fetchUser } from "./store/actions/fetchUser";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { fetchCart } from "./store/actions/fetchCart";

export default function App() {
  const dispatch = useDispatch();
  const { logout } = useAuth();

  useEffect(() => {
    setupAxiosInterceptors(logout);
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(fetchUser());
      dispatch(fetchCart(token));
    }
  }, [dispatch, logout]);

  return (
    <>
      <Header />
      <main className="min-h-[96vh] bg-slate-50">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer className="flex justify-center" />
    </>
  );
}
