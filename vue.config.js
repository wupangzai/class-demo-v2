const DefinePlugin = require("webpack").DefinePlugin;
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: true,
  configureWebpack: {
    devServer: {
      proxy: {
        "/myclass": {
          target: "https://bi.innoclass.cn", // 目标服务器地址
          changeOrigin: true, // 是否改变源地址
          pathRewrite: {
            "^/myclass": "", // 重写路径
          },
        },
        "/crm": {
          target: "https://crm-api.landwave.cn", // 目标服务器地址
          changeOrigin: true, // 是否改变源地址
          pathRewrite: {
            "^/crm": "", // 重写路径
          },
        },
      },
    },
    plugins: [
      new DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "false", // 注释掉开发环境的警告
      }),
    ],
  },
});
