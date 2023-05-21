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
  function getCurrentDateTime() 
  {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // 月份从0开始计数，所以需要加1
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
  
    const currentDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return currentDateTime;
  }
  function getCurrentDate() 
  {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // 月份从0开始计数，所以需要加1
    const day = currentDate.getDate();
  
  
    const currentDateTime = `${year}-${month}-${day}`;
    return currentDateTime;
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