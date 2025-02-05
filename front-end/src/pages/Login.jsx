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

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { data: user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = sessionStorage.getItem("isLogin");
  console.log(isLogin);

  useEffect(() => {
    if (location.pathname === "/login" && isLogin) {
      navigate("/");
    }
  }, [location.pathname, user, navigate]);

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
        localStorage.setItem("accessToken", dataResponse.data.accessToken);
        localStorage.setItem("refreshToken", dataResponse.data.refreshToken);
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
    <section className="flex justify-center items-center min-h-screen">
      <div className="min-w-[40%] shadow-xl shadow-blue-50 rounded-md bg-white p-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="mt-2 text-gray-600">Login to your account</p>
        </div>
        <form
          className=" p-5 space-y-4 lg:p-8 lg:space-y-5"
          onSubmit={handleSubmit}
        >
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
              className="text-pink-600 hover:text-pink-700 text-sm transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className={`w-full ${
              colors.gradients.pinkToPurple
            } text-white py-3 rounded-lg font-medium transform hover:-translate-y-0.5 transition-all duration-200 ${
              isLoading
                ? "opacity-70 cursor-not-allowed"
                : "hover:opacity-90 hover:shadow-lg"
            }`}
            disabled={isLoading}
          >
            {isLoading ? <LoadingBtn /> : "Login"}
          </button>
          <div className="text-center text-gray-500 mt-4">or</div>
          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={() => handleSocialLogin("google")}
              className="flex-1 flex items-center justify-center gap-2 py-3 border rounded-lg hover:shadow-md transition-all"
            >
              <FcGoogle className="h-5 w-5" />
              <span>Google</span>
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin("facebook")}
              className="flex-1 flex items-center justify-center gap-2 py-3 border rounded-lg text-blue-600 hover:shadow-md transition-all"
            >
              <FaFacebook className="h-5 w-5" />
              <span>Facebook</span>
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin("github")}
              className="flex-1 flex items-center justify-center gap-2 py-3 border rounded-lg text-gray-800 hover:shadow-md transition-all"
            >
              <FaGithub className="h-5 w-5" />
              <span>GitHub</span>
            </button>
          </div>
          <p className="text-center mt-14 text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-green-500 font-semibold hover:text-green-600 transition-colors"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
}
