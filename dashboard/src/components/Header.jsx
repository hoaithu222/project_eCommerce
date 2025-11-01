import { Link, useNavigate } from "react-router-dom";
import { MdOutlineSavedSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import colors from "../style/colors";
import { useEffect, useState } from "react";
import UserMenu from "./UserMenu";
import { fetchUser } from "../store/actions/fetchUser";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { data: user } = useSelector((state) => state.user);
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
    <header className="sticky top-0 z-50 p-3 bg-white shadow-md">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Link
                to="/"
                className={`flex items-center w-full  rounded-full ${colors.gradients.blueToBlue}  overflow-hidden border-dotted border-2 border-white transition-colors duration-200`}
              >
                <div className="py-2 pl-4">
                  <MdOutlineSavedSearch className="text-3xl text-white" />
                </div>
                <input
                  type="text"
                  placeholder="Vui lòng nhập thông tin cần tìm kiếm"
                  name="search"
                  className={`w-full px-4 py-2 text-white focus:outline-none rounded-full ${colors.gradients.blueToBlue}  `}
                />
              </Link>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center ml-8 space-x-6">
            {/* Notifications */}
            {/* <button className="relative p-1 text-gray-600 transition-colors duration-200 hover:text-gray-900">
              <IoNotificationsCircleOutline
                className={`${colors.gradients.violetToBlue} text-5xl text-white rounded-full`}
              />
              <div className="flex absolute top-0 right-0 justify-center items-center w-5 h-5 bg-red-300 rounded-full">
                <span className="font-semibold text-white text-ms">0</span>
              </div>
            </button> */}

            {/* User Profile */}
            <div className="relative">
              <div
                className={`flex items-center space-x-2 text-gray-600 hover:text-gray-900 p-1  rounded-full  transition-colors duration-200 cursor-pointer ${colors.gradients.blueToBlue}`}
                onClick={() => setOpenMenu(true)}
              >
                {user?.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt="User avatar"
                    className="object-cover w-14 h-14 rounded-full"
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

    </header>
  );
};

export default Header;
