//#region [rgba(0, 0, 255, 0.05)] public Function
function creat_row_div(_index , item) 
{
    const all_div = document.createElement('div');
    My_Div.Init(all_div,`all_div${_index}`,'all_div', '99%','200px','');
    My_Div.Set_Block(all_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.CENTER);
    all_div.style.paddingBottom = "10px";
    all_div.style.borderBottom = "2px solid gray";
    all_div.style.marginTop = "5px";

    const formnnum_delbtn_div = document.createElement('div');
    My_Div.Init(formnnum_delbtn_div,`formnnum_delbtn_div${_index}`,'formnnum_delbtn_div', '100%','15%','');
    My_Div.Set_Block(formnnum_delbtn_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
    formnnum_delbtn_div.style.marginLeft = "5px";
    all_div.appendChild(formnnum_delbtn_div);

    const del_btn_div = Get_trashBox_SVG("30px", "100%", "100%","100%","red","");
    My_Div.Init(del_btn_div,`del_botton${_index}`,'del_botton', '40px','100%','');
    My_Div.Set_Block(del_btn_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
    del_btn_div.setAttribute("IC_SN",item.IC_SN);
    del_btn_div.style.border = "1px solid gray";
    del_btn_div.style.borderRadius = "3px";
    del_btn_div.onclick = delete_btn_Click;
    del_btn_div.disabled = !GetPermissions("盤點報表刪除");
    formnnum_delbtn_div.appendChild(del_btn_div);

    //盤點編號
    const formnnum_div = document.createElement('div');
    My_Div.Init(formnnum_div,`formnnum_div${_index}`,'formnnum_div', '100%','100%','');
    My_Div.Set_Text(formnnum_div ,`編號 : ${_index + 1}` , TextAlignEnum.LEFT , "16px", true ,"微軟正黑體","black");
    formnnum_div.setAttribute("_index",_index);
    formnnum_div.style.background ="linear-gradient(90deg, rgba(136,136,136,1) 0%, rgba(255,255,255,0.6797093837535014) 34%, rgba(255,255,255,0.31556372549019607) 100%)";
    formnnum_div.style.borderRadius = "5px";
    formnnum_div.style.marginLeft = "5px";
    formnnum_div.style.paddingLeft = "5px";
    formnnum_delbtn_div.appendChild(formnnum_div);



    //時間資訊按鈕框架
    const time_info_btn_div = document.createElement('div');
    My_Div.Init(time_info_btn_div,`time_info_btn_div${_index}`,'time_info_btn_div', '100%','85%','');
    My_Div.Set_Block(time_info_btn_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
    // time_info_btn_div.style.marginLeft= "5px"
    time_info_btn_div.style.marginTop= "8px"
    all_div.appendChild(time_info_btn_div);

    //日期
    const dateString = getDatePartsFromDate(item.CT_TIME);
    const calendar_div = get_Time_info(_index , dateString);
    // time_info_btn_div.appendChild(calendar_div);

    const info_btn_div = document.createElement('div');
    My_Div.Init(info_btn_div,`info_btn_div${_index}`,'info_btn_div', '100%','100%','');
    My_Div.Set_Block(info_btn_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
    info_btn_div.style.marginLeft = "10px"
    info_btn_div.style.marginRight = "0px"
    info_btn_div.style.border= "2px solid";
    info_btn_div.style.borderRadius = "5px" ;
    info_btn_div.setAttribute("IC_SN",item.IC_SN);
    time_info_btn_div.appendChild(info_btn_div);

    // 盤點資訊
    const info_div = document.createElement('div');
    My_Div.Init(info_div,`info_div${_index}`,'info_div', '85%','100%','');
    My_Div.Set_Block(info_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.LEFT);
    info_btn_div.appendChild(info_div);


    const in_text_div = document.createElement('div');
    My_Div.Init(in_text_div,`in_text_div${_index}`,'in_text_div', '15%','100%','');
    My_Div.Set_Block(in_text_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.CENTER);
    // 將文字垂直排列
    in_text_div.style.writingMode = "vertical-rl"; // 垂直書寫方式
    in_text_div.style.textOrientation = "upright"; // 文字方向垂直
    in_text_div.setAttribute("IC_SN",item.IC_SN);
    info_btn_div.appendChild(in_text_div);

    if(item.STATE == '等待盤點')
    {
        info_div.style.background ="rgb(255,255,255)";
        info_div.style.background ="linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(231,236,23,0.3) 50%, rgba(231,236,23,0.7) 100%)"
        in_text_div.style.background ="rgba(231,236,23,0.7)"
        My_Div.Set_Text(in_text_div ,`點擊進入操作` , TextAlignEnum.CENTER , "24px", true ,"","gray");
    }
    else if(item.STATE == '盤點中')
    {
        info_div.style.background ="rgb(255,255,255)";
        info_div.style.background ="linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(236,23,23,0.3) 50%, rgba(236,23,23,0.7) 100%)"
        in_text_div.style.background ="rgba(236,23,23,0.7)"
        My_Div.Set_Text(in_text_div ,`點擊進入操作` , TextAlignEnum.CENTER , "24px", true ,"","gray");
    }
    else if(item.STATE == '鎖定')
    {
        info_div.style.background ="rgb(255,255,255)";
        info_div.style.background ="linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(23,236,23,0.3) 50%, rgba(23,236,23,0.7) 100%)"
        in_text_div.style.background ="rgba(23,236,23,0.7)"
    }



    // 盤點資訊-單號
    const IC_SN_div = document.createElement('div');
    My_Div.Init(IC_SN_div,`IC_SN_div${_index}`,'formnnum_div', '100%','20px','');
    My_Div.Set_Text(IC_SN_div ,`單號 : ${item.IC_SN}` , TextAlignEnum.LEFT , "16px", true ,"","black");
    IC_SN_div.setAttribute("IC_SN",item.IC_SN);
    IC_SN_div.style.marginLeft = "10px";
    IC_SN_div.style.marginTop = "5px";
    info_div.appendChild(IC_SN_div);

    // 盤點資訊-名稱
    const IC_NAME_div = document.createElement('div');
    My_Div.Init(IC_NAME_div,`IC_NAME_div${_index}`,'formnnum_div', '100%','20px','');
    My_Div.Set_Text(IC_NAME_div ,`名稱 : ${(isStringNull(item.IC_NAME))? "無" : item.IC_NAME}` , TextAlignEnum.LEFT , "16px", true ,"","black");
    IC_NAME_div.setAttribute("IC_NAME",item.IC_NAME);
    IC_NAME_div.style.marginLeft = "10px";
    IC_NAME_div.style.marginTop = "5px";
    info_div.appendChild(IC_NAME_div);

    // 盤點資訊-建表人
    const CT_div = document.createElement('div');
    My_Div.Init(CT_div,`CT_div${_index}`,'formnnum_div', '100%','20px','');
    My_Div.Set_Text(CT_div ,`建表人 : ${(isStringNull(item.CT))? "無" : item.CT}` , TextAlignEnum.LEFT , "16px", true ,"","black");
    CT_div.setAttribute("CT",item.CT);
    CT_div.style.marginLeft = "10px";
    CT_div.style.marginTop = "5px";
    info_div.appendChild(CT_div);
   
    // 盤點資訊-開始時間
    const START_TIME_div = document.createElement('div');
    My_Div.Init(START_TIME_div,`START_TIME_div${_index}`,'formnnum_div', '100%','20px','');
    My_Div.Set_Text(START_TIME_div ,`開始 : ${item.START_TIME}` , TextAlignEnum.LEFT , "14px", true ,"","black");
    START_TIME_div.setAttribute("START_TIME",item.START_TIME);
    START_TIME_div.style.marginLeft = "10px";
    START_TIME_div.style.marginTop = "5px";
    info_div.appendChild(START_TIME_div);
    
    // 盤點資訊-結束時間

    const END_TIME_div = document.createElement('div');
    My_Div.Init(END_TIME_div,`END_TIME_div${_index}`,'formnnum_div', '100%','20px','');
    My_Div.Set_Text(END_TIME_div ,`結束 : ${item.END_TIME}` , TextAlignEnum.LEFT , "14px", true ,"","black");
    END_TIME_div.setAttribute("END_TIME",item.END_TIME);
    END_TIME_div.style.marginLeft = "10px";
    END_TIME_div.style.marginTop = "5px";
    info_div.appendChild(END_TIME_div);

    
    // 盤點資訊-狀態

    const STATE_div = document.createElement('div');
    My_Div.Init(STATE_div,`STATE_div${_index}`,'formnnum_div', '100%','20px','');
    My_Div.Set_Text(STATE_div ,`狀態 : ${item.STATE}` , TextAlignEnum.LEFT , "16px", true ,"","black");
    STATE_div.setAttribute("STATE",item.STATE);
    STATE_div.style.marginLeft = "10px";
    STATE_div.style.marginTop = "5px";
    info_div.appendChild(STATE_div);
    
    if(item.STATE == '等待盤點')
    {
        info_div.style.background ="rgb(255,255,255)";
        info_div.style.background ="linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(231,236,23,0.3) 50%, rgba(231,236,23,0.7) 100%)"
        in_text_div.style.background ="rgba(231,236,23,0.7)"
        info_btn_div.onclick = select_btn_Click;
    }
    else if(item.STATE == '盤點中')
    {
        info_div.style.background ="rgb(255,255,255)";
        info_div.style.background ="linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(236,23,23,0.3) 50%, rgba(236,23,23,0.7) 100%)"
        in_text_div.style.background ="rgba(236,23,23,0.7)"
        info_btn_div.onclick = select_btn_Click;
    }
    else if(item.STATE == '鎖定')
    {
        info_div.style.background ="rgb(255,255,255)";
        info_div.style.background ="linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(23,236,23,0.3) 50%, rgba(23,236,23,0.7) 100%)"
        in_text_div.style.background ="rgba(23,236,23,0.7)"
    }
    //操作按鈕
    const btn_div = document.createElement('div');
    My_Div.Init(btn_div,`btn_div${_index}`,'btn_div', '100px','170px','');
    My_Div.Set_Block(btn_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.CENTER);
    btn_div.style.paddingTop = "5px";
    btn_div.style.paddingRight = "7px";
    btn_div.style.paddingBottom = "5px";
    btn_div.style.paddingLeft = "2px";
    btn_div.style.marginLeft = "5px";
    time_info_btn_div.appendChild(btn_div);

    var selectbtn = document.createElement('div');
    if(item.STATE == '鎖定')  
    {
      My_Div.Init(selectbtn,`selectbtn${_index}`,'selectbtn', '100%','33%','');
      My_Div.Set_Text(selectbtn,`交至\n覆盤` , TextAlignEnum.CENTER , "20px", true ,"","steelblue");
      selectbtn.style.backgroundColor = "#f5f5f5";
    }
    else
    {
      My_Div.Set_Text(selectbtn,`等待\n盤點` , TextAlignEnum.CENTER , "20px", true ,"","gray");
      My_Div.Init(selectbtn,`selectbtn${_index}`,'selectbtn', '100%','33%','');
      selectbtn.style.backgroundColor = "lightgray";
    }
  
    selectbtn.setAttribute("IC_SN",item.IC_SN);
    selectbtn.style.border = "1px solid gray";
    selectbtn.style.borderRadius = "5px";
    btn_div.appendChild(selectbtn);

    const downloadbtn = Get_download_SVG("100%", "60px", "90%","100%","steelblue","");
    My_Div.Init(downloadbtn,`downloadbtn${_index}`,'downloadbtn', '100%','33%','');
    downloadbtn.setAttribute("IC_SN",item.IC_SN);
    downloadbtn.style.border = "1px solid gray";
    downloadbtn.style.borderRadius = "5px";
    downloadbtn.style.marginTop = "3px";
    downloadbtn.disabled = !GetPermissions("盤點報表下載");
    downloadbtn.onclick = downloadbtn_Click;
    btn_div.appendChild(downloadbtn);

    var lockbtn;
    if(item.STATE == '鎖定')lockbtn = Get_lock_SVG("100%", "60px", "90%","100%","red","");
    else lockbtn = Get_unlock_SVG("100%", "60px", "90%","100%","steelblue",""); 
    My_Div.Init(lockbtn,`lockbtn${_index}`,'lockbtn', '100%','33%','');
    lockbtn.setAttribute("IC_SN",item.IC_SN);
    lockbtn.setAttribute("STATE",item.STATE);
    lockbtn.style.border = "1px solid gray";
    lockbtn.style.borderRadius = "5px";
    lockbtn.style.marginTop = "3px";
    lockbtn.onclick = lockbtn_Click;
    lockbtn.disabled = !GetPermissions("盤點報表鎖定");
    btn_div.appendChild(lockbtn);


    return all_div;
}
//#endregion

//#region [rgba(0, 255, 0, 0.05)] Event
async function downloadbtn_Click(event)
{
  var IC_SN = this.getAttribute("IC_SN");
  const confirmResult = confirm(`確定下載盤點單 [${IC_SN}]?`);
  if (!confirmResult) return;
  Set_main_div_enable(true);
  await download_excel_by_IC_SN(IC_SN);
  Set_main_div_enable(false);
}
async function lockbtn_Click(event) 
{
  var IC_SN = this.getAttribute("IC_SN");
  var STATE = this.getAttribute("STATE");
  var msg = '';
  if (STATE == '等待盤點' || STATE == '盤點中') 
  {
    const confirmResult = confirm(`確定鎖定盤點單 [${IC_SN}]?`);
    if (!confirmResult) return;
    document.body.style.opacity = "0.5";
    temp = await creat_lock_by_IC_SN(IC_SN);
    document.body.style.opacity = "1";

    
  }
  else 
  {
    const confirmResult = confirm(`確定解鎖盤點單 [${IC_SN}]?`);
    if (!confirmResult) return;
    Set_main_div_enable(true);
    temp = await creat_unlock_by_IC_SN(IC_SN);
    Set_main_div_enable(false);
    const GUID = temp.Data.GUID;
    console.log(temp);
    for (var i = 0; i < data.Data.length; i++) {
      if (data.Data[i].GUID == GUID) {
        data.Data[i] = { ...temp.Data };
      }
    }
    page_Init(data);
  }
}
async function select_btn_Click(event) 
{
  var IC_SN = this.getAttribute("IC_SN");
  console.log(IC_SN);
  sessionStorage.setItem('IC_SN', IC_SN);
  await creat_update_startime_by_IC_SN(IC_SN);
  location.href = "../../../inventory/main.html"
}

async function delete_btn_Click(event) {
  var IC_SN = this.getAttribute("IC_SN");
  const confirmResult = confirm(`確定刪除盤點單 [${IC_SN}]?`);
  if (confirmResult) {
    Set_main_div_enable(true);
    await creat_delete_by_IC_SN(IC_SN);
    
    Set_main_div_enable(false);
  }
}
//#endregion

//#region [rgba(255, 0, 0, 0.05)] private Function
function get_Time_info(_index , dateString)
{

 
     //年月日

     const calendar_div = document.createElement("div");
     calendar_div.className = "calendar_div";
     calendar_div.id = `calendar_div${_index}`;
     calendar_div.setAttribute("_index",_index);
    
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
     return calendar_div;
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
 
}
//#endregion







