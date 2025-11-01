import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";

export default function SelectAttribute({
  attribute,
  setData,
  required = true,
  placeholder = "Vui lòng chọn",
  initialValues = [],
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    if (selectedValue) {
      setData((prevData) => {
        const currentAttributes = Array.isArray(prevData.product_attributes)
          ? [...prevData.product_attributes]
          : [];

        const filteredAttributes = currentAttributes.filter(
          (attr) => attr.attribute_value_id !== selectedValue,
        );

        return {
          ...prevData,
          product_attributes: [
            ...filteredAttributes,
            { attribute_value_id: selectedValue },
          ],
        };
      });
    }
  }, [selectedValue, setData]);

  useEffect(() => {
    if (initialValues?.length > 0) {
      const foundValue = attribute?.values?.find((v) =>
        initialValues.some((init) => init.attribute_value_id === v.id),
      );
      if (foundValue) {
        setSelectedValue(foundValue.id);
      }
    }
  }, [attribute?.values, initialValues]);

  const handleSelect = (id) => {
    if (selectedValue === id) {
      setSelectedValue(null);
      setData((prevData) => ({
        ...prevData,
        product_attributes: prevData.product_attributes.filter(
          (attr) => attr.attribute_value_id !== id,
        ),
      }));
    } else {
      setSelectedValue(id);
    }
    setIsOpen(false);
  };

  const getValueText = (id) => {
    const option = attribute?.values?.find((opt) => opt.id === id);
    return option?.value || "";
  };

  return (
    <div className="relative flex items-center gap-4">
      <label className="text-sm font-medium bg-gradient-to-r from-blue-500 to-blue-500 bg-clip-text text-transparent">
        {attribute.name}
      </label>

      <div className="relative flex-1">
        <div
          className={`min-h-[42px] p-2 rounded-lg shadow-md bg-white cursor-pointer transition-all duration-200
            ${isOpen ? "ring-2 ring-opacity-50 ring-blue-400 border-transparent" : "hover:border-blue-300"}
            ${selectedValue ? "border-2 border-opacity-50 border-blue-300" : "border border-gray-200"}
            hover:shadow-lg`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {!selectedValue ? (
            <span className="text-gray-400">{placeholder}</span>
          ) : (
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-blue-100 text-sm font-medium">
              <span className="bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">
                {getValueText(selectedValue)}
              </span>
            </span>
          )}

          <div className="absolute right-2 top-1/2 -translate-y-1/2 z-50">
            {isOpen ? (
              <ChevronUp className="h-5 w-5 text-blue-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-blue-400" />
            )}
          </div>
        </div>

        {isOpen && (
          <div className="absolute z-50 w-[80%] mt-2 bg-white border border-gray-100 rounded-lg shadow-xl max-h-40 overflow-auto">
            {attribute?.values?.map((option, index) => {
              const isSelected = selectedValue === option.id;
              return (
                <div
                  key={option.id}
                  className={`flex items-center px-4 py-2.5 cursor-pointer transition-colors
                    ${isSelected ? "bg-gradient-to-r from-blue-50 to-blue-50" : "hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-blue-50/30"}
                    ${index !== attribute?.values?.length - 1 ? "border-b border-gray-50" : ""}`}
                  onClick={() => handleSelect(option.id)}
                >
                  <div className="flex-grow">{option.value}</div>
                  {isSelected && <Check className="h-4 w-4 text-blue-500" />}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
