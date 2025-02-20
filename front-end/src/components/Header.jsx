import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaCartPlus } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import logo from "../assets/img/logo.png";

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
  const { data: user, loading, error } = useSelector((state) => state.user);
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
    <header className="h-25 shadow-md fixed top-0 left-0 right-0 p-3 z-50 bg-white">
      {!(isMobile && isSearchPage) && (
        <div className="container mx-auto flex items-center justify-between h-full">
          <Link
            to="/"
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 xl:w-18 xl:h-18"
          >
            <img src={logo} alt="logo" className="object-cover w-full h-full" />
          </Link>

          <div className="hidden md:block">
            <Search />
          </div>

          <div className="flex items-center justify-between gap-4">
            {isMobile ? (
              <div className="text-lg text-gray-500 flex items-center gap-3">
                <Link className="relative" to="/cart">
                  <FaCartPlus className=" text-3xl md:text-4xl text-sky-600" />
                  <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-4 h-4  md:w-5 md:h-5 bg-red-400 rounded-full flex items-center justify-center">
                    <span className="text-xs md:text-sm text-white">
                      {count}
                    </span>
                  </div>
                </Link>
                {user?.avatar_url ? (
                  <div
                    className={`${colors.gradients.pinkToOrange} rounded-full p-0.5`}
                    onClick={handleUserClick}
                  >
                    <img
                      src={user.avatar_url}
                      alt="avatar"
                      className="w-8 h-8 md:w-12 md:h-12 rounded-full"
                    />
                  </div>
                ) : (
                  <FaRegCircleUser
                    className="text-2xl md:text-4xl text-pink-300"
                    onClick={handleUserClick}
                  />
                )}
              </div>
            ) : (
              <div className="items-center gap-3 flex">
                <Link className="relative" to="/cart">
                  <FaCartPlus className="text-4xl text-sky-600" />
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-400 rounded-full flex items-center justify-center">
                    <span className="text-sm text-white">{count}</span>
                  </div>
                </Link>

                {user?.id ? (
                  <div className="relative">
                    <div
                      className="flex items-center gap-1 hover:text-gray-700 transition-colors cursor-pointer"
                      onClick={handleUserClick}
                    >
                      {user?.avatar_url ? (
                        <div
                          className={`${colors.gradients.pinkToOrange} rounded-full p-0.5`}
                        >
                          <img
                            src={user.avatar_url}
                            alt="avatar"
                            className="w-12 h-12 rounded-full"
                          />
                        </div>
                      ) : (
                        <FaRegCircleUser className="text-4xl text-pink-300" />
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

      <div className="container mx-auto flex justify-center md:hidden mt-4">
        <Search />
      </div>
      {loading && <Loading />}
    </header>
  );
}
