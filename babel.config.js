module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      // Expo + Tailwind vía JSX import
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      // NativeWind Babel plugin
      "nativewind/babel",
    ],
    plugins: [
      // Si usas react-native-reanimated
      "react-native-reanimated/plugin",
      'react-native-paper/babel' // Optimizar tamaño
    ],
  };
};
