import request from "./request";

/**
 * 登录接口
 */

export function login(data) {
  // console.log('data::',data)
  return request({
    url: "login",
    method: "POST",
    data
  });
}

/**
 * 拉取用户列表
 */

export function userList(params) {
   console.log('params::',params)
  return request({
    url: "users",
    method: "GET",
    params
  });
}

/**
 * 添加用户
 * 其中传参的data是一个对象，包括下面的4个属性：
 * username：用户名称
 * assword：用户密码
 * email：邮箱
 * mobile：手机号
 */

export function addUser(data) {
  return request({
    url: 'users',
    method: "POST",
    data
   })
 }