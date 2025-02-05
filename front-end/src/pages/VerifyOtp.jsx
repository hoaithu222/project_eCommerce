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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex justify-center items-center">
      <div className="min-w-[30%] mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Enter OTP
          </h2>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg">
              {success}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="space-y-2">
              <label
                htmlFor="otp"
                className={`block font-medium transition-colors duration-200 ${
                  focusedField === "email" ? "text-pink-600" : "text-gray-700"
                }`}
              >
                OTP :
              </label>
              <div className="flex gap-2 justify-between mt-3">
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
                    className={`px-4 py-2 w-9 md:w-14 rounded-lg outline-none transition-all duration-300
                      ${
                        focusedField === "otp"
                          ? "border-2 border-pink-400 ring-2 ring-pink-200"
                          : "border border-gray-300 hover:border-pink-300"
                      }
                      ${error ? "border-red-300" : ""}
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
              className={`w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-medium
                transform hover:-translate-y-0.5 transition-all duration-200 
                ${
                  isLoading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:opacity-90 hover:shadow-lg"
                }
              `}
              disabled={isLoading}
            >
              {isLoading ? <LoadingBtn /> : "Verify OTP"}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Remember your password?{" "}
            <Link
              to="/login"
              className="text-green-500 font-semibold hover:text-green-600 transition-colors"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
