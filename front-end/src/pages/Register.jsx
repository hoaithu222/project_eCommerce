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
    <section className="flex justify-center items-center min-h-screen">
      {verificationSent ? (
        <div className="min-w-[30%] md:min-w-[35%] lg:min-w-[40%] shadow-lg shadow-indigo-200 rounded-lg bg-white p-10 text-center">
          <FcCheckmark className=" text-2xl sm:text-3xl md:text-4xl lg:text-5xl mx-auto sm:mb-3 lg:mb-4" />
          <h2 className=" text-xl md:text-2xl lg:text-3xl font-bold text-indigo-800 mb-4">
            Đăng ký thành công!
          </h2>
          <p className="text-gray-600 mb-6 text-sm md:text-base">
            Chúng tôi đã gửi một email xác nhận đến
            <strong>{data.email}</strong>. Vui lòng kiểm tra hộp thư để kích
            hoạt tài khoản của bạn.
          </p>
          <Link
            to="https://mail.google.com"
            className={`w-full ${colors.gradients.pinkToPurple} text-white py-3 rounded-lg font-medium px-2
          transform hover:-translate-y-0.5 transition-all duration-200`}
          >
            Truy cập Gmail
          </Link>
        </div>
      ) : (
        <div className="min-w-[30%] md:min-w-[35%] lg:min-w-[40%] shadow-xl shadow-blue-50 rounded-md bg-white p-3 sm:p-5 md:p-8 lg:p-10">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Welcome to my shop
            </h2>
          </div>
          <form
            onSubmit={handleSubmit}
            className=" p-2 space-y-4 lg:p-7 lg:space-y-5"
          >
            <InputField
              label="Tên"
              name="username"
              id="name"
              placeholder="Nhập tên"
              value={data.username}
              onChange={handleChange}
              required
              icon={FcLikePlaceholder}
              error={error.errorName}
            />

            <InputField
              label="Nhập họ tên"
              name="fullname"
              id="fullname"
              placeholder="Nhập họ tên"
              value={data.fullname}
              onChange={handleChange}
              required
              icon={FcCheckmark}
              error={error.errorFull}
            />
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
              className={`w-full ${
                colors.gradients.pinkToPurple
              }  text-white py-3 rounded-lg font-medium
                transform hover:-translate-y-0.5 transition-all duration-200 
                ${
                  isLoading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:opacity-90 hover:shadow-lg"
                }
              `}
              disabled={isLoading}
            >
              {isLoading ? <LoadingBtn /> : "Register"}
            </button>
            <p className="text-center mt-2 text-gray-500">
              Already have account ?{" "}
              <Link to="/login" className="text-green-500 font-semibold">
                Login
              </Link>
            </p>
          </form>
        </div>
      )}
      <ToastContainer />
    </section>
  );
}
