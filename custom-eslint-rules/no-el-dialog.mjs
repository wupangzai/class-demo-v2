export default {
  meta: {
    type: "problem",
    docs: {
      description: "禁止使用el-dialog",
      recommended: false,
    },
    messages: {
      noElDialog: "禁止使用el-dialog, 请用 useDialog 函数",
      test1: "test1",
    },
    schema: [], // 无参数
  },
  create(context) {
    return {
      VElement(node) {
        // 有些版本用 node.name，有些用 node.rawName
        const name = node.rawName || node.name;
        console.log(name);
        if (name === "el-dialog") {
          context.report({
            node,
            messageId: "noElDialog",
          });
        }
      },
    };
  },
};
