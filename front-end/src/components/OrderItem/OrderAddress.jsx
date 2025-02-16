import { useEffect, useState } from "react";
import { MapPin, Phone, User } from "lucide-react";
import SummaryApi from "../../common/SummaryApi";

export default function OrderAddress({ idAddress }) {
  const [address, setAddress] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchAddress = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${SummaryApi.getAddress.url}/${idAddress}`,
        {
          method: SummaryApi.getAddress.method,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );
      const result = await response.json();
      if (result.success) {
        setAddress(result.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (idAddress) {
      fetchAddress();
    }
  }, [idAddress]);

  if (loading) {
    return (
      <div className="w-full rounded-lg border border-gray-200 p-3 animate-pulse mt-4">
        <div className="h-32 bg-gray-200 rounded" />
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 shadow-sm mt-4">
      <div className="p-3">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="h-5 w-5 text-emerald-500" />
          <h2 className="text-lg font-medium bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
            Địa chỉ nhận hàng
          </h2>
        </div>

        {/* Content */}
        <div className="space-y-3">
          {/* User Info */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="font-medium text-gray-900">
                {address.recipient_name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">{address.phone}</span>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-1 text-gray-600">
            <p className="leading-relaxed">
              {address.address_line1}
              {address.address_line2 && `, ${address.address_line2}`}
            </p>
            <p className="leading-relaxed">
              {[address.ward, address.district, address.city]
                .filter(Boolean)
                .join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
