export type CloseType = "confirm" | "cancel";

interface Options {
  content: string | typeof defineComponent; // 渲染模板
  dialogProps: any; // 传入dialog的props
  slotProps: any; // 传入插槽的props
}

import {
  isVNode as isVNodeInVue,
  defineComponent,
  createVNode,
  h,
  render,
} from "vue";
// 弹窗模板组件
import customDialog from "@/components/common/dialog/custom-dialog.vue";

// 是否为 VNode 节点
const isVNode = (node: unknown) => {
  return (
    isVNodeInVue ??
    (node !== null &&
      typeof node === "object" &&
      Object.prototype.hasOwnProperty.call(node, "componentOptions"))
  );
};

/**
 * options 同类型接口
 */
export function createDialog(options: Options): Promise<CloseType> {
  // 创建一个容器用于挂载 Dialog
  const container = document.createElement("div");
  document.body.appendChild(container);

  // 关闭函数，用于清理组件和 DOM
  const closeDialog = () => {
    render(null, container); // 卸载组件
    document.body.removeChild(container); // 删除容器
  };

  return new Promise((resolve) => {
    // Dialog 的关闭逻辑
    const onClose = (type: CloseType) => {
      resolve(type);
      closeDialog();
    };

    const vnode = createVNode(
      createVNode(customDialog, { footer: options.dialogProps.footer }),
      {
        visible: true,
        onClose,
        "onUpdate:visible": (visible: boolean, type: CloseType) => {
          visible = !visible;
          onClose(type);
        },
      },
      {
        // 渲染内容
        default: () =>
          typeof options.content === "string"
            ? h("div", options.content)
            : h(
                options.content as ReturnType<typeof defineComponent>,
                options.slotProps
              ),
      }
    );
    // 渲染到容器
    render(vnode, container);
  });
}

export function useDialog(options: any) {
  return createDialog(options);
}
