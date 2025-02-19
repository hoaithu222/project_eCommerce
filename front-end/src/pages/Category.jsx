import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import ListSubCategory from "../components/ListSubCategory";
import ListProduct from "../components/ListProduct";
import Loading from "./Loading";
export default function Category() {
  const { categoryId } = useParams();
  const [categoryData, setCategoryData] = useState(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [subCategory, setSubCategory] = useState([]);
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
      const allSubCategory = result.data.sub_categories.map((subCategory) => {
        return subCategory.id;
      });
      setSubCategory(allSubCategory);
    } catch (error) {
      console.error("Error fetching category details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryDetails();
    window.scrollTo(0, 0);
  }, [categoryId]);

  return (
    <div className="container mx-auto p-4 mt-24 lg:mt-20">
      <div className="w-full h-36 lg:h-96 rounded-2xl overflow-hidden">
        <img
          src={categoryData?.img_banner}
          alt="hình ảnh"
          className="w-full h-full object-contain rounded-2xl lg:object-cover "
        />
      </div>
      <div className="mt-6">
        <ListSubCategory
          categoryData={categoryData}
          loading={loading}
          setSubCategory={setSubCategory}
          setTitle={setTitle}
        />
      </div>
      <div className="mt-4">
        <ListProduct
          title={title}
          fetchData={fetchCategoryDetails}
          setTitle={setTitle}
          subCategory={subCategory}
        />
      </div>
      {loading && <Loading />}
    </div>
  );
}
