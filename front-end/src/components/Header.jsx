import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaCartPlus } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import logo from "../assets/logo.png";

import Search from "./Search";
import useMobile from "../hooks/useMobile";

import colors from "../style/colors";
import Loading from "../pages/Loading";
import UserMenu from "./UserMenu";

export default function Header() {
  const isMobile = useMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const isSearchPage = location.pathname === "/search";
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const { data: user, loading } = useSelector((state) => state.user);
  const { count } = useSelector((state) => state.cart);

  const handleUserClick = () => {
    if (!user.id) {
      navigate("/login");
      return;
    }

    if (isMobile) {
      navigate("/user-menu");
    } else {
      setOpenUserMenu(!openUserMenu);
    }
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-50 p-3 bg-white shadow-md h-25">
      {!(isMobile && isSearchPage) && (
        <div className="container flex justify-between items-center mx-auto h-full">
          <Link
            to="/"
            className="overflow-hidden w-10 h-10 rounded-md sm:w-12 sm:h-12 md:w-16 md:h-16 xl:w-18 xl:h-18"
          >
            <img src={logo} alt="logo" className="object-cover w-full h-full" />
          </Link>

          <div className="hidden md:block">
            <Search />
          </div>

          <div className="flex gap-4 justify-between items-center">
            {isMobile ? (
              <div className="flex gap-3 items-center text-lg text-gray-500">
                <Link className="relative" to="/cart">
                  <FaCartPlus className="text-3xl text-sky-600 md:text-4xl" />
                  <div className="flex absolute -top-1 -right-1 justify-center items-center w-4 h-4 bg-red-400 rounded-full md:-top-2 md:-right-2 md:w-5 md:h-5">
                    <span className="text-xs text-white md:text-sm">
                      {count}
                    </span>
                  </div>
                </Link>
                {user?.avatar_url ? (
                  <div
                    className={`${colors.gradients.blueToOrange} rounded-full p-0.5 w-8 h-8 md:w-12 md:h-12`}
                    onClick={handleUserClick}
                  >
                    <img
                      src={user.avatar_url}
                      alt="avatar"
                      className="object-cover w-full h-full rounded-full"
                    />
                  </div>
                ) : (
                  <FaRegCircleUser
                    className="text-2xl text-blue-300 md:text-4xl"
                    onClick={handleUserClick}
                  />
                )}
              </div>
            ) : (
              <div className="flex gap-3 items-center">
                <Link className="relative" to="/cart">
                  <FaCartPlus className="text-4xl text-sky-600" />
                  <div className="flex absolute -top-2 -right-2 justify-center items-center w-5 h-5 bg-red-400 rounded-full">
                    <span className="text-sm text-white">{count}</span>
                  </div>
                </Link>

                {user?.id ? (
                  <div className="relative">
                    <div
                      className="flex gap-1 items-center transition-colors cursor-pointer hover:text-gray-700"
                      onClick={handleUserClick}
                    >
                      {user?.avatar_url ? (
                        <div
                          className={`${colors.gradients.blueToOrange} w-8 h-8 md:w-12 md:h-12 rounded-full p-0.5`}
                        >
                          <img
                            src={user.avatar_url}
                            alt="avatar"
                            className="object-cover w-full h-full rounded-full"
                          />
                        </div>
                      ) : (
                        <FaRegCircleUser className="text-4xl text-blue-300" />
                      )}
                    </div>
                    {openUserMenu && (
                      <div className="absolute right-0 top-12 z-50">
                        <UserMenu onClose={() => setOpenUserMenu(false)} />
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className={`${colors.button.gradientFrostToFlame} ${colors.button.medium}`}
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="container flex justify-center mx-auto mt-4 md:hidden">
        <Search />
      </div>

    </header>
  );
}
