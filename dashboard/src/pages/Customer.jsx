import { useEffect, useState } from "react";
import { FaSearchengin } from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";

import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import colors from "../style/colors";

import { useDispatch } from "react-redux";
import { updateUserRole } from "../store/actions/updateUserRole";
import SummaryApi from "../common/SummaryApi";
import { toast } from "react-toastify";

import Pagination from "../components/Pagination";
import Loading from "./Loading";

export default function Customer() {
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

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
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="p-6 mb-4 bg-white rounded-xl shadow-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            Customer Management
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search attribute..."
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
            <option value={16}>16 items</option>
            <option value={24}>24 items</option>
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
      {/* Content Section */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 rounded-full border-4 border-purple-500 animate-spin border-t-transparent"></div>
        </div>
      ) : (
        <div className="overflow-hidden bg-white rounded-xl shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-400 to-blue-400">
                <tr>
                  <th className="p-4 font-semibold text-left text-white">ID</th>
                  <th className="p-4 font-semibold text-left text-white">
                    Name
                  </th>
                  <th className="p-4 font-semibold text-left text-white">
                    Email
                  </th>
                  <th className="p-4 font-semibold text-left text-white">
                    Role
                  </th>
                  <th className="p-4 font-semibold text-left text-white">
                    Trạng thái
                  </th>

                  <th className="p-4 font-semibold text-left text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data?.map((item, index) => (
                  <tr
                    key={`${item.id}-${index}`}
                    className="transition-colors hover:bg-gray-50"
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
                      <span className={`px-4 py-1 text-sm font-medium rounded-full ${item.role === "Admin"
                        ? "text-purple-600 bg-purple-100"
                        : item.role === "Shop"
                          ? "text-blue-600 bg-blue-100"
                          : "text-gray-600 bg-gray-100"
                        }`}>
                        {item.role || "User"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {item.verifyEmail ? (
                        <span className="px-4 py-1 text-sm font-medium text-green-600 bg-green-100 rounded-full">
                          Verified
                        </span>
                      ) : (
                        <span className="px-4 py-1 text-sm font-medium text-red-600 bg-red-100 rounded-full">
                          Unverified
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedUser(item);
                            setSelectedRole(item.role || "User");
                            setShowRoleModal(true);
                          }}
                          className="flex gap-2 items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
                        >
                          <MdAdminPanelSettings className="text-lg" />
                          Update Role
                        </button>
                      </div>
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

      {/* Role Update Modal */}
      {showRoleModal && selectedUser && (
        <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-50">
          <div className="p-8 mx-4 w-full max-w-md bg-white rounded-2xl shadow-2xl">
            <h3 className="mb-4 text-2xl font-bold text-gray-800">
              Cập nhật quyền người dùng
            </h3>
            <p className="mb-6 text-gray-600">
              Chọn quyền mới cho <strong>{selectedUser.username}</strong>
            </p>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Role hiện tại: <span className="text-blue-600">{selectedUser.role || "User"}</span>
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-4 py-3 w-full rounded-xl border-2 border-gray-300 transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="User">User</option>
                <option value="Shop">Shop</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowRoleModal(false);
                  setSelectedUser(null);
                  setSelectedRole("");
                }}
                className="flex-1 px-4 py-3 font-medium text-gray-700 bg-gray-100 rounded-xl transition-colors hover:bg-gray-200"
              >
                Hủy
              </button>
              <button
                onClick={async () => {
                  if (selectedRole === selectedUser.role) {
                    toast.info("Role không thay đổi");
                    setShowRoleModal(false);
                    return;
                  }

                  const result = await dispatch(
                    updateUserRole(selectedUser.id, selectedRole)
                  );

                  if (result.success) {
                    toast.success(result.message || "Cập nhật role thành công!");
                    setShowRoleModal(false);
                    setSelectedUser(null);
                    setSelectedRole("");
                    fetchData(); // Refresh data
                  } else {
                    toast.error(result.message || "Có lỗi xảy ra khi cập nhật role");
                  }
                }}
                className="flex-1 px-4 py-3 font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl transition-all hover:shadow-lg hover:scale-105"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
