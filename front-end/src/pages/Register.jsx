import { FcCheckmark, FcComments, FcLikePlaceholder } from "react-icons/fc";
import InputField from "../components/InputField";
import { useState } from "react";

import { FcFeedback } from "react-icons/fc";
import LoadingBtn from "../components/LoadingBtn";
import colors from "../style/colors";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import { toast, ToastContainer } from "react-toastify";

export default function Register() {
  const [data, setData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    errorName: "",
    errorEmail: "",
    errorPassword: "",
    errorFull: "",
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(SummaryApi.register.url, {
        method: SummaryApi.register.method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const dataResponse = await response.json();

      if (dataResponse.success) {
        localStorage.setItem("userId", dataResponse.data.id);
        setVerificationSent(true);
        toast.success(
          "Tạo người dùng thành công. Vui lòng kiểm tra email để xác thực tài khoản.",
        );
      }
      if (dataResponse.error) {
        setError({
          errorEmail: dataResponse.errors.email,
          errorName: dataResponse.errors.username,
          errorFull: dataResponse.errors.fullname,
          errorPassword: dataResponse.errors.password,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(error);
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
        {verificationSent ? (
          <div className="p-8 rounded-3xl border shadow-2xl backdrop-blur-lg transition-all duration-300 bg-white/90 border-white/20 md:p-12 lg:p-16 text-center">
            <div className="inline-flex justify-center items-center mb-6 w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-xl">
              <FcCheckmark className="text-5xl" />
            </div>
            <h2 className="mb-4 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 md:text-4xl lg:text-5xl">
              Đăng ký thành công!
            </h2>
            <p className="mb-8 text-base text-gray-600 md:text-lg">
              Chúng tôi đã gửi một email xác nhận đến{" "}
              <strong className="text-blue-600">{data.email}</strong>. Vui lòng kiểm tra hộp thư để kích hoạt tài khoản của bạn.
            </p>
            <Link
              to="https://mail.google.com"
              className={`inline-block w-full ${colors.gradients.pinkToPurple} text-white py-4 rounded-xl font-semibold text-lg transform transition-all duration-200 shadow-lg hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]`}
            >
              Truy cập Gmail
            </Link>
          </div>
        ) : (
          <div className="p-8 rounded-3xl border shadow-2xl backdrop-blur-lg transition-all duration-300 bg-white/90 border-white/20 md:p-12 lg:p-16 hover:shadow-3xl">
            {/* Header */}
            <div className="mb-10 text-center">
              <div className="inline-flex justify-center items-center mb-6 w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl shadow-xl">
                <FcLikePlaceholder className="text-4xl text-white" />
              </div>
              <h2 className="mb-3 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 md:text-4xl lg:text-5xl">
                Chào mừng đến với cửa hàng
              </h2>
              <p className="text-base text-gray-600 md:text-lg">
                Tạo tài khoản mới để bắt đầu mua sắm
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                label="Tên đăng nhập"
                name="username"
                id="name"
                placeholder="Nhập tên đăng nhập"
                value={data.username}
                onChange={handleChange}
                required
                icon={FcLikePlaceholder}
                error={error.errorName}
              />

              <InputField
                label="Họ và tên"
                name="fullname"
                id="fullname"
                placeholder="Nhập họ và tên"
                value={data.fullname}
                onChange={handleChange}
                required
                icon={FcCheckmark}
                error={error.errorFull}
              />
              <InputField
                label="Email"
                name="email"
                id="email"
                type="email"
                placeholder="Nhập email"
                value={data.email}
                onChange={handleChange}
                required
                icon={FcFeedback}
                error={error.errorEmail}
              />
              <InputField
                label="Mật khẩu"
                name="password"
                id="password"
                type="password"
                placeholder="Nhập mật khẩu"
                value={data.password}
                onChange={handleChange}
                required
                error={error.errorPassword}
              />
              <button
                type="submit"
                className={`w-full ${colors.gradients.pinkToPurple} text-white py-4 rounded-xl font-semibold text-lg transform transition-all duration-200 shadow-lg ${isLoading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
                  }`}
                disabled={isLoading}
              >
                {isLoading ? <LoadingBtn /> : "Đăng ký"}
              </button>
              <p className="mt-6 text-base text-center text-gray-600">
                Đã có tài khoản?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-blue-600 transition-colors hover:text-blue-700 hover:underline"
                >
                  Đăng nhập
                </Link>
              </p>
            </form>
          </div>
        )}
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
