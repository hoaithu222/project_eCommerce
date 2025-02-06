import { GiBallHeart } from "react-icons/gi";
import { PiCursorClickBold } from "react-icons/pi";
import colors from "../style/colors";

export default function ListSubCategory({ categoryData, loading, setProduct }) {
  return (
    <div className=" rounded-md p-4 flex items-center justify-center flex-col">
      <div className="bg-white py-2 px-6 rounded-full flex items-center my-3 border-2 border-purple-100 border-dashed hover:shadow-purple-200 hover:shadow-2xl mb-4 ">
        <GiBallHeart
          className={`text-rose-400 text-4xl font-bold m-2 cursor-pointer hover:scale-110`}
        />
        <p
          className={`${colors.textColors.gradientOrangeToCyan} text-3xl font-bold m-2`}
        >
          Tất cả danh mục con thuộc<strong> {categoryData?.name}</strong>
        </p>
      </div>
      <div className="flex items-center justify-center gap-5 overflow-x-auto hidden-scrollbar">
        {categoryData?.sub_categories?.map((sub_category, index) => (
          <div
            key={`${sub_category}-${index}`}
            className="border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-2xl hover:bg-purple-100"
            onClick={() => setProduct(sub_category?.products)}
          >
            <div className="w-56 h-56 overflow-hidden mx-auto">
              <img
                src={sub_category.icon_url}
                alt={sub_category.name}
                className="w-full h-full "
              />
            </div>
            <div className="flex items-center p-3 gap-2">
              <PiCursorClickBold className="text-3xl text-blue-300 rotate-180" />
              <h3 className="text-center mt-2 text-xl text-purple-400 font-semibold line-clamp-1">
                {sub_category.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
