import { useEffect, useState } from "react";

export default function ProductDescription({ data }) {
  const [product, setProduct] = useState({});

  useEffect(() => {
    if (data.id) {
      setProduct(data);
    }
  }, [data]);

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="p-6 space-y-6">
        {/* Product Details Section */}
        <div>
          <h2 className="text-2xl font-semibold bg-slate-50 p-4 rounded-md mb-4 text-gray-800">
            Chi tiết sản phẩm
          </h2>
          <div className="space-y-4 px-2">
            {/* Category */}
            <div className="flex items-center space-x-4 p-2 hover:bg-gray-50 rounded-md">
              <p className="text-gray-600 min-w-[100px]">Danh mục:</p>
              <p className="text-blue-500">
                <span>{product?.sub_category?.category?.name}</span>
                <span className="mx-2 text-gray-400">›</span>
                <span>{product?.sub_category?.name}</span>
              </p>
            </div>

            {/* Stock */}
            <div className="flex items-center space-x-4 p-2 hover:bg-gray-50 rounded-md">
              <p className="text-gray-600 min-w-[100px]">Kho:</p>
              <p className="text-gray-800">
                {product?.stock_quantity}
                <span className="text-gray-500 text-sm ml-1">sản phẩm</span>
              </p>
            </div>

            {/* Attributes */}
            {product?.product_attributes?.map((attribute, index) => (
              <div
                key={`${attribute?.id}-${index}`}
                className="flex items-center space-x-4 p-2 hover:bg-gray-50 rounded-md"
              >
                <p className="text-gray-600 min-w-[100px]">
                  {attribute?.type?.name}:
                </p>
                <p className="text-gray-800">{attribute?.values[0]?.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Product Description Section */}
        <div>
          <h2 className="text-2xl font-semibold bg-slate-50 p-4 rounded-md mb-4 text-gray-800">
            Mô tả sản phẩm
          </h2>
          <div className="px-2">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {product?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
