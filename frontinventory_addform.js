
let data = {};

window.onload = load;
async function get_creat_data() 
{
  let response = await fetch(`${inventory_url}/creat`); // 替換成您的 API 網址
  data = await response.json();
  return data;
}

async function load()
{
    let rowNum = 1;  
    data = await get_creat_data();
    console.log(data);

    const _per_all_div = document.querySelectorAll(".all_div");
    for(var i = 0 ; i < data.Data.length ; i++)
    {
        const all_div = creat_all_div(i, data.Data[i]);
    }
  
}

async function addform() 
{

    data = await get_creat_data();
   
}


function creat_all_div(_index , item) 
{
    const main_div = document.querySelector('#main_div');
    main_div.style.width = "98%";
    const all_div = document.createElement("div");
    all_div.className = "all_div";
    all_div.id = `all_div${_index}`;
    all_div.style.display = "flex";
    all_div.style.justifyContent = "center";
    all_div.style.width = "100%";
    all_div.style.height= "200px";
    all_div.style.backgroundColor = "#ffffff";
    all_div.style.marginTop = "7px";
    all_div.style.paddingBottom = "10px";
    all_div.style.borderBottom = "2px solid gray";
    all_div.style.flexDirection = "column";
    main_div.appendChild(all_div);
    //編號刪除按鈕框
    const formnnum_delbtn_div = document.createElement("div");
    formnnum_delbtn_div.className = "formnnum_delbtn_div";
    formnnum_delbtn_div.id = `formnnum_delbtn_div${_index}`;
    formnnum_delbtn_div.setAttribute("_index",_index);
    all_div.appendChild(formnnum_delbtn_div);
    edit_formnnum_delbtn_div(formnnum_delbtn_div);
    //刪除鈕    
    var del_btn_div = Get_trashBox_SVG("30px", "100%", "70%","100%","red","");
    del_btn_div.className = "del_botton";
    del_btn_div.id = `$del_botton${_index}`;
    edit_del_btn_div(del_btn_div);
    formnnum_delbtn_div.appendChild(del_btn_div);
    //盤點編號
    const formnnum_div = document.createElement("div");
    formnnum_div.className = "formnnum_div";
    formnnum_div.id = `formnnum_div${_index}`;
    formnnum_div.setAttribute("_index",_index);
    formnnum_delbtn_div.appendChild(formnnum_div);
    edit_formnnum_div(formnnum_div);
    //時間資訊按鈕框架
    const time_info_btn_div = document.createElement("div");
    time_info_btn_div.className = "time_info_btn_div";
    time_info_btn_div.id = `time_info_btn_div${_index}`;
    all_div.appendChild(time_info_btn_div);
    edit_time_info_btn_div(time_info_btn_div);
    //年月日
    const calendar_div = document.createElement("div");
    calendar_div.className = "calendar_div";
    calendar_div.id = `calendar_div${_index}`;
    calendar_div.setAttribute("_index",_index);
    time_info_btn_div.appendChild(calendar_div);
    edit_calendar_div(calendar_div);
    const year_div = document.createElement("div");
    year_div.className = "year_div";
    year_div.id = `year_div${_index}`;
    year_div.setAttribute("_index",_index);
    calendar_div.appendChild(year_div);
    edit_year_div(year_div);
    const day_week_div = document.createElement("div");
    day_week_div.className = "day_week_div";
    day_week_div.id = `day_week_divv${_index}`;
    calendar_div.appendChild(day_week_div);
    edit_day_week_div(day_week_div);
    const day_div = document.createElement("div");
    day_div.className = "day_div";
    day_div.id = `day_div${_index}`;
    day_week_div.appendChild(day_div);
    edit_day_div(day_div);
    const week_div = document.createElement("div");
    week_div.className = "week_div";
    week_div.id = `week_div${_index}`;
    day_week_div.appendChild(week_div);
    edit_week_div(week_div);

    // 盤點資訊
    const info_div = document.createElement("div");
    info_div.className = "info_div";
    info_div.id = `info_div${_index}`;
    time_info_btn_div.appendChild(info_div);
    edit_info_div(info_div);
    // 盤點資訊
    const INV_SN_L_div = document.createElement("div");
    INV_SN_L_div.className = "INV_SN_L_div";
    INV_SN_L_div.id = `INV_SN_L_div${_index}`;
    INV_SN_L_div.setAttribute("_INV_SN_L",item.INV_SN_L);
    info_div.appendChild(INV_SN_L_div);
    edit_INV_SN_L_div(INV_SN_L_div);
    const CREAT_OP_div = document.createElement("div");
    CREAT_OP_div.className = "CREAT_OP_div";
    CREAT_OP_div.id = `CREAT_OP_div${_index}`;
    CREAT_OP_div.setAttribute("_CREAT_OP",item.CREAT_OP);
    info_div.appendChild(CREAT_OP_div);
    edit_CREAT_OP_div(CREAT_OP_div);
    

    //操作按鈕
    const btn_div = document.createElement("div");
    btn_div.className = "btn_div";
    btn_div.id = `btn_div${_index}`;
    btn_div.style.paddingTop = "5px";
    btn_div.style.paddingRight = "7px";
    btn_div.style.paddingBottom = "5px";
    btn_div.style.paddingLeft = "2px";
    time_info_btn_div.appendChild(btn_div);
    edit_btn_div(btn_div);
    const selectbtn = Get_right_direction_SVG("100%", "60px", "70%","100%","steelblue","");
    selectbtn.className = "div_botton";
    selectbtn.id = `selectbtn${_index}`;
    btn_div.appendChild(selectbtn);
    edit_select(selectbtn);
    const dlbtn = Get_download_SVG("100%", "60px", "70%","100%","steelblue","");
    dlbtn.className = "div_botton";
    dlbtn.id = `dlbtn${_index}`;
    btn_div.appendChild(dlbtn);
    edit_dlbtn(dlbtn);
    const lockbtn = Get_unlock_SVG("100%", "60px", "70%","100%","steelblue","");
    lockbtn.className = "div_botton";
    lockbtn.id = `lockbtn${_index}`;
    btn_div.appendChild(lockbtn);
    edit_lockbtn(lockbtn);


    return all_div;
}
function edit_time_info_btn_div(div)
{
    div.style.display = "flex";
    div.style.justifyContent = "flex-start";
    div.style.flexDirection = "row";
    div.style.width = "100%";
    div.style.height= "85%";
    div.style.marginLeft= "5px"
    div.style.marginTop= "2px"
}
function edit_formnnum_delbtn_div(div)
{
    var _index =parseInt(div.getAttribute("_index"));
    div.style.display = "flex";
    div.style.width = "100%";
    div.style.height= "15%"; 
    div.style.marginLeft = "5px";
    div.style.fontSize = "16px";
    div.style.fontWeight = "bold";
    div.style.alignItems = "center";
    div.style.direction = "row"
}
function edit_formnnum_div(div)
{
    var _index =parseInt(div.getAttribute("_index"));
    div.style.display = "flex";
    div.innerText = `編號 : ${_index + 1}`;
    div.style.width = "100%";
    div.style.height= "100%"; 
    div.style.marginLeft = "5px";
    div.style.fontSize = "16px";
    div.style.fontWeight = "bold";
    div.style.justifyContent = "flex-start" ;
    div.style.alignItems = "center";
    div.style.flexDirection = "row";
}

