const colors = {
  gradients: {
    blueToPink: "bg-gradient-to-r from-blue-500 to-indigo-600",
    pinkToPurple: "bg-gradient-to-r from-blue-500 to-indigo-600",
    blueToPurple: "bg-gradient-to-r from-blue-500 to-indigo-600",
    blueToBlue: "bg-gradient-to-r from-blue-500 to-blue-600",
    blueToOrange: "bg-gradient-to-r from-blue-500 to-indigo-600",
    violetToYellow: "bg-gradient-to-r from-blue-500 to-indigo-600",
    greenToBlue: "bg-gradient-to-r from-blue-500 to-indigo-600",
    orangeToRed: "bg-gradient-to-r from-blue-500 to-indigo-600",
    tealToPurple: "bg-gradient-to-r from-blue-500 to-indigo-600",
    sunset: "bg-gradient-to-r from-blue-500 to-indigo-600",
    frostToFlame: "bg-gradient-to-r from-blue-500 to-indigo-600",
    sunrise: "bg-gradient-to-r from-blue-500 to-indigo-600",
    skyToOcean: "bg-gradient-to-r from-blue-500 to-indigo-600",
    limeToEmerald: "bg-gradient-to-r from-blue-500 to-indigo-600",
    indigoToPink: "bg-gradient-to-br from-blue-500 to-indigo-600",
    purpleToPinkBlur: "bg-gradient-to-r from-blue-500 to-indigo-600",
    purpleToBlueBlur: "bg-gradient-to-r from-blue-500 to-indigo-600",
    violetToBlue: "bg-gradient-to-r from-blue-500 to-indigo-600",
    pinkToOrange: "bg-gradient-to-r from-blue-500 to-indigo-600",
    indigoToBlue: "bg-gradient-to-r from-blue-500 to-indigo-600",
  },

  textColors: {
    primary: "text-gray-100",
    secondary: "text-gray-400",
    gradientPrimary:
      "bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent",
    gradientSecondary:
      "bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent",
    frostToFlameText:
      "bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent",
    gradientPinkToYellow:
      "bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent",
    gradientOrangeToCyan:
      "bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent",
    gradientGreenToPurple:
      "bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent",
    gradientBlueToOrange:
      "bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent",
    gradientPurpleToYellow:
      "bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent",
    gradientLimeToPink:
      "bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent",
    gradientIndigoToTeal:
      "bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent",
    gradientRedToViolet:
      "bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent",
    gradientCyanToLime:
      "bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent",
    gradientSunsetGlow:
      "bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent",
    gradientAurora:
      "bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent",
    gradientOceanWave:
      "bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent",
    gradientRainbow:
      "bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent",
  },

  backgroundColors: {
    white: "bg-neutral-900",
    gray50: "bg-neutral-950",
    gradientSkyToOcean: "bg-gradient-to-r from-blue-900 to-indigo-900",
    gradientLimeToEmerald: "bg-gradient-to-r from-blue-900 to-indigo-900",
  },

  button: {
    small:
      "rounded-full px-2 py-1 text-sm transition duration-200 ease-in-out",
    medium:
      "rounded-full px-4 py-2 text-base transition duration-200 ease-in-out",
    large:
      "rounded-full px-6 py-3 text-lg transition duration-200 ease-in-out",

    gradientBlueToPink:
      "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 active:from-blue-700 active:to-indigo-800 text-white transition duration-200 ease-in-out",
    gradientBlueToBlue:
      "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 active:from-blue-700 active:to-blue-800 text-white transition duration-200 ease-in-out",
    gradientVioletToYellow:
      "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 active:from-blue-700 active:to-indigo-800 text-white transition duration-200 ease-in-out",
    gradientTealToPurple:
      "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 active:from-blue-700 active:to-indigo-800 text-white transition duration-200 ease-in-out",
    gradientFrostToFlame:
      "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 active:from-blue-700 active:to-indigo-800 text-white transition duration-200 ease-in-out",
    gradientSunrise:
      "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 active:from-blue-700 active:to-indigo-800 text-white transition duration-200 ease-in-out",
    gradientSkyToOcean:
      "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 active:from-blue-700 active:to-indigo-800 text-white transition duration-200 ease-in-out",
    gradientPurpleToOrange:
      "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 active:from-blue-700 active:to-indigo-800 text-white transition duration-200 ease-in-out",
    gradientRedToYellow:
      "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 active:from-blue-700 active:to-indigo-800 text-white transition duration-200 ease-in-out",
    gradientCyanToIndigo:
      "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 active:from-blue-700 active:to-indigo-800 text-white transition duration-200 ease-in-out",

    primary:
      "bg-blue-900 text-gray-100 hover:bg-blue-800 active:bg-blue-700 rounded-full transition duration-200 ease-in-out",
    secondary:
      "bg-neutral-800 text-gray-200 hover:bg-neutral-700 active:bg-neutral-600 rounded-full transition duration-200 ease-in-out",
    danger:
      "bg-red-800 text-white hover:bg-red-700 active:bg-red-600 rounded-full transition duration-200 ease-in-out",
    success:
      "bg-emerald-800 text-white hover:bg-emerald-700 active:bg-emerald-600 rounded-full transition duration-200 ease-in-out",
  },
};

export default colors;
