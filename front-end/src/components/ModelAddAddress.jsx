import { IoClose } from "react-icons/io5";
import colors from "../style/colors";
import InputField from "./InputField";
import { useState, useEffect } from "react";
import { FcBusinessman, FcHome } from "react-icons/fc";
import { FcCallback, FcGlobe } from "react-icons/fc";
import LoadingBtn from "./LoadingBtn";
import { toast } from "react-toastify";
import addressData from "../common/addressData";
import SummaryApi from "../common/SummaryApi";

export default function ModelAddAddress({ onClose, fetchData }) {
  const [data, setData] = useState({
    recipient_name: "",
    phone: "",
    city: "",
    district: "",
    ward: "",
    is_default: false,
    address_line1: "",
    address_line2: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  useEffect(() => {
    // Load provinces from addressData
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
      const response = await fetch(SummaryApi.addAddress.url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData.message);
        setData({
          recipient_name: "",
          phone: "",
          city: "",
          district: "",
          ward: "",
          is_default: false,
          address_line1: "",
          address_line2: "",
        });
        onClose();
        fetchData();
      } else {
        toast.error(responseData.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Failed to save address.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-55 z-50 flex items-center justify-center ">
      <div className="bg-white w-[80%]  md:w-[50%] p-3 md:p-5 rounded-xl shadow-2xl overflow-y-auto hidden-scrollbar ">
        <div className="flex justify-between items-center">
          <h2
            className={`${colors.textColors.gradientPurpleToYellow} text-2xl font-medium`}
          >
            Địa chỉ mới
          </h2>
          <IoClose
            onClick={onClose}
            className="text-red-500 text-2xl cursor-pointer hover:scale-110"
          />
        </div>
        <form className="mt-3" onSubmit={handleSubmit}>
          <InputField
            name="recipient_name"
            placeholder="Vui lòng nhập họ tên"
            label="Nhập họ tên"
            onChange={handleChange}
            value={data.recipient_name}
            icon={FcBusinessman}
          />
          <InputField
            name="phone"
            placeholder="Vui lòng nhập số điện thoại"
            label="Nhập số điện thoại"
            onChange={handleChange}
            value={data.phone}
            icon={FcCallback}
          />
          <div className="space-y-3 flex flex-col p-3">
            <select
              className="w-full p-2 border rounded max-h-[300px] overflow-y-auto"
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
            placeholder="Vui lòng nhập xóm"
            label="Nhập địa chỉ cụ thể"
            onChange={handleChange}
            value={data.address_line1}
            icon={FcGlobe}
          />
          <InputField
            name="address_line2"
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
              onChange={handleChange}
            />
            <label
              htmlFor="is_default"
              className="text-gray-700 text-sm font-medium"
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
            {isLoading ? <LoadingBtn /> : "Thêm địa chỉ mới"}
          </button>
        </form>
      </div>
    </div>
  );
}
