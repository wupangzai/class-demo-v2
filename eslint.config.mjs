import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import { defineConfig, globalIgnores } from "eslint/config";
import vueParser from "vue-eslint-parser";

import noElDialog from "./custom-eslint-rules/no-el-dialog.mjs";

const customPlugin = {
  rules: {
    "no-el-dialog": noElDialog,
  },
};

export default defineConfig([
  // 使用globalIgnores全局忽略文件/夹
  globalIgnores([
    "node_modules/",
    "dist/",
    "@types/",
    "**/*config.js",
    "**/*config.mjs",
    "custom-eslint-rules/",
  ]),

  // // 只对 src 目录下的文件生效，js 推荐规则
  {
    files: ["src/**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  // // src 目录下文件的全局变量配置
  {
    files: ["src/**/*.{js,mjs,cjs,ts,vue}"],
    languageOptions: { globals: globals.browser },
  },
  // // typescript-eslint 推荐配置（它内部可能包含 files 配置，如果需要可以覆盖）
  tseslint.configs.recommended,

  // // vue 插件 flat 重要规则
  pluginVue.configs["flat/essential"],

  // vue 文件用 typescript-eslint 的 parser，限定在 src 目录
  {
    name: "custom-vue-lint",
    files: ["src/**/*.vue"],
    languageOptions: {
      parser: vueParser, // ✅ 正确解析 .vue 文件
      parserOptions: {
        parser: tseslint.parser,
      },
    },

    plugins: {
      custom: customPlugin,
    },

    rules: {
      "custom/no-el-dialog": "error",
    },
  },

  {
    files: ["src/**/*.{ts,vue}"],
    rules: {
      "vue/multi-word-component-names": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
      "@typescript-eslint/no-unused-expressions": "off",
    },
  },
]);
