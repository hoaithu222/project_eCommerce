import { useEffect, useState } from "react";
import colors from "../style/colors";
import { FcCancel, FcCheckmark, FcShop, FcViewDetails } from "react-icons/fc";
import SummaryApi from "../common/SummaryApi";

import { toast } from "react-toastify";
import ConfirmActive from "../components/ConfirmActive";
import ViewShop from "../components/ViewShop";
import Loading from "./Loading";

export default function Shop() {
  const [shops, setShop] = useState([]);
  const [openConfirmBoxActive, setOpenConfirmBoxActive] = useState(false);
  const [openConfirmBoxDeactive, setOpenConfirmBoxDeactive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openViewShop, setOpenViewShop] = useState(false);
  const [shopActive, setShopActive] = useState();
  const [shopDeactive, setShopDeactive] = useState();
  const [shopView, setShopView] = useState();
  const token = localStorage.getItem("accessToken");

  const fetchShop = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.getShop.url, {
        method: SummaryApi.getShop.method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setShop(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShop();
  }, []);

  const handleClose = () => {
    setOpenConfirmBoxActive(false);
    setOpenConfirmBoxDeactive(false);
    setOpenViewShop(false);
  };
  const handleActive = async () => {
    const response = await fetch(
      `${SummaryApi.updateActiveShop.url}/${shopActive}/active`,
      {
        method: SummaryApi.updateActiveShop.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          is_verified: true,
        }),
      }
    );
    const data = await response.json();
    if (data.success) {
      setOpenConfirmBoxActive(false);
      toast.success(`Kích hoạt shop ${data.data.name} thành công`);
      fetchShop();
    }
  };
  const handleDeactivate = async () => {
    const response = await fetch(
      `${SummaryApi.updateActiveShop.url}/${shopDeactive}/active`,
      {
        method: SummaryApi.updateActiveShop.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          is_verified: false,
        }),
      }
    );
    const data = await response.json();
    if (data.success) {
      setOpenConfirmBoxDeactive(false);
      toast.success(`Vô hiệu hóa shop ${data.data.name} thành công`);
      fetchShop();
    }
  };

  return (
    <div className="m-5 ">
      {/* Header Section - Enhanced */}
      <div className="bg-white shadow-xl p-5 rounded-2xl flex items-center space-x-6 transform transition-all duration-300 mb-5">
        <div className="p-3 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl">
          <FcShop className="text-4xl" />
        </div>
        <h2
          className={`${colors.textColors.gradientBlueToYellow} text-2xl font-bold tracking-tight`}
        >
          Quản lý các shop
        </h2>
      </div>

      {/* Table Section - Enhanced */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-600">
            <thead className="bg-gradient-to-r from-purple-500 via-purple-400 to-blue-500 text-white">
              <tr>
                <th className="px-6 py-5 text-left font-semibold">Logo</th>
                <th className="px-6 py-5 text-left font-semibold">Tên shop</th>
                <th className="px-6 py-5 text-left font-semibold">
                  Thông tin chi tiết
                </th>
                <th className="px-6 py-5 text-left font-semibold">
                  Trạng thái
                </th>
                <th className="px-6 py-5 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {shops?.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors duration-300"
                >
                  <td className="px-6 py-4">
                    <div className="relative group">
                      <img
                        src={item.logo_url}
                        alt={`${item.name} logo`}
                        className="w-14 h-14 rounded-xl border-2 border-gray-200 object-cover transform group-hover:scale-105 transition-all duration-300 hover:shadow-lg"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800 mb-1">
                      {item.name}
                    </div>
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                      ID: {item.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="line-clamp-2 text-gray-500 max-w-md hover:line-clamp-none transition-all duration-300">
                      {item.description}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    {item.is_verified ? (
                      <span className="text-green-300 font-b">
                        Đã kích hoạt
                      </span>
                    ) : (
                      <span className="text-red-400">Chưa kích hoạt</span>
                    )}
                  </td>
                  <td className="px-6 py-4 flex gap-4">
                    {item.is_verified ? (
                      <button
                        className="flex items-center gap-2 px-5 py-2.5 bg-red-400 text-white rounded-xl hover:bg-red-500 transition-all duration-300 text-sm shadow-md hover:shadow-xl group"
                        onClick={() => {
                          setOpenConfirmBoxDeactive(true);
                          setShopDeactive(item.id);
                        }}
                      >
                        <FcCancel className="text-xl transform group-hover:rotate-12 transition-transform duration-300" />
                        <span>Vô hiệu hóa</span>
                      </button>
                    ) : (
                      <button
                        className="flex items-center gap-2 px-5 py-2.5 bg-green-400 text-white rounded-xl hover:bg-green-500 transition-all duration-300 text-sm shadow-md hover:shadow-xl group"
                        onClick={() => {
                          setOpenConfirmBoxActive(true);
                          setShopActive(item.id);
                        }}
                      >
                        <FcCheckmark className="text-xl transform group-hover:scale-110 transition-transform duration-300" />
                        <span>Kích hoạt</span>
                      </button>
                    )}
                    <button
                      className="flex items-center gap-2 px-5 py-2.5 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-all duration-300 text-sm shadow-md hover:shadow-xl group"
                      onClick={() => {
                        setOpenViewShop(true);
                        setShopView(item);
                      }}
                    >
                      <FcViewDetails className="text-xl transform group-hover:scale-110 transition-transform duration-300" />
                      <span>Xem chi tiết</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {openConfirmBoxActive && (
        <ConfirmActive
          mode="activate"
          cancel={handleClose}
          close={handleClose}
          confirm={handleActive}
        />
      )}
      {openConfirmBoxDeactive && (
        <ConfirmActive
          mode="deactivate"
          cancel={handleClose}
          close={handleClose}
          confirm={handleDeactivate}
        />
      )}
      {openViewShop && <ViewShop close={handleClose} data={shopView} />}
    </div>
  );
}
