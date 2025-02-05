export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-900 bg-opacity-70">
      <div className="flex flex-col items-center gap-4">
        {/* Vòng tròn lớn */}
        <div className="relative w-24 h-24 animate-spin-slow">
          <div className="absolute inset-0 rounded-full border-4 border-gradient-to-tr from-blue-400 via-purple-500 to-pink-500 border-t-transparent"></div>
          {/* Vòng tròn nhỏ */}
          <div className="absolute inset-4 rounded-full border-4 border-gradient-to-tr from-pink-500 via-orange-500 to-yellow-500 border-t-transparent animate-spin-reverse"></div>
        </div>
        {/* Text hoặc Icon */}
        <p className="text-white text-lg font-semibold">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}
