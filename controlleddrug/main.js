let data;
window.onload = load;
window.addEventListener('resize', handleResize);

function handleResize() {
  Set_popup_find_position();
}
async function load() {
  let rowNum = 1;
  const Loadingpopup = GetLoadingpopup();
  document.body.appendChild(Loadingpopup);
  Set_main_div_enable(true);
  const currentDate = new Date();
  var date_end = DateTimeAddDays(currentDate, 1);
  var date_start = DateTimeAddDays(currentDate, -30);
  date_start = getDateStr(date_start);
  date_end = getDateStr(date_end);
  
  data = await creat_get_by_CT_TIME_ST_END(date_start,date_end);
  Set_main_div_enable(false);
  page_Init(data);
}
function page_Init(data) {
  console.log(data);
  const main_div = document.querySelector('#main_div');
  main_div.innerHTML = "";

  for (var i = 0; i < data.Data.length; i++) {
    const all_div = creat_all_div(i, data.Data[i]);
  }
  if (data.Data.length == 0) {
    const NoDataDiv = getNoDataDiv();
    console.log(NoDataDiv);
    main_div.appendChild(NoDataDiv);
  }

  setUserText();
}

function handleResize() 
{
  Set_popup_find_position();
}

function Set_main_div_enable(value) {
    const main_div = document.querySelector('#main_div');
    if (value) {
      showLoadingPopup();
      //  document.body.style.opacity = "0.5"; 
      document.body.style.pointerEvents = "none";
    }
    else {
      hideLoadingPopup();
      document.body.style.opacity = "1";
      document.body.style.pointerEvents = "auto";
  
    }
  }
async function done_Click() 
{
  location.href = "frontpage.html"
}

function findbtn_Click()
{
  Set_popup_find_position();
  if(popup_find_div.style.visibility  != 'visible')
  {
    popup_find_div.style.display = "block";
    popup_find_div.style.opacity = "1" ;
    popup_find_div.style.visibility  = "visible";

    
  }
  else
  {
    popup_find_div.style.display = "block";
    popup_find_div.style.opacity = "0" ;
    popup_find_div.style.visibility = "hidden";
  }
}

async function find_check_Click(event)
{
  popup_find_div.style.display = "block";
  popup_find_div.style.opacity = "0";
  popup_find_div.style.visibility = "hidden";
  var IC_SN = find_IC_SN_input.value;
  var date_start = find_start_date_input.value;
  var date_end = find_end_date_input.value;
  find_IC_SN_input.value = '';
  find_start_date_input.value = '';
  if (IC_SN) {
    Set_main_div_enable(true);
    data = await creat_get_by_IC_SN(IC_SN);
    Set_main_div_enable(false);
    if (data.Code <= 0) 
    {
      alert("查無資料!");
      return;
    }
    page_Init(data);
    return;
  }
  if (date_start || date_end)
  {
    var num = 0;
    if(date_start)num++;
    if(date_end)num++;
    if(num == 2)
    {
      var date_end = DateTimeAddDays(date_end, 1);
      date_start = getDateStr(date_start);
      date_end = getDateStr(date_end);
      Set_main_div_enable(true);
      data = await creat_get_by_CT_TIME_ST_END(date_start,date_end);
      Set_main_div_enable(false);
    }
    else
    {
       if(date_start)
       {
          Set_main_div_enable(true);
          data = await creat_get_by_CT_TIME_S(date_start);
          Set_main_div_enable(false);
       }
       if(date_end)
       {
          Set_main_div_enable(true);
          data = await creat_get_by_CT_TIME_S(date_end);
          Set_main_div_enable(false);
       }
    }
  
    if (data.Data.length <= 0) 
    {
      alert("查無資料!");
      return;
    }
    page_Init(data);
    return;
  }
}

