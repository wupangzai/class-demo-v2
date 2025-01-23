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
          <el-input v-model="ruleForm.password" />
        </el-form-item>
      </el-space>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { FormInstance, FormRules } from "element-plus";

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  account: "",
  password: "",
});

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

function submit() {
  if (ruleFormRef) {
    ruleFormRef.value?.validate((valid) => {
      if (valid) {
      }
    });
  }
}
</script>

<style lang="less">
.login {
}
</style>
