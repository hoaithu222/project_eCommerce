import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaBox,
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaCloudUploadAlt,
  FaProductHunt,
} from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdCategory } from "react-icons/md";
import { RiCloseLine } from "react-icons/ri";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";

import SummaryApi from "../common/SummaryApi";
import { toast } from "react-toastify";
import { FcShop } from "react-icons/fc";

const MenuLink = ({
  to,
  icon: Icon,
  label,
  onClick,
  className = "",
  comment,
}) => (
  <Link
    to={to}
    className={`flex gap-4 items-center p-4 bg-gray-100 rounded-lg shadow-sm transition-all hover:bg-gray-200 ${className}`}
    onClick={onClick}
  >
    <Icon className="text-xl text-blue-300" />
    <span className="block font-medium text-gray-700">{label}</span>
    <span className="block text-xs text-gray-400">{comment}</span>
  </Link>
);

const UserMenu = ({ onClose, isFullPage = false }) => {
  const menuRef = useRef(null);
  const { data: user } = useSelector((state) => state.user);
  const role = user.role;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isFullPage) return;

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, isFullPage]);

  const handleLogout = async () => {
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
        navigate("/");
      }
    } catch (error) {
      toast.error(
        error.dataResponse?.message || "An error occurred. Please try again.",
      );
      console.error("Logout error:", error);
    }
  };

  const handleLinkClick = () => !isFullPage && onClose();
  const handleClose = () => onClose?.();

  const menuContent = (
    <div className="flex flex-col">
      <div className="pb-4 border-b border-gray-300">
        <div className="flex gap-4 items-center">
          <div
            onClick={handleClose}
            className="flex justify-center items-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-md transition-shadow md:w-14 md:h-14 lg:w-18 lg:h-18 hover:shadow-lg"
          >
            {user?.avatar_url ? (
              <img
                src={user.avatar_url}
                alt="avatar"
                className="object-cover w-full h-full rounded-full"
              />
            ) : (
              <FaUser className="text-xl text-white" />
            )}
          </div>

          <div className="flex-grow">
            <div className="text-base font-bold text-gray-800 lg:text-lg">
              Tài khoản của tôi
            </div>
            <div className="flex gap-2 items-center text-xs text-gray-600">
              {user.username}
              <span className="text-red-500">({user.role})</span>
              <Link to="/account/profile" onClick={handleClose}>
                {!isFullPage && (
                  <FaExternalLinkSquareAlt className="text-lg text-green-400 animate-bounce" />
                )}
              </Link>
            </div>
          </div>
          {!isFullPage && (
            <button
              className="p-2 text-gray-500 transition-colors hover:text-red-400"
              onClick={onClose}
              aria-label="Close menu"
            >
              <RiCloseLine className="text-2xl" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-grow py-4 space-y-3">
        {isFullPage && (
          <>
            <MenuLink
              to="/account/profile"
              icon={FaUser}
              label="Thông tin tài khoản"
              onClick={handleLinkClick}
            />

            <MenuLink
              to="/account/address"
              icon={FaMapMarkerAlt}
              label="Địa chỉ"
              onClick={handleLinkClick}
            />
            {/* <MenuLink
              to="/account/notifications"
              icon={IoIosNotifications}
              label="Thông báo"
              onClick={handleLinkClick}
            /> */}
          </>
        )}
        <MenuLink
          to="/account/my-order"
          icon={FaBox}
          label="Đơn mua"
          onClick={handleLinkClick}
        />
        {role == "Shop" ? (
          <MenuLink
            to="/shop-management/shop"
            icon={FcShop}
            label="Quản lý cửa hàng"
            onClick={handleLinkClick}
            comment="Dành cho màn hình desktop"
          />
        ) : (
          <MenuLink
            to="/register-shop"
            icon={FcShop}
            label="Đăng kí bán hàng"
            onClick={handleLinkClick}
          />
        )}
      </div>

      <button
        onClick={async () => {
          handleLinkClick();
          handleClose();
          await handleLogout();
        }}
        className="flex gap-4 items-center p-4 mt-auto w-full text-red-600 bg-red-100 rounded-lg shadow-sm transition-all hover:bg-red-200"
      >
        <FaSignOutAlt className="text-xl" />
        <span>Logout</span>
      </button>
    </div>
  );

  const containerClass = isFullPage
    ? "bg-blue-50 p-10 h-full mr-3 mt-20 lg:mt-0"
    : "bg-white rounded-lg shadow-lg p-4 w-80 border border-gray-200";

  return (
    <div ref={menuRef} className={containerClass}>
      {menuContent}
    </div>
  );
};

export default UserMenu;
