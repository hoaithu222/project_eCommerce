import { useEffect, useState } from "react";
import { Star } from "lucide-react";

export default function ProductReview({ data }) {
  const [reviews, setReviews] = useState([]);
  const [ratingProduct, setRatingProduct] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("all");

  useEffect(() => {
    if (data.id) {
      setReviews(data.Review);
      setRatingProduct(data.rating);
    }
  }, [data]);

  const getRatingCount = (rating) => {
    return reviews.filter((review) => review.rating === rating).length;
  };

  const FilterButton = ({ label, value, count }) => (
    <button
      onClick={() => setSelectedFilter(value)}
      className={`flex items-center px-4 py-2 rounded-full text-sm transition-colors
        ${
          selectedFilter === value
            ? "bg-red-100 text-red-600"
            : "hover:bg-gray-100 text-gray-600"
        }`}
    >
      {label}
      {count !== undefined && (
        <span className="ml-1 text-gray-500">({count})</span>
      )}
    </button>
  );

  const renderStars = (rating) => (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={24}
          className={`${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="bg-white p-5 shadow-lg rounded-xl my-4">
      <div>
        <h2 className="text-2xl font-semibold bg-slate-50 p-4 rounded-t-lg">
          ĐÁNH GIÁ SẢN PHẨM
        </h2>

        <div className="mt-3 bg-red-50 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center justify-center text-center min-w-[200px] border-r border-red-100">
              <p className="text-4xl font-bold text-red-500 mb-2">
                {ratingProduct.toFixed(1)}
              </p>
              <div className="mb-2">
                {renderStars(Math.round(ratingProduct))}
              </div>
              <p className="text-gray-600">{reviews.length} đánh giá</p>
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <FilterButton
                  label="Tất cả"
                  value="all"
                  count={reviews.length}
                />
                {[5, 4, 3, 2, 1].map((star) => (
                  <FilterButton
                    key={star}
                    label={`${star} sao`}
                    value={`${star}-star`}
                    count={getRatingCount(star)}
                  />
                ))}
                <FilterButton
                  label="Có bình luận"
                  value="with-comments"
                  count={reviews.filter((r) => r.comment?.trim()).length}
                />
                <FilterButton
                  label="Có hình ảnh"
                  value="with-images"
                  count={
                    reviews.filter((r) => r.ReviewImage?.length > 0).length
                  }
                />
              </div>

              <div className="mt-4 space-y-2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = getRatingCount(star);
                  const percentage = (count / reviews.length) * 100 || 0;

                  return (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 w-12">
                        {star} sao
                      </span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-400 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-12">
                        {percentage.toFixed(0)}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
