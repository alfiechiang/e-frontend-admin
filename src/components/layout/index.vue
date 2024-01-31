<template>
  <div class="container">
    <el-container>
      <el-header class="header-area" height="8vh">
        <div class="right-area">
          <el-dropdown>
            <div class="el-dropdown">
              <img
                src="https://oss.youlai.tech/youlai-boot/2023/05/16/811270ef31f548af9cffc026dfc3777b.gif?imageView2/1/w/80/h/80"
                alt="avatar">
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <el-button @click="logout" class="invisible-button" v-loading.fullscreen.lock="fullscreenLoading">登出</el-button>
                </el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item>
                <el-dropdown-item disabled>Action 4</el-dropdown-item>
                <el-dropdown-item divided>Action 5</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>

      </el-header>
      <el-container>
        <el-aside width="200px" style="background:#233344;height:92vh">
          <el-menu default-active="2" background-color="#233344" text-color="#fff" @open="handleOpen" router 
            @close="handleClose">
            <el-sub-menu index="1">
              <template #title>
                <el-icon>
                  <location />
                </el-icon>
                <span>商品中心</span>
              </template>
              <el-menu-item index="product">
                <el-icon>
                  <Document />
                </el-icon>
                <template #title>商品列表</template>
              </el-menu-item>
              <el-menu-item index="productCategory">
                <el-icon>
                  <Document />
                </el-icon>
                <template #title>商品種類</template>
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main style="background:#F0F1F3;">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import {execRouter} from '@/utils/router';
import {openFullScreen1,fullscreenLoading} from '@/utils/loading';

const logout = async() => {
  localStorage.removeItem('token');
  await openFullScreen1(); //
  execRouter('/login');
}

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background: #F2F3F5;
  .el-menu {
    border-right: 0;
  }
}

.header-area {
  background: #2F4256;
  padding: 5px;

  .right-area {
    float: right;
    width: 70px;
    height: 50px;

    .el-dropdown {
      display: flex;
      align-items: center;
    }

    img {
      max-height: 50px;
      border-radius: 5px;
    }
  }

}

.invisible-button {
    border: none; // 无边框

}
</style>