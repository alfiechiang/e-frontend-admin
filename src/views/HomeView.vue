<template>
  <div class="container">
    <el-card class="box-card">
      <div class="title">
        <h2>系統後台</h2>
      </div>
      <el-form :model="form">
        <el-form-item prop="username">
          <el-input v-model="form.name" :prefix-icon="UserFilled"/>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" type="password" :prefix-icon="Lock"/>
        </el-form-item>
        <el-form-item>
          <el-button style="margin-top: 20px;" type="primary" 
          @click="onSubmit" v-loading.fullscreen.lock="fullscreenLoading">登入</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue'
import {  login} from "@/api/login";
import { Lock, UserFilled } from '@element-plus/icons-vue'
import type { LoginForm } from '@/api/login/types';
import {execRouter} from '@/utils/router';
import {openFullScreen1,fullscreenLoading} from '@/utils/loading';

// do not use same name with ref
const form = ref<LoginForm>({
  name: '',
  password:''
});

const onSubmit = async() => {
  const res = await login(form.value);
  const access_token = res.data.access_token;
  localStorage.clear();
  localStorage.setItem('token', access_token);
  await openFullScreen1(); // This will now wait until openFullScreen1 is done
  execRouter('/');
}

</script>
<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background-color: #26303e;
  display: flex;
  align-items: center;
  justify-content: center;

  .box-card {
    text-align: center;
    width: 30vw;
    height: 50vh;
    color: aliceblue;
    background-color: #2D3A4B;
    border-color: #2D3A4B;
    border-radius: 10px;

    .title {
      width: 100%;
      height: 90px;
    }

    .el-button {
      width: 100%; // 使按鈕填滿整個 el-form-item
    }

  }

}



//2D3A4B
</style>
