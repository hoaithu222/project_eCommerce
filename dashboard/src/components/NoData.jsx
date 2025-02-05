import { FaBoxOpen } from "react-icons/fa";

const NoData = ({
  message = "No data available",
  subMessage = "Please try again later or check your filters",
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[300px] w-full bg-gray-50 rounded-lg mt-10">
      <div className="animate-bounce mb-6">
        <FaBoxOpen className="text-6xl text-gray-300" />
      </div>

      <h3 className="text-xl font-semibold text-gray-700 mb-2 text-center">
        {message}
      </h3>

      <p className="text-gray-500 text-center max-w-md">{subMessage}</p>

      <div className="mt-8 w-full max-w-md">
        <div className="h-2 bg-gray-200 rounded animate-pulse" />
        <div className="h-2 bg-gray-200 rounded animate-pulse mt-3 w-3/4 mx-auto" />
        <div className="h-2 bg-gray-200 rounded animate-pulse mt-3 w-1/2 mx-auto" />
      </div>
    </div>
  );
};

export default NoData;
