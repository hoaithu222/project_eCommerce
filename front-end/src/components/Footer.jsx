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
    <footer className={`${colors.gradients.indigoToPink} text-gray-100`}>
      <div className="mx-auto py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden container">
        <div
          className={`absolute top-0 left-0 w-32 h-32 ${colors.gradients.purpleToPinkBlur} rounded-full opacity-10 blur-xl transform -translate-x-1/2 -translate-y-1/2`}
        ></div>
        <div
          className={`absolute bottom-0 right-0 w-40 h-40 ${colors.gradients.pinkToOrange} rounded-full opacity-10 blur-xl transform translate-x-1/2 translate-y-1/2`}
        ></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
          {/* Thông tin công ty */}
          <div className="space-y-6">
            <h2
              className={`text-2xl lg:text-3xl font-bold ${colors.gradients.violetToBlue} bg-clip-text text-transparent`}
            >
              My shop
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Sàn thương mại điện tử uy tín hàng đầu Việt Nam. Mang đến trải
              nghiệm mua sắm trực tuyến an toàn và tiện lợi.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 group hover:bg-white/10 p-2 rounded-lg transition-all duration-300">
                <MapPin className="h-5 w-5 text-violet-400 group-hover:text-violet-300" />
                <span className=" group-hover:text-white">
                  Vũ sơn,Bắc sơn,Lạng sơn
                </span>
              </div>
              <div className="flex items-center space-x-3 group hover:bg-white/10 p-2 rounded-lg transition-all duration-300">
                <Phone className="h-5 w-5 text-teal-400 group-hover:text-teal-300" />
                <span className="group-hover:text-white">1900 1234</span>
              </div>
              <div className="flex items-center space-x-3 group hover:bg-white/10 p-2 rounded-lg transition-all duration-300">
                <Mail className="h-5 w-5 text-rose-400 group-hover:text-rose-300" />
                <span className="group-hover:text-white">
                  support@emarket.com
                </span>
              </div>
            </div>
          </div>

          {/* Hỗ trợ khách hàng */}
          <div>
            <h2 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-6">
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
                  className="block text-gray-300 hover:text-white p-2 rounded-lg transition-all duration-300
                    hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20
                    hover:translate-x-2 transform"
                >
                  {link.text}
                </Link>
              ))}
            </nav>
          </div>

          {/* Dành cho người bán */}
          <div>
            <h2 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-6">
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
                  className="block text-gray-300 hover:text-white p-2 rounded-lg transition-all duration-300
                    hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20
                    hover:translate-x-2 transform"
                >
                  {link.text}
                </Link>
              ))}
            </nav>
          </div>

          {/* Cam kết */}
          <div>
            <h2 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent mb-6">
              Cam Kết Của Chúng Tôi
            </h2>
            <div className="space-y-6">
              <div className="flex items-center space-x-3 group hover:bg-white/10 p-2 rounded-lg transition-all duration-300">
                <ShieldCheck className="h-6 w-6 text-green-400" />
                <span className="text-gray-300">Bảo vệ người mua 100%</span>
              </div>
              <div className="flex items-center space-x-3 group hover:bg-white/10 p-2 rounded-lg transition-all duration-300">
                <CreditCard className="h-6 w-6 text-blue-400" />
                <span className="text-gray-300">Thanh toán an toàn</span>
              </div>
              <div className="flex items-center space-x-3 group hover:bg-white/10 p-2 rounded-lg transition-all duration-300">
                <Truck className="h-6 w-6 text-yellow-400" />
                <span className="text-gray-300">Vận chuyển nhanh chóng</span>
              </div>
              <div className="flex space-x-6 mt-6">
                <Link
                  to="https://facebook.com"
                  className="text-gray-300 hover:text-blue-400 transition-all duration-300 transform hover:scale-125 hover:rotate-6"
                >
                  <Facebook className="h-8 w-8" />
                </Link>
                <Link
                  to="https://instagram.com"
                  className="text-gray-300 hover:text-pink-400 transition-all duration-300 transform hover:scale-125 hover:-rotate-6"
                >
                  <Instagram className="h-8 w-8" />
                </Link>
                <Link
                  to="https://twitter.com"
                  className="text-gray-300 hover:text-blue-400 transition-all duration-300 transform hover:scale-125 hover:rotate-6"
                >
                  <Twitter className="h-8 w-8" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-100/20">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-300 mr-1">
            &copy; {currentYear} - Copyright by
            <span
              className={`${colors.textColors.frostToFlameText} font-bold hover:${colors.textColors.gradientPrimary} transition-all duration-300`}
            >
              Thu
            </span>
            .All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
