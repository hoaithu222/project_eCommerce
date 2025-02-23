import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import LoadingBtn from "../components/LoadingBtn";
import InputField from "../components/InputField";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });

  const email = localStorage.getItem("EmailForgot");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.password || !data.confirmPassword) {
      setError("Please enter your new password");
      return;
    }
    if (data.password !== data.confirmPassword) {
      setError("Please check new password and confirm password");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(SummaryApi.resetPassword.url, {
        method: SummaryApi.resetPassword.method,
        body: JSON.stringify({ password: data.password, email: email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess("Password reset successful!");
        localStorage.removeItem("EmailForgot");
        navigate("/login");
      } else {
        setError(result.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex justify-center items-center">
      <div className="min-w-[30%] mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Reset Password
          </h2>
          <p className="mt-2 text-gray-600">Enter your new password</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl md:p-4 lg:p-6">
          {error && (
            <div className="mb-2 p-1 lg:mb-4 lg:p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-2 p-1 lg:mb-4 lg:p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg">
              {success}
            </div>
          )}

          <form
            className="space-y-2 md:space-y-4 lg:space-y-6"
            onSubmit={handleSubmit}
            noValidate
          >
            <InputField
              label="Mật khẩu"
              name="password"
              id="password"
              type="password"
              placeholder="Nhập mật khẩu"
              value={data.password}
              onChange={handleChange}
              required
            />
            <InputField
              label="Vui lòng nhập mật khẩu"
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value={data.confirmPassword}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className={`w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-medium
            transform hover:-translate-y-0.5 transition-all duration-200 
            ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90 hover:shadow-lg"}`}
              disabled={isLoading}
            >
              {isLoading ? <LoadingBtn /> : "Reset password"}
            </button>
          </form>

          <p className="text-center mt-2 md:mt-4 lg:mt-6 text-gray-600">
            Remember your password?
            <Link
              to="/login"
              className="text-green-500 font-semibold hover:text-green-600 transition-colors"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
