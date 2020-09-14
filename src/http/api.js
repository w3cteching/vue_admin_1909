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

/**
 * 获取权限列表
 * 请求路径：rights/:type
 * type类型值 list 或 tree 其中：
 * list 列表显示权限
 * tree 树状显示权限,`参数是url参数:type
 */

export function getRightsList(type='list') {
  return request({
    url: `rights/${type}`,
    method: "GET" 
  });
}



/**
 * 删除用户指定权限列表
 * 请求路径：roles/:roleId/rights/:rightId
 * 其中：
 * :roleId角色 ID不能为空`携带在url中`
 * :rightId权限 ID不能为空`携带在url中`
 */

export function deleteRightsList(roleId,rightId) {
  return request({
    url: `roles/${roleId}/rights/${rightId}`,
    method: "delete" 
  });
}


/**
 * 角色授权接口
 * 请求路径：roles/:roleId/rights
 * 其中：
 * :roleId角色 ID  携带在url中
 * `rids权限 ID 列表（字符串）以 `,` 分割的权限 ID 列表（获取所有被选中、叶子节点的key和半选中节点的key, 包括 1，2，3级节点）
 */

export function setRightsToRole(roleId,data) {
  return request({
    url: `roles/${roleId}/rights`,
    method: "POST",
    data
  });
}


/**
 * 获取商品列表接口
 * 请求路径：goods
 * 其中：
 * :roleId角色 ID  携带在url中
 * `rids权限 ID 列表（字符串）以 `,` 分割的权限 ID 列表（获取所有被选中、叶子节点的key和半选中节点的key, 包括 1，2，3级节点）
 */

export function getGoodsList(params) {
  return request({
    url: `goods`,
    method: "GET",
    params
  });
}


/**
 * 获取商品分类列表接口
 * 请求路径：categories
 * 其中：
 * type[1,2,3]值：1，2，3 分别表示显示一层二层三层分类列表
 */

export function getGoodsCate() {
  return request({
    url: `categories`,
    method: "GET",
    params: {type:3}
  });
}


/**
 * 获取商品动态和静态参数
 * 请求路径：categories/:id/attributes
 * 默认请求：many 动态参数 ,only:静态参数
 * 其中：
 * type[1,2,3]值：1，2，3 分别表示显示一层二层三层分类列表
 */

export function getGoodsParams(cateId,type='many') {
  return request({
    url: `categories/${cateId}/attributes`,
    method: "GET",
    params: {sel:type}
  });
}

/**
 * 添加商品
 * 请求路径：goods
 * 
 */

export function addGoods(data) {
  return request({
    url: `goods`,
    method: "POST",
    data
  });
}
