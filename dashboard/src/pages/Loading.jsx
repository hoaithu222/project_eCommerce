export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 bg-opacity-80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="w-32 h-32 rounded-full animate-spin-slow">
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-blue-300 via-purple-300 to-pink-300 opacity-75"></div>
          </div>

          <div className="absolute top-4 left-4 w-24 h-24 rounded-full animate-spin-reverse">
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-pink-300 via-orange-300 to-yellow-300 opacity-75"></div>
          </div>

          <div className="absolute top-8 left-8 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 animate-pulse"></div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Loading
          </p>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"></div>
            <div className="w-2 h-2 rounded-full bg-pink-400 animate-bounce delay-100"></div>
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
