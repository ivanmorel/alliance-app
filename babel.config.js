module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "module:metro-react-native-babel-preset"],
    plugins: [
      "@babel/plugin-transform-react-jsx-source",
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: false,
        },
      ],
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          root: ["."],
          extensions: [".ios.js", ".android.js", ".js", ".json"],
          alias: {
            "@services": "./src/services",
            "@routes": "./src/routes",
            "@utils": "./src/utils",
            "@constants": "./src/redux/constants",
            "@actions": "./src/redux/actions",
            "@selectors": "./src/redux/selectors",
            "@hooks": "./src/hooks",
            "@screens": "./src/screens",
            "@components": "./src/components",
            "@styles": "./src/styles",
            "@assets": "./src/assets",
          },
        },
      ],
    ],
  };
};
