import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatPriceVND } from "../utils/formatPriceVND";
import Rating from "./Rating";
import { BsCartPlus } from "react-icons/bs";
import SummaryApi from "../common/SummaryApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProductGeneralInfo({ data }) {
  const [productImage, setProductImage] = useState([]);
  const [productImageActive, setProductImageActive] = useState("");
  const [productVariants, setProductVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [startIndex, setStartIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [variantAttributes, setVariantAttributes] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: shop } = useSelector((state) => state.shop);
  const imagesPerPage = 5;
  useEffect(() => {
    if (data.id) {
      setProductImage(data.product_images);
      setProductVariants(data.product_variants || []);
      setProductImageActive(data.product_images[0]?.image_url);
      setStock(data.stock_quantity);
      setPrice(data.base_price);

      if (data.product_variants?.length > 0) {
        const attributeKeys = Object.keys(
          data.product_variants[0].combination || {},
        );
        setVariantAttributes(attributeKeys);
      }
    }
  }, [data]);

  const getOptionsForAttribute = (attribute) => {
    const options = new Set();
    productVariants.forEach((variant) => {
      if (variant.combination[attribute]) {
        options.add(variant.combination[attribute]);
      }
    });
    return Array.from(options);
  };

  useEffect(() => {
    if (Object.keys(selectedOptions).length === variantAttributes.length) {
      const variant = productVariants.find((variant) =>
        variantAttributes.every(
          (attr) =>
            variant.combination[attr].trim() === selectedOptions[attr].trim(),
        ),
      );

      if (variant) {
        setSelectedVariant(variant);
        setPrice(variant.price);
        setStock(variant.stock);
        if (variant.image_url) {
          setProductImageActive(variant.image_url);
        }
      }
    }
  }, [selectedOptions, productVariants, variantAttributes]);

  const handleOptionSelect = (attribute, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [attribute]: value,
    }));
  };

  const handleImageClick = (imageUrl) => {
    setProductImageActive(imageUrl);
  };

  const handlePrevThumbnails = () => {
    setStartIndex(Math.max(0, startIndex - imagesPerPage));
  };

  const handleNextThumbnails = () => {
    setStartIndex(
      Math.min(startIndex + imagesPerPage, productImage.length - imagesPerPage),
    );
  };

  const handleQuantityChange = (action) => {
    if (action === "decrease") {
      setQuantity((prev) => Math.max(1, prev - 1));
    } else {
      setQuantity((prev) => Math.min(stock, prev + 1));
    }
  };

  const visibleImages = productImage.slice(
    startIndex,
    startIndex + imagesPerPage,
  );
  const canScrollLeft = startIndex > 0;
  const canScrollRight = startIndex + imagesPerPage < productImage.length;
  const handleAddToCart = async () => {
    if (shop.id === data.shop_id) {
      toast.error("Bạn không thể cho sản phẩm của mình bán vào giỏ");
    } else {
      const cartItem = {
        product_id: data.id,
        variant_id: selectedVariant?.id || null,
        quantity: quantity,
        shop_id: data.shop_id,
        price_at_time: price,
      };
      console.log("cartItem");
      const token = localStorage.getItem("accessToken");
      const response = await fetch(SummaryApi.addCart.url, {
        method: SummaryApi.addCart.method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      });
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        console.log("result", result);
        if (result.action === "CREATE") {
          dispatch({
            type: "add_cart",
          });
        } else {
          dispatch({
            type: "update_cart",
          });
        }
      }
      console.log("Kết quả trả về sau khi thêm giỏ hàng", result);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-xl">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="w-full h-[600px] rounded-lg overflow-hidden">
            <img
              src={productImageActive}
              alt={data?.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative">
            {canScrollLeft && (
              <button
                onClick={handlePrevThumbnails}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-2 rounded-full hover:bg-gray-100 z-10 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <div className="grid grid-cols-5 gap-4 px-10">
              {visibleImages.map((item, index) => (
                <div
                  key={`${item?.id}-${index}`}
                  className={`aspect-square rounded-md overflow-hidden cursor-pointer transition-all ${
                    productImageActive === item?.image_url
                      ? "ring-2 ring-blue-500"
                      : "hover:ring-2 hover:ring-gray-300"
                  }`}
                  onClick={() => handleImageClick(item?.image_url)}
                >
                  <img
                    src={item?.image_url}
                    alt={data?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            {canScrollRight && (
              <button
                onClick={handleNextThumbnails}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-2 rounded-full hover:bg-gray-100 z-10 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        <div className="space-y-6 my-auto">
          <h2 className="text-2xl font-semibold text-gray-800 leading-tight">
            {data?.name}
          </h2>

          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Rating rating={data?.rating} />
            </div>
            <span className="text-gray-600">
              {data?.Review?.length || 0} đánh giá
            </span>
          </div>

          <div className="text-3xl font-bold text-red-500">
            {formatPriceVND(+price)}
          </div>

          <div className="space-y-4 py-4 border-y border-gray-200">
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Vận chuyển</span>
              <span className="text-green-600 font-medium">
                Miễn phí vận chuyển
              </span>
            </div>
            <div className="text-sm text-gray-500">
              An tâm mua sắm - Bảo hành chính hãng
            </div>
          </div>
          {variantAttributes.map((attribute) => (
            <div key={attribute} className="space-y-3">
              <p className="font-medium text-gray-700">{attribute}</p>
              <div className="flex flex-wrap gap-2">
                {getOptionsForAttribute(attribute).map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(attribute, option)}
                    className={`px-4 py-2 rounded-md border transition-all ${
                      selectedOptions[attribute] === option
                        ? "border-pink-400 bg-pink-50 text-pink-400"
                        : "border-gray-300 hover:border-pink-300"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="space-y-3">
            <p className="font-medium text-gray-700">Số lượng</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  className="px-3 py-1 hover:bg-gray-100 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-1 border-x border-gray-300">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange("increase")}
                  className="px-3 py-1 hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>
              <span className="text-gray-500">{stock} sản phẩm có sẵn</span>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              disabled={variantAttributes?.length > 0 && !selectedVariant}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                variantAttributes?.length === 0 || selectedVariant
                  ? "bg-pink-100 text-pink-400 hover:bg-pink-200"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              onClick={handleAddToCart}
            >
              Thêm vào giỏ hàng
            </button>
            {/* <button
              disabled={variantAttributes?.length > 0 && !selectedVariant}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                variantAttributes.length === 0 || selectedVariant
                  ? "bg-pink-500 text-white hover:bg-pink-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              onClick={() => {
                navigate("/checkout", {
                  state: data,
                });
              }}
            >
              Mua ngay
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
