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
    if (shop?.id === data.shop_id) {
      toast.error("Bạn không thể cho sản phẩm của mình bán vào giỏ");
    } else {
      const cartItem = {
        product_id: data.id,
        variant_id: selectedVariant?.id || null,
        quantity: quantity,
        shop_id: data.shop_id,
        price_at_time: price,
      };

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
    }
  };

  return (
    <div className="p-4 mt-20 bg-white rounded-lg shadow-xl">
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-8">
        <div className="space-y-4">
          <div className="w-full  h-[300px] xs:h-[500px] sm:h-[600px] md:h-[600px] rounded-lg overflow-hidden">
            <img
              src={productImageActive}
              alt={data?.name}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="relative">
            {canScrollLeft && (
              <button
                onClick={handlePrevThumbnails}
                className="absolute left-0 top-1/2 z-10 p-2 bg-white rounded-full shadow-lg transition-colors -translate-y-1/2 hover:bg-gray-100"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <div className="grid grid-cols-5 gap-2 px-5 lg:gap-4 lg:px-10">
              {visibleImages.map((item, index) => (
                <div
                  key={`${item?.id}-${index}`}
                  className={`aspect-square rounded-md overflow-hidden cursor-pointer transition-all ${productImageActive === item?.image_url
                      ? "ring-2 ring-blue-500"
                      : "hover:ring-2 hover:ring-gray-300"
                    }`}
                  onClick={() => handleImageClick(item?.image_url)}
                >
                  <img
                    src={item?.image_url}
                    alt={data?.name}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
            {canScrollRight && (
              <button
                onClick={handleNextThumbnails}
                className="absolute right-0 top-1/2 z-10 p-2 bg-white rounded-full shadow-lg transition-colors -translate-y-1/2 hover:bg-gray-100"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        <div className="my-auto space-y-2 md:space-x-4 lg:space-y-6">
          <h2 className="text-lg font-semibold leading-tight text-gray-800 md:text-xl lg:text-2xl">
            {data?.name}
          </h2>

          <div className="flex gap-4 items-center">
            <div className="flex items-center">
              <Rating rating={data?.rating} />
            </div>
            <span className="text-gray-600">
              {data?.Review?.length || 0} đánh giá
            </span>
          </div>

          <div className="text-xl font-bold text-red-500 md:text-2xl lg:text-3xl">
            {formatPriceVND(+price)}
          </div>

          <div className="py-4 space-y-4 border-gray-200 border-y">
            <div className="flex gap-4 items-center">
              <span className="text-xs text-gray-600 lg:text-sm">
                Vận chuyển
              </span>
              <span className="text-xs font-medium text-green-600 lg:text-sm">
                Miễn phí vận chuyển
              </span>
            </div>
            <div className="text-xs text-gray-500 lg:text-sm">
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
                    className={`px-2 py-1 lg:px-4 lg:py-2 rounded-md border transition-all ${selectedOptions[attribute] === option
                        ? "border-blue-400 bg-blue-50 text-blue-400"
                        : "border-gray-300 hover:border-blue-300"
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
            <div className="flex gap-4 items-center">
              <div className="flex items-center rounded-md border border-gray-300">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  className="px-3 py-1 transition-colors hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-1 border-gray-300 border-x">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange("increase")}
                  className="px-3 py-1 transition-colors hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-gray-500 lg:text-sm">
                {stock} sản phẩm có sẵn
              </span>
            </div>
          </div>

          <div className="flex gap-4 pt-2 lg:pt-4">
            <button
              disabled={variantAttributes?.length > 0 && !selectedVariant}
              className={`flex-1 px-3 py-1 sm:px-4 sm:py-2 lg:px-6 lg:py-3 rounded-lg font-medium transition-colors ${variantAttributes?.length === 0 || selectedVariant
                  ? "bg-blue-100 text-blue-400 hover:bg-blue-200"
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
                  ? "bg-blue-500 text-white hover:bg-blue-600"
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
