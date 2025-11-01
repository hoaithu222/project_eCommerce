import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FcFeedback } from "react-icons/fc";
import InputField from "../components/InputField";
import { useEffect, useState } from "react";
import LoadingBtn from "../components/LoadingBtn";
import colors from "../style/colors";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import { toast } from "react-toastify";
import { fetchUser } from "../store/actions/fetchUser";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { data: user } = useSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      const response = await fetch(SummaryApi.login.url, {
        method: SummaryApi.login.method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const dataResponse = await response.json();
      if (dataResponse.success) {
        localStorage.setItem("accessToken", dataResponse.data.accessToken);
        localStorage.setItem("refreshToken", dataResponse.data.refreshToken);
        await dispatch(fetchUser());
        navigate("/");
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative flex overflow-hidden justify-center items-center w-full min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
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
              Admin Login
            </h2>
            <p className="text-base text-gray-600 md:text-lg">
              Đăng nhập vào hệ thống quản trị
            </p>
          </div>

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

            <button
              type="submit"
              className={`w-full ${colors.gradients.pinkToPurple
                } text-white py-4 rounded-xl font-semibold text-lg transform transition-all duration-200 shadow-lg ${isLoading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
                }`}
              disabled={isLoading}
            >
              {isLoading ? <LoadingBtn /> : "Đăng nhập"}
            </button>
          </form>
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
