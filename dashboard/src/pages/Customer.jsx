import { useEffect, useState } from "react";
import { FaSearchengin } from "react-icons/fa6";

import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import colors from "../style/colors";

import { useDispatch, useSelector } from "react-redux";
import { fetchAttribute } from "../store/actions/fetchAttribute";
import SummaryApi from "../common/SummaryApi";
import { toast } from "react-toastify";

import Pagination from "../components/Pagination";
import Loading from "./Loading";

export default function Customer() {
  const [data, setData] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [sortItem, setSortItem] = useState("id");
  const [order, setOrder] = useState("asc");

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${SummaryApi.getUser.url}?_page=${currentPage}&&_limit=${itemsPerPage}&&_sort=${sortItem}&&_order=${order}&&q=${search}`,
        {
          method: SummaryApi.getUser.method,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const result = await response.json();
      if (result.success) {
        setData(result.data);
        setCount(result.count);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [currentPage, itemsPerPage, sortItem, order, search]);
  const totalPages = Math.ceil(count / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow-xl p-6 mb-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            Customer Management
          </h2>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search attribute..."
              className="w-full pl-10 pr-4 py-2 border-2 border-blue-300 rounded-3xl focus:border-pink-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none shadow-md"
            />
            <FaSearchengin className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 text-xl" />
          </div>

          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-6  py-2 border-2  border-blue-300 rounded-3xl focus:border-pink-400 outline-none shadow-2xl"
          >
            <option value={8}>8 items</option>
            <option value={12}>12 items</option>
            <option value={16}>16 items</option>
            <option value={24}>24 items</option>
          </select>

          {/* Sort */}
          <div className="flex gap-2">
            <select
              value={sortItem}
              onChange={(e) => setSortItem(e.target.value)}
              className="flex-1 px-4 py-2 border-2 border-blue-300 rounded-3xl focus:border-pink-400  outline-none"
            >
              <option value="id">Sort by ID</option>
              <option value="name">Sort by Name</option>
              <option value="created_at">Sort by Date</option>
            </select>
            <button
              onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
              className={`px-2 py-2 border-2  border-gray-300 rounded-full  ${colors.gradients.pinkToPurple}`}
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
      {/* Content Section */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-400 to-pink-400">
                <tr>
                  <th className="p-4 text-left text-white font-semibold">ID</th>
                  <th className="p-4 text-left text-white font-semibold">
                    Name
                  </th>
                  <th className="p-4 text-left text-white font-semibold">
                    Email
                  </th>
                  <th className="p-4 text-left text-white font-semibold">
                    Trạng thái
                  </th>

                  <th className="p-4 text-left text-white font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data?.map((item, index) => (
                  <tr
                    key={`${item.id}-${index}`}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 text-gray-600">#{item.id}</td>
                    <td className="p-4">
                      <div className="font-medium text-gray-800">
                        {item.username}
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-gray-600">{item.email}</p>
                    </td>

                    <td className="px-6 py-4">
                      {item.status === "active" ? (
                        <span className="px-4 py-1 text-sm text-green-600 bg-green-100 rounded-full font-medium">
                          Verified
                        </span>
                      ) : (
                        <span className="px-4 py-1 text-sm text-red-600 bg-red-100 rounded-full font-medium">
                          Unverified
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setOpenConfirm(true)}
                        className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-sm font-medium hover:scale-105"
                      >
                        Disable
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {loading && <Loading />}
    </div>
  );
}
