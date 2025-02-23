import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdRateReview } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu";
import { X } from "lucide-react";
import { uploadImage } from "../utils/imageUploader";
import SummaryApi from "../common/SummaryApi";
import { toast } from "react-toastify";

export default function Review() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [reviewForms, setReviewForms] = useState([]);

  useEffect(() => {
    if (state?.order?.id) {
      setOrderItems(state.order.order_items);

      const initialForms = state.order.order_items.map((item) => ({
        product_id: item.product.id,
        order_id: state.order.id,
        rating: 0,
        comment: "",
        ReviewImage: [],
      }));
      setReviewForms(initialForms);
    }
  }, [state]);

  const handleRatingChange = (index, rating) => {
    setReviewForms((prev) => {
      const newForms = [...prev];
      newForms[index] = { ...newForms[index], rating };
      return newForms;
    });
  };

  const handleCommentChange = (index, comment) => {
    setReviewForms((prev) => {
      const newForms = [...prev];
      newForms[index] = { ...newForms[index], comment };
      return newForms;
    });
  };

  const handleUploadImage = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const imageUrl = await uploadImage(file);

      if (imageUrl) {
        setReviewForms((prev) => {
          const newForms = [...prev];
          newForms[index] = {
            ...newForms[index],
            ReviewImage: [
              ...newForms[index].ReviewImage,
              { image_url: imageUrl },
            ],
          };
          return newForms;
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = (formIndex, imageIndex) => {
    setReviewForms((prev) => {
      const newForms = [...prev];
      newForms[formIndex].ReviewImage = newForms[formIndex].ReviewImage.filter(
        (_, idx) => idx !== imageIndex,
      );
      return newForms;
    });
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      const invalidReviews = reviewForms.filter((form) => !form.rating);
      if (invalidReviews.length > 0) {
        toast.error("Vui lòng đánh giá sao cho tất cả sản phẩm");
        return;
      }

      await Promise.all(
        reviewForms.map((form) =>
          fetch(SummaryApi.addReview.url, {
            method: SummaryApi.addReview.method,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          }),
        ),
      );

      toast.success("Bạn đã đánh giá thành công");
      navigate("/review-success");
    } catch (error) {
      console.error("Error submitting reviews:", error);
      toast.error("Có lỗi xảy ra khi gửi đánh giá");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 shadow-lg rounded-lg">
      <div className="flex items-center gap-3 border-b pb-4">
        <MdRateReview className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-purple-500" />
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold bg-gradient-to-r from-lime-500 to-pink-500 bg-clip-text text-transparent">
          Đánh giá sản phẩm
        </h2>
      </div>

      <div className="mt-2 sm:mt-3 md:mt-4 lg:mt-6 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8">
        {orderItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="p-2 md:p-3 lg:p-4 border rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-lg border-2 border-gray-200 overflow-hidden">
                <img
                  src={item.product.product_images[0].image_url}
                  alt={item.product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>

              <h3 className="flex-1 font-medium text-xs md:text-base lg:text-md">
                {item.product.name}
              </h3>
            </div>

            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-4">
                <p className="font-medium min-w-32 text-xs md:text-base lg:text-md">
                  Chất lượng sản phẩm:
                </p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`sm:text-lg md:text-xl lg:text-2xl cursor-pointer transition-colors ${
                        star <= reviewForms[index]?.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      onClick={() => handleRatingChange(index, star)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-medium mb-2 text-xs md:text-base lg:text-md">
                  Đánh giá chi tiết:
                </label>
                <textarea
                  value={reviewForms[index]?.comment}
                  onChange={(e) => handleCommentChange(index, e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300 outline-none resize-none min-h-24"
                  placeholder="Hãy chia sẻ trải nghiệm của bạn về sản phẩm..."
                />
              </div>

              <div className="space-y-2">
                <p className="font-medium text-xs md:text-base lg:text-md">
                  Hình ảnh sản phẩm:
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  {reviewForms[index]?.ReviewImage.map((img, imgIndex) => (
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
                        onClick={() => handleRemoveImage(index, imgIndex)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  <label
                    className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 border-dashed border-2 border-purple-200 rounded-lg flex flex-col items-center justify-center text-purple-400 cursor-pointer hover:border-purple-400 hover:text-purple-600 transition-colors"
                    htmlFor={`image-upload-${index}`}
                  >
                    {loading ? (
                      <div className="animate-pulse">Đang tải...</div>
                    ) : (
                      <>
                        <LuImagePlus className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-1" />
                        <p className="text-xs lg:text-sm">Thêm ảnh</p>
                      </>
                    )}
                  </label>
                  <input
                    type="file"
                    id={`image-upload-${index}`}
                    hidden
                    accept="image/*"
                    onChange={(e) => handleUploadImage(e, index)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3 justify-end mt-6">
        <button
          type="button"
          className="px-3 py-1 lg:px-6 lg:py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors"
          onClick={() => navigate(-1)}
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
  );
}
