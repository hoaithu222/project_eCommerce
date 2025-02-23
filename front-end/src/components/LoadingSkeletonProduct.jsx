const LoadingSkeletonProduct = () => (
  <div className="mt-3 sm:mt-6 space-y-2 md:space-y-4 lg:space-y-6">
    {[...Array(5)].map((_, index) => (
      <div
        className="flex gap-2 md:gap-3 lg:gap-4 items-center animate-pulse"
        key={index}
      >
        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-200" />
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-gray-200 rounded-md" />
        <div className="space-y-2 sm:space-y-3 lg:space-y-4 w-[70%]">
          <div className="h-4 sm:h-5 md:h-6 lg:h-7 bg-gray-200 rounded w-3/4" />
          <div className="h-4 sm:h-5 md:h-6 lg:h-7 bg-gray-200 rounded w-1/4" />
        </div>
      </div>
    ))}
  </div>
);

export default LoadingSkeletonProduct;
