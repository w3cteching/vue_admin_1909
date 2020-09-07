import request from "./request";

/**
 * 登录接口
 *
 */

export function login(data) {
  // console.log('data::',data)
  return request({
    url: "login",
    method: "POST",
    data
  });
}
