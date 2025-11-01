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
    <div className="flex fixed inset-0 z-50 justify-center items-center px-4 bg-black/70 md:px-52 lg:px-72">
      <div className="p-6 w-full max-w-lg bg-white rounded-2xl shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Thêm Danh Mục
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full transition-colors hover:bg-gray-100"
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
            <label className="block mb-3 text-lg font-medium text-gray-700">
              Mô tả danh mục
            </label>
            <div className="relative group">
              <div className="flex absolute inset-y-0 left-0 items-start pt-3 pl-4 pointer-events-none">
                <MdDescription className="w-6 h-6 text-blue-400 transition-colors duration-200 group-focus-within:text-blue-500" />
              </div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                focus:ring-2 focus:ring-blue-100 focus:border-blue-400
                hover:border-blue-300 outline-none transition-all duration-200
                placeholder:text-gray-400 text-gray-700 resize-y min-h-[120px]"
                placeholder="Nhập mô tả danh mục"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-lg font-medium text-gray-700">
              Select Category
            </label>
            <div className="rounded-md border focus-within:border-blue-400">
              <select
                className="p-3 w-full bg-blue-50 rounded-lg border outline-none"
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
              className="flex gap-2 items-center text-lg font-medium text-gray-700 transition-colors cursor-pointer hover:text-gray-900"
            >
              <FcAddImage size={32} className="animate-bounce" />
              <span>Tải ảnh lên</span>
            </label>
            <div className="overflow-hidden w-36 h-36 bg-gray-50 rounded-xl border border-gray-300">
              {formData.icon_url ? (
                <img
                  src={formData.icon_url}
                  alt="Category preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex justify-center items-center w-full h-full">
                  <p className="text-sm text-center text-gray-500">
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
                     bg-gradient-to-r from-blue-500 to-rose-500"
          >
            {isLoading.form ? <LoadingBtn /> : "Thêm danh mục"}
          </button>
        </form>
      </div>

    </div>
  );
}
