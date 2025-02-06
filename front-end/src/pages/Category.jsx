import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import ListSubCategory from "../components/ListSubCategory";
import ListProduct from "../components/ListProduct";
export default function Category() {
  const { categoryId } = useParams();
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchCategoryDetails = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

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
      <div className="mt-6">
        <ListSubCategory
          categoryData={categoryData}
          loading={loading}
          setProduct={setProducts}
        />
      </div>
      <div className="mt-4">
        <ListProduct products={products} />
      </div>
    </div>
  );
}
