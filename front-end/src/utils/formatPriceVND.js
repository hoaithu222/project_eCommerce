export const formatPriceVND = (price) => {
  return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};
