import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FcCheckmark } from "react-icons/fc";
import { MdAddCircle, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import InputField from "./InputField";
import LoadingBtn from "./LoadingBtn";
import Loading from "../pages/Loading";
import colors from "../style/colors";
import SummaryApi from "../common/SummaryApi";
import { FcFlashOn } from "react-icons/fc";

export default function UploadAttributeModal({ onClose, onSuccess }) {
  const [data, setData] = useState({
    name: "",
    value: [""],
    category_id: [],
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleValueChange = (index, value) => {
    setData((prev) => {
      const newValues = [...prev.value];
      newValues[index] = value;
      return {
        ...prev,
        value: newValues,
      };
    });
  };

  const addValue = () => {
    setData((prev) => ({
      ...prev,
      value: [...prev.value, ""],
    }));
  };

  const removeValue = (index) => {
    if (data.value.length === 1) {
      toast.warning("Phải có ít nhất một giá trị thuộc tính");
      return;
    }
    setData((prev) => ({
      ...prev,
      value: prev.value.filter((_, i) => i !== index),
    }));
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
  // Thêm state để theo dõi các danh mục đã chọn
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Sửa lại hàm handleCategorySelect
  const handleCategorySelect = (e) => {
    const selectedId = Number(e.target.value);
    if (!selectedId) return;

    // Kiểm tra xem category đã được chọn chưa
    if (!data.category_id.includes(selectedId)) {
      const selectedCategory = categories.find((cat) => cat.id === selectedId);
      setSelectedCategories((prev) => [...prev, selectedCategory]);
      setData((prev) => ({
        ...prev,
        category_id: [...prev.category_id, selectedId],
      }));
    }
  };

  // Thêm hàm xóa danh mục đã chọn
  const removeCategory = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.filter((cat) => cat.id !== categoryId)
    );
    setData((prev) => ({
      ...prev,
      category_id: prev.category_id.filter((id) => id !== categoryId),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate values
    const validValues = data.value.filter((val) => val.trim() !== "");
    if (validValues.length === 0) {
      toast.error("Vui lòng nhập ít nhất một giá trị thuộc tính");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(SummaryApi.addAttributes.url, {
        method: SummaryApi.addAttributes.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...data,
          value: validValues,
        }),
      });

      const dataResponse = await response.json();

      if (dataResponse.success) {
        toast.success("Thêm thuộc tính thành công");
        dispatch({ type: "add_attributes", payload: dataResponse.data });
        onSuccess();
        onClose();
      } else {
        throw new Error(dataResponse.message || "Cập nhật không thành công");
      }
    } catch (error) {
      toast.error(error.message || "Đã xảy ra lỗi, vui lòng thử lại sau");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center px-4 bg-black/70 md:px-52 lg:px-72">
      <div className="p-6 w-full max-w-lg bg-white rounded-2xl shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Thêm thuộc tính sản phẩm
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
            label="Tên thuộc tính"
            name="name"
            id="name"
            type="text"
            placeholder="Ví dụ: Màu sắc, Kích thước..."
            value={data.name}
            onChange={handleChange}
            required
            icon={FcCheckmark}
          />
          <div className="space-y-2">
            <label className="text-lg font-medium text-gray-700">
              Select Categories
            </label>

            {/* Hiển thị danh mục đã chọn */}
            <div className="flex flex-wrap gap-2 mb-2 max-h-[150px] overflow-y-auto">
              {selectedCategories.map((category) => (
                <div
                  key={category.id}
                  className="flex gap-1 items-center px-3 py-1 bg-blue-100 rounded-full"
                >
                  <span>{category.name}</span>
                  <button
                    type="button"
                    onClick={() => removeCategory(category.id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <IoClose size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="rounded-md border focus-within:border-blue-400">
              <select
                className="p-3 w-full bg-blue-50 rounded-lg border outline-none"
                onChange={handleCategorySelect}
                value=""
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

          <div className="space-y-4  max-h-[300px] overflow-y-auto p-2">
            <label className="block text-sm font-medium text-gray-700">
              Giá trị thuộc tính
            </label>
            {data.value.map((value, index) => (
              <div key={index} className="flex gap-2">
                <InputField
                  name={`value-${index}`}
                  type="text"
                  placeholder={`Giá trị ${index + 1}`}
                  value={value}
                  onChange={(e) => handleValueChange(index, e.target.value)}
                  required
                  icon={FcFlashOn}
                  className="flex-1"
                />
                <button
                  type="button"
                  onClick={() => removeValue(index)}
                  className="p-2 text-red-500 rounded-lg transition-colors hover:bg-red-50"
                >
                  <MdDelete size={24} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addValue}
              className="flex gap-2 items-center font-medium text-blue-600 hover:text-blue-700"
            >
              <MdAddCircle size={20} />
              Thêm giá trị
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 font-medium text-white rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none ${loading ? "bg-gray-400" : colors.button.gradientFrostToFlame
              }`}
          >
            {loading ? <LoadingBtn /> : "Thêm thuộc tính"}
          </button>
        </form>
      </div>

    </div>
  );
}
