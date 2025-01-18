import Vue, { VNode } from "vue";

// 添加 JSX 类型声明
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Vue 3 中的内置 HTML 元素
      [elem: string]: any;
    }
  }
}
