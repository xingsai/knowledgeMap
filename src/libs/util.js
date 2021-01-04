import Message from "element-ui/lib/message";

let util = {};
util.title = title => {
  title = title || "95598";
  window.document.title = title;
};
util.sCopy = function(obj) {
  var newObj = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    newObj[key] = obj[key];
  }
  return newObj;
};
util.dCopy = function(obj) {
  if (!obj || typeof obj != "object") {
    return obj;
  }
  var newObj = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (typeof obj[key] != "object") {
      newObj[key] = obj[key];
    } else {
      newObj[key] = this.dCopy(obj[key]);
    }
  }
  return newObj;
};
util.objFilter = function(obj, arr, ifdel) {
  var n
  if (ifdel) {
    n = this.dCopy(obj);
    for (const key in n) {
      arr.indexOf(key) > -1 && (delete n[key]);
    }
  } else {
    n = {};
    for (const key in obj) {
      if (arr.indexOf(key) > -1) {
        n[key] = this.dCopy(obj[key]);
      }
    }
  }
  
  return n;
};
util.checkFileType = function(file, accept) {
  var a = file.name.split(".");
  var ext = "." + a[a.length - 1];
  var b = accept.split(",");
  if (b.indexOf(ext) == -1) {
    Message.error(`只允许以 ${accept} 结尾的文件`);
  }

  return b.indexOf(ext) > -1;
};
util.wxc_countFileSize = function(size) {
  var fsize = parseFloat(size, 2);
  var fileSizeString;
  if (fsize < 1024) {
    fileSizeString = fsize.toFixed(2) + "B";
  } else if (fsize < 1048576) {
    fileSizeString = (fsize / 1024).toFixed(2) + "KB";
  } else if (fsize < 1073741824) {
    fileSizeString = (fsize / 1024 / 1024).toFixed(2) + "MB";
  } else if (fsize < 1024 * 1024 * 1024) {
    fileSizeString = (fsize / 1024 / 1024 / 1024).toFixed(2) + "GB";
  } else {
    fileSizeString = "0B";
  }
  return fileSizeString;
};

//计算时间离当前时间的秒数
util.computedSecond =(data,nowData)=>{
  console.log(data.Format('yyyy-MM-dd hh:mm'))
  let now = nowData.getTime();
  let old = data.getTime();
  //总秒数
  let Second =Math.abs(( now - old ) / 1000).toFixed(0)
  console.log(Second)
  //小时数
  let hour = (Second /3600).toFixed(0)
  //分钟数
  let leave = Second % 3600;
  let minute = (leave / 60).toFixed(0);
  //秒数
  let secondFin = leave % 60
  return `${hour}:${minute}:${secondFin}`
 // return `${(Array(2).join('0')+(hour + 1)).slice(-2)}:${(Array(2).join('0')+(minute + 1)).slice(-2)}:${(Array(2).join('0')+(secondFin + 1)).slice(-2)}`
}
/**
 *
 * @param data
 */
util.returnData = function (data) {
  if(typeof data == 'string'){
      try {
       let d =  JSON.parse(data);
      return d;
      } catch(e) {
        return data;
     }
    }
    else if(typeof data =='array' || typeof data == 'object'){
      return JSON.parse(JSON.stringify(data))
    }
    return data
}

// date relate
export const prevDate = function(date, amount = 1) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - amount);
};
export const getFirstDayOfMonth = function(date) {
  const temp = new Date(date.getTime());
  temp.setDate(1);
  return temp.getDay();
};
export const getDayCountOfMonth = function(year, month) {
  if (month === 3 || month === 5 || month === 8 || month === 10) {
    return 30;
  }

  if (month === 1) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      return 29;
    } else {
      return 28;
    }
  }

  return 31;
};
export const getStartDateOfMonth = function(year, month) {
  const result = new Date(year, month, 1);
  const day = result.getDay();

  if (day === 0) {
    return prevDate(result, 7);
  } else {
    return prevDate(result, day);
  }
};
export const nextDate = function(date, amount = 1) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
};
export default util;


/**
 * 日期格式化
 * @param fmt
 * @returns {*}
 * @constructor
 */
Date.prototype.Format = function(fmt){
  let o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}
