import { formatPriceVND } from "../utils/formatPriceVND";

export default function OrderShopItem({ item }) {
  return (
    <div className="space-y-2 cursor-pointer" key={item.id}>
      <div className="flex items-center space-x-2">
        <div className="w-28 h-28 rounded-md overflow-hidden border-2 border-gray-200">
          {item.product && (
            <img
              src={item.product.product_images[0].image_url}
              alt={item.product.name}
              className="w-full h-full object-cover rounded-md"
            />
          )}
        </div>
        <div>
          <h2 className="line-clamp-1">{item.product.name}</h2>
          {item.product_variant && (
            <div className="flex items-center gap-3 my-3">
              {Object.entries(item.product_variant.combination || {}).map(
                ([key, value]) => (
                  <span
                    key={key}
                    className="inline-flex items-center text-sm px-2 py-1 rounded-full bg-red-100 text-gray-400"
                  >
                    {key}:{value}
                  </span>
                ),
              )}
            </div>
          )}
          <div className="flex items-center gap-0.5">
            <span>x</span>
            <p>{item.quantity}</p>
          </div>
        </div>
        <div className="flex justify-end flex-1">
          <p className="text-pink-500 font-semibold text-xl text-end">
            {formatPriceVND(+item.unit_price)}
          </p>
        </div>
      </div>
      <hr />
    </div>
  );
}
