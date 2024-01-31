import request from "@/utils/request";

import type { LoginForm} from "./types";
export function login(data: LoginForm) {
    return request({
      url: "/admin/login",
      method: "post",
      data: data,
    });
  }


