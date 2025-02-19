import { GiBallHeart } from "react-icons/gi";
import { PiCursorClickBold } from "react-icons/pi";
import colors from "../style/colors";

export default function ListSubCategory({
  categoryData,
  loading,
  setSubCategory,
  setTitle,
}) {
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-12 lg:h-16 bg-gray-200 rounded-lg mb-4"></div>
        <div className="grid  grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="bg-gray-200 rounded-lg">
              <div className="aspect-square w-full bg-gray-300 rounded-t-lg"></div>
              <div className="p-2 lg:p-4 space-y-3">
                <div className="h-2 lg:h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="container rounded-md  flex items-center justify-center flex-col">
      <div className="bg-white py-1 lg:py-2 px-3 lg:px-6 rounded-full flex items-center lg:my-3 border-2 border-purple-100 border-dashed hover:shadow-purple-200 hover:shadow-2xl mb-4 ">
        <GiBallHeart
          className={`text-rose-400 text-xl md:text-3xl lg:text-4xl font-bold m-2 cursor-pointer hover:scale-110`}
        />
        <p
          className={`${colors.textColors.gradientOrangeToCyan} text-sm md:text-xl lg:text-2xl font-bold m-1`}
        >
          Tất cả danh mục con thuộc<strong> {categoryData?.name}</strong>
        </p>
      </div>
      <div className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 overflow-x-auto hidden-scrollbar">
        {categoryData?.sub_categories?.map((sub_category, index) => (
          <div
            key={`${sub_category}-${index}`}
            className="border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-2xl hover:bg-purple-100"
            onClick={() => {
              setSubCategory([sub_category?.id]);
              setTitle(sub_category?.name);
            }}
          >
            <div className="h-32 w-32 md:w-40 md:h-40 lg:w-56 lg:h-56 overflow-hidden mx-auto">
              <img
                src={sub_category.icon_url}
                alt={sub_category.name}
                className="w-full h-full object-cover "
              />
            </div>
            <div className="flex items-center p-1.5 lg:p-3 gap-2">
              <PiCursorClickBold className="text-xl md:text-2xl lg:text-3xl text-blue-300 rotate-180" />
              <h3 className="text-center mt-2 text-sm md:text-lg lg:text-xl text-purple-400 font-semibold line-clamp-1">
                {sub_category.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
