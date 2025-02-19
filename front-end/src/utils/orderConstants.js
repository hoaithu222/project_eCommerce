export const STATUS_FLOW = {
  pending: "processing",
  processing: "shipped",
  shipped: {
    success: "delivered",
    cancel: "cancelled",
  },
  delivered: "completed",
  cancelled: "cancelled",
};

export const STATUS_COLORS = {
  pending: "text-yellow-500",
  processing: "text-blue-500",
  shipped: "text-purple-500",
  delivered: "text-green-500",
  cancelled: "text-red-500",
};

export const ACTION_BUTTON_TEXT = {
  pending: "Xác nhận đã chuẩn bị hàng xong",
  processing: "Xác nhận đã được vận chuyển",
  shipped: {
    success: "Xác nhận đã ship thành công",
    cancel: "Đơn hàng đã bị hủy",
  },
};