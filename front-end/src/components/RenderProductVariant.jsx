export default function RenderProductVariant(orderItems, productId, reviewId) {
  // Lọc ra tất cả order_items có cùng product_id
  // Tìm review tương ứng trong order_items
  const matchingOrderItem = orderItems.find(
    (item) =>
      item.product_id === productId &&
      item.product_variant &&
      // Kiểm tra reviewId với variant_id để đảm bảo đúng biến thể
      item.variant_id === reviewId,
  );

  if (!matchingOrderItem) return null;

  const combination = matchingOrderItem.product_variant?.combination || {};

  return (
    <div className="flex items-center gap-3 my-3">
      {Object.entries(combination).map(([key, value]) => (
        <span
          key={key}
          className="inline-flex items-center text-sm px-2 py-1 rounded-full text-white bg-red-200 text-gray-400"
        >
          {key}:{value}
        </span>
      ))}
    </div>
  );
}
