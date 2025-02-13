import { useEffect, useState } from "react";
import colors from "../style/colors";
import { FaPencilAlt } from "react-icons/fa";
import { FcOk } from "react-icons/fc";
import Input from "../components/Input";
import { MdCategory, MdDescription } from "react-icons/md";
import { TiPencil } from "react-icons/ti";
import ModelProductCategory from "../components/ModelProductCategory";
import UploadImageProduct from "../components/UploadImageProduct";
import TextareaInput from "../components/TextareaInput";
import SelectAttribute from "../components/SelectAttribute";
import ProductVariant from "../components/ProductVariant";
import { useSelector } from "react-redux";
import SummaryApi from "../common/SummaryApi";
import { toast } from "react-toastify";
import Loading from "./Loading";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const { data: shop } = useSelector((state) => state.shop);

  const [data, setData] = useState({
    shop_id: "",
    subcategory_id: "",
    name: "",
    description: "",
    base_price: 0,
    product_images: [],
    product_attributes: [],
    product_variants: [],
    stock_quantity: 0,
    rating: 0,
    sales_count: 0,
    category_path: "",
    weight: 0,
    is_active: true,
  });
  const [openCategory, setOpenCategory] = useState(false);

  const [attributes, setAttributes] = useState([]);

  const [selectedPath, setSelectedPath] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "base_price" || name === "stock_quantity") {
      value = Number(value);
    }
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleClose = () => {
    setOpenCategory(false);
  };
  useEffect(() => {
    if (shop?.id) {
      setData((prev) => ({
        ...prev,
        shop_id: shop.id,
      }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.addProduct.url, {
        method: SummaryApi.addProduct.method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const dataResponse = await response.json();
      if (dataResponse.success) {
        toast.success("Đã thêm sản phẩm thành công");
        dispatch({ type: "add_product", payload: dataResponse.data });
        setData({
          shop_id: shop.id,
          subcategory_id: "",
          name: "",
          description: "",
          base_price: 0,
          product_images: [],
          product_attributes: [],
          product_variants: [],
          stock_quantity: 0,
          rating: 0,
          sales_count: 0,
          weight: 0,
          is_active: true,
        });
        setSelectedPath("");

        setAttributes([]);
        navigate("/shop-management/products");
      }
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="p-5 min-h-screen bg-gray-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-h-[96vh] custom-scrollbar overflow-y-auto mx-auto transition-all duration-300 hover:shadow-2xl">
        <div className="flex items-center space-x-4 mb-6">
          <div className="rounded-full bg-orange-100 p-2">
            <FaPencilAlt className="text-orange-400 text-2xl" />
          </div>
          <h2
            className={`${colors.textColors.gradientRainbow} text-2xl font-bold`}
          >
            Nhập thông tin cho sản phẩm
          </h2>
        </div>

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div className="h-0.5 bg-gradient-to-r from-purple-100 to-purple-300 my-6 shadow-lg shadow-purple-400/50 rounded-full" />

          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Thông tin cơ bản
          </h3>

          <div className="space-y-2">
            <p className="text-lg font-semibold text-gray-700">
              Hình ảnh sản phẩm
            </p>
            <UploadImageProduct data={data} setData={setData} />
          </div>

          <div className="space-y-4">
            <Input
              label="Tên sản phẩm"
              name="name"
              placeholder="Vui lòng nhập tên sản phẩm + Thương hiệu + Model + Thông số kĩ thuật"
              id="name"
              isView={true}
              icon={FcOk}
              value={data.name}
              onChange={handleChange}
              required
            />

            <div className="flex gap-1 items-center">
              <label className="text-lg font-semibold text-gray-700 min-w-[120px]">
                Ngành hàng
              </label>
              <div
                className="flex-1 p-3 border-2 rounded-lg bg-gray-50 flex items-center 
                          hover:ring-2 hover:ring-pink-200 hover:border-pink-400 
                          cursor-pointer transition-all duration-200"
                onClick={() => setOpenCategory(true)}
              >
                <MdCategory className="text-2xl text-pink-500 mr-3" />
                <p className="text-gray-600">
                  {selectedPath || "Vui lòng chọn ngành hàng"}
                </p>
                <TiPencil className="ml-auto text-2xl text-gray-400 hover:text-pink-500 transition-colors" />
              </div>
            </div>

            <TextareaInput
              label="Mô tả sản phẩm"
              name="description"
              value={data.description}
              onChange={handleChange}
              placeholder="Nhập mô tả sản phẩm"
              required
            />
          </div>

          <div className="">
            <div className="h-0.5 bg-gradient-to-r from-pink-100 to-pink-400 my-6 shadow-lg shadow-pink-200 rounded-full" />
            <h3 className="text-xl font-bold text-gray-800">
              Thông tin chi tiết
            </h3>
            {attributes?.length > 0 ? (
              <div>
                <p className="text-gray-500">
                  Điền thông tin thuộc tính để tăng mức độ hiển thị cho sản phẩm
                </p>
                {attributes.map((attribute, index) => (
                  <div key={`${attribute.id}-${index}`} className="mb-4">
                    {attribute.name !== "Màu sắc" &&
                    attribute.name !== "Kích thước" &&
                    attribute.name !== "Giới tính" &&
                    attribute.name !== "Size" ? (
                      <SelectAttribute
                        attribute={attribute}
                        setData={setData}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">
                Có thể điều chỉnh sau khi chọn ngành hàng
              </p>
            )}
          </div>
          <div className="">
            <div className="h-0.5 bg-gradient-to-r from-blue-100 to-blue-400 my-6 shadow-lg shadow-blue-100 rounded-full" />
            <h3 className="text-xl font-bold text-gray-800">
              Thông tin bán hàng
            </h3>
            {attributes?.length > 0 ? (
              <div>
                <ProductVariant
                  data={attributes}
                  setData={setData}
                  onChange={handleChange}
                />
              </div>
            ) : (
              <p className="text-gray-400">
                Có thể điều chỉnh sau khi chọn ngành hàng
              </p>
            )}
          </div>
          <div className="mt-3 flex gap-4 justify-end">
            <button
              type="button"
              className={`${colors.button.medium} ${colors.button.danger}`}
            >
              Hủy
            </button>
            <button
              type="submit"
              className={`${colors.button.medium} ${colors.button.gradientSunrise}`}
              onClick={() => setData((prev) => ({ ...prev, is_active: false }))}
            >
              Lưu & Ẩn
            </button>
            <button
              type="submit"
              className={`${colors.button.medium} ${colors.button.gradientCyanToIndigo}`}
              onClick={() => setData((prev) => ({ ...prev, is_active: true }))}
            >
              Lưu & Hiển thị
            </button>
          </div>
        </form>
      </div>

      {openCategory && (
        <ModelProductCategory
          onClose={handleClose}
          setData={setData}
          setAttribute={setAttributes}
          onPathChange={setSelectedPath}
        />
      )}
      {loading && <Loading />}
    </div>
  );
}