function edit_calendar_div(div)
{
    var _index =parseInt(div.getAttribute("_index"));
    div.style.display = "flex";
    div.style.width = "200px";
    div.style.height= "100%"; 
    div.style.marginLeft = "2px";
    div.style.marginTop = "3px";
    div.style.fontSize = "16px";
    div.style.fontWeight = "bold";
    div.style.justifyContent = "flex-start" ;
    div.style.flexDirection = "column";
    div.style.backgroundColor = "#fff" ;
    div.style.alignItems = "center" ;
    div.style.borderRadius = "10px" ;
    div.style.boxShadow = "1.5px 2px 2px 2px rgb(69, 68, 68, 0.65)" ;
}
function edit_year_div(div)
{
    var _index =parseInt(div.getAttribute("_index"));
    div.innerText = "2023 / 12"
    div.style.display = "flex";
    div.style.width = "100%";
    div.style.height= "40%"; 
    div.style.fontSize = "18px";
    div.style.fontWeight = "bold";
    div.style.justifyContent = "center" ;
    div.style.alignItems = "center" ;
    div.style.backgroundColor = "lightsteelblue" ;
    div.style.borderTopLeftRadius = "10px";
    div.style.borderTopRightRadius = "10px";
    div.style.fontWeight = "bolder";
    div.style.color = "#fff"
 ;
}
function edit_day_week_div(div)
{
    div.style.display = "flex";
    div.style.width = "100%";
    div.style.height= "60%"; 
    div.style.flexDirection = "row";
    div.style.borderTopStyle = "dotted";
    div.style.borderColor = "dotted";
    div.style.color = "gray";
}
function edit_day_div(div)
{
    var _index =parseInt(div.getAttribute("_index"));
    div.innerText = "25"
    div.style.display = "flex";
    div.style.width = "65%";
    div.style.height= "100%"; 
    div.style.fontSize = "40px";
    div.style.fontWeight = "bold";
    div.style.justifyContent = "center" ;
    div.style.alignItems = "center" ;
    div.style.backgroundColor = "#fff" ;
    div.style.borderBottomLeftRadius = "10px";
    div.style.fontWeight = "bolder";
    div.style.color = "#000";
}
function edit_week_div(div)
{
    var _index =parseInt(div.getAttribute("_index"));
    div.innerText = "星期一"
    div.style.display = "flex";
    div.style.width = "35%";
    div.style.height= "100%"; 
    div.style.fontSize = "16px";
    div.style.fontWeight = "bold";
    div.style.justifyContent = "center" ;
    div.style.alignItems = "center" ;
    div.style.flexDirection = "column";
    div.style.backgroundColor = "#fff" ;
    div.style.borderBottomRightRadius = "10px";
    div.style.fontWeight = "bolder";
    div.style.color = "gray";
    div.style.writingMode = "vertical-rl";
 ;
}
//資訊欄DIV
function edit_info_div(div)
{
    div.style.display = "flex";
    div.style.width = "100%";
    div.style.height= "100%";
    div.style.marginLeft = "10px"
    div.style.marginRight = "0px"
    div.style.border= "2px solid";
    div.style.flexDirection ="column";
    div.style.borderRadius = "5px" ;
}
function edit_INV_SN_L_div(div)
{
    var _index = div.getAttribute("_index");
    var _INV_SN_L = div.getAttribute("_INV_SN_L");
    div.style.display = "inline-flex";
    div.innerText = `單號:${_INV_SN_L}`;
    div.style.width = "100%";
    div.style.marginTop = "5px";
    div.style.marginLeft = "5px";
    div.style.fontSize = "16px";
    div.style.fontWeight = "bold" ;
    div.style.justifyContent = "flex-start" ;
}
function edit_CREAT_OP_div(div)
{
    var _index = div.getAttribute("_index");
    var _CREAT_OP = div.getAttribute("_CREAT_OP");
    div.style.display = "inline-flex";
    div.innerText = `人員:${_CREAT_OP}`;
    div.style.width = "100%";
    div.style.marginTop = "5px";
    div.style.marginLeft = "5px";
    div.style.fontSize = "16px" ;
    div.style.fontWeight = "bold" ;
    div.style.justifyContent = "flex-start" ;
}
//操作按鈕DIV
function edit_del_btn_div(div)
{
    div.addEventListener('click', function()
    {

    });
}
//操作按鈕DIV
function edit_btn_div(div)
{
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.flexDirection ="column";
    div.style.width = "85px";
    div.style.height= "170px";
}
function edit_select(button)
{
    button.style.width = "100%";
    button.style.height = "33%";
    button.addEventListener('click', function()
    {

    });
}
function edit_dlbtn(button)
{
    button.style.width = "100%";
    button.style.height = "33%";
    button.addEventListener('click', function()
    {

    });
}
function edit_lockbtn(button)
{
    button.style.width = "100%";
    button.style.height = "33%";
    button.addEventListener('click', function()
    {

    });
}



