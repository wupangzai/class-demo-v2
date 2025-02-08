const DefinePlugin = require("webpack").DefinePlugin;
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      proxy: {
        "/myclass": {
          target:
            "https://bi.innoclass.cn/api/public/card/422e5936-e3f1-4080-a226-e2311ab69019/query", // 目标服务器地址
          changeOrigin: true, // 是否改变源地址
          pathRewrite: {
            "^/myclass": "", // 重写路径
          },
        },
        "/crm": {
          target: "https://crm-api.landwave.cn/api/v1", // 目标服务器地址
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
