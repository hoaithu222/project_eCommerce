import React from "react";
import { useNavigate } from "react-router-dom";
import UserMenu from "../components/UserMenu";
import useMobile from "../hooks/useMobile";

export default function UserMenuPage() {
  const navigate = useNavigate();
  const isMobile = useMobile();

  // Nếu không phải mobile, redirect về trang chủ
  React.useEffect(() => {
    if (!isMobile) {
      navigate("/");
    }
  }, [isMobile, navigate]);

  return (
    <section className="bg-pink-50">
      <div className="container mx-auto p-3">
        <UserMenu isFullPage={true} onClose={() => navigate("/")} />
      </div>
    </section>
  );
}
