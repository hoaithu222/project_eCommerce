import { Link } from "react-router-dom";
import colors from "../../style/colors";
import { useEffect } from "react";

export default function CheckoutAddress({ address, onSelect }) {
  const defaultAddress = address?.find((addr) => addr.is_default);
  useEffect(() => {
    if (address) {
      onSelect(defaultAddress.id);
    }
  }, [address]);
  return (
    <div className="flex gap-5 items-center">
      <h2 className="text-xl font-medium ">Địa chỉ :</h2>
      <div className="border-dotted border-2 border-blue-300 p-3 rounded-md flex-1">
        {defaultAddress && (
          <div key={defaultAddress.id} className="flex items-center">
            <div>
              <div className="flex flex-wrap gap-4 items-center">
                <h2 className="font-semibold text-gray-800 pr-4 border-r border-gray-300">
                  {defaultAddress.recipient_name}
                </h2>
                <p className="text-gray-600">{defaultAddress.phone}</p>
              </div>
              <p className="text-gray-600">
                Số nhà : {defaultAddress.address_line2},{" "}
                {defaultAddress.address_line1}
              </p>
              <p className="text-gray-600">
                {defaultAddress.ward}, {defaultAddress.district},{" "}
                {defaultAddress.city}
              </p>
            </div>

            <div className="ml-auto flex flex-col items-center gap-4">
              <p className="text-rose-300 border-2 border-red-300 px-2 py-1 rounded-md">
                Mặc định
              </p>
              <Link
                to="/account/address"
                className={`${colors.button.medium} ${colors.button.gradientPurpleToOrange}`}
              >
                Thay đổi địa chỉ
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
