import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FcCheckmark, FcAddImage } from "react-icons/fc";
import { MdDescription } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import LoadingBtn from "./LoadingBtn";
import InputField from "./InputField";
import Loading from "../pages/Loading";
import SummaryApi from "../common/SummaryApi";
import { uploadImage } from "../utils/imageUploader";

export default function UploadSubCategoryModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    category_id: 0,
    icon_url: "",
    description: "",
    display_order: 1,
  });
  console.log(formData);

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState({
    form: false,
    image: false,
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setIsLoading((prev) => ({ ...prev, image: true }));

    const url = await uploadImage(file);

    if (url) {
      setFormData((prev) => ({ ...prev, icon_url: url }));
    }

    setIsLoading((prev) => ({ ...prev, image: false }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleCategorySelect = (e) => {
    const selectedId = e.target.value;
    console.log(selectedId);
    if (!selectedId) return;

    setFormData((prev) => ({ ...prev, category_id: Number(selectedId) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading((prev) => ({ ...prev, form: true }));

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(SummaryApi.addSubCategory.url, {
        method: SummaryApi.addSubCategory.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result);
      if (!result.success) throw new Error(result.message);

      dispatch({ type: "add_sub_category", payload: result.data });
      toast.success("Bạn đã cập nhật danh mục thành công");
      onSuccess?.();
      onClose?.();
    } catch (error) {
      toast.error(error.message || "Đã xảy ra lỗi vui lòng thử lại sau");
    } finally {
      setIsLoading((prev) => ({ ...prev, form: false }));
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
          <h2 className="font-semibold text-2xl text-gray-800">
            Thêm Danh Mục
          </h2>
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
            value={formData.name}
            onChange={handleInputChange}
            placeholder={"Nhập tên danh mục con"}
            error={errors.name}
            required
            icon={FcCheckmark}
          />

          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700 mb-3">
              Mô tả danh mục
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-start pt-3 pointer-events-none">
                <MdDescription className="h-6 w-6 text-pink-400 group-focus-within:text-pink-500 transition-colors duration-200" />
              </div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                focus:ring-2 focus:ring-pink-100 focus:border-pink-400
                hover:border-pink-300 outline-none transition-all duration-200
                placeholder:text-gray-400 text-gray-700 resize-y min-h-[120px]"
                placeholder="Nhập mô tả danh mục"
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
                value={formData.category_id || ""}
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

          <div className="space-y-2">
            <label
              htmlFor="icon_url"
              className="text-lg font-medium text-gray-700 flex items-center gap-2 cursor-pointer hover:text-gray-900 transition-colors"
            >
              <FcAddImage size={32} className="animate-bounce" />
              <span>Tải ảnh lên</span>
            </label>
            <div className="w-36 h-36 bg-gray-50 border border-gray-300 rounded-xl overflow-hidden">
              {formData.icon_url ? (
                <img
                  src={formData.icon_url}
                  alt="Category preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-gray-500 text-center text-sm">
                    {isLoading.image ? "Đang tải ảnh..." : "Chưa có ảnh"}
                  </p>
                </div>
              )}
            </div>
            <input
              type="file"
              name="icon_url"
              id="icon_url"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading.form || isLoading.image}
            className="w-full py-3 px-4 font-medium text-white rounded-xl 
                     transition-all duration-300 transform hover:scale-[1.02]
                     disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none
                     bg-gradient-to-r from-pink-500 to-rose-500"
          >
            {isLoading.form ? <LoadingBtn /> : "Thêm danh mục"}
          </button>
        </form>
      </div>
      {isLoading.form && <Loading />}
    </div>
  );
}
