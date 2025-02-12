import { IoClose } from "react-icons/io5";
import colors from "../style/colors";
import InputField from "./InputField";
import { useEffect, useState } from "react";
import { FcBusinessman, FcHome } from "react-icons/fc";
import { FcCallback } from "react-icons/fc";
import { FcGlobe } from "react-icons/fc";
import LoadingBtn from "./LoadingBtn";
import SummaryApi from "../common/SummaryApi";
import { toast } from "react-toastify";
import addressData from "../common/addressData";

export default function ModelEditAddress({ onClose, fetchData, dataAddress }) {
  const [data, setData] = useState({
    recipient_name: dataAddress.recipient_name || "",
    phone: dataAddress.phone || "",
    city: dataAddress.city || "",
    district: dataAddress.district || "",
    ward: dataAddress.ward || "",
    is_default: dataAddress.is_default || false,
    address_line1: dataAddress.address_line1 || "",
    address_line2: dataAddress.address_line2 || "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  useEffect(() => {
    setProvinces(addressData);
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const selectedProvinceData = addressData.find(
        (province) => province.code === Number(selectedProvince),
      );
      setDistricts(selectedProvinceData ? selectedProvinceData.districts : []);
      setSelectedDistrict("");
      setSelectedWard("");
      setWards([]);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      const selectedDistrictData = districts.find(
        (district) => district.code === Number(selectedDistrict),
      );
      setWards(selectedDistrictData ? selectedDistrictData.wards : []);
      setSelectedWard("");
    }
  }, [selectedDistrict]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleProvinceChange = (e) => {
    const selectedCode = Number(e.target.value);
    const selectedProvince = provinces.find(
      (province) => province.code === selectedCode,
    );

    setSelectedProvince(selectedCode);
    setData((prev) => ({ ...prev, city: selectedProvince?.name || "" }));
  };

  const handleDistrictChange = (e) => {
    const selectedCode = Number(e.target.value);
    const selectedDistrict = districts.find(
      (district) => district.code === selectedCode,
    );

    setSelectedDistrict(selectedCode);
    setData((prev) => ({ ...prev, district: selectedDistrict?.name || "" }));
  };

  const handleWardChange = (e) => {
    const selectedCode = Number(e.target.value);
    const selectedWard = wards.find((ward) => ward.code === selectedCode);

    setSelectedWard(selectedCode);
    setData((prev) => ({ ...prev, ward: selectedWard?.name || "" }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `${SummaryApi.updateAddress.url}/${dataAddress.id}`,
        {
          method: SummaryApi.updateAddress.method,
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      const responseData = await response.json();
      if (responseData.success) {
        toast.success(responseData.message);
        onClose();
        fetchData();
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật địa chỉ");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-55 z-50 flex items-center justify-center">
      <div className="bg-white w-[50%] p-5 rounded-xl shadow-2xl shadow-slate-50">
        <div className="flex justify-between items-center">
          <h2
            className={`${colors.textColors.gradientPurpleToYellow} text-2xl font-medium`}
          >
            Cập nhật địa chỉ
          </h2>
          <IoClose
            onClick={onClose}
            className={`text-red-500 text-2xl cursor-pointer hover:scale-110`}
          />
        </div>
        <form className="mt-3" onSubmit={handleSubmit}>
          <InputField
            name="recipient_name"
            id="recipient_name"
            placeholder="Vui lòng nhập họ tên"
            label="Nhập họ tên"
            onChange={handleChange}
            value={data.recipient_name}
            icon={FcBusinessman}
          />
          <InputField
            name="phone"
            id="phone"
            placeholder="Vui lòng nhập số điện thoại"
            label="Nhập số điện thoại"
            onChange={handleChange}
            value={data.phone}
            icon={FcCallback}
          />

          <div className="space-y-3 flex flex-col p-3">
            <select
              className="w-full p-2 border rounded"
              value={selectedProvince}
              onChange={handleProvinceChange}
            >
              <option value="">Chọn Tỉnh/Thành phố</option>
              {provinces.map((province) => (
                <option key={province.code} value={province.code}>
                  {province.name}
                </option>
              ))}
            </select>

            <select
              className="w-full p-2 border rounded"
              value={selectedDistrict}
              onChange={handleDistrictChange}
              disabled={!selectedProvince}
            >
              <option value="">Chọn Quận/Huyện</option>
              {districts.map((district) => (
                <option key={district.code} value={district.code}>
                  {district.name}
                </option>
              ))}
            </select>

            <select
              className="w-full p-2 border rounded"
              value={selectedWard}
              onChange={handleWardChange}
              disabled={!selectedDistrict}
            >
              <option value="">Chọn Phường/Xã</option>
              {wards.map((ward) => (
                <option key={ward.code} value={ward.code}>
                  {ward.name}
                </option>
              ))}
            </select>
          </div>

          <InputField
            name="address_line1"
            id="address_line1"
            placeholder="Vui lòng nhập xóm"
            label="Nhập địa chỉ cụ thể"
            onChange={handleChange}
            value={data.address_line1}
            icon={FcGlobe}
          />
          <InputField
            name="address_line2"
            id="address_line2"
            placeholder="Vui lòng nhập số nhà"
            label="Nhập số nhà"
            onChange={handleChange}
            value={data.address_line2}
            icon={FcHome}
          />

          <div className="my-3 flex items-center gap-2">
            <input
              type="checkbox"
              id="is_default"
              className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              name="is_default"
              checked={data.is_default}
              onChange={handleChange}
            />
            <label
              htmlFor="is_default"
              className="text-gray-700 text-sm font-medium cursor-pointer"
            >
              Đặt làm địa chỉ mặc định
            </label>
          </div>

          <button
            type="submit"
            className={`w-full ${
              colors.gradients.pinkToPurple
            } text-white py-3 rounded-lg font-medium transform hover:-translate-y-0.5 transition-all duration-200 ${
              isLoading
                ? "opacity-70 cursor-not-allowed"
                : "hover:opacity-90 hover:shadow-lg"
            }`}
            disabled={isLoading}
          >
            {isLoading ? <LoadingBtn /> : "Cập nhật địa chỉ"}
          </button>
        </form>
      </div>
    </div>
  );
}
