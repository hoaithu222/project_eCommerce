import React from "react";
import { useNavigate } from "react-router-dom";

const NotAuthorized = () => {
  const navigate = useNavigate();

  const goLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="text-center bg-white p-10 rounded-2xl shadow-2xl max-w-md">
        <div className="flex justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-16 h-16 text-red-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3m0 4h.01m-6.938 4h13.856c1.054 0 1.582-1.29.832-2.05l-6.928-6.928a1.5 1.5 0 00-2.121 0l-6.928 6.928c-.75.76-.222 2.05.832 2.05z"
            />
          </svg>
        </div>
        <h1 className="text-5xl font-extrabold text-red-600 mb-4">403</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Truy cập bị từ chối
        </h2>
        <p className="text-gray-600 mb-6">
          Xin lỗi, bạn không có quyền truy cập vào trang này. Vui lòng thử lại
          bằng tài khoản Admin.
        </p>
        <button
          onClick={goLogin}
          className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none transition-transform transform hover:scale-105"
        >
          Đăng nhập
        </button>
      </div>
    </div>
  );
};

export default NotAuthorized;
