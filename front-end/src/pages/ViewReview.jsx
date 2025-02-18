import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import colors from "../style/colors";
import { formatDate } from "../utils/formatDate";
import { Star } from "lucide-react";
import EditReview from "../components/EditReview";

export default function ViewReview() {
  const { state } = useLocation();
  const [review, setReview] = useState([]);
  const [openEditReview, setEditReview] = useState(false);
  const [itemEdit, setItemEdit] = useState({});
  const navigate = useNavigate();
  const fetchReview = async (id) => {
    try {
      const response = await fetch(
        `${SummaryApi.getReviewWithOrder.url}/${id}`,
        {
          method: SummaryApi.getReviewWithOrder.method,
        },
      );
      const result = await response.json();
      if (result.success) {
        setReview(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (state.order.id) {
      fetchReview(state.order.id);
    }
  }, [state]);
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? "text-yellow-400" : "text-gray-200"
        }`}
        fill={index < rating ? "currentColor" : "none"}
        stroke="currentColor"
      />
    ));
  };
  console.log("order", state.order);
  console.log("review", review);

  return (
    <div className="bg-white p-3 shadow-md rounded-md">
      <div className=" flex items-center p-3">
        <h2
          className={`${colors.textColors.gradientIndigoToTeal} text-xl font-semibold`}
        >
          Đánh giá của tôi
        </h2>
        <button
          className={`ml-auto ${colors.button.gradientTealToPurple} ${colors.button.medium}`}
          onClick={() => {
            navigate(-1);
          }}
        >
          Quay trở lại
        </button>
      </div>
      <div className="mt-2 space-y-4">
        {review.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="p-4 border rounded-md hover:shadow-lg transition-shadow "
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="w-24 h-24 rounded-lg border-2 border-gray-300 overflow-hidden">
                <img
                  src={item.product.product_images[0].image_url}
                  alt={item.product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>

              <h3 className="flex-1 font-medium text-md">
                {item.product.name}
              </h3>

              <button
                className="p-2 border-2  rounded-lg px-5 bg-sky-500 text-white border-dotted"
                onClick={() => {
                  setEditReview(true);
                  setItemEdit(item);
                }}
              >
                Sửa
              </button>
            </div>
            <div className="border-t-2 p-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-16 h-16 rounded-full overflow-hidden p-0.5  ${colors.gradients.limeToEmerald}`}
                >
                  <img
                    src={item.user.avatar_url}
                    alt={item.user.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h3 className="text-lg font-medium">{item.user.username}</h3>
                <p className="ml-auto text-gray-400">
                  {formatDate(item.created_at)}
                </p>
              </div>
              <div className="mt-3">
                <p className="flex">{renderStars(item.rating)}</p>
                <p>{item.comment}</p>
                <div className="flex items-center flex-wrap gap-2">
                  {item.ReviewImage.map((img) => (
                    <div className="w-28 h-28" key={img.id}>
                      <img src={img.image_url} alt="" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {openEditReview && (
        <EditReview
          data={itemEdit}
          onClose={() => {
            setEditReview(false);
          }}
          fetchData={() => fetchReview(state.order.id)}
        />
      )}
    </div>
  );
}
