<template>
  <div class="login">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-position="right"
      label-width="auto"
      style="max-width: 600px"
      status-icon
    >
      <el-space fill>
        <el-alert type="info" show-icon :closable="false">
          <p>"请输入在CRM系统中的账号密码":</p>
        </el-alert>
        <el-form-item label="Account" prop="account">
          <el-input v-model="ruleForm.account" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="ruleForm.password" type="password" />
        </el-form-item>
        <el-form-item class="button-control">
          <el-button @click="handleClose('cancel')">Cancel</el-button>
          <el-button @click="submit" type="primary">Login</el-button>
        </el-form-item>
      </el-space>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { FormInstance, FormRules, ElNotification } from "element-plus";
import { CloseType } from "@/components/common/dialog";
import { API } from "@/api";
import { useLocalStorage } from "@/hooks";
import { http } from "@/packages/axios/common";

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  account: "",
  password: "",
});

const emits = defineEmits<{
  (e: "update:visible", value: boolean, type: CloseType): void;
}>();

function isEmpty(value: string) {
  return !value;
}

function checkAccount(rule: any, value: any, callback: any) {
  if (isEmpty(value)) {
    callback(new Error("Please input the account"));
    return;
  }
  callback();
}

function checkPassword(rule: any, value: any, callback: any) {
  if (isEmpty(value)) {
    callback(new Error("Please input the password"));
    return;
  }
  callback();
}

const rules = reactive<FormRules<typeof ruleForm>>({
  account: [{ trigger: "blur", validator: checkAccount }],

  password: [{ trigger: "blur", validator: checkPassword }],
});

function handleClose(type: CloseType) {
  const value = type === "confirm";
  emits("update:visible", value, type);
}

function submit() {
  if (ruleFormRef.value) {
    ruleFormRef.value?.validate(async (valid) => {
      if (valid) {
        const res = await API.LoginToCrm({
          username: ruleForm.account,
          password: ruleForm.password,
        });
        if (res.access_token) {
          useLocalStorage("token", res.access_token);
          http.setOptions({
            headers: {
              Authorization: `Bearer ${res.access_token}`,
            },
          });
          handleClose("confirm");
          ElNotification({
            title: "Login Successfully",
            message: "登录成功",
            type: "success",
          });
        }
      }
    });
  }
}
</script>

<style lang="less">
.login {
  .button-control > .el-form-item__content {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
