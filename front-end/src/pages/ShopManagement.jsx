import { IoAddCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import colors from "../style/colors";
import { MdPermDeviceInformation } from "react-icons/md";
import { MdOutlinePreview } from "react-icons/md";
import { FaEdit, FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import Input from "../components/Input";
import { FcCursor, FcOk } from "react-icons/fc";
import { IoCloudUploadSharp } from "react-icons/io5";
import { uploadImage } from "../utils/imageUploader";
import SummaryApi from "../common/SummaryApi";
import Loading from "./Loading";
import { toast } from "react-toastify";
import ViewShop from "../components/ViewShop";

export default function ShopManagement() {
  const { data: shop, count } = useSelector((state) => state.shop);

  const [data, setData] = useState({
    name: shop?.name,
    logo_url: shop?.logo_url,
    description: shop?.description,
    banner_url: shop?.banner_url,
  });
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  useEffect(() => {
    if (shop) {
      setData({
        name: shop.name || "",
        logo_url: shop.logo_url || "",
        description: shop.description || "",
        banner_url: shop.banner_url || "",
      });
    }
  }, [shop]);
  const handleUploadLogo = async (e) => {
    const file = e.target.files[0];

    const url = await uploadImage(file);

    if (url) {
      setData((prev) => ({
        ...prev,
        logo_url: url,
      }));
    }
  };
  const handleUploadBanner = async (e) => {
    const file = e.target.files[0];

    const url = await uploadImage(file);

    if (url) {
      setData((prev) => ({
        ...prev,
        banner_url: url,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    try {
      setLoading(true);
      const response = await fetch(`${SummaryApi.updateShop.url}/${shop.id}`, {
        method: SummaryApi.updateShop.method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const dataResponse = await response.json();
      if (dataResponse.success) {
        toast.success("Bạn đã cập nhật thông tin thành công");
        dispatch({ type: "update_shop", payload: dataResponse.data });
        setIsEdit(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-2 sm:p-3 md:p-4 lg:p-6">
      <div className="p-2 mb-2 bg-white rounded-xl shadow-lg sm:p-3 md:p-4 lg:p-6 sm:mb-3 md:mb-4 lg:mb-6">
        <div className="flex">
          <div className="flex items-center">
            <MdPermDeviceInformation className="text-xl text-purple-500 cursor-pointer md:text-2xl lg:text-3xl hover:rotate-2" />
            <h3
              className={` ${colors.textColors.gradientPurpleToYellow} text-xl font-bold`}
            >
              Thông tin cơ bản
            </h3>
          </div>
          <div className="flex gap-3 ml-auto">
            <div
              className={`${colors.gradients.greenToBlue} flex items-center text-white rounded-full px-3 py-1.5 cursor-pointer hover:scale-105`}
              onClick={() => setIsEdit(true)}
            >
              <FaEdit className="mr-1 text-lg lg:text-xl" />
              <button>Sửa thông tin shop</button>
            </div>
            {/* <div
              className={`${colors.gradients.blueToOrange} flex items-center text-white rounded-full px-3 py-1.5 cursor-pointer  hover:scale-105`}
              onClick={() => setIsView(true)}
            >
              <MdOutlinePreview className="mr-1 text-lg lg:text-xl" />
              <button>Xem shop của tôi</button>
            </div> */}
          </div>
        </div>
      </div>
      <div className="p-5 mb-6 w-full bg-white rounded-xl shadow-sm shadow-blue-200">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <Input
            label="Tên shop"
            name="name"
            id="name"
            icon={FcOk}
            isView={isEdit}
            value={data.name}
            onChange={handleChange}
            required
          />
          <div className="flex gap-5 items-center mt-1">
            <label
              htmlFor="logo"
              className="block mb-2 text-lg font-medium text-gray-700"
            >
              Logo của shop
            </label>
            <div
              className={`${colors.gradients.sunrise} rounded-full p-0.5 relative cursor-pointer overflow-hidden `}
            >
              {isEdit && (
                <>
                  <label
                    className="absolute bottom-0 left-2 px-14 py-1 text-blue-400 bg-gray-300 cursor-pointer"
                    htmlFor="logo"
                  >
                    Sửa
                  </label>
                  <input
                    type="file"
                    name="logo_url"
                    id="logo"
                    hidden
                    onChange={handleUploadLogo}
                  />
                </>
              )}

              {data.logo_url ? (
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-30 md:h-30 lg:w-36 lg:h-36">
                  <img
                    src={data.logo_url}
                    alt="Logo"
                    className="object-cover w-full rounded-full"
                  />
                </div>
              ) : (
                <FaUserCircle className="w-24 h-24 text-gray-200 sm:w-28 sm:h-28 md:w-30 md:h-30 lg:w-36 lg:h-36" />
              )}
            </div>
            <ul className="list-item ml-2 list-disc text-gray-400">
              <li>
                Kích thước hình ảnh tiêu chuẩn: Chiều rộng 300px, Chiều cao
                300px
              </li>
              <li>Dung lượng file tối đa: 2.0MB</li>
              <li>Định dạng file được hỗ trợ: JPG,JPEG,PNG</li>
            </ul>
          </div>
          <div className="flex relative mt-4">
            <label
              htmlFor="banner"
              className="block mb-2 text-lg font-medium text-gray-700"
            >
              Banner của shop
            </label>
            {data.banner_url && (
              <img
                src={data.banner_url}
                alt="banner"
                className="object-cover ml-2 sm:w-56 md:h-24 md:w-72 md:h-32 lg:w-96 lg:h-36"
              />
            )}
            {isEdit && (
              <>
                <input
                  type="file"
                  name="banner_url"
                  id="banner"
                  hidden
                  onChange={handleUploadBanner}
                />
                <label htmlFor="banner">
                  <IoCloudUploadSharp className="absolute left-40 text-2xl text-red-400 cursor-pointer sm:text-3xl md:text-4xl lg:text-5xl hover:scale-105" />
                </label>
              </>
            )}
          </div>
          <div>
            <label
              className="block mb-2 text-base font-medium text-gray-700 lg:text-lg"
              htmlFor="description"
            >
              Mô tả shop
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Nhập mô tả danh mục"
              value={data.description}
              onChange={handleChange}
              required
              rows={3}
              className={` w-full pl-2 pr-3 py-1 ${isEdit && "bg-gray-50 border"} border-gray-200 rounded-xl
                focus:ring-2 focus:ring-blue-100 focus:border-blue-400
                hover:border-blue-300
                outline-none transition-all duration-200
                placeholder:text-gray-400 text-gray-700
                resize-y min-h-[120px]`}
            />
          </div>
          {isEdit && (
            <div className="flex gap-2 justify-center sm:gap-3 md:gap-4 lg:gap-5">
              <button
                className={`${colors.button.medium} ${colors.button.gradientCyanToIndigo}`}
              >
                Lưu
              </button>
              <button
                className={`${colors.button.medium} ${colors.button.gradientRedToYellow}`}
                onClick={() => setIsEdit(false)}
              >
                Hủy
              </button>
            </div>
          )}
        </form>
      </div>

      {isView && (
        <ViewShop close={() => setIsView(false)} data={shop} count={count} />
      )}
    </div>
  );
}
