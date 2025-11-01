import { NavLink } from "react-router-dom";
import image01 from "../../assets/logo.png";
import { MdDashboard } from "react-icons/md";
import { BsCartCheckFill, BsPeopleFill } from "react-icons/bs";
import { FaTags, FaCogs, FaRegCalendarAlt, FaBoxOpen } from "react-icons/fa";
import { HiOutlineChartSquareBar } from "react-icons/hi";
import { GiShop } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { SiHiveBlockchain } from "react-icons/si";
import { RiArchive2Line } from "react-icons/ri";
import { FaShopLock, FaWindowRestore } from "react-icons/fa6";

const Sidebar = () => {
  // Custom function để xử lý active class
  const getLinkClasses = ({ isActive }) => {
    return `flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ease-in-out transform 
    hover:translate-x-2 group relative ${isActive
        ? "bg-gradient-to-r from-blue-500 to-blue-500 text-white shadow-xl shadow-blue-200/50"
        : "hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-100"
      }`;
  };

  return (
    <aside className="flex overflow-y-auto relative flex-col p-4 w-72 min-h-screen bg-white shadow-2xl shadow-blue-200/50">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200 to-blue-200 rounded-full opacity-20 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-200 to-blue-200 rounded-full opacity-20 blur-3xl -z-10"></div>

      {/* Logo section */}
      <div className="flex overflow-hidden justify-center items-center mx-auto mt-4 mb-8 w-16 h-16 rounded-lg shadow-lg first-letter:rounded-lg shadow-blue-200/50">
        <img
          src={image01}
          alt="logo"
          className="object-contain w-full h-full"
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-1">
          <NavLink to="/" className={getLinkClasses}>
            <MdDashboard className="text-2xl transition-transform group-hover:scale-110" />
            <div className="flex flex-col">
              <p className="text-lg font-medium">Dashboard</p>
              <span className="text-xs opacity-75">Tổng quan hệ thống</span>
            </div>
          </NavLink>

          <NavLink to="/category" className={getLinkClasses}>
            <RiArchive2Line className="text-2xl transition-transform group-hover:scale-110" />
            <div className="flex flex-col">
              <p className="text-lg font-medium">Categories</p>
              <span className="text-xs opacity-75">Quản lý danh mục</span>
            </div>
          </NavLink>

          <NavLink to="/sub-category" className={getLinkClasses}>
            <FaWindowRestore className="text-2xl transition-transform group-hover:scale-110" />
            <div className="flex flex-col">
              <p className="text-lg font-medium">Sub Categories</p>
              <span className="text-xs opacity-75">Danh mục con</span>
            </div>
          </NavLink>
          <NavLink to="/attributes" className={getLinkClasses}>
            <SiHiveBlockchain className="text-2xl transition-transform group-hover:scale-110" />
            <div className="flex flex-col">
              <p className="text-lg font-medium">Attributes</p>
              <span className="text-xs opacity-75">Thuộc tính sản phẩm</span>
            </div>
          </NavLink>

          <NavLink to="/products" className={getLinkClasses}>
            <FaBoxOpen className="text-2xl transition-transform group-hover:scale-110" />
            <div className="flex flex-col">
              <p className="text-lg font-medium">Products</p>
              <span className="text-xs opacity-75">Quản lý sản phẩm</span>
            </div>
          </NavLink>

          <NavLink to="/order" className={getLinkClasses}>
            <BsCartCheckFill className="text-2xl transition-transform group-hover:scale-110" />
            <div className="flex flex-col">
              <p className="text-lg font-medium">Orders</p>
              <span className="text-xs opacity-75">Đơn hàng</span>
            </div>
          </NavLink>

          <NavLink to="/customers" className={getLinkClasses}>
            <BsPeopleFill className="text-2xl transition-transform group-hover:scale-110" />
            <div className="flex flex-col">
              <p className="text-lg font-medium">User</p>
              <span className="text-xs opacity-75">Người dùng</span>
            </div>
          </NavLink>
          <NavLink to="/shops" className={getLinkClasses}>
            <FaShopLock className="text-2xl transition-transform group-hover:scale-110" />
            <div className="flex flex-col">
              <p className="text-lg font-medium">Shops</p>
              <span className="text-xs opacity-75">
                Quản lý các shop đã đăng kí
              </span>
            </div>
          </NavLink>

          {/* <NavLink to="/system" className={getLinkClasses}>
            <IoMdSettings className="text-2xl transition-transform group-hover:scale-110" />
            <div className="flex flex-col">
              <p className="text-lg font-medium">System</p>
              <span className="text-xs opacity-75">Cấu hình hệ thống</span>
            </div>
          </NavLink>

          <NavLink to="/content-management" className={getLinkClasses}>
            <FaCogs className="text-2xl transition-transform group-hover:scale-110" />
            <div className="flex flex-col">
              <p className="text-lg font-medium">Content</p>
              <span className="text-xs opacity-75">Quản lý nội dung</span>
            </div>
          </NavLink> */}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
