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
    <section className="container  w-full h-screen mx-auto flex items-center justify-center ">
      <div className="w-full flex items-center justify-center mt-10">
        <form
          className="min-w-[50%] shadow-2xl shadow-blue-100 rounded-md bg-white p-5 space-y-6 lg:p-10 lg:space-y-10"
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

          <button
            type="submit"
            className={`w-full ${
              colors.gradients.pinkToPurple
            } text-white py-3 rounded-lg font-medium transform hover:-translate-y-0.5 transition-all duration-200  ${
              isLoading
                ? "opacity-70 cursor-not-allowed"
                : "hover:opacity-90 hover:shadow-lg"
            }`}
            disabled={isLoading}
          >
            {isLoading ? <LoadingBtn /> : "Login"}
          </button>
        </form>
      </div>
    </section>
  );
}
