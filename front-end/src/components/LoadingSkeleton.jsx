const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-8 md:h-12 lg:h-16 bg-gray-200 rounded-lg mb-2 lg:mb-4"></div>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 lg:gap-4">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="bg-gray-200 rounded-lg">
            <div className="aspect-square w-full bg-gray-300 rounded-t-lg"></div>
            <div className="p-2 lg:p-4 space-y-1 lg:space-y-3">
              <div className="h-2 lg:h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-2 lg:h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-2 lg:h-4 bg-gray-300 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;
