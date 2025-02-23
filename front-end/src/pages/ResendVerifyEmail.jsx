import { useState } from "react";
import { toast } from "react-toastify";
import SummaryApi from "../common/SummaryApi";
import { Link } from "react-router-dom";
import colors from "../style/colors";

export default function ResendVerifyEmail() {
  const [isLoading, setIsLoading] = useState(false);

  const handleResendVerification = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast.error(
        "Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.",
      );
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(SummaryApi.resendVerifyEmail.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success("Email xác thực đã được gửi lại!");
      } else if (data.errorCode === "USER_NOT_FOUND") {
        toast.error("Người dùng không tồn tại.");
      } else if (data.errorCode === "EMAIL_ALREADY_VERIFIED") {
        toast.info("Email của bạn đã được xác thực.");
      } else {
        toast.error(data.message || "Không thể gửi lại email xác thực.");
      }
    } catch (error) {
      console.error("Resend verification error:", error);
      toast.error("Có lỗi xảy ra khi gửi lại email xác thực: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className=" text-xl lg:text-2xl font-bold text-red-600 mb-4">
        Xác thực Email
      </h2>
      <p className="text-gray-600 mb-4 text-xs sm:text-base">
        Link xác thực email của bạn đã hết hạn hoặc chưa được gửi. Vui lòng yêu
        cầu gửi lại.
      </p>
      <button
        onClick={handleResendVerification}
        className={`bg-blue-500 text-white px-6 py-2 rounded ${
          isLoading ? "cursor-not-allowed bg-blue-300" : "hover:bg-blue-600"
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Đang gửi lại..." : "Gửi lại email xác thực"}
      </button>

      <div className="mt-4">
        <p className="text-xs sm:text-sm text-gray-600">
          Nếu bạn không nhận được email, hãy kiểm tra hộp thư rác hoặc{" "}
          <Link
            to="https://mail.google.com"
            className={`text-${colors.gradients.pinkToPurple} font-medium`}
          >
            Truy cập Gmail
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
