import { useEffect, useState } from "react";
import { FaSearchengin } from "react-icons/fa6";
import { IoAddCircle } from "react-icons/io5";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import colors from "../style/colors";

import { useDispatch, useSelector } from "react-redux";
import { fetchAttribute } from "../store/actions/fetchAttribute";
import SummaryApi from "../common/SummaryApi";
import { toast } from "react-toastify";
import NoData from "../components/NoData";
import Pagination from "../components/Pagination";
import ConfirmBox from "../components/ConfirmBox";
import Loading from "./Loading";
import EditAttribute from "../components/EditAttribute";
import UploadAttributeModal from "../components/UploadAttributeModel";

export default function Attributes() {
  const [openAttribute, setOpeAttribute] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [sortItem, setSortItem] = useState("id");
  const [order, setOrder] = useState("asc");
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [categories, setCategories] = useState([]);

  const [filteredAttribute, setFilteredAttribute] = useState(null);
  const dispatch = useDispatch();

  const {
    data: attribute,
    loading,
    count,
  } = useSelector((state) => state.attribute);
  const fetchData = () => {
    dispatch(
      fetchAttribute({
        _page: currentPage,
        _limit: itemsPerPage,
        _sort: sortItem,
        _order: order,
        q: search,
      })
    );
  };
  const [deleteAttribute, setDeleteAttribute] = useState({ id: "" });
  const [attributeEdit, setAttributeEdit] = useState({
    id: "",
    name: "",
    icon_url: "",
    description: "",
  });
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [currentPage, itemsPerPage, sortItem, order, search]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(SummaryApi.getAllCategory.url);
        const result = await response.json();
        if (result.success) {
          setCategories(result.data);
        }
      } catch (error) {
        toast.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);
  const handleEditAttribute = (item) => {
    setAttributeEdit(item);
    setOpenEdit(true);
  };
  const handleDeleteAttribute = async () => {
    setLoadingDelete(true);
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `${SummaryApi.deleteAttributes.url}/${deleteAttribute.id}`,
        {
          method: SummaryApi.deleteAttributes.method,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        dispatch({ type: "delete_attributes", payload: deleteAttribute.id });
        fetchData();

        setOpenConfirm(false);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingDelete(false);
    }
  };

  const displayedAttribute = attribute;

  const totalPages = Math.ceil(count / itemsPerPage);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow-xl p-6 mb-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            Attribute Management
          </h2>
          <button
            onClick={() => setOpeAttribute(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all shadow-md hover:shadow-lg"
          >
            <IoAddCircle className="text-xl" />
            Add Attributes
          </button>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search attribute..."
              className="w-full pl-10 pr-4 py-2 border-2 border-blue-300 rounded-3xl focus:border-pink-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none shadow-md"
            />
            <FaSearchengin className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 text-xl" />
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
      {/* Content Section */}
      {loading || loadingCategory ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
        </div>
      ) : !displayedAttribute?.length ? (
        <NoData
          message="No sub categories found"
          subMessage="Try adjusting your search or create a new sub category"
        />
      ) : (
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-400 to-pink-400">
                <tr>
                  <th className="p-4 text-left text-white font-semibold">ID</th>
                  <th className="p-4 text-left text-white font-semibold">
                    Name
                  </th>
                  <th className="p-4 text-left text-white font-semibold">
                    Value
                  </th>
                  <th className="p-4 text-left text-white font-semibold">
                    Category
                  </th>

                  <th className="p-4 text-left text-white font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {displayedAttribute?.map((item, index) => (
                  <tr
                    key={`${item.id}-${index}`}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 text-gray-600">#{item.id}</td>
                    <td className="p-4">
                      <div className="font-medium text-gray-800">
                        {item.name}
                      </div>
                    </td>
                    <td className="p-4">
                      {item?.attribute_values?.map((value, index) => (
                        <span key={`${value.id}-${index}`}>
                          {value.value}
                          {index < item.attribute_values.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </td>

                    <td className="p-4">
                      {item?.categories?.map((data, index) => (
                        <span
                          className="inline-flex items-center  px-1.5 py-0.5 m-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                          key={`${data.attribute_type_id}-${index}`}
                        >
                          {data?.category?.name}
                        </span>
                      ))}
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditAttribute(item)}
                          className="px-3 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors shadow-md hover:shadow-lg text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setDeleteAttribute(item);
                            setOpenConfirm(true);
                          }}
                          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-md hover:shadow-lg text-sm"
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

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {openAttribute && (
        <UploadAttributeModal
          onClose={() => setOpeAttribute(false)}
          onSuccess={fetchData}
        />
      )}
      {openEdit && (
        <EditAttribute
          dataAttributeId={attributeEdit}
          onClose={() => setOpenEdit(false)}
          onSuccess={() => {
            fetchData();
          }}
        />
      )}
      {openConfirm && (
        <ConfirmBox
          cancel={() => setOpenConfirm(false)}
          confirm={handleDeleteAttribute}
          close={() => setOpenConfirm(false)}
        />
      )}
      {loadingDelete && <Loading />}
    </div>
  );
}
