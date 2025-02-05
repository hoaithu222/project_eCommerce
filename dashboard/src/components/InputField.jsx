import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const InputField = ({
  label,
  name,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  icon: Icon,
  error,
  isReadOnly = false, // Prop mới để kiểm tra xem có ở chế độ chỉ hiển thị không
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <input
          type={isPassword && showPassword ? "text" : type}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          readOnly={isReadOnly} // Chỉ hiển thị khi isReadOnly là true
          className={`${
            Icon ? "pl-12" : "pl-4"
          } w-full h-12 px-4 py-3 bg-gray-50 border ${
            error ? "border-red-500" : "border-gray-300"
          } ${
            isReadOnly ? "bg-gray-100 cursor-not-allowed" : ""
          } rounded-xl text-base text-gray-700 focus:ring-2 ${
            error
              ? "focus:ring-red-200 focus:border-red-400"
              : "focus:ring-blue-200 focus:border-blue-400"
          } outline-none transition-all duration-300`}
        />
        {isPassword &&
          !isReadOnly && ( // Chỉ hiển thị nút toggle khi không phải chế độ chỉ đọc
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
            >
              {showPassword ? (
                <FiEyeOff className="h-5 w-5" />
              ) : (
                <FiEye className="h-5 w-5" />
              )}
            </button>
          )}
      </div>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default InputField;