//年月日轉中文
// JavaScript source code
// var date = new Date();
// var month = date.getMonth();
// var year = date.getFullYear();
// var day = date.getDate();

// var dayName = date.toLocaleString(navigator.language, { weekday: 'long' });
// var monthNane = date.toLocaleString(navigator.language, { month: 'long' });

// var C_dayName;
// var C_monthName;

// if (dayName == "Monday") {
//     C_dayName = "星期一";
// } else if (dayName == "Tuesday") {
//     C_dayName = "星期二";
// } else if (dayName == "Wednesday") {
//     C_dayName = "星期三";
// } else if (dayName == "Thursday") {
//     C_dayName = "星期四";
// } else if (dayName == "Friday") {
//     C_dayName = "星期五";
// } else if (dayName == "Saturday") {
//     C_dayName = "星期六";
// } else {
//     C_dayName = "星期日";
// }

// if (monthName == "January") {
//     C_monthName = "一月";
// } else if (monthName == "February") {
//     C_monthName = "二月";
// } else if (monthName == "March") {
//     C_monthName = "三月";
// } else if (monthName == "April") {
//     C_monthName = "四月";
// } else if (monthName == "May") {
//     C_monthName = "五月";
// } else if (monthName == "June") {
//     C_monthName = "六月";
// } else if (monthName == "July") {
//     C_monthName = "七月";
// } else if (monthName == "August") {
//     C_monthName = "八月";
// } else if (monthName == "September") {
//     C_monthName = "九月";
// } else if (monthName == "October") {
//     C_monthName = "十月";
// } else if (monthName == "November") {
//     C_monthName = "十一月";
// } else {
//     C_monthName = "十二月";

// }

// document.getElementById("day").innerHTML = day;
// document.getElementById("year").innerHTML = year;
// document.getElementById("monthName").innerHTML = C_monthName;
// document.getElementById("dayName").innerHTML = C_dayName;
