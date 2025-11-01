import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  CreditCard,
  Truck,
  ShieldCheck,
  Store,
} from "lucide-react";
import colors from "../style/colors";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-gray-100 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700">
      <div className="container overflow-hidden relative px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div
          className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-20 blur-xl transform -translate-x-1/2 -translate-y-1/2"
        ></div>
        <div
          className="absolute right-0 bottom-0 w-40 h-40 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full opacity-20 blur-xl transform translate-x-1/2 translate-y-1/2"
        ></div>

        <div className="grid relative z-10 grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Thông tin công ty */}
          <div className="space-y-6">
            <h2
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-white lg:text-3xl"
            >
              My shop
            </h2>
            <p className="leading-relaxed text-gray-300">
              Sàn thương mại điện tử uy tín hàng đầu Việt Nam. Mang đến trải
              nghiệm mua sắm trực tuyến an toàn và tiện lợi.
            </p>
            <div className="space-y-4">
              <div className="flex items-center p-2 space-x-3 rounded-lg transition-all duration-300 group hover:bg-white/10">
                <MapPin className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                <span className="group-hover:text-white">
                  Vũ sơn,Bắc sơn,Lạng sơn
                </span>
              </div>
              <div className="flex items-center p-2 space-x-3 rounded-lg transition-all duration-300 group hover:bg-white/10">
                <Phone className="w-5 h-5 text-teal-400 group-hover:text-teal-300" />
                <span className="group-hover:text-white">1900 1234</span>
              </div>
              <div className="flex items-center p-2 space-x-3 rounded-lg transition-all duration-300 group hover:bg-white/10">
                <Mail className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                <span className="group-hover:text-white">
                  support@emarket.com
                </span>
              </div>
            </div>
          </div>

          {/* Hỗ trợ khách hàng */}
          <div>
            <h2 className="mb-6 text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 lg:text-xl">
              Hỗ Trợ Khách Hàng
            </h2>
            <nav className="space-y-4">
              {[
                { to: "/help-center", text: "Trung Tâm Trợ Giúp" },
                { to: "/shipping", text: "Chính Sách Vận Chuyển" },
                { to: "/returns", text: "Chính Sách Đổi Trả" },
                { to: "/warranty", text: "Chính Sách Bảo Hành" },
                { to: "/payment", text: "Hướng Dẫn Thanh Toán" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block p-2 text-gray-300 rounded-lg transition-all duration-300 transform hover:text-white hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-blue-600/20 hover:translate-x-2"
                >
                  {link.text}
                </Link>
              ))}
            </nav>
          </div>

          {/* Dành cho người bán */}
          <div>
            <h2 className="mb-6 text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 lg:text-xl">
              Dành Cho Người Bán
            </h2>
            <nav className="space-y-4">
              {[
                { to: "/seller/register", text: "Đăng Ký Bán Hàng" },
                { to: "/seller/rules", text: "Quy Định Người Bán" },
                { to: "/seller/fees", text: "Chính Sách Phí" },
                { to: "/seller/support", text: "Hỗ Trợ Người Bán" },
                { to: "/seller/marketing", text: "Công Cụ Marketing" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block p-2 text-gray-300 rounded-lg transition-all duration-300 transform hover:text-white hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-blue-600/20 hover:translate-x-2"
                >
                  {link.text}
                </Link>
              ))}
            </nav>
          </div>

          {/* Cam kết */}
          <div>
            <h2 className="mb-6 text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 lg:text-xl">
              Cam Kết Của Chúng Tôi
            </h2>
            <div className="space-y-6">
              <div className="flex items-center p-2 space-x-3 rounded-lg transition-all duration-300 group hover:bg-white/10">
                <ShieldCheck className="w-6 h-6 text-green-400" />
                <span className="text-gray-300">Bảo vệ người mua 100%</span>
              </div>
              <div className="flex items-center p-2 space-x-3 rounded-lg transition-all duration-300 group hover:bg-white/10">
                <CreditCard className="w-6 h-6 text-blue-400" />
                <span className="text-gray-300">Thanh toán an toàn</span>
              </div>
              <div className="flex items-center p-2 space-x-3 rounded-lg transition-all duration-300 group hover:bg-white/10">
                <Truck className="w-6 h-6 text-yellow-400" />
                <span className="text-gray-300">Vận chuyển nhanh chóng</span>
              </div>
              <div className="flex mt-6 space-x-6">
                <Link
                  to="https://facebook.com"
                  className="text-gray-300 transition-all duration-300 transform hover:text-blue-400 hover:scale-125 hover:rotate-6"
                >
                  <Facebook className="w-8 h-8" />
                </Link>
                <Link
                  to="https://instagram.com"
                  className="text-gray-300 transition-all duration-300 transform hover:text-blue-400 hover:scale-125 hover:-rotate-6"
                >
                  <Instagram className="w-8 h-8" />
                </Link>
                <Link
                  to="https://twitter.com"
                  className="text-gray-300 transition-all duration-300 transform hover:text-blue-400 hover:scale-125 hover:rotate-6"
                >
                  <Twitter className="w-8 h-8" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-blue-400/30">
        <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <p className="mr-1 text-center text-gray-200">
            &copy; {currentYear} - Copyright by
            <span
              className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 transition-all duration-300 hover:from-blue-200 hover:to-white"
            >
              {" "}Thu
            </span>
            .All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
