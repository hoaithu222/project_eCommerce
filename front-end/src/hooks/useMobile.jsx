import { useEffect, useState } from "react";

export default function useMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < breakpoint;
    }
    return false; // Giá trị mặc định cho SSR
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    handleResize(); // Gọi ngay khi mount để đảm bảo giá trị chính xác
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  return isMobile; // Trả về giá trị đơn lẻ thay vì mảng
}
