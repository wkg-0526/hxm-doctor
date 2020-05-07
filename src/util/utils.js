let Util = {
  /*
    dateObj: date对象
    format:你想要格式化的格式 如："'yyyy-MM-dd h:m:s"
    */
  format(dateObj, format) {
    var date = {
      "M+": dateObj.getMonth() + 1,
      "d+": dateObj.getDate(),
      "h+": dateObj.getHours(),
      "m+": dateObj.getMinutes(),
      "s+": dateObj.getSeconds(),
      "q+": Math.floor((dateObj.getMonth() + 3) / 3),
      "S+": dateObj.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
      format = format.replace(RegExp.$1, (dateObj.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length)
        );
      }
    }
    return format;
  },
  // 深拷贝
  deepCopy(p, c) {
    var c = c || {};
    for (var i in p) {
      if (typeof p[i] === "object" && p[i] !== null) {
        c[i] = p[i].constructor === Array ? [] : {};
        this.deepCopy(p[i], c[i]);
      } else {
        c[i] = p[i];
      }
    }
    return c;
  }
};
export default Util;
