import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import SummaryApi from "../common/SummaryApi";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState("verifying");
  const navigate = useNavigate();
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setVerificationStatus("invalid");
        return;
      }
      try {
        const response = await fetch(
          `${SummaryApi.verifyEmail.url}?token=${token}`,
        );
        const data = await response.json();

        if (response.ok) {
          setVerificationStatus("success");
          toast.success(data.message || "Email đã được xác thực thành công!");
          setTimeout(() => navigate("/login"), 3000);
          return;
        }

        if (data.isExpired) {
          setVerificationStatus("expired");
          toast.error("Link xác thực đã hết hạn. Vui lòng yêu cầu gửi lại.");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setVerificationStatus("error");
        toast.error("Có lỗi xảy ra khi xác thực email: " + error.message);
      }
    };
    verifyEmail();
  }, [token]);

  const handleResendVerification = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        toast.error("Không tìm thấy thông tin người dùng");
        return;
      }

      const response = await fetch(SummaryApi.resendVerifyEmail.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        toast.success("Email xác thực đã được gửi lại.");
      } else {
        toast.error(data.message || "Không thể gửi lại email xác thực.");
      }
    } catch (error) {
      console.error("Resend verification error:", error);
      toast.error("Có lỗi xảy ra khi gửi lại email xác thực: " + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="p-8 mx-4 w-full max-w-md bg-white rounded-lg shadow-md">
        {verificationStatus === "verifying" && (
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-700">
              Đang xác thực...
            </h2>
            <div className="mx-auto w-12 h-12 rounded-full border-b-2 border-blue-500 animate-spin"></div>
          </div>
        )}

        {verificationStatus === "success" && (
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold text-green-600">
              Xác thực thành công!
            </h2>
            <p className="text-gray-600">
              Bạn sẽ được chuyển đến trang đăng nhập...
            </p>
          </div>
        )}

        {verificationStatus === "expired" && (
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold text-red-600">
              Link xác thực đã hết hạn
            </h2>
            <p className="mb-4 text-gray-600">
              Vui lòng yêu cầu gửi lại email xác thực.
            </p>
            <button
              onClick={handleResendVerification}
              className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Gửi lại email xác thực
            </button>
          </div>
        )}

        {verificationStatus === "error" && (
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold text-red-600">
              Xác thực thất bại
            </h2>
            <p className="text-gray-600">
              Có lỗi xảy ra trong quá trình xác thực email.
            </p>
          </div>
        )}

        {verificationStatus === "invalid" && (
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold text-red-600">
              Link không hợp lệ
            </h2>
            <p className="text-gray-600">
              Link xác thực không hợp lệ hoặc đã được sử dụng.
            </p>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
