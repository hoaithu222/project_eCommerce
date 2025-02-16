import { useEffect, useState } from "react";
import { IoMdAddCircleOutline, IoMdCreate, IoMdTrash } from "react-icons/io";
import { MdStars } from "react-icons/md";
import ModelAddAddress from "../components/ModelAddAddress";
import SummaryApi from "../common/SummaryApi";
import { toast } from "react-toastify";
import ModelEditAddress from "../components/ModelEditAddress";
import Loading from "./Loading";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser } from "../store/actions/fetchUser";
export default function Address() {
  const [openModelAdd, setOpenModelAdd] = useState(false);
  const [data, setData] = useState([]);
  const [openModelEdit, setOpenModelEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClose = () => {
    setOpenModelAdd(false);
  };
  const handleCloseEdit = () => {
    setOpenModelEdit(false);
  };
  const handleGoBack = () => {
    dispatch(fetchUser());
    navigate(-1);
  };

  const getAddress = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(SummaryApi.getAddress.url, {
        method: SummaryApi.getAddress.method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const dataResponse = await response.json();
      if (dataResponse.error) {
        toast.error("Lỗi khi lấy địa chỉ");
      } else {
        setData(dataResponse.data);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi kết nối với máy chủ", error);
    }
  };
  const handleDelete = async (id) => {
    setLoading(true);
    const response = await fetch(`${SummaryApi.deleteAddress.url}/${id}`, {
      method: SummaryApi.deleteAddress.method,
    });
    const dataResponse = await response.json();
    if (dataResponse.error) {
      toast.error("Lỗi khi xóa sản phẩm");
    } else if (dataResponse.success) {
      toast.success("Xóa sản phẩm thành công");
      getAddress();
    }
    setLoading(false);
  };
  const handleUpdateDefault = async (id) => {
    const token = localStorage.getItem("accessToken");
    try {
      setLoading(true);
      const response = await fetch(`${SummaryApi.updateAddress.url}/${id}`, {
        method: SummaryApi.updateAddress.method,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          is_default: true,
        }),
      });
      const responseData = await response.json();
      if (responseData.success) {
        toast.success("Cập nhật địa chỉ mặc định thành công");
        getAddress();
      } else {
        toast.error("Cập nhật địa chỉ thất bại");
      }
    } catch (error) {
      toast.error(`Có lỗi xảy ra khi cập nhật địa chỉ  ${error}`);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAddress();
  }, []);

  return (
    <section className="bg-white rounded-lg shadow-lg p-6 min-h-screen">
      <div className="flex justify-between items-center border-b border-gray-200 pb-6 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-lime-500 to-pink-500 bg-clip-text text-transparent">
          Địa chỉ của tôi
        </h2>
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500 to-yellow-500 text-white rounded-lg hover:opacity-90 transition-all duration-300"
            onClick={() => setOpenModelAdd(true)}
          >
            <IoMdAddCircleOutline className="text-xl animate-bounce" />
            <span>Thêm địa chỉ mới</span>
          </button>
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-300"
          >
            <IoMdArrowRoundBack className="text-xl" />
            <span>Quay lại</span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800">Địa chỉ</h3>
        <div className="space-y-4">
          {data?.map((address) => (
            <div
              key={address.id}
              className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap gap-4 items-center">
                  <h2 className="font-semibold text-gray-800 pr-4 border-r border-gray-300">
                    {address.recipient_name}
                  </h2>
                  <p className="text-gray-600">{address.phone}</p>
                </div>
                <p className="text-gray-600">
                  Số nhà {address.address_line2}, {address.address_line1}
                </p>
                <p className="text-gray-600">
                  {address.ward}, {address.district}, {address.city}
                </p>
                {address.is_default && (
                  <p className="text-sm font-medium text-green-600">
                    Địa chỉ mặc định
                  </p>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                <button
                  className="flex items-center gap-1 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-300"
                  onClick={() => {
                    setOpenModelEdit(true);
                    setDataEdit(address);
                  }}
                >
                  <IoMdCreate />
                  Cập nhật
                </button>
                {!address.is_default && (
                  <button
                    className="flex items-center gap-1 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-300"
                    onClick={() => handleDelete(address.id)}
                  >
                    <IoMdTrash />
                    Xóa
                  </button>
                )}
                {!address.is_default && (
                  <button
                    className="flex items-center gap-1 px-3 py-1.5 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors duration-300"
                    onClick={() => handleUpdateDefault(address.id)}
                  >
                    <MdStars />
                    Đặt mặc định
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {openModelAdd && (
        <ModelAddAddress onClose={handleClose} fetchData={() => getAddress()} />
      )}
      {openModelEdit && (
        <ModelEditAddress
          onClose={handleCloseEdit}
          fetchData={() => getAddress()}
          dataAddress={dataEdit}
        />
      )}
      {loading && <Loading />}
    </section>
  );
}
