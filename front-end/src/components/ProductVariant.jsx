import { useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { X, Plus } from "lucide-react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import colors from "../style/colors";
import { FcAddImage } from "react-icons/fc";
import { uploadImage } from "../utils/imageUploader";
export default function ProductVariant({
  data,
  setData,
  onChange,
  initialVariants = [],
}) {
  const [attribute, setAttribute] = useState([]);
  const [variantGroups, setVariantGroups] = useState([]);
  const [activeInput, setActiveInput] = useState(null);
  const [attributeActive, setAttributeActive] = useState({});
  const [showValueOptions, setShowValueOptions] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [variantDetails, setVariantDetails] = useState([]);
  const [bulkValues, setBulkValues] = useState({
    price: "",
    stock: "",
    sku: "",
  });

  useEffect(() => {
    if (data) {
      const newAttribute = data.filter((item) =>
        ["Màu sắc", "Kích thước", "Giới tính", "Size"].includes(item.name),
      );
      setAttribute(newAttribute);
    }
  }, [data]);

  useEffect(() => {
    const generateVariantCombinations = () => {
      if (variantGroups.length === 0) return [];

      const validGroups = variantGroups.filter(
        (group) =>
          group.name && group.values.some((value) => value.trim() !== ""),
      );

      if (validGroups.length === 0) return [];

      const combinations = validGroups.reduce((acc, group) => {
        if (acc.length === 0) {
          return group.values
            .filter((value) => value.trim() !== "")
            .map((value) => ({
              variants: [{ name: group.name, value }],
              price: "",
              stock: "",
              sku: "",
              image_url: "",
            }));
        }

        const newCombinations = [];
        acc.forEach((item) => {
          group.values
            .filter((value) => value.trim() !== "")
            .forEach((value) => {
              newCombinations.push({
                ...item,
                variants: [...item.variants, { name: group.name, value }],
              });
            });
        });
        return newCombinations;
      }, []);

      return combinations;
    };

    const newVariantDetails = generateVariantCombinations();
    setVariantDetails(newVariantDetails);
  }, [variantGroups]);

  const handleDetailChange = (index, field, value) => {
    const newDetails = [...variantDetails];
    newDetails[index][field] = value;
    setVariantDetails(newDetails);
  };

  const applyBulkValues = () => {
    const newDetails = variantDetails.map((detail) => ({
      ...detail,
      price: bulkValues.price || detail.price,
      stock: bulkValues.stock || detail.stock,
      sku: bulkValues.sku || detail.sku,
    }));
    setVariantDetails(newDetails);
    setBulkValues({ price: "", stock: "", sku: "" });
  };

  const addVariantGroup = () => {
    setVariantGroups([...variantGroups, { name: "", values: [""] }]);
  };

  const removeVariantGroup = (index) => {
    const newVariantGroups = variantGroups.filter((_, i) => i !== index);
    setVariantGroups(newVariantGroups);
  };

  const addValueInput = (groupIndex) => {
    const newVariantGroups = [...variantGroups];
    newVariantGroups[groupIndex].values.push("");
    setVariantGroups(newVariantGroups);
  };

  const removeValueInput = (groupIndex, valueIndex) => {
    const newVariantGroups = [...variantGroups];
    newVariantGroups[groupIndex].values = newVariantGroups[
      groupIndex
    ].values.filter((_, i) => i !== valueIndex);
    const newSelectedValue = [...selectedValues];

    setVariantGroups(newVariantGroups);
  };

  const handleNameChange = (groupIndex, value) => {
    const newVariantGroups = [...variantGroups];
    newVariantGroups[groupIndex].name = value;
    setVariantGroups(newVariantGroups);
  };

  const handleValueChange = (groupIndex, valueIndex, value) => {
    const newVariantGroups = [...variantGroups];
    newVariantGroups[groupIndex].values[valueIndex] = value;
    setVariantGroups(newVariantGroups);
  };

  const handleAttributeSelect = (groupIndex, selectedAttribute) => {
    const oldAttribute = variantGroups[groupIndex].name;
    const newSelectedAttributes = selectedAttributes.filter(
      (attr) => attr !== oldAttribute,
    );

    if (!newSelectedAttributes.includes(selectedAttribute)) {
      newSelectedAttributes.push(selectedAttribute);
    }

    handleNameChange(groupIndex, selectedAttribute);
    setActiveInput(null);
    setSelectedAttributes(newSelectedAttributes);
  };

  const handleValueSelect = (groupIndex, valueIndex, selectedValue) => {
    const oldValue = variantGroups[groupIndex].values[valueIndex];
    const newSelectedValues = selectedValues.filter((val) => val !== oldValue);

    if (!newSelectedValues.includes(selectedValue)) {
      newSelectedValues.push(selectedValue);
    }
    handleValueChange(groupIndex, valueIndex, selectedValue);
    setShowValueOptions(null);
    setSelectedValues(newSelectedValues);
  };
  const handleUploadImage = async (variantIndex, e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const imageUrl = await uploadImage(file);
      const newVariantDetails = [...variantDetails];
      newVariantDetails[variantIndex] = {
        ...newVariantDetails[variantIndex],
        image_url: imageUrl,
      };
      setVariantDetails(newVariantDetails);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const processVariantData = (variantDetails) => {
    if (!variantDetails || variantDetails.length === 0) return [];

    const totalStock = variantDetails.reduce(
      (sum, detail) => sum + (parseInt(detail.stock) || 0),
      0,
    );

    setData((prev) => ({
      ...prev,
      base_price: parseFloat(variantDetails[0].price) || 0,
      stock_quantity: totalStock,
    }));

    return variantDetails.map((detail) => {
      const combination = detail.variants.reduce((acc, variant) => {
        acc[variant.name] = variant.value;
        return acc;
      }, {});

      return {
        sku: detail.sku || "",
        combination: combination,
        price: parseFloat(detail.price) || 0,
        stock: parseInt(detail.stock) || 0,
        image_url: detail.image_url || null,
      };
    });
  };

  useEffect(() => {
    const processedVariants = processVariantData(variantDetails);
    setData((prevData) => ({
      ...prevData,
      product_variants: processedVariants,
    }));
  }, [variantDetails]);

  useEffect(() => {
    if (initialVariants?.length > 0 && variantGroups.length === 0) {
      console.log("initialVariantslength", initialVariants);
      const firstVariant = initialVariants[0];
      const groups = Object.keys(firstVariant.combination).map((name) => ({
        name,
        values: [...new Set(initialVariants.map((v) => v.combination[name]))],
      }));
      setVariantGroups(groups);

      const details = initialVariants.map((variant) => ({
        variants: Object.entries(variant.combination).map(([name, value]) => ({
          name,
          value,
        })),
        price: +variant.price,
        stock: variant.stock,
        sku: variant.sku,
        image_url: variant.image_url,
      }));
      setVariantDetails(details);

      setSelectedAttributes(groups.map((g) => g.name));
      setSelectedValues(groups.flatMap((g) => g.values));
    }
  }, [initialVariants]);

  return (
    <div className="mt-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center flex-wrap">
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 rounded-full bg-red-300"></span>
            <h3 className="text-xl font-semibold">Phân loại hàng</h3>
          </div>
        </div>

        <div className="w-full">
          <div className="m-4 p-4 bg-blue-100 rounded-xl">
            {variantGroups.map((variant, groupIndex) => (
              <div key={groupIndex} className="mb-4 bg-white p-4 rounded-lg">
                <div className="flex flex-col gap-4 relative">
                  <button
                    type="button"
                    onClick={() => removeVariantGroup(groupIndex)}
                    className="text-red-500 hover:text-red-700 absolute top-0 right-0"
                  >
                    <X size={20} />
                  </button>

                  <div className="flex items-center gap-2 w-full mt-6 relative">
                    <span className="font-medium text-xl mr-4">
                      Phân loại {groupIndex + 1}
                    </span>
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={variant.name}
                        onChange={(e) =>
                          handleNameChange(groupIndex, e.target.value)
                        }
                        onClick={() => setActiveInput(`name-${groupIndex}`)}
                        placeholder={`${attribute.length > 0 ? "Type or Select" : "VD: màu sắc, phân loại"}`}
                        className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                      />
                      {activeInput === `name-${groupIndex}` &&
                        attribute.length > 0 && (
                          <div className="absolute top-full left-0 mt-1 bg-white w-full shadow-lg rounded-lg z-50 border border-gray-200">
                            <div className="p-2">
                              <div className="flex justify-between items-center mb-2">
                                <p className="text-gray-500">Giá trị đề xuất</p>
                                <X
                                  className="text-red-600 cursor-pointer"
                                  size={16}
                                  onClick={() => setActiveInput(null)}
                                />
                              </div>
                              {attribute.map((item, index) => (
                                <div
                                  key={index}
                                  className={`p-2 hover:bg-gray-100 cursor-pointer rounded-lg ${
                                    selectedAttributes.includes(item.name)
                                      ? "opacity-50 cursor-not-allowed"
                                      : ""
                                  }`}
                                  onClick={() => {
                                    if (
                                      !selectedAttributes.includes(item.name)
                                    ) {
                                      handleAttributeSelect(
                                        groupIndex,
                                        item.name,
                                      );
                                      setAttributeActive(item);
                                    }
                                  }}
                                >
                                  {item.name}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <span className="font-medium text-xl">Tùy chọn</span>
                    {variant.values.map((value, valueIndex) => (
                      <div
                        key={valueIndex}
                        className="flex items-center gap-3 relative"
                      >
                        <input
                          type="text"
                          value={value}
                          onChange={(e) =>
                            handleValueChange(
                              groupIndex,
                              valueIndex,
                              e.target.value,
                            )
                          }
                          onClick={() => {
                            if (attributeActive?.name) {
                              setShowValueOptions(
                                `${groupIndex}-${valueIndex}`,
                              );
                            }
                          }}
                          placeholder="VD: giá trị màu sắc, phân loại"
                          className="border border-gray-300 rounded-lg px-3 py-2 flex-1"
                        />
                        {showValueOptions === `${groupIndex}-${valueIndex}` &&
                          attributeActive?.values && (
                            <div className="absolute top-full left-0 mt-1 bg-white w-64 max-h-60 overflow-y-auto shadow-lg rounded-lg z-50 border border-gray-200">
                              <div className="p-2">
                                <div className="flex justify-between items-center mb-2">
                                  <p className="text-gray-500">
                                    Giá trị đề xuất
                                  </p>
                                  <X
                                    className="text-red-600 cursor-pointer"
                                    size={16}
                                    onClick={() => setShowValueOptions(null)}
                                  />
                                </div>
                                {attributeActive.values.map(
                                  (colorOption, index) => (
                                    <div
                                      key={index}
                                      className={`p-2 hover:bg-gray-100 cursor-pointer rounded-lg ${
                                        selectedValues.includes(
                                          colorOption.value,
                                        )
                                          ? "opacity-50 cursor-not-allowed"
                                          : ""
                                      }`}
                                      onClick={() => {
                                        if (
                                          !selectedValues.includes(
                                            colorOption.value,
                                          )
                                        ) {
                                          handleValueSelect(
                                            groupIndex,
                                            valueIndex,
                                            colorOption.value,
                                          );
                                        }
                                      }}
                                    >
                                      {colorOption.value}
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          )}
                        {valueIndex > 0 && (
                          <button
                            type="button"
                            onClick={() =>
                              removeValueInput(groupIndex, valueIndex)
                            }
                            className="text-red-500 hover:text-red-700"
                          >
                            <RiDeleteBin6Fill size={20} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addValueInput(groupIndex);
                      }}
                      type="button"
                      className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
                    >
                      <Plus size={20} />
                      <span>Thêm tùy chọn</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div
              className="flex items-center gap-2 border-dotted bg-white w-fit border-green-300 border px-4 py-2 rounded-2xl cursor-pointer hover:bg-gray-50"
              onClick={addVariantGroup}
            >
              <IoMdAddCircle className="text-orange-500 text-3xl" />
              <p>
                Thêm nhóm phân loại
                {variantGroups.length > 0 && variantGroups.length + 1}
              </p>
            </div>
          </div>
        </div>
      </div>

      {variantGroups.length === 0 ? (
        <div className="flex flex-col gap-4">
          <div className="flex gap-3 items-center">
            <label htmlFor="price" className="text-xl">
              <span className="text-red-500">*</span>
              Giá
            </label>
            <input
              type="number"
              placeholder="Vui lòng nhập giá"
              name="base_price"
              id="price"
              className="p-2 outline-none border-2 border-gray-200 rounded-xl"
              onChange={onChange}
            />
          </div>
          <div className="flex gap-3 items-center">
            <label htmlFor="stock" className="text-xl">
              <span className="text-red-500">*</span>
              Kho hàng
            </label>
            <input
              type="number"
              placeholder="Vui lòng nhập số lượng"
              name="stock_quantity"
              id="stock"
              className="p-2 outline-none border-2 border-gray-200 rounded-xl"
              onChange={onChange}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 mt-8">
          <div className="flex items-center gap-5 mb-4">
            <h3 className="text-xl font-semibold">Danh sách phân loại hàng</h3>
            <div className="flex items-center gap-5">
              <div className="flex border-2 border-gray-100 rounded-xl overflow-hidden">
                <input
                  type="number"
                  value={bulkValues.price}
                  onChange={(e) =>
                    setBulkValues({ ...bulkValues, price: e.target.value })
                  }
                  placeholder="Giá"
                  className="p-2 outline-none border-r-2 w-32"
                />
                <input
                  type="number"
                  value={bulkValues.stock}
                  onChange={(e) =>
                    setBulkValues({ ...bulkValues, stock: e.target.value })
                  }
                  placeholder="Kho hàng"
                  className="p-2 outline-none border-r-2 w-32"
                />
                <input
                  type="text"
                  value={bulkValues.sku}
                  onChange={(e) =>
                    setBulkValues({ ...bulkValues, sku: e.target.value })
                  }
                  placeholder="SKU phân loại"
                  className="p-2 outline-none w-40"
                />
              </div>
              <button
                onClick={applyBulkValues}
                type="button"
                className={`${colors.button.medium} ${colors.button.gradientCyanToIndigo}`}
              >
                Áp dụng cho tất cả phân loại
              </button>
            </div>
          </div>

          {variantDetails.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    {variantGroups
                      .filter((group) => group.name)
                      .map((group, index) => (
                        <th
                          key={index}
                          className="p-3 text-left border border-gray-200"
                        >
                          {group.name}
                        </th>
                      ))}
                    <th className="p-3 text-left border border-gray-200">
                      Giá
                    </th>
                    <th className="p-3 text-left border border-gray-200">
                      Kho hàng
                    </th>
                    <th className="p-3 text-left border border-gray-200">
                      SKU phân loại
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {variantDetails.map((detail, index) => (
                    <tr key={index} className="hover:bg-gray-100 transition">
                      {detail.variants.map((variant, vIndex) => (
                        <td
                          key={vIndex}
                          className="p-4 border border-gray-300 text-center"
                        >
                          <p className="text-gray-700 font-medium">
                            {variant.value}
                          </p>

                          {vIndex === 0 &&
                            (detail?.image_url ? (
                              <div className="w-24 h-24 mx-auto mt-2 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                                <img
                                  src={detail.image_url}
                                  alt="Variant"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="flex flex-col items-center mt-3">
                                <label
                                  htmlFor={`imageVariant-${index}`}
                                  className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-blue-400 transition"
                                >
                                  <FcAddImage className="text-3xl" />
                                  <span className="text-xs text-gray-500 mt-1">
                                    Thêm ảnh
                                  </span>
                                </label>
                                <input
                                  type="file"
                                  name="image"
                                  id={`imageVariant-${index}`}
                                  hidden
                                  onChange={(e) => handleUploadImage(index, e)}
                                />
                              </div>
                            ))}
                        </td>
                      ))}
                      <td className="p-4 border border-gray-300">
                        <input
                          type="number"
                          value={detail.price}
                          onChange={(e) =>
                            handleDetailChange(index, "price", e.target.value)
                          }
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                          placeholder="Giá"
                        />
                      </td>
                      <td className="p-4 border border-gray-300">
                        <input
                          type="number"
                          value={detail.stock}
                          onChange={(e) =>
                            handleDetailChange(index, "stock", e.target.value)
                          }
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                          placeholder="Kho hàng"
                        />
                      </td>
                      <td className="p-4 border border-gray-300">
                        <input
                          type="text"
                          value={detail.sku}
                          onChange={(e) =>
                            handleDetailChange(index, "sku", e.target.value)
                          }
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                          placeholder="SKU phân loại"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
