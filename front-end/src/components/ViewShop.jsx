import React from "react";

const ViewShop = ({ close, data, count }) => {
  const formatDate = (date) => {
    const currentDate = new Date();
    const givenDate = new Date(date);
    const yearsDiff = currentDate.getFullYear() - givenDate.getFullYear();
    const monthsDiff = currentDate.getMonth() - givenDate.getMonth();
    const totalMonthsDiff = yearsDiff * 12 + monthsDiff;

    if (totalMonthsDiff <= 0) return "Vừa mới tham gia";
    return `${totalMonthsDiff} tháng trước`;
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-2xl overflow-hidden relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 bg-red-200 hover:bg-red-300 text-white w-8 h-8 rounded-full flex items-center justify-center transition-all z-10"
          onClick={close}
          aria-label="Close"
        >
          <span className="text-xl">&times;</span>
        </button>

        <div className="grid grid-rows-[250px_auto]">
          <div className="relative">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${data.banner_url || ""})`,
              }}
            >
              {!data.banner_url && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400" />
              )}
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          {/* Shop Content */}
          <div className="relative -mt-16 px-8 pb-8">
            {/* Shop Header */}
            <div className="flex items-start gap-6">
              <div className="ring-4 ring-white rounded-full">
                <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-r from-green-500 to-emerald-500">
                  <img
                    src={data.logo_url || "https://via.placeholder.com/128"}
                    alt={`${data.name} logo`}
                    className="w-full h-full rounded-full object-cover bg-white"
                  />
                </div>
              </div>

              <div className="flex-1 mt-16">
                <h4 className="text-3xl font-bold text-gray-900 mb-2">
                  {data.name}
                </h4>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Đang hoạt động
                  </span>
                  <span>•</span>
                  <span>Tham gia {formatDate(data.created_at)}</span>
                  <span>•</span>
                  <span>
                    {data?.followers?.toLocaleString()} người theo dõi
                  </span>
                </div>
              </div>
            </div>

            {/* Shop Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8 p-2 bg-gray-50 rounded-xl shadow-sm">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-amber-500 mb-2">
                  <span className="text-2xl font-bold">★</span>
                  <span className="font-bold text-2xl">{data.rating}</span>
                </div>
                <p className="text-sm font-medium text-gray-600">
                  Đánh giá trung bình
                </p>
              </div>

              <div className="text-center border-x border-gray-200">
                <div className="font-bold text-2xl text-gray-900 mb-2">
                  {count || 0}
                </div>
                <p className="text-sm font-medium text-gray-600">
                  Tổng sản phẩm
                </p>
              </div>

              <div className="text-center">
                <div className="font-bold text-2xl text-gray-900 mb-2">
                  {data?.followers?.toLocaleString()}
                </div>
                <p className="text-sm font-medium text-gray-600">
                  Người theo dõi
                </p>
              </div>
            </div>

            {/* Shop Description */}
            <div className="mt-8">
              <h5 className="font-semibold text-gray-900 mb-3">
                Giới thiệu về shop
              </h5>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-gray-600 leading-relaxed">
                  {data.description || "Shop chưa có mô tả chi tiết"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewShop;
