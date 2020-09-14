//封装一个提取树形结构的数据id的方法
export function getTreeIds(tree) {
  //存放id的数组
  let resultArr = [];
  //存放当前要处理的权限数组
  let tempArr = [];

  tempArr = tempArr.concat(JSON.parse(JSON.stringify(tree)));
  console.log("tempArr:", tempArr);

  while (tempArr.length) {
    let node = tempArr.shift();
    if (node.children) {
      tempArr = tempArr.concat(node.children);
      delete node["children"];
    } else {
      resultArr.push(node.id);
    }
  }

    return resultArr;
}