function Set_popup_find_position()
{
 
  const header_contorls_findbtn = document.querySelector("#header_contorls_findbtn");
  var position_header_contorls_findbtn = getAbsolutePosition(header_contorls_findbtn);
  const popup_find_div = document.querySelector("#popup_find_div");
  var position_popup_find_div = getAbsolutePosition(popup_find_div);
  
  const top = `${position_header_contorls_findbtn.top + position_header_contorls_findbtn.height + 5}px`;
  const left = `${position_header_contorls_findbtn.left + position_header_contorls_findbtn.width / 2- position_popup_find_div.width}px`;
 
  popup_find_div.style.top = `${top}`;
  popup_find_div.style.left = `${left}`;
  
}
function get_header()
{
  const coverage_div =document.createElement("div");
  coverage_div.style.width = "100%";
  coverage_div.style.height = "100%";
  coverage_div.style.display = "flex";
  coverage_div.style.flexDirection = "row";

  const header_div = document.createElement("div");
  header_div.id = "header_div";
  header_div.className = "header_div";
  header_div.style.width = "100%";
  header_div.style.height = "70px";
  header_div.style.position= "fixed";
  header_div.style.top= "0";
  header_div.style.left= "0";
  header_div.style.zIndex= "9";
  header_div.style.background = "rgb(186, 185, 208)";
  header_div.style.background = "linear-gradient(90deg, rgba(186, 185, 208, 1) 0%, rgba(235, 235, 235, 1) 100%)";
  header_div.style.display = "flex";
  header_div.style.justifyContent = "left";
  header_div.style.flexDirection = "row";
  header_div.style.overflowX = "hidden";
  coverage_div.appendChild(header_div);


  const header_title_user_div = document.createElement("div");
  header_title_user_div.id = "header_title_user_div";
  header_title_user_div.className = "header_title_user_div";
  header_title_user_div.style.display = "flex";
  header_title_user_div.style.justifyContent = "top";
  header_title_user_div.style.flexDirection = "column";
  header_title_user_div.style.width = "70%";
  header_title_user_div.style.height = "100%";
  header_title_user_div.style.backgroundColor = "#";

  const header_title_div = document.createElement("div");
  header_title_div.innerHTML = `<b class="h1">管制藥結存頁面</b>`;
  header_title_div.style.display = "flex";
  header_title_div.id = "header_title_div";
  header_title_div.className = "header_title_div";
  header_title_div.style.textAlign = "left";
  header_title_div.style.width = "100%";
  header_title_div.style.height = "50%";
  header_title_div.style.backgroundColor = "#";
  header_title_div.style.justifyContent = "";
  header_title_div.style.flexDirection = "";


  const header_user_div = document.createElement("div");
  header_user_div.innerHTML = `<span ><p id="header_user_text" style="font-family: 微軟正黑體; font-size: 12px; margin-left: 20px; word-spacing: 5px; letter-spacing: 3px;">使用者名稱:</p><span>`;
  header_user_div.id = "header_user_div";
  header_user_div.style.display = "flex";
  header_user_div.className = "header_user_div";
  header_user_div.style.textAlign = "left";
  header_user_div.style.width = "100%";
  header_user_div.style.height = "50%";
  header_user_div.style.backgroundColor = "#";
  header_user_div.style.justifyContent = "";
  header_user_div.style.flexDirection = "";
  header_title_user_div.appendChild(header_title_div);
  header_title_user_div.appendChild(header_user_div);

  const header_contorls_div = document.createElement("div");
  header_contorls_div.id = "header_contorls_div";
  header_contorls_div.className = "header_contorls_div";
  header_contorls_div.style.display = "flex";
  header_contorls_div.style.justifyContent = "flex-end";
  header_contorls_div.style.flexDirection = "row";
  header_contorls_div.style.width = "30%";
  header_contorls_div.style.height = "100%";
  header_contorls_div.style.paddingRight = "5px";

  const header_contorls_findbtn = Get_find_in_page_SVG("100%", "100%", "70%","100%","black","");
  header_contorls_findbtn.id = "header_contorls_findbtn";
  header_contorls_findbtn.className = "header_contorls";
  header_contorls_findbtn.style.width = "60px";
  header_contorls_findbtn.style.height = "80%";
  header_contorls_findbtn.style.marginTop = "5px";
  header_contorls_findbtn.style.marginRight = "2px";
  header_contorls_findbtn.style.display = "flex";
  const header_contorls_donebtn = Get_find_check_SVG("100%", "100%", "70%","100%","black","");
  header_contorls_donebtn.id = "header_contorls_donebtn";
  header_contorls_donebtn.className = "header_contorls";
  header_contorls_donebtn.style.width = "60px";
  header_contorls_donebtn.style.height = "80%";
  header_contorls_donebtn.style.marginTop = "5px";
  header_contorls_donebtn.style.marginRight = "2px";
  header_contorls_donebtn.style.display = "flex";
  //管制結存表頭
  const drughead_div = document.createElement("div");
  drughead_div.id = "drughead_div";
  drughead_div.className = "drughead_div";
  drughead_div.style.display = "flex";
  drughead_div.style.textAlign = "left";
  drughead_div.style.width = "100%";
  drughead_div.style.height = "180px";
  drughead_div.style.position= "fixed";
  drughead_div.style.top= "70px";
  drughead_div.style.left= "0";
  drughead_div.style.zIndex= "9";
  drughead_div.style.background = "#FFF" ;
  drughead_div.style.justifyContent = "top";
  drughead_div.style.flexDirection = "column";
  
  //第一行
  const level_code_date_div = document.createElement("div");
  level_code_date_div.style.width = "100%";
  level_code_date_div.style.height = "10%";
  level_code_date_div.style.justifyContent = "top";
  level_code_date_div.style.alignItems= "center";
  level_code_date_div.style.flexDirection = "row";
  level_code_date_div.style.display = "flex";
  level_code_date_div.style.marginTop = "3px";

  const controlledlevel_div = document.createElement("div");
  controlledlevel_div.id = "controlledlevel_div";
  controlledlevel_div.className = "controlledlevel_div";
  controlledlevel_div.innerText = "管4";
  controlledlevel_div.style.borderStyle = "dashed";
  controlledlevel_div.style.color = "red";
  controlledlevel_div.style.fontWeight = "bolder";
  controlledlevel_div.style.textAlign = "center";
  controlledlevel_div.style.display = "flex";
  controlledlevel_div.style.width = "10%";
  controlledlevel_div.style.height = "100%";
  controlledlevel_div.style.justifyContent = "center";
  controlledlevel_div.style.alignItems= "center";
  controlledlevel_div.style.flexDirection = "";

  const code_div = document.createElement("div");
  code_div.id = "code_div";
  code_div.className = "code_div";
  code_div.innerText = "藥碼:IDEXXX";
  code_div.style.color = "blue";
  code_div.style.fontWeight = "bolder";
  code_div.style.textAlign = "center";
  code_div.style.display = "flex";
  code_div.style.width = "30%";
  code_div.style.height = "100%";
  code_div.style.border = "";
  code_div.style.justifyContent = "center";
  code_div.style.alignItems= "center";
  code_div.style.flexDirection = "";
  
    const startdate_div = document.createElement("div");
    startdate_div.id = "code_div";
    startdate_div.className = "code_div";
    startdate_div.innerText = "始:2023-05-26";
    startdate_div.style.fontWeight = "bolder";
    startdate_div.style.textAlign = "center";
    startdate_div.style.display = "flex";
    startdate_div.style.width = "30%";
    startdate_div.style.height = "100%";
    startdate_div.style.border = "";
    startdate_div.style.justifyContent = "center";
    startdate_div.style.alignItems= "center";
    startdate_div.style.flexDirection = "";

    const enddate_div = document.createElement("div");
    enddate_div.id = "code_div";
    enddate_div.className = "code_div";
    enddate_div.innerText = "末:2023-05-27";
    enddate_div.style.fontWeight = "bolder";
    enddate_div.style.textAlign = "center";
    enddate_div.style.display = "flex";
    enddate_div.style.width = "30%";
    enddate_div.style.height = "100%";
    enddate_div.style.border = "";
    enddate_div.style.justifyContent = "center";
    enddate_div.style.alignItems= "center";
    enddate_div.style.flexDirection = "";

//第二行
const name_allqty_div = document.createElement("div");
name_allqty_div.style.width = "100%";
name_allqty_div.style.height = "30%";
name_allqty_div.style.borderTopStyle = "ridge";
name_allqty_div.style.borderColor = "lightgray";
name_allqty_div.style.justifyContent = "top";
name_allqty_div.style.alignItems= "center";
name_allqty_div.style.flexDirection = "row";
name_allqty_div.style.display = "flex";
name_allqty_div.style.marginTop = "4px";

const name_div = document.createElement("div");
name_div.id = "name_div";
name_div.className = "name_div";
name_div.innerHTML = "<p style='color:orange;margin-right:6px'>(英)</p>OOOOOXXXXX 18mg /bottle9999999999999918mg";
name_div.style.fontWeight = "bolder";
name_div.style.textAlign = "left";
name_div.style.display = "flex";
name_div.style.width = "72%";
name_div.style.height = "100%";
name_div.style.borderRightStyle = "solid";
name_div.style.borderColor = "black";
name_div.style.justifyContent = "flex-start";
name_div.style.alignItems= "center";
name_div.style.flexDirection = "";

const allqty_div = document.createElement("div");
allqty_div.id = "allqty_div";
allqty_div.className = "allqty_div";
allqty_div.innerText = "總筆數:12";
allqty_div.style.borderLeftStyle = "solid";
allqty_div.style.borderColor = "orange";
allqty_div.style.borderWidth = "10px";
allqty_div.style.fontWeight = "bolder";
allqty_div.style.textAlign = "left";
allqty_div.style.display = "flex";
allqty_div.style.width = "28%";
allqty_div.style.height = "100%";
allqty_div.style.justifyContent = "center";
allqty_div.style.alignItems= "center";
allqty_div.style.flexDirection = "";


//第三行
const chtname_useqty_div = document.createElement("div");
chtname_useqty_div.style.width = "100%";
chtname_useqty_div.style.height = "30%";
chtname_useqty_div.style.justifyContent = "top";
chtname_useqty_div.style.alignItems= "center";
chtname_useqty_div.style.flexDirection = "row";
chtname_useqty_div.style.display = "flex";


const chtname_div = document.createElement("div");
chtname_div.id = "chtname_div";
chtname_div.className = "chtname_div";
chtname_div.innerHTML = "<p style='color:orange;margin-right:6px'>(中)</p>超級類固醇保證身體好超級類固醇保證身體保證身體好";
chtname_div.style.fontWeight = "bolder";
chtname_div.style.textAlign = "left";
chtname_div.style.display = "flex";
chtname_div.style.width = "72%";
chtname_div.style.height = "100%";
chtname_div.style.borderRightStyle = "solid";
chtname_div.style.borderColor = "black";
chtname_div.style.justifyContent = "flex-start";
chtname_div.style.alignItems= "center";
chtname_div.style.flexDirection = "";

const useqty_div = document.createElement("div");
useqty_div.id = "useqty_div";
useqty_div.className = "useqty_div";
useqty_div.innerText = "消耗量:34";
useqty_div.style.borderLeftStyle = "solid";
useqty_div.style.borderColor = "orange";
useqty_div.style.borderWidth = "10px";
useqty_div.style.fontWeight = "bolder";
useqty_div.style.textAlign = "left";
useqty_div.style.display = "flex";
useqty_div.style.width = "28%";
useqty_div.style.height = "100%";
useqty_div.style.justifyContent = "center";
useqty_div.style.alignItems= "center";
useqty_div.style.flexDirection = "";

//第四行
const tablehead_div = document.createElement("div");
tablehead_div.style.width = "100%";
tablehead_div.style.height = "20%";
tablehead_div.style.justifyContent = "top";
tablehead_div.style.alignItems= "center";
tablehead_div.style.flexDirection = "row";
tablehead_div.style.display = "flex";
tablehead_div.style.marginTop = "3px";
tablehead_div.style.background = "linear-gradient(90deg, gray 0%, #fff 100%)" ;
const num_div = document.createElement("div");
num_div.id = "num_div";
num_div.className = "num_div";
num_div.innerText = "No.";
num_div.style.fontSize = "12px";
num_div.style.borderStyle = "ridge";
num_div.style.fontWeight = "bolder";
num_div.style.textAlign = "center";
num_div.style.display = "flex";
num_div.style.width = "6%";
num_div.style.height = "100%";
num_div.style.justifyContent = "center";
num_div.style.alignItems= "center";
num_div.style.flexDirection = "";
const category_div = document.createElement("div");
category_div.id = "category_div";
category_div.className = "category_div";
category_div.innerText = "類別";
category_div.style.borderStyle = "ridge";
category_div.style.fontWeight = "bolder";
category_div.style.textAlign = "center";
category_div.style.display = "flex";
category_div.style.width = "12%";
category_div.style.height = "100%";
category_div.style.justifyContent = "center";
category_div.style.alignItems= "center";
category_div.style.flexDirection = "";
const tradqty_div = document.createElement("div");
tradqty_div.id = "tradqty_div";
tradqty_div.className = "tradqty_div";
tradqty_div.innerText = "交易量";
tradqty_div.style.borderStyle = "ridge";
tradqty_div.style.fontWeight = "bolder";
tradqty_div.style.textAlign = "center";
tradqty_div.style.display = "flex";
tradqty_div.style.width = "19%";
tradqty_div.style.height = "100%";
tradqty_div.style.justifyContent = "center";
tradqty_div.style.alignItems= "center";
tradqty_div.style.flexDirection = "";
const balqty_div = document.createElement("div");
balqty_div.id = "balqty_div";
balqty_div.className = "balqty_div";
balqty_div.innerText = "結存量";
balqty_div.style.borderStyle = "ridge";
balqty_div.style.fontWeight = "bolder";
balqty_div.style.textAlign = "center";
balqty_div.style.display = "flex";
balqty_div.style.width = "19%";
balqty_div.style.height = "100%";
balqty_div.style.justifyContent = "center";
balqty_div.style.alignItems= "center";
balqty_div.style.flexDirection = "";
const invqty_div = document.createElement("div");
invqty_div.id = "invqty_div";
invqty_div.className = "invqty_div";
invqty_div.innerText = "盤點量";
invqty_div.style.borderStyle = "ridge";
invqty_div.style.fontWeight = "bolder";
invqty_div.style.textAlign = "center";
invqty_div.style.display = "flex";
invqty_div.style.width = "19%";
invqty_div.style.height = "100%";
invqty_div.style.justifyContent = "center";
invqty_div.style.alignItems= "center";
invqty_div.style.flexDirection = "";
const user_div = document.createElement("div");
user_div.id = "user_div";
user_div.className = "user_div";
user_div.innerText = "調劑人";
user_div.style.borderStyle = "ridge";
user_div.style.fontWeight = "bolder";
user_div.style.textAlign = "center";
user_div.style.display = "flex";
user_div.style.width = "25%";
user_div.style.height = "100%";
user_div.style.justifyContent = "center";
user_div.style.alignItems= "center";
user_div.style.flexDirection = "";


  coverage_div.appendChild(drughead_div);
  drughead_div.appendChild(level_code_date_div);
  drughead_div.appendChild(name_allqty_div);
  drughead_div.appendChild(chtname_useqty_div);
  drughead_div.appendChild(tablehead_div);

  level_code_date_div.appendChild(controlledlevel_div);
  level_code_date_div.appendChild(code_div);
  level_code_date_div.appendChild(startdate_div);
  level_code_date_div.appendChild(enddate_div);
  name_allqty_div.appendChild(name_div);
  name_allqty_div.appendChild(allqty_div);
  chtname_useqty_div.appendChild(chtname_div);
  chtname_useqty_div.appendChild(useqty_div);
  tablehead_div.appendChild(num_div);
  tablehead_div.appendChild(category_div);
  tablehead_div.appendChild(tradqty_div);
  tablehead_div.appendChild(balqty_div);
  tablehead_div.appendChild(invqty_div);
  tablehead_div.appendChild(user_div);


  //彈跳視窗
  const popup_background_div = document.createElement("div");
  popup_background_div.id = "popup_background_div";
  popup_background_div.className = "popup_background_div";
  popup_background_div.style.backgroundColor = "gray";
  popup_background_div.style.width = "100%";
  popup_background_div.style.height = "100%";
  popup_background_div.position = "absolute";
  popup_background_div.top = "0";
  popup_background_div.left = "0";
  document.body.appendChild(popup_background_div);

  const popup_find_div = document.createElement("div");
  popup_find_div.id = "popup_find_div";
  popup_find_div.className = "popup_find";
  popup_find_div.style.backgroundColor = "#FFF";
  popup_find_div.style.width = "220px";
  popup_find_div.style.height = "250px";
  popup_find_div.style.position = "absolute";
  popup_find_div.style.top = "0px";
  popup_find_div.style.left = "0px";
  popup_find_div.style.display = "block";
  popup_find_div.style.visibility = 'hidden';
  popup_find_div.style.borderRadius = "5px";
  popup_find_div.style.border = "solid";
  popup_find_div.style.flexDirection = "column"
  popup_find_div.style.opacity = "0" ;
  popup_find_div.style.transition = "opacity 0.5s, visibility 0.5s 0s";
  popup_find_div.style.zIndex = "10";
  popup_background_div.appendChild(popup_find_div);

  const find_code_input_div = document.createElement("div")
  find_code_input_div.id = "find_code_input_div";
  find_code_input_div.className = "find_code_input_div";
  find_code_input_div.style.width = "100%";
  find_code_input_div.style.height = "25%";
  find_code_input_div.style.alignItems = "center";
  find_code_input_div.style.justifyContent = "center";
  find_code_input_div.style.display = "flex";

  const pill_svg = Get_pill_SVG("100%", "100%", "","100%","black","");
  pill_svg.id = "pill_svg";
  pill_svg.className = "pill_svg";
  pill_svg.style.width = "30%";
  pill_svg.style.height = "100%";
  pill_svg.style.alignItems = "center";
  pill_svg.style.justifyContent = "center";

  const find_code_input = document.createElement("input")
  find_code_input.id = "find_code_input";
  find_code_input.className = "find_code_input";
  find_code_input.style.width = "150px";
  find_code_input.style.height = "50%";
  find_code_input.style.textAlign = "center";
  find_code_input.style.marginRight = "8px";
  find_code_input.placeholder = "請輸入藥碼/藥名";
//開始日期
  const find_start_date_div = document.createElement("div")
  find_start_date_div.id = "find_start_date_div";
  find_start_date_div.className = "find_start_date_div";
  find_start_date_div.style.width = "100%";
  find_start_date_div.style.height = "25%";
  find_start_date_div.style.alignItems = "center";
  find_start_date_div.style.justifyContent = "center";
  find_start_date_div.style.display = "flex";
  const date_start_svg = Get_date_SVG("100%", "100%", "", "100%", "black", "");
  date_start_svg.id = "date_start_svg";
  date_start_svg.className = "date_start_svg";
  date_start_svg.style.width = "35%";
  date_start_svg.style.height = "100%";
  date_start_svg.style.alignItems = "center";
  date_start_svg.style.justifyContent = "center";
  const find_start_date_input = document.createElement("input")
  find_start_date_input.id = "find_start_date_input";
  find_start_date_input.className = "find_start_date_input";
  find_start_date_input.style.width = "150px";
  find_start_date_input.style.height = "50%";
  find_start_date_input.type = "text";
  find_start_date_input.style.marginRight = "8px";
  find_start_date_input.style.textAlign = "center";
  find_start_date_input.value  = "";
  find_start_date_input.placeholder = "開始日期";
  find_start_date_input.style.fontSize = "16px";
  const find_start_date_input_div = document.createElement("div")
  find_start_date_input_div.id = "find_start_date_input_div";
  find_start_date_input_div.className = "find_start_date_input_div";
  find_start_date_input_div.style.width = "100%";
  find_start_date_input_div.style.height = "100%";
  find_start_date_input_div.style.alignItems = "center";
  find_start_date_input_div.style.justifyContent = "left";
  find_start_date_input_div.style.display = "flex";
//結束日期
  const find_end_date_div = document.createElement("div")
  find_end_date_div.id = "find_end_date_div";
  find_end_date_div.className = "find_end_date_div";
  find_end_date_div.style.width = "100%";
  find_end_date_div.style.height = "25%";
  find_end_date_div.style.alignItems = "center";
  find_end_date_div.style.justifyContent = "left";
  find_end_date_div.style.display = "flex";
  const date_end_svg = Get_date_SVG("100%", "100%", "", "100%", "black", "");
  date_end_svg.id = "date_end_svg";
  date_end_svg.className = "date_end_svg";
  date_end_svg.style.width = "35%";
  date_end_svg.style.height = "100%";
  date_end_svg.style.alignItems = "center";
  date_end_svg.style.justifyContent = "center";
  const find_end_date_input = document.createElement("input")
  find_end_date_input.id = "find_end_date_input";
  find_end_date_input.className = "find_end_date_input";
  find_end_date_input.style.width = "150px";
  find_end_date_input.style.height = "50%";
  find_end_date_input.style.marginRight = "8px";
  find_end_date_input.style.textAlign = "center";
  find_end_date_input.value  = "";
  find_end_date_input.placeholder = "結束日期";
  find_end_date_input.style.fontSize = "16px";
  const find_end_date_input_div = document.createElement("div")
  find_end_date_input_div.id = "find_end_date_input_div";
  find_end_date_input_div.className = "find_end_date_input_div";
  find_end_date_input_div.style.width = "100%";
  find_end_date_input_div.style.height = "100%";
  find_end_date_input_div.style.alignItems = "center";
  find_end_date_input_div.style.justifyContent = "left";
  find_end_date_input_div.style.display = "flex";

  const find_check_div = document.createElement("div")
  find_check_div.id = "find_check";
  find_check_div.className = "find_check";
  find_check_div.style.width = "100%";
  find_check_div.style.height = "25%";
  find_check_div.style.display = "flex";
  find_check_div.style.alignItems = "center";
  find_check_div.style.justifyContent = "flex-end";

  const checksvg =  Get_find_check_SVG("", "", "40px","100%","black","");
  checksvg.id = "datesvg";
  checksvg.className = "datesvg";
  checksvg.style.width = "20%";
  checksvg.style.height = "100%";
  checksvg.style.alignItems = "center";
  checksvg.style.justifyContent = "center";
  checksvg.style.marginRight = "15px";

  header_contorls_div.appendChild(header_contorls_findbtn);
  header_contorls_div.appendChild(header_contorls_donebtn);
  popup_find_div.appendChild(find_code_input_div);
  popup_find_div.appendChild(find_start_date_div);
  popup_find_div.appendChild(find_end_date_div);
  popup_find_div.appendChild(find_check_div);
  find_code_input_div.appendChild(pill_svg);
  find_code_input_div.appendChild(find_code_input);
  
  find_start_date_div.appendChild(date_start_svg);
  find_start_date_div.appendChild(find_start_date_input_div);
  find_start_date_input_div.appendChild(find_start_date_input);
  find_end_date_div.appendChild(date_end_svg);
  find_end_date_div.appendChild(find_end_date_input_div);
  find_end_date_input_div.appendChild(find_end_date_input);
  find_check_div.appendChild(checksvg);

  header_contorls_donebtn.onclick = done_Click;
  header_contorls_findbtn.onclick = findbtn_Click;
  find_check_div.onclick = find_check_Click;

  header_div.appendChild(header_title_user_div);
  header_div.appendChild(header_contorls_div);
  


  return coverage_div;
}
function get_main() {
  const main_div = document.createElement("div");
  main_div.id = "main_div";
  main_div.className = "main_div";
  main_div.style.width = "100%";
  main_div.style.height = "100%";
  main_div.style.justifyContent = "flex-start";
  main_div.style.marginTop = "250px";
  main_div.style.marginBottom = "30px";
  return main_div;
}

//無資料時顯示
function getNoDataDiv() {
    const NoData_div = document.createElement("div");
    NoData_div.id = "NoData_div";
    NoData_div.className = "NoData_div";
    NoData_div.style.width = "100%";
    NoData_div.style.height = "150px";
    NoData_div.style.display = "flex";
  
    NoData_div.style.textAlign = "center";
    NoData_div.style.backgroundColor = "";
    NoData_div.style.alignItems = "center";
    NoData_div.style.justifyContent = "center";
  
  
    NoData_Text = document.createElement("div");
    NoData_Text.innerText = "請輸入管制藥資訊!";
    NoData_Text.style.width = "100%"
    NoData_Text.style.textAlign = "center";
    NoData_Text.style.backgroundColor = "";
    NoData_Text.style.color = "red";
    NoData_Text.style.fontWeight = "bold";
    NoData_Text.style.fontSize = "30px";
  
    NoData_div.appendChild(NoData_Text);
    return NoData_div;
  }
  

function setUserText()
{
   const userText = document.querySelector("#header_user_text");
   userText.innerText = `使用者:${get_logedName()} ID:${get_loggedID()}`;
   console.log(userText);0
}