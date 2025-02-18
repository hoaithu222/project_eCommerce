import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import { IoChevronBackCircle } from "react-icons/io5";
import colors from "../style/colors";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { formatDate } from "../utils/formatDate";
import OrderHistory from "../components/OrderItem/OrderHistory";
import OrderAddress from "../components/OrderItem/OrderAddress";
import OrderInfo from "../components/OrderItem/OrderInfo";

export default function OrderItem() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${SummaryApi.getOrder.url}/${id}`, {
        method: SummaryApi.getOrder.method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const result = await response.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    return () => clearInterval(interval);
  }, [id]);

  return (
    <div className="bg-white shadow-lg p-4 rounded-md space-y-6 max-h-[96vh] overflow-y-auto hidden-scrollbar">
      <div className="flex items-center">
        <div
          className="flex items-center text-2xl "
          onClick={() => {
            navigate(-1);
          }}
        >
          <IoChevronBackCircle size={30} className="text-sky-400" />
          <p className={`${colors.textColors.gradientOrangeToCyan}`}>Trở lại</p>
        </div>
        <div className="ml-auto">
          <p className={`${colors.textColors.gradientOrangeToCyan}`}>
            Mã hàng :{data.id}
          </p>
        </div>
      </div>
      <OrderHistory orderItem={data} />
      <OrderAddress idAddress={data.address_id} />
      <OrderInfo orderItem={data} />
    </div>
  );
}
