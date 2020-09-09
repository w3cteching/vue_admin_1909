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
  console.log("params::", params);
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
    url: "users",
    method: "POST",
    data
  });
}

/**
 * 编辑用户信息
 * id：用户id当作接口路径参数 格式：url:'users/:id'
 * 其中传参的data是一个对象，包括下面的2个属性：
 * email：邮箱
 * mobile：手机号
 */

export function editUserInfo(userid, data) {
  return request({
    url: `users/${userid}`,
    method: "PUT", //POST,PUT(更新全部),DELETE(删除),PATCH(部分更新)
    data
  });
}

/**
 * 删除用户
 */

export function deleteUser(userid) {
  return request({
    url: `users/${userid}`,
    method: "DELETE"
  });
}

/**
 * 更新用户状态
 */

export function updateUserStatus(id, status) {
  return request({
    url: `users/${id}/state/${status}`,
    method: "PUT"
  });
}

/**
 * 用户角色列表
 */

export function getUserRoleList() {
  return request({
    url: `roles`,
    method: "GET"
  });
}

/**
 * 修改角色
 * 请求路径：roles/:id
 * id：角色ID不能为空携带在url中
 * roleName：角色名称不能为空
 * roleDesc：角色描述可以为空
 */

// export function updateUserRole(roleid, data) {
//   return request({
//     url: `roles/${roleid}`,
//     method: "PUT", //PUT和POST一样的提交参数
//     data
//   });
// }

export function updateUserRole(userid, data) {
  return request({
    url: `users/${userid}/role`,
    method: "PUT", //PUT和POST一样的提交参数
    data
  });
}

/**
 * 通过角色id查询角色
 * 请求路径：roles/:id
 * id：角色ID不能为空携带在url中
 */

export function getUserRoleInfo(roleid) {
  return request({
    url: `roles/${roleid}`,
    method: "GET" //PUT和POST一样的提交参数
  });
}
