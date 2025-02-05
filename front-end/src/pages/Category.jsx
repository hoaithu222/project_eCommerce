import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";

export default function Category() {
  const { categoryId } = useParams();
  const [categoryData, setCategoryData] = useState(null);
  const [products, setProducts] = useState([]);

  const fetchCategoryDetails = async () => {
    try {
      const response = await fetch(
        `${SummaryApi.getCategoryById.url}/${categoryId}`,
        {
          method: SummaryApi.getCategoryById.method,
        },
      );
      const result = await response.json();
      setCategoryData(result.data);

      const allProducts = result.data.sub_categories.flatMap(
        (subCategory) => subCategory.products,
      );
      setProducts(allProducts);
    } catch (error) {
      console.error("Error fetching category details:", error);
    }
  };
  console.log("category", categoryData);
  console.log("prodyuc", products);
  useEffect(() => {
    fetchCategoryDetails();
  }, [categoryId]);

  return (
    <div className="container mx-auto p-4">
      <div className="w-full h-96 rounded-2xl overflow-hidden">
        <img
          src={categoryData?.img_banner}
          alt="hình ảnh"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
