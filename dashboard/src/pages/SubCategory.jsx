import { useEffect, useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import { FaSearchengin } from "react-icons/fa6";
import { RiArrowUpSFill, RiArrowDownSFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import NoData from "../components/NoData";
import UploadSubCategoryModel from "../components/UploadSubCategoryModel";
import EditSubCategory from "../components/EditSubCatgory";
import ConfirmBox from "../components/ConfirmBox";
import Loading from "./Loading";
import SummaryApi from "../common/SummaryApi";
import { fetchSubCategory } from "../store/actions/fetchSubCategory";
import Pagination from "../components/Pagination";

export default function SubCategory() {
  const [openSubCategory, setOpenSubCategory] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [sortItem, setSortItem] = useState("id");
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState(null);

  const dispatch = useDispatch();
  const {
    data: subCategory,
    loading,
    count,
  } = useSelector((state) => state.subCategory);

  const [deleteSubCategory, setDeleteSubCategory] = useState({ id: "" });
  const [subCategoryEdit, setSubCategoryEdit] = useState({
    id: "",
    name: "",
    icon_url: "",
    description: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(SummaryApi.getAllCategory.url);
        const result = await response.json();
        if (result.success) {
          setCategories(result.data);
        }
      } catch (error) {
        toast.error("Failed to fetch categories");
      }
    };
    fetchCategories();
  }, []);

  const handleCategorySelect = async (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    setLoadingCategory(true);

    if (!categoryId) {
      setFilteredSubCategories(null);
      fetchData();
      setLoadingCategory(false);
      return;
    }

    try {
      const response = await fetch(
        `${SummaryApi.getCategory.url}/${categoryId}`
      );
      const result = await response.json();
      if (result.success) {
        setFilteredSubCategories(result.data.sub_categories);
      }
    } catch (error) {
      console.error(error);
      setFilteredSubCategories(null);
    } finally {
      setLoadingCategory(false);
    }
  };

  const fetchData = () => {
    if (!selectedCategory) {
      dispatch(
        fetchSubCategory({
          _page: currentPage,
          _limit: itemsPerPage,
          _sort: sortItem,
          _order: order,
          q: search,
        })
      );
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!selectedCategory) {
        fetchData();
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [currentPage, itemsPerPage, sortItem, order, search, selectedCategory]);

  const handleEditSubCategory = (item) => {
    setSubCategoryEdit(item);
    setOpenEdit(true);
  };

  const handleDeleteSubCategory = async () => {
    setLoadingDelete(true);
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `${SummaryApi.deleteSubCategory.url}/${deleteSubCategory.id}`,
        {
          method: SummaryApi.deleteSubCategory.method,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        if (selectedCategory) {
          handleCategorySelect({ target: { value: selectedCategory } });
        } else {
          fetchData();
          dispatch({
            type: "delete_sub_category",
            payload: deleteSubCategory.id,
          });
        }
        setOpenConfirm(false);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingDelete(false);
    }
  };

  const displayedSubCategories = selectedCategory
    ? filteredSubCategories
    : subCategory;

  const totalPages = Math.ceil(count / itemsPerPage);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="p-6 mb-4 bg-white rounded-xl shadow-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            Sub Categories Management
          </h2>
          <button
            onClick={() => setOpenSubCategory(true)}
            className="flex gap-2 items-center px-4 py-2 text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg shadow-md transition-all hover:from-purple-700 hover:to-blue-600 hover:shadow-lg"
          >
            <IoAddCircle className="text-xl" />
            Add Sub Category
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search sub categories..."
              className="py-2 pr-4 pl-10 w-full rounded-3xl border-2 border-purple-300 shadow-md transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-purple-200"
            />
            <FaSearchengin className="absolute left-3 top-1/2 text-xl text-purple-400 -translate-y-1/2" />
          </div>

          <select
            onChange={handleCategorySelect}
            value={selectedCategory || ""}
            className="px-4 py-2 rounded-3xl border-2 border-purple-300 shadow-md transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-purple-200"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <select
              value={sortItem}
              onChange={(e) => setSortItem(e.target.value)}
              className="flex-1 px-4 py-2 rounded-3xl border-2 border-purple-300 shadow-md transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-purple-200"
            >
              <option value="id">Sort by ID</option>
              <option value="name">Sort by Name</option>
              <option value="created_at">Sort by Date</option>
            </select>
            <button
              onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
              className="p-2 rounded-full border-2 border-purple-300 shadow-md transition-colors hover:bg-purple-50"
            >
              {order === "asc" ? (
                <RiArrowUpSFill size={24} className="text-purple-500" />
              ) : (
                <RiArrowDownSFill size={24} className="text-purple-500" />
              )}
            </button>
          </div>
        </div>
      </div>

      {loading || loadingCategory ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 rounded-full border-4 border-purple-500 animate-spin border-t-transparent"></div>
        </div>
      ) : !displayedSubCategories?.length ? (
        <NoData
          message="No sub categories found"
          subMessage="Try adjusting your search or create a new sub category"
        />
      ) : (
        <div className="overflow-hidden bg-white rounded-xl shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-400 to-blue-400">
                <tr>
                  <th className="p-4 font-semibold text-left text-white">
                    Image
                  </th>
                  <th className="p-4 font-semibold text-left text-white">ID</th>
                  <th className="p-4 font-semibold text-left text-white">
                    Name
                  </th>
                  <th className="p-4 font-semibold text-left text-white">
                    Description
                  </th>
                  <th className="p-4 font-semibold text-left text-white">
                    Category
                  </th>
                  <th className="p-4 font-semibold text-left text-white">
                    Created At
                  </th>
                  <th className="p-4 font-semibold text-left text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {displayedSubCategories.map((item) => (
                  <tr
                    key={item.id + "subcategory"}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="p-4">
                      <div className="overflow-hidden relative w-16 h-16 rounded-lg group">
                        <img
                          src={item.icon_url}
                          alt={item.name}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-30" />
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">#{item.id}</td>
                    <td className="p-4">
                      <div className="font-medium text-gray-800">
                        {item.name}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="max-w-xs text-gray-600 truncate">
                        {item.description}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {categories.find((cat) => cat.id === item.category_id)
                          ?.name || "Unknown"}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2 items-center">
                        <button
                          onClick={() => handleEditSubCategory(item)}
                          className="px-3 py-1 text-sm text-white bg-purple-500 rounded-lg shadow-md transition-colors hover:bg-purple-600 hover:shadow-lg"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setDeleteSubCategory(item);
                            setOpenConfirm(true);
                          }}
                          className="px-3 py-1 text-sm text-white bg-red-500 rounded-lg shadow-md transition-colors hover:bg-red-600 hover:shadow-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}

      {!selectedCategory && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}

      {/* Modals */}
      {openSubCategory && (
        <UploadSubCategoryModel
          onClose={() => setOpenSubCategory(false)}
          onSuccess={() => {
            if (selectedCategory) {
              handleCategorySelect({ target: { value: selectedCategory } });
            } else {
              fetchData();
            }
          }}
        />
      )}
      {openEdit && (
        <EditSubCategory
          dataSubCategoryId={subCategoryEdit}
          onClose={() => setOpenEdit(false)}
          onSuccess={() => {
            if (selectedCategory) {
              handleCategorySelect({ target: { value: selectedCategory } });
            } else {
              fetchData();
            }
          }}
        />
      )}
      {openConfirm && (
        <ConfirmBox
          cancel={() => setOpenConfirm(false)}
          confirm={handleDeleteSubCategory}
          close={() => setOpenConfirm(false)}
        />
      )}
    </div>
  );
}
