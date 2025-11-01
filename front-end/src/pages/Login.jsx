import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FcFeedback } from "react-icons/fc";
import InputField from "../components/InputField";
import { useEffect, useState } from "react";
import LoadingBtn from "../components/LoadingBtn";
import colors from "../style/colors";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import { toast, ToastContainer } from "react-toastify";
import { fetchUser } from "../store/actions/fetchUser";
import { useDispatch, useSelector } from "react-redux";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { data: user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const isLogin = sessionStorage.getItem("isLogin");

  useEffect(() => {
    if (location.pathname === "/login" && isLogin) {
      navigate("/");
    }
  }, [location.pathname, user, navigate, isLogin]);

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
      const response = await api.post(SummaryApi.login.url, data);
      const dataResponse = response.data;

      if (dataResponse.success) {
        toast.success(dataResponse.message);
        // Cập nhật authentication state ngay lập tức
        login({
          accessToken: dataResponse.data.accessToken,
          refreshToken: dataResponse.data.refreshToken,
        });
        dispatch(fetchUser());
        navigate("/");
      } else {
        if (dataResponse.errorCode === "EMAIL_NOT_VERIFIED") {
          toast.error(
            "Tài khoản chưa xác thực email. Vui lòng vào mail xác thực",
          );
        } else {
          toast.error(dataResponse.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Đã có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (platform) => {
    const url = SummaryApi.socialLogin[platform].url;
    window.location.href = url;
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
              <FcFeedback className="text-4xl text-white" />
            </div>
            <h2 className="mb-3 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 md:text-4xl lg:text-5xl">
              Welcome Back
            </h2>
            <p className="text-base text-gray-600 md:text-lg">
              Đăng nhập vào tài khoản của bạn
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
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
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
              >
                Quên mật khẩu?
              </Link>
            </div>
            <button
              type="submit"
              className={`w-full ${colors.gradients.pinkToPurple} text-white py-4 rounded-xl font-semibold text-lg transform transition-all duration-200 shadow-lg ${isLoading
                ? "opacity-70 cursor-not-allowed"
                : "hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
                }`}
              disabled={isLoading}
            >
              {isLoading ? <LoadingBtn /> : "Đăng nhập"}
            </button>

            {/* Divider */}
            <div className="relative my-8">
              <div className="flex absolute inset-0 items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="flex relative justify-center text-sm">
                <span className="px-4 text-gray-500 bg-white/90">Hoặc đăng nhập bằng</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => handleSocialLogin("google")}
                className="flex flex-col gap-3 justify-center items-center p-5 bg-white rounded-xl border-2 border-gray-200 transition-all duration-200 hover:border-blue-300 hover:shadow-lg hover:scale-105 active:scale-95"
              >
                <FcGoogle className="w-7 h-7" />
                <span className="text-sm font-medium text-gray-700">Google</span>
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin("facebook")}
                className="flex flex-col gap-3 justify-center items-center p-5 bg-white rounded-xl border-2 border-gray-200 transition-all duration-200 hover:border-blue-600 hover:shadow-lg hover:scale-105 active:scale-95"
              >
                <FaFacebook className="w-7 h-7 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Facebook</span>
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin("github")}
                className="flex flex-col gap-3 justify-center items-center p-5 bg-white rounded-xl border-2 border-gray-200 transition-all duration-200 hover:border-gray-800 hover:shadow-lg hover:scale-105 active:scale-95"
              >
                <FaGithub className="w-7 h-7 text-gray-800" />
                <span className="text-sm font-medium text-gray-700">GitHub</span>
              </button>
            </div>

            {/* Register link */}
            <p className="mt-8 text-base text-center text-gray-600">
              Chưa có tài khoản?{" "}
              <Link
                to="/register"
                className="font-semibold text-blue-600 transition-colors hover:text-blue-700 hover:underline"
              >
                Đăng ký ngay
              </Link>
            </p>
          </form>
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
