<template>
  <div class="todo-list">
    <el-card class="box-card">
      <template #header>
        <el-input
          style="width: 60%"
          v-model="inputValue"
          placeholder="输入内容，点击右侧按钮或Enter保存"
          @change="addTask"
        ></el-input>
        <el-button
          style="padding: 3px 0; margin-left: 10px"
          type="text"
          @click="addTask"
          >Add-Task</el-button
        >
        <el-button
          style="margin-top: 1px; float: right; color: red"
          type="text"
          @click="deleteAllTask"
          >删除全部</el-button
        >
      </template>
      <div v-for="(task, index) in renderValue" :key="index" class="text item">
        <div class="line">
          <el-checkbox v-model="task.completed"></el-checkbox>
          <div
            class="text"
            v-if="!task.editing"
            :class="task.completed ? 'task-completed' : ''"
          >
            {{ task.value }}
          </div>
          <el-input
            class="text"
            v-model="task.value"
            v-else
            placeholder="请输入内容"
            @change="onblur(index)"
          ></el-input>
          <div class="icon">
            <div
              style="width: 120px; font-size: 12px; color: #ccc; padding: 0 5px"
            >
              {{ task.createTime }}
            </div>
            <el-icon
              class="el-icon-edit"
              style="color: red; cursor: pointer"
              @click="editTask(index)"
              ><EditPen
            /></el-icon>

            <el-icon
              class="el-icon-delete"
              style="color: red; cursor: pointer"
              @click="deleteTask(index)"
              ><Delete
            /></el-icon>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { useLocalStorage } from "@/hooks";
import dayjs from "dayjs";
import { ElNotification } from "element-plus";
import { onMounted, ref, watch } from "vue";
import { EditPen, Delete, Edit } from "@element-plus/icons-vue";

const inputValue = ref("");
const renderValue = useLocalStorage("todoList").value
  ? useLocalStorage("todoList")
  : useLocalStorage("todoList", []);

function addTask() {
  if (inputValue.value) {
    renderValue.value.unshift({
      value: inputValue.value,
      createTime: dayjs().format("YYYY-MM-DD HH:MM"),
      editing: false,
      completed: false,
    });
    inputValue.value = "";
  } else {
    ElNotification({
      title: "Error",
      message: "请输入内容",
      type: "error",
    });
  }
}

function editTask(index: number) {
  renderValue.value.splice(index, 1, {
    ...renderValue.value[index],
    editing: !renderValue.value[index].editing,
  });
}

function onblur(index: number) {
  renderValue.value.splice(index, 1, {
    ...renderValue.value[index],
    editing: false,
    value: renderValue.value[index].value,
  });
}

function deleteTask(index: number) {
  renderValue.value.splice(index, 1);
  ElNotification({
    title: "Success",
    message: "删除成功",
    type: "success",
  });
}

function deleteAllTask() {
  renderValue.value = [];
  ElNotification({
    title: "Success",
    message: "删除成功",
    type: "success",
  });
}
</script>

<style lang="less">
.todo-list {
  .el-card__body {
    max-height: 100%;
    padding-top: 0px;
    overflow-y: auto;
    padding-bottom: 80px;
  }
}
</style>

<style lang="less" scoped>
.todo-list {
  width: 100%;
  // height: 95%;
  max-height: 95%;
  display: flex;
  //   align-items: center;
  justify-content: center;
  overflow: auto;
}
.box-card {
  margin-top: 10px;
  width: 60%;

  .line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 7px 0px;

    border-bottom: 1px solid #ccc;

    .text {
      white-space: normal;
      overflow-wrap: break-word;
      width: 80%;
      margin-left: 8px;
    }
    .task-completed {
      text-decoration: line-through;
      color: #ccc;
    }
  }

  .icon {
    display: flex;
    align-items: center;
  }
}
</style>
