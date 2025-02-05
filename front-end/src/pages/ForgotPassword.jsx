import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import SummaryApi from "../common/SummaryApi";
import LoadingBtn from "../components/LoadingBtn";
import { toast, ToastContainer } from "react-toastify";
import InputField from "../components/InputField";
import { FcFeedback } from "react-icons/fc";

const ForgotPassword = () => {
  const [data, setData] = useState({ email: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setError("");
  };

  console.log("Email", data);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.email) {
      setError("Please enter your email");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(SummaryApi.forgotPassword.url, {
        method: SummaryApi.forgotPassword.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const dataResponse = await response.json();
      if (dataResponse.success) {
        setSuccess(dataResponse.message);
        localStorage.setItem("EmailForgot", data.email);
        toast.success("Vui lòng mở mail để lấy mã OTP");
        window.location.href = "https://mail.google.com";
      }
    } catch (error) {
      toast.success("Đã xảy ra lỗi vui lòng thử lại sau");
      console.log("lỗi" + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex justify-center items-center">
      <div className="min-w-[30%] mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Forgot Password
          </h2>
          <p className="mt-2 text-gray-600">
            Nhập email của bạn để reset lại mật khẩu
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-8">
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
            <InputField
              label="Nhập email"
              name="email"
              id="email"
              type="email"
              placeholder="Nhập email"
              value={data.email}
              onChange={handleChange}
              required
              icon={FcFeedback}
            />
            <button
              type="submit"
              className={`w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-lg font-medium
                transform hover:-translate-y-0.5 transition-all duration-200 
                ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90 hover:shadow-lg"}`}
              disabled={isLoading}
            >
              {isLoading ? <LoadingBtn /> : "Send email"}
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
};

export default ForgotPassword;
