import moment from "moment";
//处理时间戳过滤器
export function dateTime(v) {
  return moment(v * 1000).format("YYYY-MM-DD");
}

export function levelRank(num) {
  let result = "";
  switch (num) {
    case "0":
      result = "一级";
      break;
    case "1":
      result = "二级";
      break;
    case "2":
      result = "三级";
      break;
    default:
      result = "没有等级";
  }

  return result;
}
