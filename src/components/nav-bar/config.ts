import { Operation } from "@element-plus/icons-vue";
const menu = [
  {
    index: "1",
    component: "el-sub-menu",
    icon: Operation,
    subMenu: [
      [
        {
          index: "1-1",
          title: "教室表下载",
        },
        {
          index: "1-2",
          title: "Todo...",
        },
      ],
    ],
  },
];

export default menu;
