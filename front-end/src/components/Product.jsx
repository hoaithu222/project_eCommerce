import { useSelector } from "react-redux";
import { FcLike } from "react-icons/fc";
import ProductItem from "./ProductItem";
import LoadingSkeleton from "./LoadingSkeleton";

export default function Product() {
  const { data: products, loading } = useSelector((state) => state.product);

  if (loading) {
    return (
      <div className="px-4 container mx-auto py-2 lg:py-4">
        <div className="overflow-hidden">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-2 lg:py-4">
      <div className=" overflow-hidden">
        <div className="bg-gradient-to-r from-blue-400 to-blue-400 p-1 md:p-3 lg:p-4 text-white flex items-center gap-2 rounded-lg ">
          <FcLike className="text-xl md:text-2xl lg:text-3xl" />
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold">
            Dành cho bạn
          </h3>
        </div>
        <div className="grid  grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 lg:gap-4 mt-2 lg:mt-4">
          {products?.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
        {/* <div className="flex items-center justify-center">
          <Link
            to="/products"
            className={`${colors.button.medium} ${colors.button.gradientRedToYellow} mx-auto my-2 lg:my-4 `}
          >
            Xem thêm
          </Link>
        </div> */}
      </div>
    </div>
  );
}
