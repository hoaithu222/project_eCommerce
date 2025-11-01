import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FcCellPhone, FcCheckmark, FcFeedback } from "react-icons/fc";
import { toast } from "react-toastify";
import InputField from "../components/InputField";
import LoadingBtn from "../components/LoadingBtn";
import SummaryApi, { baseURL } from "../common/SummaryApi";
import { fetchUser } from "../store/actions/fetchUser";
import { uploadImage } from "../utils/imageUploader";

const Profile = () => {
  const dispatch = useDispatch();
  const { data: user } = useSelector((state) => state.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    avatar_url: "",
  });
  useEffect(() => {
    if (user) {
      setFormData({
        fullname: user.full_name || "",
        phone: user.phone || "",
        avatar_url: user.avatar_url || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const uploadImageProfile = async (e) => {
    const file = e.target.files[0];

    setIsUploading(true);
    const url = await uploadImage(file);
    if (url) {
      setFormData((prev) => ({
        ...prev,
        avatar_url: url,
      }));
    }
    setIsUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${baseURL}/users/update/${user.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          full_name: formData.fullname,
          phone: formData.phone,
          avatar_url: formData.avatar_url,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Lỗi khi cập nhật thông tin");
      }

      const data = await response.json();
      toast.success("Cập nhật thông tin thành công!");
      dispatch({
        type: "update_user",
        payload: data.data,
      });
      dispatch(fetchUser());
    } catch (error) {
      toast.error(error.message || "Có lỗi xảy ra khi cập nhật thông tin");
      console.error("Update error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="p-4 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 md:p-6">
      <div className="overflow-hidden mx-auto my-auto max-w-5xl bg-white rounded-xl shadow-lg">
        {/* Header */}
        <div className="p-6 border-b-2 border-gray-100">
          <h2 className="text-2xl font-bold text-transparent text-gray-800 bg-clip-text bg-gradient-to-tl from-blue-500 to-blue-500 md:text-3xl">
            Hồ sơ của tôi
          </h2>
          <p className="mt-2 text-sm text-gray-600 md:text-base">
            Quản lý thông tin hồ sơ để bảo mật tài khoản
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-3">
          {/* Form Section */}
          <div className="order-2 pr-6 border-gray-100 lg:col-span-2 lg:border-r lg:order-1">
            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                label="Tên đăng nhập"
                name="username"
                value={user?.username || ""}
                icon={FcCheckmark}
                isReadOnly
                className="bg-gray-50"
              />
              <InputField
                label="Họ tên"
                name="fullname"
                value={formData.fullname}
                onChange={handleInputChange}
                icon={MdDriveFileRenameOutline}
                placeholder="Vui lòng cập nhật họ tên"
                required
              />
              <InputField
                label="Email"
                name="email"
                value={user?.email || ""}
                icon={FcFeedback}
                isReadOnly
                className="bg-gray-50"
              />
              <InputField
                label="Số điện thoại"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                icon={FcCellPhone}
                placeholder="Vui lòng cập nhật số điện thoại"
                pattern="[0-9]*"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-tr from-purple-500 to-blue-300 text-white py-3 px-6 rounded-lg font-medium 
                         transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg
                         disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? <LoadingBtn /> : "Lưu thay đổi"}
              </button>
            </form>
          </div>

          {/* Avatar Section */}
          <div className="flex flex-col order-1 justify-start items-center py-6 lg:col-span-1 lg:order-2">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-tl from-blue-400 to-purple-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-200"></div>
              <div className="relative p-1 bg-white rounded-full">
                {isUploading ? (
                  <div className="flex justify-center items-center w-32 h-32 bg-gray-100 rounded-full">
                    <LoadingBtn />
                  </div>
                ) : formData.avatar_url ? (
                  <img
                    src={formData.avatar_url}
                    alt="Avatar"
                    className="object-cover w-32 h-32 rounded-full"
                  />
                ) : (
                  <FaRegCircleUser className="w-32 h-32 text-gray-400" />
                )}
              </div>
            </div>

            <label htmlFor="avatar" className="mt-6 cursor-pointer group">
              <div
                className="px-6 py-2 font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
              >
                Chọn ảnh
              </div>
              <input
                type="file"
                id="avatar"
                className="hidden"
                accept="image/jpeg,image/png"
                onChange={uploadImageProfile}
                disabled={isUploading}
              />
            </label>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                Dung lượng file tối đa 1MB
              </p>
              <p className="text-sm text-gray-500">Định dạng: .JPEG, .PNG</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
