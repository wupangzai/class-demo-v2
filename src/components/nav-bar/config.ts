import {
  Operation,
  Position,
  Document,
  Money,
  User,
  Search,
  Edit,
  Histogram,
} from "@element-plus/icons-vue";

const menu = [
  {
    index: "1",
    component: "el-sub-menu",
    icon: Operation,
    title: "教室表相关",
    path: "",
    subMenu: [
      [
        {
          index: "1-1",
          title: "教室表下载",
          path: "/",
        },
        {
          index: "1-2",
          title: "Todo...",
          path: "/todo",
        },
      ],
    ],
  },
  {
    index: "2",
    component: "el-menu-item",
    icon: Position,
    title: "上课提醒",
    subMenu: [],
    path: "/tomorrow-course-remind",
  },
  {
    index: "3",
    component: "el-menu-item",
    icon: Document,
    title: "课程反馈",
    subMenu: [],
    path: "/course-record",
  },
  {
    index: "4",
    component: "el-menu-item",
    icon: Histogram,
    title: "课表概览",
    subMenu: [],
    path: "/class-arrangement",
  },
  {
    index: "5",
    component: "el-menu-item",
    icon: Money,
    title: "绩效统计",
    subMenu: [],
    path: "/todo",
  },
  {
    index: "6",
    component: "el-menu-item",
    icon: User,
    title: "CRM",
    subMenu: [],
    path: "/todo",
  },
  {
    index: "7",
    component: "el-menu-item",
    icon: Search,
    title: "资料",
    subMenu: [],
    path: "/todo",
  },
  {
    index: "8",
    component: "el-menu-item",
    icon: Edit,
    title: "Todo List",
    subMenu: [],
    path: "/todo",
  },
];

export default menu;
