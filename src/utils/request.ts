import axios, { type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter } from "vue-router";
const router = useRouter();
 const token = localStorage.getItem("token");


// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8', "Authorization": "Bearer " + token }
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (!config.headers) {
      throw new Error(
        `Expected 'config' and 'config.headers' not to be undefined`
      );
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, msg } = response.data;

    if (code === 200) {
      return response.data;
    } else if (code === 403) {
      router.push({ path: "/login" })
    } else {
      // 响应数据为二进制流处理(Excel导出)
      if (response.data instanceof ArrayBuffer) {
        return response;
      }
      ElMessage({
        message: msg || '系统出错',
        type: 'error'
      });
      return Promise.reject(new Error(msg || 'Error'));
    }
  },
  (error: any) => {
    if (error.response.data) {
      const { code, msg } = error.response.data;

      // token 过期,重新登录
      if (code === 'A0230') {
        ElMessageBox.confirm('当前页面已失效，请重新登录', '提示', {
          confirmButtonText: 'OK',
          type: 'warning'
        }).then(() => {
          localStorage.clear();
          window.location.href = '/login';
        });
      } else {
       // localStorage.clear();
       // window.location.href = '/login';
      }
    }
    return Promise.reject(error.message);
  }
);

// 导出 axios 实例
export default service;
