import LoadingBtn from "./LoadingBtn";
import { IoClose } from "react-icons/io5";
import { FcAddImage, FcCheckmark } from "react-icons/fc";
import { useDispatch } from "react-redux";
import colors from "../style/colors";
import InputField from "./InputField copy";
import SummaryApi from "../common/SummaryApi";
import { toast } from "react-toastify";
import { MdDescription } from "react-icons/md";
import { useEffect, useState } from "react";
import { uploadImage } from "../utils/imageUploader";

export default function EditSubCategory({
  onClose,
  dataSubCategoryId,
  onSuccess,
}) {
  const [data, setData] = useState({
    id: dataSubCategoryId.id,
    name: dataSubCategoryId.name,
    category_id: dataSubCategoryId.category_id,
    icon_url: dataSubCategoryId.icon_url,
    description: dataSubCategoryId.description,
  });
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    name: "",
  });
  const [loadingImage, setLoadingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "name") {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
  };

  const uploadImageSubCategory = async (e) => {
    setLoadingImage(true);
    const file = e.target.files[0];
    const url = await uploadImage(file);
    if (url) {
      setData((prev) => ({ ...prev, icon_url: url }));
    }
    setLoadingImage(false);
  };
  const handleCategorySelect = (e) => {
    const selectedId = e.target.value;
    console.log(selectedId);
    if (!selectedId) return;

    setData((prev) => ({ ...prev, category_id: Number(selectedId) }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `${SummaryApi.editSubCategory.url}/${data.id}`,
        {
          method: SummaryApi.editSubCategory.method,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const dataResponse = await response.json();

      if (dataResponse.success) {
        toast.success("Bạn đã cập nhật danh mục thành công");
        dispatch({ type: "update_category", payload: dataResponse.data });
        onSuccess();
        onClose();
      } else {
        throw new Error(dataResponse.message || "Cập nhật không thành công");
      }
    } catch (error) {
      toast.error(error.message || "Đã xảy ra lỗi vui lòng thử lại sau");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(SummaryApi.getAllCategory.url, {
          method: SummaryApi.getAllCategory.method,
        });
        const result = await response.json();
        if (result.success) {
          setCategories(result.data);
        }
      } catch (error) {
        toast.error(error.message || "Failed to fetch categories");
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center px-4 md:px-52 lg:px-72">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-2xl text-gray-800">Sửa Danh Mục</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <IoClose size={24} className="text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Nhập tên danh mục"
            name="name"
            id="name"
            type="text"
            placeholder="Nhập tên danh mục"
            value={data.name}
            onChange={handleChange}
            required
            icon={FcCheckmark}
          />
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-700 mb-3"
            >
              Mô tả danh mục
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-start pt-3 pointer-events-none">
                <MdDescription className="h-6 w-6 text-pink-400 group-focus-within:text-pink-500 transition-colors duration-200" />
              </div>
              <textarea
                id="description"
                name="description"
                placeholder="Nhập mô tả danh mục"
                value={data.description}
                onChange={handleChange}
                required
                rows={5}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                focus:ring-2 focus:ring-pink-100 focus:border-pink-400
                hover:border-pink-300
                outline-none transition-all duration-200
                placeholder:text-gray-400 text-gray-700
                resize-y min-h-[120px]"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-lg font-medium text-gray-700">
              Select Category
            </label>
            <div className="border focus-within:border-pink-400 rounded-md">
              <select
                className="w-full bg-blue-50 border p-3 rounded-lg outline-none"
                onChange={(e) => {
                  handleCategorySelect(e);
                }}
                value={data.category_id || ""}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label
              htmlFor="icon_url"
              className="text-lg font-medium text-gray-700 mb-2 flex items-center gap-2 cursor-pointer hover:text-gray-900 transition-colors"
            >
              <FcAddImage size={32} className="animate-bounce" />
              <span>Tải ảnh lên</span>
            </label>
            <div className="mt-2">
              <div className="w-36 h-36 bg-gray-50 border border-gray-300 rounded-xl overflow-hidden flex items-center justify-center">
                {data?.icon_url ? (
                  <img
                    src={data.icon_url}
                    alt="Category preview"
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
                name="icon_url"
                id="icon_url"
                accept="image/*"
                className="hidden"
                onChange={uploadImageSubCategory}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || loadingImage}
            className={`w-full py-3 px-4 font-medium text-white rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none ${
              loading || loadingImage
                ? "bg-gray-400"
                : colors.button.gradientFrostToFlame
            }`}
          >
            {loading ? <LoadingBtn /> : "Cập nhật danh mục"}
          </button>
        </form>
      </div>
    </div>
  );
}
