export const formatDate = (dateString) => {
  if (!dateString) return "Không có thông tin";
  return new Date(dateString).toLocaleString("vi-VN", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};
