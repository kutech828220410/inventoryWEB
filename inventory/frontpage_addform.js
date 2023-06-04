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
    //編號刪除按鈕框
    const formnnum_delbtn_div = document.createElement("div");
    formnnum_delbtn_div.className = "formnnum_delbtn_div";
    formnnum_delbtn_div.id = `formnnum_delbtn_div${_index}`;
    formnnum_delbtn_div.setAttribute("_index",_index);
    all_div.appendChild(formnnum_delbtn_div);
    edit_formnnum_delbtn_div(formnnum_delbtn_div);
    //刪除鈕    
    var del_btn_div = Get_trashBox_SVG("30px", "100%", "70%","100%","red","");
    del_btn_div.setAttribute("IC_SN",item.IC_SN);
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
    const dateString = getDatePartsFromDate(item.CT_TIME);
    const calendar_div = document.createElement("div");
    calendar_div.className = "calendar_div";
    calendar_div.id = `calendar_div${_index}`;
    calendar_div.setAttribute("_index",_index);
    time_info_btn_div.appendChild(calendar_div);
    edit_calendar_div(calendar_div);

    //年及月
    const year_div = document.createElement("div");
    year_div.className = "year_div";
    year_div.id = `year_div${_index}`;
    year_div.setAttribute("_index",_index);
    year_div.setAttribute("value",`${dateString.year}年${dateString.month}月`);
    edit_year_div(year_div);
    calendar_div.appendChild(year_div);
    
    //星期幾及日期外框
    const day_week_div = document.createElement("div");
    day_week_div.className = "day_week_div";
    day_week_div.id = `day_week_divv${_index}`;
    calendar_div.appendChild(day_week_div);
    edit_day_week_div(day_week_div);

    //日期
    const day_div = document.createElement("div");
    day_div.className = "day_div";
    day_div.id = `day_div${_index}`;
    day_div.setAttribute("value",`${dateString.day}`);
    edit_day_div(day_div);
    day_week_div.appendChild(day_div);
    
    //星期幾
    const week_div = document.createElement("div");
    week_div.className = "week_div";
    week_div.id = `week_div${_index}`;
    week_div.setAttribute("value",`${dateString.dayOfWeek}`);
    edit_week_div(week_div);
    day_week_div.appendChild(week_div);
   

    // 盤點資訊
    const info_div = document.createElement("div");
    info_div.className = "info_div";
    info_div.id = `info_div${_index}`;
    edit_info_div(info_div);
    time_info_btn_div.appendChild(info_div);
    
    // 盤點資訊-單號
    const IC_SN_div = document.createElement("div");
    IC_SN_div.className = "IC_SN_div";
    IC_SN_div.id = `IC_SN_div${_index}`;
    IC_SN_div.setAttribute("IC_SN",item.IC_SN);
    edit_IC_SN_div(IC_SN_div);
    info_div.appendChild(IC_SN_div);
    
    // 盤點資訊-建表人
    const CT_div = document.createElement("div");
    CT_div.className = "CT_div";
    CT_div.id = `CT_div${_index}`;
    CT_div.setAttribute("_CT",item.CT);
    edit_CT_div(CT_div);
    info_div.appendChild(CT_div);
   
    // 盤點資訊-開始時間
    const START_TIME_div = document.createElement("div");
    START_TIME_div.className = "START_TIME_div";
    START_TIME_div.id = `START_TIME_div${_index}`;
    START_TIME_div.setAttribute("_START_TIME",item.START_TIME);
    edit_START_TIME_div(START_TIME_div);
    info_div.appendChild(START_TIME_div);
    
    // 盤點資訊-結束時間
    const END_TIME_div = document.createElement("div");
    END_TIME_div.className = "END_TIME_div";
    END_TIME_div.id = `END_TIME_div${_index}`;
    END_TIME_div.setAttribute("_END_TIME",item.END_TIME);
    edit_END_TIME_div(END_TIME_div);
    info_div.appendChild(END_TIME_div);
    
    // 盤點資訊-狀態
    const STATE_div = document.createElement("div");
    STATE_div.className = "STATE_div";
    STATE_div.id = `STATE_div${_index}`;
    STATE_div.setAttribute("_STATE",item.STATE);
    edit_STATE_div(STATE_div);
    info_div.appendChild(STATE_div);
    
    if(item.STATE == '等待盤點')
    {
        info_div.style.background ="rgb(255,255,255)";
        info_div.style.background ="linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(231,236,23,0.3) 50%, rgba(231,236,23,0.7) 100%)"
    }
    else
    {
        info_div.style.background ="rgb(255,255,255)";
        info_div.style.background ="linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(236,23,23,0.3) 50%, rgba(236,23,23,0.7) 100%)"
    }

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
    selectbtn.setAttribute("IC_SN",item.IC_SN);
    btn_div.appendChild(selectbtn);
    edit_select(selectbtn);
    const dlbtn = Get_download_SVG("100%", "60px", "70%","100%","steelblue","");
    dlbtn.className = "div_botton";
    dlbtn.id = `dlbtn${_index}`;
    dlbtn.setAttribute("IC_SN",item.IC_SN);
    btn_div.appendChild(dlbtn);
    edit_dlbtn(dlbtn);
    var lockbtn;
    if(item.STATE == '等待盤點')lockbtn = Get_unlock_SVG("100%", "60px", "70%","100%","steelblue","");
    else lockbtn = Get_lock_SVG("100%", "60px", "70%","100%","red","");
    lockbtn.className = "div_botton";
    lockbtn.id = `lockbtn${_index}`;
    lockbtn.setAttribute("IC_SN",item.IC_SN);
    lockbtn.setAttribute("STATE",item.STATE);
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
    div.style.color = "";
    div.style.width = "100%";
    div.style.height= "100%"; 
    div.style.marginLeft = "5px";
    div.style.paddingLeft = "5px";
    div.style.fontSize = "16px";
    div.style.fontWeight = "bold";
    div.style.justifyContent = "flex-start" ;
    div.style.alignItems = "center";
    div.style.flexDirection = "row";
    div.style.borderRadius = "5px";
    div.style.backgroundColor = "rgba(136,136,136,1)";
    div.style.background ="linear-gradient(90deg, rgba(136,136,136,1) 0%, rgba(255,255,255,0.6797093837535014) 34%, rgba(255,255,255,0.31556372549019607) 100%)";
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
    div.style.borderRadius = "5px" ;
    div.style.boxShadow = "1.5px 2px 2px 2px rgb(69, 68, 68, 0.65)" ;
}
function edit_year_div(div)
{
    var _index =parseInt(div.getAttribute("_index"));
    var value = div.getAttribute("value");
    div.innerText = `${value}`;
    div.style.display = "flex";
    div.style.width = "100%";
    div.style.height= "40%"; 
    div.style.fontSize = "18px";
    div.style.fontWeight = "bold";
    div.style.justifyContent = "center" ;
    div.style.alignItems = "center" ;
    div.style.background = "rgb(162,188,222)" ;
    div.style.background = "linear-gradient(180deg, rgba(162,188,222,1) 0%, rgba(162,188,222,0.6797093837535014) 65%, rgba(162,188,222,0.31556372549019607) 100%)" ;
    div.style.borderTopLeftRadius = "5px";
    div.style.borderTopRightRadius = "5px";
    div.style.fontWeight = "bolder";
    div.style.color = "#"
 ;
}
function edit_day_week_div(div)
{
    div.style.display = "flex";
    div.style.width = "100%";
    div.style.height= "60%"; 
    div.style.flexDirection = "row";
    // div.style.borderTopStyle = "dotted";
    // div.style.borderColor = "dotted";
    div.style.color = "gray";
}
function edit_day_div(div)
{
    var _index =parseInt(div.getAttribute("_index"));
    var value = div.getAttribute(`value`);
    div.innerText = `${value}`;
    div.style.display = "flex";
    div.style.width = "65%";
    div.style.height= "100%"; 
    div.style.fontSize = "50px";
    div.style.fontWeight = "bold";
    div.style.fontStyle = "italic"; // 添加斜体样式
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
    var value = div.getAttribute(`value`);
    div.innerText = `${value}`;
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
function edit_IC_SN_div(div)
{
    var _index = div.getAttribute("_index");
    var _IC_SN = div.getAttribute("IC_SN");
    div.style.display = "inline-flex";
    div.innerText = `單號 : ${_IC_SN}`;
    div.style.width = "100%";
    div.style.marginTop = "5px";
    div.style.marginLeft = "5px";
    div.style.fontSize = "16px";
    div.style.fontWeight = "bold" ;
    div.style.justifyContent = "flex-start" ;
}
function edit_CT_div(div)
{
    var _index = div.getAttribute("_index");
    var _CT = div.getAttribute("_CT");
    div.style.display = "inline-flex";
    div.innerText = `建表 : ${_CT}`;
    div.style.width = "100%";
    div.style.marginTop = "5px";
    div.style.marginLeft = "5px";
    div.style.fontSize = "16px" ;
    div.style.fontWeight = "bold" ;
    div.style.justifyContent = "flex-start" ;
}
function edit_START_TIME_div(div)
{
    var _index = div.getAttribute("_index");
    var _START_TIME = div.getAttribute("_START_TIME");
    div.style.display = "inline-flex";
    div.innerText = `開始時間 : ${_START_TIME}`;
    div.style.width = "100%";
    div.style.marginTop = "5px";
    div.style.marginLeft = "5px";
    div.style.fontSize = "16px" ;
    div.style.fontWeight = "bold" ;
    div.style.justifyContent = "flex-start" ;
}

function edit_END_TIME_div(div)
{
    var _index = div.getAttribute("_index");
    var _END_TIME = div.getAttribute("_END_TIME");
    div.style.display = "inline-flex";
    div.innerText = `結束時間 : ${_END_TIME}`;
    div.style.width = "100%";
    div.style.marginTop = "5px";
    div.style.marginLeft = "5px";
    div.style.fontSize = "16px" ;
    div.style.fontWeight = "bold" ;
    div.style.justifyContent = "flex-start" ;
}
function edit_STATE_div(div)
{
    var _index = div.getAttribute("_index");
    var _STATE = div.getAttribute("_STATE");
    div.style.display = "inline-flex";
    div.innerText = `狀態 : ${_STATE}`;
    div.style.width = "100%";
    div.style.marginTop = "5px";
    div.style.marginLeft = "5px";
    div.style.fontSize = "16px" ;
    div.style.fontWeight = "bold" ;
    div.style.justifyContent = "flex-start" ;
}
//操作按鈕DIV
function edit_del_btn_div(button)
{
    button.onclick = delete_btn_Click;
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
    button.onclick = select_btn_Click;

}
function edit_dlbtn(button)
{
    button.style.width = "100%";
    button.style.height = "33%";
    button.onclick = dlbtn_Click;
}
function edit_lockbtn(button)
{
    button.style.width = "100%";
    button.style.height = "33%";
    button.onclick = lockbtn_Click;

}

