import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import colors from "../style/colors";
import InputField from "../components/InputField";
import { useEffect, useState } from "react";
import { FcAddImage, FcFeedback, FcImageFile } from "react-icons/fc";
import { MdDescription } from "react-icons/md";
import LoadingBtn from "../components/LoadingBtn";
import { uploadImage } from "../utils/imageUploader";
import { PiCursorClick } from "react-icons/pi";
import { toast } from "react-toastify";
import SummaryApi from "../common/SummaryApi";

export default function RegisterShop() {
  const { data: user } = useSelector((state) => state.user);
  const [data, setData] = useState({
    name: "",
    description: "",
    logo_url: "",
    banner_url: "",
    user_id: user.id,
  });
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingImageBanner, setLoadingImageBanner] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [checkRegisterShop, setCheckRegisterShop] = useState(false);

  const isRegisterShop = async () => {
    const response = await fetch(SummaryApi.checkRegisterShop.url, {
      method: SummaryApi.checkRegisterShop.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: user.id }),
    });
    const dataResponse = await response.json();

    if (dataResponse.error) {
      toast.warning(dataResponse.message);
      setCheckRegisterShop(true);
    } else if (dataResponse.success) {
      setCheckRegisterShop(false);
    }
  };
  useEffect(() => {
    isRegisterShop();
  }, [isLoading]);

  const uploadImageLogoShop = async (e) => {
    setLoadingImage(true);
    const file = e.target.files[0];
    const url = await uploadImage(file);
    if (url) {
      setData((prev) => ({ ...prev, logo_url: url }));
    }
    setLoadingImage(false);
  };
  const uploadImageBannerShop = async (e) => {
    setLoadingImageBanner(true);
    const file = e.target.files[0];
    const url = await uploadImage(file);
    if (url) {
      setData((prev) => ({ ...prev, banner_url: url }));
    }
    setLoadingImageBanner(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(SummaryApi.registerShop.url, {
        method: SummaryApi.registerShop.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const dataResponse = await response.json();

      if (dataResponse.success) {
        toast("Đã đăng kí thành công vui lòng chờ admin duyệt");
      } else if (dataResponse.error) {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error(error.dataResponse.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-2 lg:mt-3 ">
      <div className="bg-white shadow-2xl rounded-xl shadow-blue-100 p-2 sm:p-3 md:p-4 lg:p-5 ">
        {checkRegisterShop ? (
          <div className="flex flex-col items-center justify-center p-8 space-y-6 text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-blue-50 rounded-full flex items-center justify-center">
              <svg
                className="md:w-10 md:h-10 lg:w-12 lg:h-12 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800">
              Đăng ký của bạn đã được gửi!
            </h3>
            <p className="text-gray-600 max-w-md">
              Cảm ơn bạn đã đăng ký bán hàng. Vui lòng chờ Admin duyệt hồ sơ của
              bạn. Bạn sẽ nhận được thông báo ngay sau khi hồ sơ được xét duyệt.
            </p>
            <Link
              to="/"
              className="px-3 py-1 md:px-5 md:py-1.5 lg:px-8 lg:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg"
            >
              Trở về trang chủ
            </Link>
          </div>
        ) : (
          <div>
            <div className="border-b-2 p-2 border-blue-50">
              <h2
                className={`${colors.textColors.gradientIndigoToTeal} text-lg   md:text-xl lg:text-2xl xl:text-3xl font-semibold`}
              >
                Đăng kí bán hàng
              </h2>
              <p className="text-gray-400 mt-2 text-xs sm:text-base">
                Vui lòng nhập đầy đủ thông tin bên dưới
              </p>
            </div>
            <form className="mt-1 md:mt-2 lg:mt-3 p-5" onSubmit={handleSubmit}>
              <InputField
                label="Nhập tên shop"
                name="name"
                id="name"
                type="text"
                placeholder="Nhập tên shop"
                value={data.email}
                onChange={handleChange}
                required
                icon={FcFeedback}
              />
              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="block text-base sm:text-lg font-medium text-gray-700 mb-3"
                >
                  Mô tả shop
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-start pt-3 pointer-events-none">
                    <MdDescription className="h-6 w-6 text-blue-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                  </div>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Nhập mô tả shop"
                    value={data.description}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                focus:ring-2 focus:ring-blue-100 focus:border-blue-400
                hover:border-blue-300
                outline-none transition-all duration-200
                placeholder:text-gray-400 text-gray-700
                resize-y min-h-[120px]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 mb-5 items-center mt-3">
                <div className="w-[35%]  ">
                  <label
                    htmlFor="logo_url"
                    className=" text-base sm:text-lg font-medium text-gray-700 mb-2 flex items-center gap-2 cursor-pointer hover:text-gray-900 transition-colors"
                    title="Click here"
                  >
                    <PiCursorClick className="text-blue-300 text-3xl" />

                    <span className=" text-base sm:text-lg">
                      Chọn ảnh logo shop
                    </span>
                  </label>
                  <div className="mt-2">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-30 md:h-30 lg:w-36 lg:h-36 bg-gray-50  border-dotted border-2 border-blue-200 rounded-xl overflow-hidden flex items-center justify-center">
                      {data?.logo_url ? (
                        <img
                          src={data.logo_url}
                          alt="Shop image"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <p className="text-gray-500 text-center text-sm">
                          {loadingImage ? "Đang tải ảnh..." : "Chưa có ảnh"}
                        </p>
                      )}
                    </div>
                    <input
                      type="file"
                      name="logo_url"
                      id="logo_url"
                      accept="image/*"
                      className="hidden"
                      onChange={uploadImageLogoShop}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="banner_url"
                    className="text-lg font-medium text-gray-700 mb-2 flex items-center gap-2 cursor-pointer hover:text-gray-900 transition-colors"
                    title="Click here"
                  >
                    <FcAddImage size={32} className="" />
                    <spa className="text-base sm:text-lg">
                      Chọn ảnh banner shop
                    </spa>
                  </label>
                  <div className="mt-2">
                    <div className="w-full lg:h-36 h-24  sm:h-28 md:h-30 bg-gray-50 border-dotted border-2 border-blue-200  rounded-xl overflow-hidden flex items-center justify-center">
                      {data?.banner_url ? (
                        <img
                          src={data.banner_url}
                          alt="Shop image"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <p className="text-gray-500 text-center text-sm">
                          {loadingImageBanner
                            ? "Đang tải ảnh..."
                            : "Chưa có ảnh"}
                        </p>
                      )}
                    </div>
                    <input
                      type="file"
                      name="banner_url"
                      id="banner_url"
                      accept="image/*"
                      className="hidden"
                      onChange={uploadImageBannerShop}
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className={`w-full ${
                  colors.gradients.blueToPurple
                } text-white py-3 rounded-lg font-medium transform hover:-translate-y-0.5 transition-all duration-200 ${
                  isLoading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:opacity-90 hover:shadow-lg"
                }`}
                disabled={isLoading}
              >
                {isLoading ? <LoadingBtn /> : "Đăng kí"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
