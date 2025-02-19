import { Link, useNavigate } from "react-router-dom";
import { MdOutlineSavedSearch } from "react-icons/md";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import colors from "../style/colors";
import { useEffect, useState } from "react";
import Loading from "../pages/Loading";
import UserMenu from "./UserMenu";
import { fetchUser } from "../store/actions/fetchUser";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { data: user, loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Chuyển useEffect lên đây
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    }
    dispatch(fetchUser());
  }, [dispatch, navigate]); // Chỉ chạy một lần khi component mount

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md p-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Link
                to="/"
                className={`flex items-center w-full  rounded-full ${colors.gradients.blueToPink}  overflow-hidden border-dotted border-2 border-white transition-colors duration-200`}
              >
                <div className="pl-4 py-2">
                  <MdOutlineSavedSearch className="text-white text-3xl " />
                </div>
                <input
                  type="text"
                  placeholder="Vui lòng nhập thông tin cần tìm kiếm"
                  name="search"
                  className={`w-full px-4 py-2 text-white focus:outline-none rounded-full ${colors.gradients.blueToPink}  `}
                />
              </Link>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6 ml-8">
            {/* Notifications */}
            {/* <button className="relative p-1 text-gray-600 hover:text-gray-900 transition-colors duration-200">
              <IoNotificationsCircleOutline
                className={`${colors.gradients.violetToBlue} text-5xl text-white rounded-full`}
              />
              <div className="absolute top-0 right-0 h-5 w-5 bg-red-300 rounded-full flex items-center justify-center">
                <span className="text-white text-ms font-semibold">0</span>
              </div>
            </button> */}

            {/* User Profile */}
            <div className="relative">
              <div
                className={`flex items-center space-x-2 text-gray-600 hover:text-gray-900 p-1  rounded-full  transition-colors duration-200 cursor-pointer ${colors.gradients.blueToPink}`}
                onClick={() => setOpenMenu(true)}
              >
                {user?.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt="User avatar"
                    className="h-14 w-14 rounded-full object-cover "
                  />
                ) : (
                  <FaUserCircle className="text-4xl text-white" />
                )}
              </div>
              {openMenu && <UserMenu onClose={() => setOpenMenu(false)} />}
            </div>
          </div>
        </div>
      </div>

      {loading && <Loading />}
    </header>
  );
};

export default Header;
