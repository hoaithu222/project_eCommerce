import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function DefaultLayout() {
  return (
    <>
      {/* comment */}
      <Outlet />
      <ToastContainer className="flex justify-center" />
    </>
  );
}
