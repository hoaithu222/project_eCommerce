import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser } from "../store/actions/fetchUser";

export default function SocialCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleSocialLogin = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get("accessToken");
      const refreshToken = urlParams.get("refreshToken");
      const error = urlParams.get("error");

      if (error) {
        console.error("Social login failed:", { error });
        navigate("/login");
        return;
      }

      if (accessToken && refreshToken) {
        try {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          await dispatch(fetchUser());

          navigate("/");
        } catch (error) {
          console.error("Error fetching user:", error);
          navigate("/login");
        }
      } else {
        console.error("Login failed: Missing tokens", {
          accessToken,
          refreshToken,
        });
        navigate("/login");
      }
    };

    handleSocialLogin();
  }, [navigate, dispatch]);

  return null;
}
