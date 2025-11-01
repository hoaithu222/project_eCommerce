import { X } from "lucide-react";
import colors from "../style/colors";
import { useState } from "react";
import { uploadImage } from "../utils/imageUploader";
import { FaStar } from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import { toast } from "react-toastify";

export default function EditReview({ data, onClose, fetchData }) {
  const [dataForm, setDataForm] = useState({
    product_id: data.product_id,
    order_id: data.order_id,
    rating: data.rating,
    comment: data.comment,
    ReviewImage: data.ReviewImage,
  });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleRatingChange = (rating) => {
    setDataForm((prev) => {
      return {
        ...prev,
        rating: rating,
      };
    });
  };

  const handleCommentChange = (comment) => {
    setDataForm((prev) => {
      return {
        ...prev,
        comment: comment,
      };
    });
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const imageUrl = await uploadImage(file);

      if (imageUrl) {
        setDataForm((prev) => {
          return {
            ...prev,
            ReviewImage: [
              ...prev.ReviewImage,
              {
                image_url: imageUrl,
              },
            ],
          };
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = (imageIndex) => {
    setDataForm((prev) => {
      return {
        ...prev,
        ReviewImage: prev.ReviewImage.filter(
          (_, index) => index !== imageIndex,
        ),
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(
        `${SummaryApi.updateReview.url}/${data.id}`,
        {
          method: SummaryApi.updateReview.method,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataForm),
        },
      );
      const result = await response.json();
      if (result.success) {
        fetchData();
        toast.success("Sửa đánh giá thành công ");
        onClose();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-blue-50 p-2 sm:p-3 md:p-4 lg:p-5 rounded-md shadow-xl w-[80%] lg:w-[60%]">
        <div className="flex items-center justify-between">
          <h2
            className={`${colors.textColors.gradientBlueToYellow} text-base md:text-xl lg:text-2xl font-semibold`}
          >
            Sửa đánh giá
          </h2>
          <X
            className="text-red-600 hover:text-red-700 font-semibold cursor-pointer text-base md:text-lg lg:text-xl"
            onClick={onClose}
          />
        </div>
        <div className="mt-2 border border-gray-200 p-4 rounded-lg hover:shadow-xl bg-white">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 overflow-hidden rounded-lg shadow-xl">
              <img
                src={data.product.product_images[0].image_url}
                alt={data.product.name}
                className="w-full h-full object-cover overflow-hidden rounded-lg"
              />
            </div>
            <h3 className="line-clamp-1 text-xs sm:text-base">
              {data.product.name}
            </h3>
          </div>
          <div className="mt-4 space-y-4">
            <div className="flex items-center gap-4">
              <p className="font-medium min-w-32">Chất lượng sản phẩm:</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`text-lg md:text-xl lg:text-2xl cursor-pointer transition-colors ${
                      star <= dataForm.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    onClick={() => handleRatingChange(star)}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block font-medium mb-2text-xs sm:text-base ">
                Đánh giá chi tiết:
              </label>
              <textarea
                value={dataForm.comment}
                onChange={(e) => handleCommentChange(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300 outline-none resize-none min-h-24"
                placeholder="Hãy chia sẻ trải nghiệm của bạn về sản phẩm..."
              />
            </div>

            <div className="space-y-2">
              <p className="font-medium text-xs md:text-base lg:text-md">
                Hình ảnh sản phẩm:
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                {dataForm.ReviewImage.map((img, imgIndex) => (
                  <div
                    className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 border rounded-lg relative group overflow-hidden"
                    key={`${img.image_url}-${imgIndex}`}
                  >
                    <img
                      src={img.image_url}
                      alt={`Product ${imgIndex + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <button
                      onClick={() => handleRemoveImage(imgIndex)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                <label
                  className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 border-dashed border-2 border-purple-200 rounded-lg flex flex-col items-center justify-center text-purple-400 cursor-pointer hover:border-purple-400 hover:text-purple-600 transition-colors"
                  htmlFor={`image-upload`}
                >
                  {loading ? (
                    <div className="animate-pulse text-xs lg:text-sm">
                      Đang tải...
                    </div>
                  ) : (
                    <>
                      <LuImagePlus className="text-3xl mb-1" />
                      <p className="text-xs lg:text-sm">Thêm ảnh</p>
                    </>
                  )}
                </label>
                <input
                  type="file"
                  id={`image-upload`}
                  hidden
                  accept="image/*"
                  onChange={(e) => handleUploadImage(e)}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-3 justify-end mt-6">
            <button
              type="button"
              className="px-3 py-1 lg:px-6 lg:py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors"
              onClick={onClose}
              disabled={submitting}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-3 py-1 lg:px-6 lg:py-2 rounded-lg bg-gradient-to-r from-sky-400 to-blue-600 text-white font-medium hover:from-sky-500 hover:to-blue-700 transition-colors disabled:opacity-50"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Đang gửi..." : "Hoàn thành"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
