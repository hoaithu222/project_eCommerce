const CategoryCardSkeleton = () => {
  return (
    <div className="w-full max-w-xs p-4 bg-white rounded-lg shadow animate-pulse">
      <div className="w-full h-40 bg-gray-300 rounded"></div>
      <div className="mt-4 space-y-2">
        <div className="h-5 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="flex justify-between mt-4">
        <div className="h-8 bg-blue-300 rounded w-20"></div>
        <div className="h-8 bg-red-300 rounded w-20"></div>
      </div>
    </div>
  );
};

export default CategoryCardSkeleton;
