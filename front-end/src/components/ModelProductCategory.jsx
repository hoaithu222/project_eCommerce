import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaCircleChevronRight } from "react-icons/fa6";
import { BsFillSearchHeartFill } from "react-icons/bs";
import SummaryApi from "../common/SummaryApi";
import colors from "../style/colors";

export default function ModelProductCategory({
  onClose,
  setData,
  setAttribute,
  onPathChange,
  initialCategoryId = "",
}) {
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] =
    useState(initialCategoryId);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCategory = async () => {
    try {
      const response = await fetch(SummaryApi.getAllCategory.url, {
        method: SummaryApi.getAllCategory.method,
      });
      const responseData = await response.json();
      if (responseData.success) {
        setCategory(responseData.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategorySelect = (item) => {
    setSelectedCategory(item);
    setSelectedSubCategory(null);
    if (item.sub_categories && item.sub_categories.length > 0) {
      setSubCategory(item.sub_categories);
    } else {
      setSubCategory([]);
    }
  };

  const handleSubCategorySelect = (item) => {
    setSelectedSubCategory(item);
  };

  const handleConfirm = () => {
    if (selectedSubCategory) {
      setAttribute(selectedCategory?.attributes);
      setData((prev) => {
        return {
          ...prev,
          subcategory_id: selectedSubCategory.id,
          category_path: getSelectedPath(),
        };
      });
      onPathChange(getSelectedPath());
      onClose();
    }
  };

  const filteredCategories = category.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    fetchCategory();
  }, []);
  useEffect(() => {
    if (initialCategoryId && category.length > 0) {
      const foundSubCategory = category
        .flatMap((cat) => cat.sub_categories || [])
        .find((subCat) => subCat.id === initialCategoryId);

      if (foundSubCategory) {
        const parentCategory = category.find((cat) =>
          cat.sub_categories?.some((subCat) => subCat.id === initialCategoryId),
        );

        if (parentCategory) {
          setSelectedCategory(parentCategory);
          setSubCategory(parentCategory.sub_categories);
          setSelectedSubCategory(foundSubCategory);
          setAttribute(parentCategory.attributes);
          setData((prev) => ({
            ...prev,
            subcategory_id: foundSubCategory.id,
          }));
          onPathChange(`${parentCategory.name} > ${foundSubCategory.name}`);
        }
      }
    }
  }, [category, initialCategoryId]);
  useEffect(() => {
    if (selectedCategory && selectedSubCategory) {
      onPathChange(`${selectedCategory.name} > ${selectedSubCategory.name}`);
    }
  }, [selectedCategory, selectedSubCategory, onPathChange]);
  const getSelectedPath = () => {
    if (!selectedCategory) return "Chưa chọn";
    if (!selectedSubCategory) return selectedCategory.name;
    return `${selectedCategory.name} > ${selectedSubCategory.name}`;
  };

  return (
    <div className="fixed inset-0 bg-slate-500 bg-opacity-55 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 shadow-2xl shadow-purple-100 rounded-2xl w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <p
            className={`${colors.textColors.gradientLimeToPink} text-3xl font-bold`}
          >
            Thêm ngành hàng
          </p>
          <IoClose
            className="text-red-400 text-3xl hover:text-red-600 cursor-pointer transition-colors"
            onClick={onClose}
          />
        </div>

        <div className="bg-pink-50 rounded-2xl p-6">
          <div className="flex items-center gap-3 bg-white mb-6 rounded-xl py-3 px-4 shadow-sm">
            <BsFillSearchHeartFill className="text-2xl text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm ngành hàng"
              className="outline-none bg-transparent w-full text-lg"
            />
          </div>

          <div className="flex bg-white rounded-2xl overflow-hidden shadow-md">
            <div className="w-1/2 border-r-2 border-gray-200 max-h-80 overflow-y-auto">
              {filteredCategories.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 flex items-center justify-between cursor-pointer transition-colors 
                    ${selectedCategory?.id === item.id ? "bg-purple-100 text-purple-800" : "hover:bg-gray-100"}`}
                  onClick={() => handleCategorySelect(item)}
                >
                  <p className="text-lg">{item.name}</p>
                  {item.sub_categories?.length > 0 && (
                    <FaCircleChevronRight className="text-xl text-gray-400" />
                  )}
                </div>
              ))}
            </div>

            <div className="w-1/2 max-h-80 overflow-y-auto">
              {subCategory.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 flex items-center justify-between cursor-pointer transition-colors 
                    ${selectedSubCategory?.id === item.id ? "bg-purple-100 text-purple-800" : "hover:bg-gray-100"}`}
                  onClick={() => handleSubCategorySelect(item)}
                >
                  <p className="text-lg">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex p-4 mt-6 justify-between items-center bg-gray-50 rounded-xl">
          <div>
            <p className="text-lg">
              Đã chọn:
              <strong className="ml-2 text-purple-600">
                {getSelectedPath()}
              </strong>
            </p>
          </div>
          <div className="flex gap-4">
            <button
              className={`${colors.button.medium} ${colors.button.danger}`}
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              className={`${colors.button.medium} ${colors.button.success}`}
              disabled={!selectedSubCategory}
              onClick={handleConfirm}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
