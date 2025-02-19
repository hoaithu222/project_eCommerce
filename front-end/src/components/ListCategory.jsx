import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SummaryApi from "../common/SummaryApi";
import { Link } from "react-router-dom";

const ListCategory = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const getCategory = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.getAllCategory.url, {
        method: SummaryApi.getAllCategory.method,
      });
      const result = await response.json();
      if (result.success) {
        setCategory(result.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleScroll = (element) => {
    setShowLeftArrow(element.scrollLeft > 0);
    setShowRightArrow(
      element.scrollLeft < element.scrollWidth - element.clientWidth,
    );
  };

  const scroll = (direction) => {
    const container = document.getElementById("category-container");
    if (container) {
      const scrollAmount = direction === "left" ? -200 : 200;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setScrollPosition(container.scrollLeft + scrollAmount);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-2 lg:py-4 overflow-hidden">
        <div className="p-3 lg:p-6 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg">
          <div className="animate-pulse">
            <div className="h-2 w-32 sm:h-4 sm:w-40 lg:h-6 lg:w-48 bg-blue-200/50 rounded mb-6"></div>
            <div className="flex space-x-3 sm:space-x-4 lg:space-x-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <div key={i} className="flex flex-col items-center space-y-3">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-blue-100/50 rounded-full"></div>
                  <div className="h-2 w-14 sm:h-3 sm:w-16 lg:h-4 lg:w-20 bg-blue-100/50 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-2 lg:py-4 overflow-hidden px-4">
      <div className="p-3 lg:p-6 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg">
        <div className="mb-2 lg:mb-6 flex justify-between items-center">
          <h2 className="text-lg lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Danh mục sản phẩm
          </h2>
          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className={`p-1.5 lg:p-2.5 rounded-full transition-all duration-300 ${
                showLeftArrow
                  ? "bg-blue-100 hover:bg-blue-200 hover:shadow-md"
                  : "opacity-0 cursor-default"
              }`}
            >
              <ChevronLeft className="w-3 h-3 lg:w-5 lg:h-5 text-blue-600" />
            </button>
            <button
              onClick={() => scroll("right")}
              className={`p-1.5 lg:p-2.5 rounded-full transition-all duration-300 ${
                showRightArrow
                  ? "bg-blue-100 hover:bg-blue-200 hover:shadow-md"
                  : "opacity-0 cursor-default"
              }`}
            >
              <ChevronRight className="w-3 h-3 lg:w-5 lg:h-5 text-blue-600" />
            </button>
          </div>
        </div>

        <div
          id="category-container"
          className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6 overflow-x-auto hidden-scrollbar "
          onScroll={(e) => handleScroll(e.target)}
        >
          {category?.map((item, index) => (
            <Link
              to={`/${item.id}`}
              key={`${item.id}-${index}`}
              className="flex flex-col items-center min-w-[70px]lg:min-w-[144px] group cursor-pointer"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-blue-400 rounded-full blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-white to-blue-50 p-2 lg:p-3 mb-3 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-2 relative">
                  <div className="absolute inset-0 rounded-full bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img
                    src={item.icon_url}
                    alt={item.name}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 relative z-10"
                  />
                </div>
              </div>
              <div className="relative overflow-hidden">
                <h3 className="text-xs lg:text-sm font-medium text-blue-500 text-center whitespace-nowrap transition-all duration-300 group-hover:text-blue-600">
                  {item.name}
                </h3>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListCategory;
