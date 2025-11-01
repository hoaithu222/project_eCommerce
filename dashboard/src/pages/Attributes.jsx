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
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="p-6 mb-4 bg-white rounded-xl shadow-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            Attribute Management
          </h2>
          <button
            onClick={() => setOpeAttribute(true)}
            className="flex gap-2 items-center px-4 py-2 text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg shadow-md transition-all hover:from-purple-700 hover:to-blue-600 hover:shadow-lg"
          >
            <IoAddCircle className="text-xl" />
            Add Attributes
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search attribute..."
              className="py-2 pr-4 pl-10 w-full rounded-3xl border-2 border-blue-300 shadow-md transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-purple-200"
            />
            <FaSearchengin className="absolute left-3 top-1/2 text-xl text-purple-400 -translate-y-1/2" />
          </div>
          {/* Items per page */}
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-6 py-2 rounded-3xl border-2 border-blue-300 shadow-2xl outline-none focus:border-blue-400"
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
              className="flex-1 px-4 py-2 rounded-3xl border-2 border-blue-300 outline-none focus:border-blue-400"
            >
              <option value="id">Sort by ID</option>
              <option value="name">Sort by Name</option>
              <option value="created_at">Sort by Date</option>
            </select>
            <button
              onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
              className={`px-2 py-2 border-2  border-gray-300 rounded-full  ${colors.gradients.blueToPurple}`}
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
          <div className="w-12 h-12 rounded-full border-4 border-purple-500 animate-spin border-t-transparent"></div>
        </div>
      ) : !displayedAttribute?.length ? (
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
                  <th className="p-4 font-semibold text-left text-white">ID</th>
                  <th className="p-4 font-semibold text-left text-white">
                    Name
                  </th>
                  <th className="p-4 font-semibold text-left text-white">
                    Value
                  </th>
                  <th className="p-4 font-semibold text-left text-white">
                    Category
                  </th>

                  <th className="p-4 font-semibold text-left text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {displayedAttribute?.map((item, index) => (
                  <tr
                    key={`${item.id}-${index}`}
                    className="transition-colors hover:bg-gray-50"
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
                      <div className="flex gap-2 items-center">
                        <button
                          onClick={() => handleEditAttribute(item)}
                          className="px-3 py-1 text-sm text-white bg-purple-500 rounded-lg shadow-md transition-colors hover:bg-purple-600 hover:shadow-lg"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setDeleteAttribute(item);
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

    </div>
  );
}
