import React, { useState } from "react";

const Input = ({
  label,
  name = "",
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  icon: Icon,
  error,
  isReadOnly = false, // Prop mới để kiểm tra xem có ở chế độ chỉ hiển thị không
  isView = false,
}) => {
  return (
    <div className="flex gap-3 items-center">
      {label && (
        <label
          htmlFor={id}
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          {label}
        </label>
      )}
      <div className="relative flex-1">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {isView && <Icon className="h-5 w-5" />}
          </div>
        )}
        <input
          type={type}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          readOnly={isReadOnly} // Chỉ hiển thị khi isReadOnly là true
          className={`${
            Icon ? "pl-12" : "pl-4"
          } w-full h-12 px-4 py-3  ${isView && "border bg-gray-50"} ${
            error ? "border-red-500" : "border-gray-300"
          } ${
            isReadOnly ? "bg-gray-100 cursor-not-allowed" : ""
          } rounded-xl text-base text-gray-700 focus:ring-2 ${
            error
              ? "focus:ring-red-200 focus:border-red-400"
              : "focus:ring-blue-200 focus:border-blue-400"
          } outline-none transition-all duration-300`}
        />
      </div>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
