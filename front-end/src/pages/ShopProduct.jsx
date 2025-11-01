import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchProductWithShop } from "../store/actions/fetchProductWithShop";
import Pagination from "../components/Pagination";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import colors from "../style/colors";
import { FaSearchengin } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import TableListProduct from "../components/TableListProduct";
import GridViewProduct from "../components/GridViewProduct";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

export default function ShopProduct() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [sortItem, setSortItem] = useState("id");
  const [order, setOrder] = useState("asc");
  const [viewList, setViewList] = useState(true);
  const {
    products,
    data: shop,
    count,
    loading,
  } = useSelector((state) => state.shop);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchData = () => {
    if (shop.id) {
      dispatch(
        fetchProductWithShop({
          _page: currentPage,
          _limit: itemsPerPage,
          _sort: sortItem,
          _order: order,
          q: search,
          shop_id: shop.id,
        }),
      );
    }
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [currentPage, itemsPerPage, sortItem, order, search, navigate]);
  const totalPages = Math.ceil(count / itemsPerPage);
  useEffect(() => {
    fetchData();
  }, [shop.id]);
  return (
    <div className="overflow-x-auto p-6 max-h-screen bg-gray-50">
      <div className="p-6 mb-4 bg-white rounded-xl shadow-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            Danh sách sản phẩm
          </h2>
          <div className="flex gap-3 items-center" title="Chế độ hiển thị">
            <div className="flex p-2 bg-gray-100 rounded-md cursor-pointer">
              <div
                className={`${viewList && "bg-white"} p-2 rounded-md`}
                onClick={() => setViewList(true)}
              >
                <MdOutlineFormatListBulleted
                  className={`${viewList && "text-red-500 "} text-3xl text-gray-600 `}
                />
              </div>
              <div
                className={`${!viewList && "bg-white"} p-2 rounded-md`}
                onClick={() => setViewList(false)}
              >
                <HiOutlineSquares2X2
                  className={`${!viewList && "text-red-500 "} text-3xl text-gray-600 `}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product..."
              className="py-2 pr-4 pl-10 w-full rounded-3xl border-2 border-blue-300 shadow-md transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-purple-200"
            />
            <FaSearchengin className="absolute left-3 top-1/2 text-xl text-purple-400 -translate-y-1/2" />
          </div>

          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-6 py-2 rounded-3xl border-2 border-blue-300 shadow-2xl outline-none focus:border-blue-400"
          >
            <option value={8}>8 items</option>
            <option value={12}>12 items</option>
          </select>

          {/* Sort */}
          <div className="flex gap-2">
            <select
              value={sortItem}
              onChange={(e) => setSortItem(e.target.value)}
              className="flex-1 px-4 py-2 rounded-3xl border-2 border-blue-300 outline-none focus:border-blue-400"
            >
              <option value="id">Sort by ID</option>
              <option value="name">Sort by Name</option>
              <option value="base_price">Sort by Price</option>
              <option value="stock_quantity">Sort by Stock</option>
              <option value="created_at">Sort by Date</option>
            </select>
            <button
              onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
              className={`px-2 py-2 border-2  border-gray-300 rounded-full  ${colors.gradients.blueToPurple}`}
            >
              {order === "asc" ? (
                <RiArrowUpSFill size={24} className="text-white" />
              ) : (
                <RiArrowDownSFill size={24} className="text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white">
        {viewList ? (
          <TableListProduct data={products} fetchData={fetchData} />
        ) : (
          <GridViewProduct data={products} fetchData={fetchData} />
        )}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

      </div>
    </div>
  );
}
