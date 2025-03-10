import { IoCloseSharp } from "react-icons/io5";

export default function ConfirmActive({
  mode = "activate", // activate | deactivate
  cancel,
  confirm,
  close,
  title,
}) {
  // Nội dung mặc định dựa trên mode
  const defaultTitles = {
    activate: "Bạn có chắc chắn muốn kích hoạt shop này không?",
    deactivate: "Bạn có chắc chắn muốn hủy kích hoạt shop này không?",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
        {/* Close Icon */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition-colors"
          onClick={close}
        >
          <IoCloseSharp className="text-2xl" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          {mode === "activate" ? "Activate Shop" : "Deactivate Shop"}
        </h2>

        {/* Message */}
        <p className="text-gray-600 text-center mb-6">
          {title || defaultTitles[mode]}
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={cancel}
            className="px-6 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={confirm}
            className={`px-6 py-2 rounded-lg ${
              mode === "activate"
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-red-500 text-white hover:bg-red-600"
            } transition-all`}
          >
            {mode === "activate" ? "Activate" : "Deactivate"}
          </button>
        </div>
      </div>
    </div>
  );
}
