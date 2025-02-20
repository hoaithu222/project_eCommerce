import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TiTick } from "react-icons/ti";
import { FcShipped } from "react-icons/fc";
import {
  MdOutlineCurrencyExchange,
  MdOutlinePriceChange,
  MdHighQuality,
} from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import image01 from "../assets/img/Banner/bndongho.jpg";
import image02 from "../assets/img/Banner/gnam.jpg";
import image03 from "../assets/img/Banner/tn.jpg";
import img1 from "../assets/img/Banner/banner03.jpg";
import img2 from "../assets/img/Banner/tainghe1.jpg";

const HomeBanner = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const listImage = [image01, image02, image03];

  const sideImages = [img1, img2];

  const features = [
    {
      icon: <TiTick className="text-green-500 text-xl lg:text-3xl" />,
      text: "100% hàng thật",
    },
    {
      icon: <FcShipped className="text-xl lg:text-3xl" />,
      text: "Freeship mọi đơn",
    },
    {
      icon: (
        <MdOutlineCurrencyExchange className="text-xl lg:text-3xl text-blue-400" />
      ),
      text: "30 ngày đổi trả",
    },
    {
      icon: <FaShippingFast className="text-xl lg:text-3xl text-amber-500" />,
      text: "Giao hàng nhanh",
    },
    {
      icon: (
        <MdOutlinePriceChange className="text-xl lg:text-3xl text-purple-500" />
      ),
      text: "Giá siêu rẻ",
    },
    {
      icon: <MdHighQuality className="text-xl lg:text-3xl text-red-500" />,
      text: "Hàng chất lượng",
    },
  ];

  const nextImage = () => {
    if (!isAnimating && currentImage < listImage.length - 1) {
      setIsAnimating(true);
      setCurrentImage((prev) => prev + 1);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevImage = () => {
    if (!isAnimating && currentImage > 0) {
      setIsAnimating(true);
      setCurrentImage((prev) => prev - 1);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentImage >= listImage.length - 1) {
        setCurrentImage(0);
      } else {
        nextImage();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className="container mx-auto py-4 mt-20">
      <div className="bg-gray-50 p-5 lg:p-6 rounded-md shadow-2xl transform transition-all duration-300 hover:shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div
            className="relative h-[400px] overflow-hidden rounded-2xl shadow-ms group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Navigation Buttons */}
            <div
              className={`absolute inset-0 z-10 flex items-center justify-between px-3 lg:px-6 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
            >
              <button
                onClick={prevImage}
                disabled={currentImage === 0}
                className="p-1.5 lg:p-3 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all transform hover:scale-110 hover:-translate-x-1 disabled:opacity-50 disabled:hover:scale-100"
              >
                <ChevronLeft className="w:3 h:3 md:h-5 md:w-5 lg:w-6 lg:h-6 text-gray-700" />
              </button>
              <button
                onClick={nextImage}
                disabled={currentImage === listImage.length - 1}
                className="p-1.5 lg:p-3 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all transform hover:scale-110 hover:translate-x-1 disabled:opacity-50 disabled:hover:scale-100"
              >
                <ChevronRight className="w:3 h:3 md:h-5 md:w-5 lg:w-6 lg:h-6 text-gray-700" />
              </button>
            </div>

            {/* Images */}
            <div className="relative h-full">
              {listImage.map((imageUrl, index) => (
                <div
                  key={`slide-${index}`}
                  className="absolute w-full h-full transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateX(${(index - currentImage) * 100}%)`,
                  }}
                >
                  <img
                    src={imageUrl}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
                </div>
              ))}
            </div>

            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
              {listImage.map((_, index) => (
                <button
                  key={`dot-${index}`}
                  onClick={() => setCurrentImage(index)}
                  className={`transition-all duration-300 ${
                    currentImage === index
                      ? "w-8 h-2 bg-white rounded-full"
                      : "w-2 h-2 bg-white/60 rounded-full hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex-col gap-8 hidden lg:flex">
            {sideImages.map((image, index) => (
              <div
                key={`side-${index}`}
                className="relative h-[190px] overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
              >
                <img
                  src={image}
                  alt={`Side image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="text-white text-lg font-semibold">
                    Xem thêm
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-white p-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className="transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                {feature.icon}
              </div>
              <p className="text-xs lg:text-sm font-medium text-gray-700 group-hover:text-gray-900">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
