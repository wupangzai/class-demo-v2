import { onUnmounted } from "vue";

function fallbackCopy(text: any) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

/**
 * 复制工具 Hook
 */
export function useClipboard() {
  /**
   * 复制内容到剪贴板
   * @param target - DOM 节点、DOM 节点数组，或字符串
   * @returns Promise<boolean> - 表示复制是否成功
   */
  const copy = (
    target: string | HTMLElement | HTMLElement[]
  ): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      try {
        const getContent = (
          target: string | HTMLElement | HTMLElement[]
        ): string => {
          if (typeof target === "string") {
            return target; // 如果是字符串直接返回
          }
          if (Array.isArray(target)) {
            // 如果是 DOM 数组，提取每个元素的纯文本内容
            return target.map((element) => element.innerText).join("\n\n"); // 两个换行符分隔
          }
          // 如果是单个 DOM 节点，提取其纯文本内容
          return target.innerText;
        };

        const content = getContent(target); // 获取待复制的内容

        if (navigator.clipboard && window.isSecureContext) {
          // 使用现代的 Clipboard API
          navigator.clipboard
            .writeText(content)
            .then(() => {
              resolve(true); // 成功
            })
            .catch(() => {
              reject(false); // 失败
            });
        } else {
          fallbackCopy(content);
          resolve(true); // 成功
        }
      } catch (err) {
        reject(false); // 捕获异常
      }
    });
  };

  // 组件卸载时清理资源（这里不需要特殊清理逻辑）
  onUnmounted(() => {});

  return { copy };
}
