import { useEffect, useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import { FaSearchengin } from "react-icons/fa6";
import { RiArrowUpSFill, RiArrowDownSFill } from "react-icons/ri";
import NoData from "../components/NoData";
import EditCategory from "../components/EditCategory";
import UploadCategoryModel from "../components/UploadCategoryModel";
import ConfirmBox from "../components/ConfirmBox";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchCategory } from "../store/actions/fetchCategory";
import Loading from "./Loading";
import SummaryApi from "../common/SummaryApi";
import colors from "../style/colors";
import Pagination from "../components/Pagination";
import CategoryCardSkeleton from "../components/CategoryCardSkeleton";

export default function Category() {
  const [openCategory, setOpenCategory] = useState(false);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [sortItem, setSortItem] = useState("id");
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const {
    data: category,
    loading,

    count,
  } = useSelector((state) => state.category);

  const [deleteCategory, setDeleteCategory] = useState({ id: "" });
  const [categoryEdit, setCategoryEdit] = useState({
    id: "",
    name: "",
    icon_url: "",
    img_banner: "",
    description: "",
    is_active: "",
  });

  const fetchData = () => {
    dispatch(
      fetchCategory({
        _page: currentPage,
        _limit: itemsPerPage,
        _sort: sortItem,
        _order: order,
        q: search,
      })
    );
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [currentPage, itemsPerPage, sortItem, order, search]);

  const handleEditCategory = (item) => {
    setCategoryEdit(item);
    setOpenEdit(true);
  };

  const handleDeleteCategory = async () => {
    setLoadingDelete(true);
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `${SummaryApi.deleteCategory.url}/${deleteCategory.id}`,
        {
          method: SummaryApi.deleteCategory.method,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        dispatch({ type: "delete_category", payload: deleteCategory.id });
        fetchData();
        setOpenConfirm(false);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingDelete(false);
    }
  };

  const totalPages = Math.ceil(count / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            Categories Management
          </h1>
          <button
            onClick={() => setOpenCategory(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all shadow-md hover:shadow-lg"
          >
            <IoAddCircle className="text-xl" />
            Add Category
          </button>
        </div>

        {/* Search and Filters */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search categories..."
              className="w-full pl-10 pr-4 py-2 border-2 border-blue-300 rounded-3xl focus:border-pink-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none shadow-xl"
            />
            <FaSearchengin className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-300 text-xl" />
          </div>

          {/* Items per page */}
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-6  py-2 border-2  border-blue-300 rounded-3xl focus:border-pink-400 outline-none shadow-2xl"
          >
            <option value={8}>8 items</option>
            <option value={12}>12 items</option>
            <option value={16}>16 items</option>
            <option value={24}>24 items</option>
          </select>

          {/* Sort */}
          <div className="flex gap-2">
            <select
              value={sortItem}
              onChange={(e) => setSortItem(e.target.value)}
              className="flex-1 px-4 py-2 border-2 border-blue-300 rounded-3xl focus:border-pink-400  outline-none"
            >
              <option value="id">Sort by ID</option>
              <option value="name">Sort by Name</option>
              <option value="created_at">Sort by Date</option>
            </select>
            <button
              onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
              className={`px-2 py-2 border-2  border-gray-300 rounded-full  ${colors.gradients.pinkToPurple}`}
            >
              {order === "asc" ? (
                <RiArrowUpSFill size={24} className="text-white" />
              ) : (
                <RiArrowDownSFill size={24} className="text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <CategoryCardSkeleton key={index} />
            ))}
        </div>
      ) : category?.length === 0 ? (
        <NoData
          message="No categories found"
          subMessage="Try adjusting your search or create a new category"
        />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {category.map((item) => (
              <div
                key={item.id + "Category"}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={item.icon_url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditCategory(item)}
                      className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setDeleteCategory(item);
                        setOpenConfirm(true);
                      }}
                      className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}

      {/* Modals */}
      {openCategory && (
        <UploadCategoryModel
          onClose={() => setOpenCategory(false)}
          onSuccess={fetchData}
        />
      )}
      {openEdit && (
        <EditCategory
          dataCategoryId={categoryEdit}
          onClose={() => setOpenEdit(false)}
          onSuccess={fetchData}
        />
      )}
      {openConfirm && (
        <ConfirmBox
          cancel={() => setOpenConfirm(false)}
          confirm={handleDeleteCategory}
          close={() => setOpenConfirm(false)}
        />
      )}
    </div>
  );
}
