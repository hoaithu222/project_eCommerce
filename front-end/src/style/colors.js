const colors = {
    gradients: {
        blueToPink: "bg-gradient-to-r from-blue-200 to-pink-200",
        pinkToPurple:"bg-gradient-to-r from-pink-500 to-purple-600",
        violetToYellow: "bg-gradient-to-r from-violet-500 to-yellow-500",
        greenToBlue: "bg-gradient-to-r from-green-400 to-blue-500",
        orangeToRed: "bg-gradient-to-r from-orange-400 to-red-500",
        tealToPurple: "bg-gradient-to-r from-teal-400 to-purple-600",
        sunset: "bg-gradient-to-r from-orange-300 via-red-300 to-pink-300",
        frostToFlame: "bg-gradient-to-r from-blue-300 via-purple-400 to-red-500",
        sunrise: "bg-gradient-to-r from-pink-400 via-orange-300 to-yellow-500",
        skyToOcean: "bg-gradient-to-r from-blue-400 to-cyan-500", // Gradient mới
        limeToEmerald: "bg-gradient-to-r from-lime-200 to-emerald-400", // Gradient mới
        indigoToPink: "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900", // Màu gradient giống trong footer
        purpleToPinkBlur: "bg-gradient-to-r from-purple-500 to-pink-500", // Gradient nền hồng tím
        violetToBlue: "bg-gradient-to-r from-violet-400 to-blue-400", // Gradient mới
        pinkToOrange: "bg-gradient-to-r from-pink-400 to-orange-400", // Gradient mới
    },
    textColors: {
        primary: "text-gray-900", // Màu chữ chính
        secondary: "text-gray-500", // Màu chữ phụ
        gradientPrimary: "bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent",
        gradientSecondary: "bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent",
        frostToFlameText: "bg-gradient-to-r from-blue-300 via-purple-400 to-red-500 bg-clip-text text-transparent",
        gradientPinkToYellow: "bg-gradient-to-r from-pink-500 to-yellow-400 bg-clip-text text-transparent",
        gradientOrangeToCyan: "bg-gradient-to-r from-orange-400 to-cyan-500 bg-clip-text text-transparent",
        gradientGreenToPurple: "bg-gradient-to-r from-green-400 to-purple-500 bg-clip-text text-transparent",
        gradientBlueToOrange: "bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent",
        gradientPurpleToYellow: "bg-gradient-to-r from-purple-600 to-yellow-500 bg-clip-text text-transparent",
        gradientLimeToPink: "bg-gradient-to-r from-lime-300 to-pink-400 bg-clip-text text-transparent",
        gradientIndigoToTeal: "bg-gradient-to-r from-indigo-500 to-teal-400 bg-clip-text text-transparent",
        gradientRedToViolet: "bg-gradient-to-r from-red-400 to-violet-500 bg-clip-text text-transparent",
        gradientCyanToLime: "bg-gradient-to-r from-cyan-400 to-lime-400 bg-clip-text text-transparent",
        gradientSunsetGlow: "bg-gradient-to-r from-orange-300 via-red-400 to-purple-600 bg-clip-text text-transparent",
        gradientAurora: "bg-gradient-to-r from-green-300 via-blue-400 to-purple-500 bg-clip-text text-transparent",
        gradientOceanWave: "bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent",
        gradientRainbow: "bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent",
    },
    backgroundColors: {
        white: "bg-white",
        gray50: "bg-gray-50",
        gradientSkyToOcean: "bg-gradient-to-r from-blue-400 to-cyan-500", // Background mới
        gradientLimeToEmerald: "bg-gradient-to-r from-lime-200 to-emerald-400", // Background mới

    },
    button: {
        // Button theo kích thước
        small: "rounded-full px-2 py-1 text-sm transition duration-200 ease-in-out",
        medium: "rounded-full  px-3 py-1 md:px-5 md:py-1.5 lg:px-6 lg:py-2  text-base transition duration-200 ease-in-out",
        large: "rounded-full px-9 py-3 text-lg transition duration-200 ease-in-out",

        // Các button gradient
        gradientBlueToPink: "bg-gradient-to-r from-blue-200 to-pink-200 hover:from-blue-300 hover:to-pink-300 active:from-blue-400 active:to-pink-400 text-white transition duration-200 ease-in-out",
        gradientVioletToYellow: "bg-gradient-to-r from-violet-500 to-yellow-500 hover:from-violet-600 hover:to-yellow-600 active:from-violet-700 active:to-yellow-700 text-white transition duration-200 ease-in-out",
        gradientTealToPurple: "bg-gradient-to-r from-teal-400 to-purple-600 hover:from-teal-500 hover:to-purple-700 active:from-teal-600 active:to-purple-800 text-white transition duration-200 ease-in-out",
        gradientFrostToFlame: "bg-gradient-to-r from-blue-300 via-purple-400 to-red-500 hover:from-blue-400 hover:via-purple-500 hover:to-red-600 active:from-blue-500 active:via-purple-600 active:to-red-700 text-white transition duration-200 ease-in-out",
        gradientSunrise: "bg-gradient-to-r from-pink-400 via-orange-300 to-yellow-500 hover:from-pink-500 hover:via-orange-400 hover:to-yellow-600 active:from-pink-600 active:via-orange-500 active:to-yellow-700 text-white transition duration-200 ease-in-out",
        gradientSkyToOcean: "bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 active:from-blue-600 active:to-cyan-700 text-white transition duration-200 ease-in-out",
        gradientPurpleToOrange: "bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600 active:from-purple-700 active:to-orange-700 text-white transition duration-200 ease-in-out", // Gradient mới
        gradientRedToYellow: "bg-gradient-to-r from-red-400 to-yellow-400 hover:from-red-500 hover:to-yellow-500 active:from-red-600 active:to-yellow-600 text-white transition duration-200 ease-in-out", // Gradient mới
        gradientCyanToIndigo: "bg-gradient-to-r from-cyan-300 to-indigo-400 hover:from-cyan-400 hover:to-indigo-500 active:from-cyan-500 active:to-indigo-600 text-white transition duration-200 ease-in-out", // Gradient mới

        // Button màu đơn sắc
        primary: "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 rounded-full transition duration-200 ease-in-out",
        secondary: "bg-gray-50 text-gray-800 hover:bg-gray-100 active:bg-gray-200 rounded-full transition duration-200 ease-in-out",
        danger: "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 rounded-full transition duration-200 ease-in-out",
        success: "bg-green-500 text-white hover:bg-green-600 active:bg-green-700 rounded-full transition duration-200 ease-in-out",
    },
};

export default colors;
