import { IoClose } from "react-icons/io5";
import { LuExternalLink } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { useEffect, useState } from "react";
import SummaryApi from "../common/SummaryApi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fetchUser } from "../store/actions/fetchUser";
export default function UserMenu({ onClose }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    onClose();
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(SummaryApi.logout.url, {
        method: SummaryApi.logout.method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const dataResponse = await response.json();
      if (dataResponse.success) {
        localStorage.clear();
        sessionStorage.clear();
        dispatch({ type: "logout" });
        toast.success(dataResponse.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(
        error.dataResponse?.message || "An error occurred. Please try again."
      );
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="absolute top-16 right-0 w-40 shadow-2xl p-2 z-50 bg-white rounded-lg border border-gray-300">
      <button
        onClick={onClose}
        className="text-xl text-gray-500 hover:text-red-500 transition ml-auto flex justify-end"
      >
        <IoClose />
      </button>
      {/* Menu Items */}
      <div className="flex flex-col mt-1 space-y-2">
        <button
          className="w-full text-left text-gray-700 hover:bg-gray-200 rounded-md px-2 py-1 flex items-center gap-3"
          onClick={() => {
            onClose();
            navigate("/profile");
          }}
        >
          <LuExternalLink className="text-green-300 text-2xl " />
          <span className="text-xl font-medium">Profile</span>
        </button>
        <button
          className="text-gray-700 hover:bg-gray-200 rounded-md px-2 py-1 flex items-center gap-3"
          onClick={handleLogout}
        >
          <IoIosLogOut className="text-red-300 text-2xl" />
          <span className="text-xl font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
