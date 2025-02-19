import React, { useEffect, useState } from "react";
import { BsSearchHeart } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import useMobile from "../hooks/useMobile";
import { FaArrowCircleLeft } from "react-icons/fa";

const Search = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setSearchPage] = useState(false);
  const isMobile = useMobile();

  useEffect(() => {
    const isOnSearchPage = location.pathname === "/search";
    setSearchPage(isOnSearchPage);
  }, [location]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/search?q=${searchValue}`);
    }
  };

  const handleSearchClick = () => {
    if (!isSearchPage) {
      navigate("/search");
    } else if (searchValue) {
      navigate(`/search?q=${searchValue}`);
    }
  };

  return (
    <div
      className="w-96"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative overflow-hidden
          rounded-full border-2 border-dotted border-white
          bg-gradient-to-r from-blue-500 to-pink-500
          transition-all duration-300 ease-in-out
          ${isHovered ? "shadow-lg scale-105" : ""}
        `}
      >
        <div className="flex items-center px-1.5 py-0.5  lg:px-3 lg:py-1">
          {!(isMobile && isSearchPage) ? (
            <BsSearchHeart
              onClick={handleSearchClick}
              className={`
              text-white   text-lg  lg:text-2xl cursor-pointer
              transition-transform duration-300
              ${isHovered ? "scale-110" : ""}
            `}
            />
          ) : (
            <Link to="/">
              <FaArrowCircleLeft className="text-white text-lg lg:text-2xl" />
            </Link>
          )}

          {!isSearchPage ? (
            <div className="relative flex-1" onClick={handleSearchClick}>
              <TypeAnimation
                sequence={[
                  "Hãy tìm kiếm quần áo cho nam",
                  1500,
                  "Hãy tìm kiếm đồ công nghệ",
                  1500,
                  "Hãy tìm kiếm giày dép",
                  1500,
                  "Hãy tìm kiếm đồ công nghệ",
                  1500,
                  "Hãy tìm kiếm đồ gia dụng",
                  1500,
                  "Hãy tìm kiếm đồ thời trang nữ",
                  1500,
                  "Hãy tìm kiếm sách",
                  1500,
                  "Hãy tìm kiếm đồ balo",
                  1500,
                ]}
                wrapper="span"
                speed={50}
                className="ml-4 text:xs sm:text-sm lg:text-lg text-white font-medium"
                repeat={Infinity}
                cursor={true}
                style={{
                  display: "inline-block",
                  minWidth: "200px",
                }}
              />
              <div
                className={`
                  absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                  transition-transform duration-1000 ease-in-out
                  ${isHovered ? "translate-x-full" : "-translate-x-full"}
                `}
              />
            </div>
          ) : (
            <div
              className="flex items-center flex-1 ml-3"
              onClick={handleSearchClick}
            >
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleSearch}
                autoFocus
                placeholder="Nhập từ khóa tìm kiếm..."
                className="w-full bg-transparent text-white placeholder-white/70 outline-none text:xs sm:text-sm lg:text-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
