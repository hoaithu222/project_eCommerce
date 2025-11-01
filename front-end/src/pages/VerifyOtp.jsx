import React, { useEffect, useRef, useState } from "react";
import LoadingBtn from "../components/LoadingBtn";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import SummaryApi from "../common/SummaryApi";

export default function VerifyOtp() {
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const [focusedField, setFocusedField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const email = localStorage.getItem("EmailForgot");
  const inputRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handlePaste = (e, currentIndex) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "");
    const pastedArray = pastedData.split("").slice(0, 6); // Giới hạn 6 số

    if (pastedArray.length > 0) {
      const newData = [...data];
      pastedArray.forEach((value, index) => {
        if (currentIndex + index < 6) {
          newData[currentIndex + index] = value;
        }
      });
      setData(newData);

      const focusIndex = Math.min(currentIndex + pastedArray.length, 5);
      inputRef.current[focusIndex]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !data[index] && index > 0) {
      // Khi nhấn Backspace ở ô trống, focus về ô trước đó
      inputRef.current[index - 1]?.focus();
      const newData = [...data];
      newData[index - 1] = "";
      setData(newData);
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, ""); // Chỉ cho phép nhập số
    if (value.length <= 1) {
      const newData = [...data];
      newData[index] = value;
      setData(newData);

      // Tự động focus vào ô tiếp theo nếu có nhập giá trị
      if (value && index < 5) {
        inputRef.current[index + 1]?.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otp = data.join("");
    if (!otp) {
      setError("Please enter OTP");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(SummaryApi.verifyPasswordOtp.url, {
        method: SummaryApi.verifyPasswordOtp.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, forgotPasswordOtp: otp }),
      });
      const data = await response.json();

      if (data.success) {
        navigate("/reset-password", {
          state: {
            email: data.email,
          },
        });
      }
      if (data.error) {
        toast.error(data.message);
      }
    } catch (error) {
      setError(error.message || "Network error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex overflow-hidden relative justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-96 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 mix-blend-multiply filter blur-3xl animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400 rounded-full opacity-20 mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-400 rounded-full opacity-20 mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>

      <div className="relative mx-4 w-full max-w-2xl">
        <div className="p-8 rounded-3xl border shadow-2xl backdrop-blur-lg transition-all duration-300 bg-white/90 border-white/20 md:p-12 lg:p-16 hover:shadow-3xl">
          {/* Header */}
          <div className="mb-10 text-center">
            <div className="inline-flex justify-center items-center mb-6 w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl shadow-xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <h2 className="mb-3 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 md:text-4xl lg:text-5xl">
              Nhập mã OTP
            </h2>
            <p className="text-base text-gray-600 md:text-lg">
              Vui lòng nhập mã OTP đã được gửi đến email của bạn
            </p>
          </div>

          {error && (
            <div className="p-4 mb-6 text-red-700 bg-red-50 rounded-xl border-2 border-red-200">
              {error}
            </div>
          )}

          {success && (
            <div className="p-4 mb-6 text-green-700 bg-green-50 rounded-xl border-2 border-green-200">
              {success}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="space-y-3">
              <label
                htmlFor="otp"
                className={`block text-lg font-semibold transition-colors duration-200 ${focusedField === "email" ? "text-blue-600" : "text-gray-700"
                  }`}
              >
                Mã OTP
              </label>
              <div className="flex gap-3 justify-center">
                {data.map((element, index) => (
                  <input
                    key={index}
                    type="text"
                    ref={(ref) => {
                      inputRef.current[index] = ref;
                      return ref;
                    }}
                    maxLength={1}
                    value={data[index]}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={(e) => handlePaste(e, index)}
                    className={`w-14 h-16 text-center text-2xl font-bold rounded-xl outline-none transition-all duration-300 border-2 ${focusedField === "otp"
                      ? "border-blue-500 ring-4 ring-blue-200"
                      : "border-gray-300 hover:border-blue-400"
                      }
                    ${error ? "border-red-400" : ""}
                    focus:border-blue-500 focus:ring-4 focus:ring-blue-200
                    `}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    disabled={isLoading}
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg transform transition-all duration-200 shadow-lg ${isLoading
                ? "opacity-70 cursor-not-allowed"
                : "hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
                }`}
              disabled={isLoading}
            >
              {isLoading ? <LoadingBtn /> : "Xác thực OTP"}
            </button>
          </form>

          <p className="mt-8 text-base text-center text-gray-600">
            Nhớ mật khẩu?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-600 transition-colors hover:text-blue-700 hover:underline"
            >
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}
