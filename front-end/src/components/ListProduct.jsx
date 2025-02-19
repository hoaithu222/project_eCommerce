import React, { useEffect, useState } from "react";
import {
  FaFireAlt,
  FaClock,
  FaChartLine,
  FaSortAmountUp,
  FaSortAmountDown,
  FaSpinner,
} from "react-icons/fa";
import Pagination from "./Pagination";
import ProductItem from "./ProductItem";
import SummaryApi from "../common/SummaryApi";
import LoadingSkeleton from "./LoadingSkeleton";

export default function ListProduct({
  title,
  fetchData,
  setTitle,
  subCategory = [],
}) {
  const [products, setProduct] = useState([]);

  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("id");
  const [order, setOrder] = useState("asc");
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const sortOptions = [
    {
      key: "id",
      label: "Phổ biến",
      icon: <FaFireAlt />,
      orderBy: "asc",
    },
    {
      key: "created_at",
      label: "Mới nhất",
      icon: <FaClock />,
      orderBy: "desc",
    },
    {
      key: "sales_count",
      label: "Bán chạy",
      icon: <FaChartLine />,
      orderBy: "desc",
    },
    {
      key: "base_price",
      label: "Giá thấp",
      icon: <FaSortAmountUp />,
      orderBy: "asc",
    },
    {
      key: "base_price",
      label: "Giá cao",
      icon: <FaSortAmountDown />,
      orderBy: "desc",
    },
  ];

  const fetchProduct = async () => {
    if (subCategory.length !== 0) {
      setLoading(true);
      try {
        const response = await fetch(
          `${SummaryApi.getProductWithSubCategory.url}?_page=${currentPage}&_limit=${limit}&_order=${order}&_sort=${sort}`,
          {
            method: SummaryApi.getProductWithSubCategory.method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(subCategory),
          },
        );

        const data = await response.json();

        const newProduct = data.data.filter(
          (product) => product.is_active === true,
        );

        setProduct(newProduct);

        setCount(data.count);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [limit, currentPage, sort, order, subCategory]);

  const handleSortChange = (option) => {
    setSort(option.key);
    setOrder(option.orderBy);
  };

  const totalPage = Math.ceil(count / limit);
  if (loading) {
    return (
      <div className="container mx-auto py-4">
        <div className="overflow-hidden">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-pink-400 to-blue-400 p-2 lg:p-4 text-white">
        <div className="flex items-center justify-between">
          <h3 className="text-md md:text-xl lg:text-2xl font-bold">
            {title ? `Danh sách sản phẩm thuộc ${title}` : "Tất cả sản phẩm"}
          </h3>
          <button
            onClick={() => {
              fetchData();
              setTitle("");
            }}
            className="px-1.5 py-0.5 lg:px-4 lg:py-2 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
          >
            Hiển thị hết
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 border-b pb-3">
          <span className="text-gray-600 font-medium">Sắp xếp theo:</span>

          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 hidden-scrollbar">
            <div className="flex gap-2 min-w-max">
              {sortOptions.map((option, index) => (
                <button
                  key={`${option.key}-${index}`}
                  onClick={() => handleSortChange(option)}
                  className={`
            flex items-center gap-2 px-3 py-1 rounded-full whitespace-nowrap
            ${
              sort === option.key && order === option.orderBy
                ? "bg-pink-500 text-white"
                : "text-gray-600 hover:bg-blue-100"
            }
            transition-colors
          `}
                >
                  {option.icon}
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {products?.length ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-10">
            Hiện tại chưa có sản phẩm
          </div>
        )}
        {totalPage > 1 && (
          <div className="mt-6 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
