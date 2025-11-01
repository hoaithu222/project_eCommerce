import { NavLink } from "react-router-dom";
import image01 from "../../assets/img/logo.png";
import { MdDashboard } from "react-icons/md";
import { BsCartCheckFill, BsPeopleFill } from "react-icons/bs";
import { FaTags, FaCogs, FaRegCalendarAlt, FaBoxOpen } from "react-icons/fa";
import { HiOutlineChartSquareBar } from "react-icons/hi";
import { GiShop } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { SiHiveBlockchain } from "react-icons/si";
import { RiArchive2Line } from "react-icons/ri";
import { FaShopLock, FaWindowRestore } from "react-icons/fa6";
import { PiStarThin } from "react-icons/pi";
import { IoAnalytics } from "react-icons/io5";

const Sidebar = () => {
  const getLinkClasses = ({ isActive }) => {
    const baseClasses =
      "flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ease-in-out transform hover:translate-x-2 group relative";
    return isActive
      ? `${baseClasses} bg-gradient-to-r from-blue-500 to-blue-500 text-white shadow-xl shadow-blue-200/50`
      : `${baseClasses} hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-100`;
  };

  return (
    <aside className="w-72 bg-white shadow-2xl shadow-blue-200/50 flex flex-col overflow-y-auto p-4 min-h-[96vh] relative pt-5">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200 to-blue-200 rounded-full blur-3xl opacity-20 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-200 to-blue-200 rounded-full blur-3xl opacity-20 -z-10"></div>
      <nav className="flex-1">
        <ul className="space-y-3">
          <li>
            <NavLink to="/shop-management/shop" className={getLinkClasses}>
              <SiHiveBlockchain className="text-2xl group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <p className="text-lg font-medium">Quản lý cửa hàng</p>
                <span className="text-xs opacity-75">
                  Thiết lập và quản lý thông tin cửa hàng
                </span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop-management/add-product"
              className={getLinkClasses}
            >
              <RiArchive2Line className="text-2xl group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <p className="text-lg font-medium">Thêm sản phẩm mới</p>
                <span className="text-xs opacity-75">
                  Tạo mới và cập nhật sản phẩm
                </span>
              </div>
            </NavLink>
          </li>

          <li>
            <NavLink to="/shop-management/products" className={getLinkClasses}>
              <FaWindowRestore className="text-2xl group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <p className="text-lg font-medium">Danh sách sản phẩm</p>
                <span className="text-xs opacity-75">
                  Xem và quản lý tất cả sản phẩm
                </span>
              </div>
            </NavLink>
          </li>

          <li>
            <NavLink to="/shop-management/order" className={getLinkClasses}>
              <HiOutlineChartSquareBar className="text-2xl group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <p className="text-lg font-medium">Quản lý đơn hàng</p>
                <span className="text-xs opacity-75">
                  Theo dõi và xử lý đơn hàng
                </span>
              </div>
            </NavLink>
          </li>

          <li>
            <NavLink to="/shop-management/analytic" className={getLinkClasses}>
              <IoAnalytics className="text-2xl group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <p className="text-lg font-medium">Analytic</p>
                <span className="text-xs opacity-75">
                  Quản lý phân tích doanh thu và đơn hàng
                </span>
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
