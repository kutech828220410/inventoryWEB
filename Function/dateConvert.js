function isDatetime(variable) 
{
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
function StringToDateime(dateStr)
{
    const parts = dateStr.split(" "); // 分割日期和時間部分
    const dateParts = parts[0].split("-"); // 分割日期部分
   

    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // 月份從 0 開始計數，所以減去 1
    const day = parseInt(dateParts[2]);
    try
    {
        const timeParts = parts[1].split(":"); // 分割時間部分
        const hour = parseInt(timeParts[0]);
        const minute = parseInt(timeParts[1]);
        const second = parseInt(timeParts[2]);
        return new Date(year, month, day, hour, minute, second);
    }
    catch
    {
        const hour = 00;
        const minute = 00;
        const second = 00;
        return new Date(year, month, day, hour, minute, second);
    }
   
}
function getDateTimeStr(date)
{
    if(!isDatetime(date)) return date;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始计数，所以需要加1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0'); // 在 HOUR 前面補零成兩位數
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const currentDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return currentDateTime;
} 
function getDateStr(date)
{
    if(!isDatetime(date)) return date;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始计数，所以需要加1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0'); // 在 HOUR 前面補零成兩位數
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

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
    const currentDateTime = getDateStr(currentDate);
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