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
    className={`flex items-center gap-4 p-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all shadow-sm ${className}`}
    onClick={onClick}
  >
    <Icon className="text-blue-300 text-xl" />
    <span className="text-gray-700 font-medium block">{label}</span>
    <span className="text-xs text-gray-400 block">{comment}</span>
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
    <div className="flex flex-col ">
      <div className="border-b border-gray-300 pb-4">
        <div className="flex items-center gap-4">
          <div
            onClick={handleClose}
            className="w-12 h-12 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
          >
            {user?.avatar_url ? (
              <img
                src={user.avatar_url}
                alt="avatar"
                className="w-full rounded-full"
              />
            ) : (
              <FaUser className="text-white text-xl" />
            )}
          </div>

          <div className="flex-grow">
            <div className="text-lg font-bold text-gray-800">
              Tài khoản của tôi
            </div>
            <div className="text-xs text-gray-600 flex items-center gap-2">
              {user.username}
              <span className=" text-red-500">({user.role})</span>
              <Link to="/account/profile" onClick={handleClose}>
                {!isFullPage && (
                  <FaExternalLinkSquareAlt className=" text-green-400 animate-bounce text-lg" />
                )}
              </Link>
            </div>
          </div>
          {!isFullPage && (
            <button
              className="p-2 text-gray-500 hover:text-red-400 transition-colors"
              onClick={onClose}
              aria-label="Close menu"
            >
              <RiCloseLine className="text-2xl" />
            </button>
          )}
        </div>
      </div>

      <div className="py-4 space-y-3 flex-grow">
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
        className="flex items-center gap-4 p-4 bg-red-100 hover:bg-red-200 rounded-lg transition-all shadow-sm text-red-600 w-full mt-auto"
      >
        <FaSignOutAlt className="text-xl" />
        <span>Logout</span>
      </button>
    </div>
  );

  const containerClass = isFullPage
    ? "bg-pink-50 p-10 h-full mr-3 mt-20 lg:mt-0"
    : "bg-white rounded-lg shadow-lg p-4 w-80 border border-gray-200";

  return (
    <div ref={menuRef} className={containerClass}>
      {menuContent}
    </div>
  );
};

export default UserMenu;
