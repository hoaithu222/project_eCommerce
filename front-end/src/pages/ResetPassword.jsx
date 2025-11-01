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
              Đặt lại mật khẩu
            </h2>
            <p className="text-base text-gray-600 md:text-lg">
              Nhập mật khẩu mới của bạn
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 text-red-700 rounded-xl">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 text-green-700 rounded-xl">
              {success}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <InputField
              label="Mật khẩu mới"
              name="password"
              id="password"
              type="password"
              placeholder="Nhập mật khẩu mới"
              value={data.password}
              onChange={handleChange}
              required
            />
            <InputField
              label="Xác nhận mật khẩu"
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              placeholder="Nhập lại mật khẩu"
              value={data.confirmPassword}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg transform transition-all duration-200 shadow-lg ${isLoading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
                }`}
              disabled={isLoading}
            >
              {isLoading ? <LoadingBtn /> : "Đặt lại mật khẩu"}
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
