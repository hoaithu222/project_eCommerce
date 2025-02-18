import React, { useEffect, useState } from "react";
import { LuHeartHandshake } from "react-icons/lu";

export default function ReviewSuccess() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="min-h-[80vh] container mx-auto flex items-center justify-center p-4">
      <div
        className={`bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center transform transition-all duration-700 ease-out
          ${animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      >
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`w-20 h-20 bg-red-100 rounded-full transform transition-all duration-1000 
              ${animate ? "scale-100 opacity-50" : "scale-50 opacity-0"}`}
            />
            <div
              className={`absolute w-16 h-16 bg-red-200 rounded-full transform transition-all duration-1000 delay-100
              ${animate ? "scale-100 opacity-50" : "scale-50 opacity-0"}`}
            />
          </div>

          <div
            className={`relative transform transition-all duration-700 delay-300
            ${animate ? "scale-100 rotate-0 opacity-100" : "scale-50 rotate-45 opacity-0"}`}
          >
            <LuHeartHandshake className="text-5xl text-red-600 mx-auto" />
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Cảm ơn bạn đã đánh giá!
        </h2>

        <p
          className={`text-gray-600 mb-6 transition-all duration-700 delay-300
          ${animate ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          Đánh giá của bạn sẽ giúp người mua khác có quyết định tốt hơn
        </p>

        <div
          className={`transition-all duration-700 delay-500
          ${animate ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <a
            href="/"
            className="inline-block px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full hover:from-red-600 hover:to-pink-600 transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Tiếp tục mua sắm
          </a>
        </div>
      </div>
    </div>
  );
}
