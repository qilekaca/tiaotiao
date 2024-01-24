import moment from "moment";

export function formatDate(createTime) {
  const time = Date.parse(createTime);
  // 当前时间戳
  let now = new Date().getTime();
  // 当前凌晨时间戳
  let beforeDawn = new Date().toLocaleDateString();
  // 当前时间距离当前凌晨时间戳
  let during = time - new Date(beforeDawn).getTime();
  // 昨天凌晨时间戳
  let before = new Date(beforeDawn).getTime() - 86400000;
  if (during > 0) {
    let newTime = Math.floor((now - time) / 1000);
    const m = 60; // 一分钟秒数
    const h = m * 60; // 一小时秒数
    const d = h * 24; // 一天秒数
    const day = Math.floor(newTime / d) | 0,
      hour = ((newTime % d) / h) | 0,
      minute = (((newTime % d) % h) / m) | 0,
      second = ((newTime % d) % h) % m | 0;
    return hour
      ? `${hour} 小时前`
      : minute
      ? `${minute} 分钟前`
      : `${second} 秒前`;
  } else if (time < before) {
    return moment(time).format("MM-DD HH:mm");
  } else {
    //昨天
    return "昨天";
  }
}

export function formatImageUrl(urls) {
  return urls.map((url) => `${process.env.URL}${url}`);
}
