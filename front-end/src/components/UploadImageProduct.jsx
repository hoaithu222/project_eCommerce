import { LuImagePlus } from "react-icons/lu";
import { uploadImage } from "../utils/imageUploader";
import { useState } from "react";
import { X } from "lucide-react";

export default function UploadImageProduct({ data, setData }) {
  const [loading, setLoading] = useState(false);

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const urlImage = await uploadImage(file);
    setLoading(false);

    if (urlImage) {
      setData((prev) => {
        const newDisplayOrder = prev.product_images.length;

        return {
          ...prev,
          product_images: [
            ...(prev.product_images || []),
            {
              image_url: urlImage,
              display_order: newDisplayOrder,
              is_thumbnail: false,
            },
          ],
        };
      });
    }
  };
  const handleRemoveImage = (indexToRemove) => {
    setData((prev) => ({
      ...prev,
      product_images: prev.product_images
        .filter((_, index) => index !== indexToRemove)
        .map((img, index) => ({
          ...img,
          display_order: index,
        })),
    }));
  };

  return (
    <div className="space-y-3">
      {/* Danh sách ảnh */}
      <div className="flex items-center gap-3 flex-wrap">
        {data?.product_images?.map((img, index) => (
          <div
            className="w-28 h-28 border relative group"
            key={`${img.image_url}-${index}`}
          >
            <img
              src={img.image_url}
              alt={`Product ${index}`}
              className="w-full h-full object-cover group-hover:border-blue-400"
            />
            <button
              onClick={() => handleRemoveImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

        {/* Nút thêm ảnh */}
        <label
          className="w-28 h-28 border-dashed border-2 border-red-200 flex flex-col items-center justify-center text-red-400 cursor-pointer"
          htmlFor="image-upload"
        >
          {loading ? <p>Đang tải...</p> : <LuImagePlus className="text-3xl" />}
          <p className="text-lg">Thêm ảnh</p>
        </label>
        <input
          type="file"
          id="image-upload"
          hidden
          onChange={handleUploadImage}
        />
      </div>

      {/* Ảnh bìa */}
      <div className="flex items-center gap-3">
        <p className="text-lg font-semibold">Ảnh bìa:</p>
        {data?.product_images?.[0] ? (
          <div className="w-28 h-28 border">
            <img
              src={data.product_images[0].image_url}
              alt="Ảnh bìa"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <p className="text-gray-500">Chưa có ảnh bìa</p>
        )}
      </div>
    </div>
  );
}
