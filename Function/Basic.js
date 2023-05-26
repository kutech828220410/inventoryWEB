function isDatetime(variable) {
  return variable instanceof Date;
}
function getDatePartsFromDate(dateString) 
{
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月份从0开始计数，所以需要加1
    const day = date.getDate();
    const daysOfWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    return {
      year: year,
      month: month,
      day: day,
      dayOfWeek : dayOfWeek
    };
  }
  function getDateTimeStr(date)
  {
    if(!isDatetime(date)) return date;
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月份从0开始计数，所以需要加1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
  
    const currentDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return currentDateTime;
  } 
  function getDateStr(date)
  {
    if(!isDatetime(date)) return date;
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月份从0开始计数，所以需要加1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
  
    const currentDateTime = `${year}-${month}-${day}`;
    return currentDateTime;
  } 
  function getCurrentDateTime() 
  {  
    const currentDate = new Date();
    const currentDateTime = getDateTimeStr(currentDate);
    return currentDateTime;
  }
  function getCurrentDate() 
  {
    const currentDate = new Date();
    const currentDateTime = getDateTimeStr(currentDate);
    return currentDateTime;
  }

  function DateTimeAddMonth(date, value)
  {
    if(!isDatetime(date))
    {
      date = new Date(Date.parse(date));
    }
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
  
    let newYear = year;
    let newMonth = month + value;
  
    while (newMonth > 11) {
      newMonth -= 12;
      newYear++;
    }
  
    while (newMonth < 0) {
      newMonth += 12;
      newYear--;
    }
  
    const resultDate = new Date(newYear, newMonth, day, hour, minute, second);
    return resultDate; 
  }
  function DateTimeAddDays(date, value)
  {
    if(!isDatetime(date))
    {
      date = new Date(Date.parse(date));
    }
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    let newYear = year;
    let newMonth = month;
    let newDay = day + value;

    while (newDay > getLastDayOfMonth(newYear, newMonth)) {
      newDay -= getLastDayOfMonth(newYear, newMonth);
      newMonth++;
      if (newMonth > 11) {
        newMonth = 0;
        newYear++;
      }
    }

    while (newDay <= 0) {
      newMonth--;
      if (newMonth < 0) {
        newMonth = 11;
        newYear--;
      }
      newDay += getLastDayOfMonth(newYear, newMonth);
    }
    const resultDate = new Date(newYear, newMonth, newDay, hour, minute, second);
    return resultDate; 
  }
  function getLastDayOfMonth(year, month)
  {
    return new Date(year, month + 1, 0).getDate();
  }

  function getConfigFromURL(url , config_name) 
  {
    const urlParams = new URLSearchParams(new URL(url).search);
    const config = urlParams.get(`${config_name}`);
    return config;
  }

  function getAbsolutePosition(element) 
  {
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top + window.pageYOffset,
      left: rect.left + window.pageXOffset,
      bottom: rect.bottom + window.pageYOffset,
      right: rect.right + window.pageXOffset,
      width : rect.width,
      height : rect.height
    };
  }
  function waitForElementToDisplay(element, callback)
  {
    const isElementVisible = () => {
      const style = window.getComputedStyle(element);
      return style.display !== 'none' && style.visibility !== 'hidden';
    };
  
    const checkVisibility = () => {
      if (isElementVisible()) {
        callback(); // 元素完全显示后执行回调函数
      } else {
        requestAnimationFrame(checkVisibility);
      }
    };
  
    checkVisibility();
  }




  