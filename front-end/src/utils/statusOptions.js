import { LiaShippingFastSolid } from "react-icons/lia";
import { TbShoppingCartCancel } from "react-icons/tb";

import { BsBorderAll, BsFillBox2HeartFill } from "react-icons/bs";
import { FaClockRotateLeft, FaStopwatch20 } from "react-icons/fa6";
export const statusOptions = [
  {
    key: "all",
    label: "Tất cả",
    color: "text-blue-400",
    icon: BsBorderAll,
  },
  {
    key: "pending",
    label: "Chờ xử lý",
    color: "text-orange-400",
    icon: FaClockRotateLeft,
  },
  {
    key: "processing",
    label: "Đang chuẩn bị hàng",
    color: "text-yellow-400",
    icon: FaStopwatch20,
  },
  {
    key: "shipped",
    label: "Đang vận chuyển",
    color: "text-green-400",
    icon: LiaShippingFastSolid,
  },
  {
    key: "delivered",
    label: "Đã giao hàng",
    color: "text-pink-400",
    icon: BsFillBox2HeartFill,
  },
  {
    key: "cancelled",
    label: "Đã hủy",
    color: "text-red-400",
    icon: TbShoppingCartCancel,
  },
];
