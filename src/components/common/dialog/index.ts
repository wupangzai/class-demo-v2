import { isVNode as isVNodeInVue, defineComponent } from "vue";
// 弹窗模板组件
import customDialog from "@/components/common/dialog/custom-dialog.vue";
// 需要时可引入store等在 app.vue 使用的插件
import router from "@/router";

// 是否为 VNode 节点
const isVNode = (node: unknown) => {
  return (
    isVNodeInVue ??
    (node !== null &&
      typeof node === "object" &&
      Object.prototype.hasOwnProperty.call(node, "componentOptions"))
  );
};

export function createDialog(options?: any) {}
