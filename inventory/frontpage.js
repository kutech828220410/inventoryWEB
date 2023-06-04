let data;
window.onload = load;
window.addEventListener('resize', handleResize);

function handleResize() {
  Set_popup_find_position();
}
async function load() 
{
  await set_ip();
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

  
  if (data.Data.length == 0) 
  {
    const NoDataDiv = getNoDataDiv();
    console.log(NoDataDiv);
    main_div.appendChild(NoDataDiv);
  }
  else
  {
    for (var i = 0; i < data.Data.length; i++) 
    {
      const all_div = creat_all_div(i, data.Data[i]);
      main_div.appendChild(all_div);
    }
  

  }
  setUserText();
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
async function addform_Click(event) {
  const confirmResult = confirm("確定建立盤點單?");
  if (confirmResult) {
    Set_main_div_enable(true);
    const returnData = await creat_auto_add();
    Set_main_div_enable(false);
  }
}
async function dlbtn_Click(event) {
  var IC_SN = this.getAttribute("IC_SN");
  const confirmResult = confirm(`確定下載盤點單 [${IC_SN}]?`);
  if (!confirmResult) return;
  Set_main_div_enable(true);
  await download_excel_by_IC_SN(IC_SN);
  Set_main_div_enable(false);
}
async function lockbtn_Click(event) {
  var IC_SN = this.getAttribute("IC_SN");
  var STATE = this.getAttribute("STATE");
  var msg = '';
  if (STATE == '等待盤點') {
    const confirmResult = confirm(`確定鎖定盤點單 [${IC_SN}]?`);
    if (!confirmResult) return;
    document.body.style.opacity = "0.5";
    temp = await creat_lock_by_IC_SN(IC_SN);
    document.body.style.opacity = "1";
    
  }
  else {
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
function select_btn_Click(event) {
  var IC_SN = this.getAttribute("IC_SN");
  console.log(IC_SN);
  sessionStorage.setItem('IC_SN', IC_SN);
  location.href = "../inventory/main.html"
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
function findbtn_Click(event)
{
  Set_popup_find_position();
  if (popup_find_div.style.visibility != 'visible') {
    popup_find_div.style.display = "block";
    popup_find_div.style.opacity = "1";
    popup_find_div.style.visibility = "visible";


  }
  else {
    popup_find_div.style.display = "block";
    popup_find_div.style.opacity = "0";
    popup_find_div.style.visibility = "hidden";
  }
}
async function findcheckbtn_Click(event)
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

function Set_popup_find_position() {

  const header_contorls_findbtn = document.querySelector("#header_contorls_findbtn");
  var position_header_contorls_findbtn = getAbsolutePosition(header_contorls_findbtn);
  const popup_find_div = document.querySelector("#popup_find_div");
  var position_popup_find_div = getAbsolutePosition(popup_find_div);

  const top = `${position_header_contorls_findbtn.top + position_header_contorls_findbtn.height + 5}px`;
  const left = `${position_header_contorls_findbtn.left + position_header_contorls_findbtn.width / 2 - position_popup_find_div.width}px`;

  popup_find_div.style.top = `${top}`;
  popup_find_div.style.left = `${left}`;

}

function get_header() {
  const header_div = document.createElement("div");
  header_div.id = "header_div";
  header_div.className = "header_div";
  header_div.style.width = "100%";
  header_div.style.height = "70px";
  header_div.style.background = "rgb(186, 185, 208)";
  header_div.style.background = "linear-gradient(90deg, rgba(186, 185, 208, 1) 0%, rgba(235, 235, 235, 1) 100%)";
  header_div.style.display = "flex";
  header_div.style.justifyContent = "left";
  header_div.style.flexDirection = "row";
  header_div.style.overflowX = "hidden";


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
  header_title_div.innerHTML = `<b class="h1">盤點單管理</b>`;
  header_title_div.style.display = "flex";
  header_title_div.id = "header_title_div";
  header_title_div.className = "header_title_div";
  header_title_div.style.textAlign = "left";
  header_title_div.style.width = "75%";
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

  const header_contorls_findbtn = Get_find_in_page_SVG("100%", "100%", "70%", "100%", "black", "");
  header_contorls_findbtn.id = "header_contorls_findbtn";
  header_contorls_findbtn.className = "header_contorls";
  header_contorls_findbtn.style.width = "60px";
  header_contorls_findbtn.style.height = "80%";
  header_contorls_findbtn.style.marginTop = "5px";
  header_contorls_findbtn.style.marginRight = "2px";
  header_contorls_findbtn.style.display = "flex";


  const header_contorls_addformbtn = Get_add_SVG("100%", "100%", "70%", "100%", "black", "");
  header_contorls_addformbtn.id = "header_contorls_addformbtn";
  header_contorls_addformbtn.className = "header_contorls";
  header_contorls_addformbtn.style.width = "60px";
  header_contorls_addformbtn.style.height = "80%";
  header_contorls_addformbtn.style.marginTop = "5px";
  header_contorls_addformbtn.style.marginRight = "2px";
  header_contorls_addformbtn.style.display = "flex";

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
  popup_find_div.style.width = "230px";
  popup_find_div.style.height = "205px";
  popup_find_div.style.position = "absolute";
  popup_find_div.style.top = "0px";
  popup_find_div.style.left = "0px";
  popup_find_div.style.display = "block";
  popup_find_div.style.visibility = 'hidden';
  popup_find_div.style.borderRadius = "5px";
  popup_find_div.style.border = "solid 1px";
  popup_find_div.style.flexDirection = "column";
  popup_find_div.style.paddingTop = "5px";
  popup_find_div.style.paddingLeft = "5px";
  popup_find_div.style.opacity = "0";
  popup_find_div.style.transition = "opacity 0.5s, visibility 0.5s 0s";
  popup_background_div.appendChild(popup_find_div);

  const find_IC_SN_div = document.createElement("div")
  find_IC_SN_div.id = "find_IC_SN_div";
  find_IC_SN_div.className = "find_IC_SN_div";
  find_IC_SN_div.style.width = "100%";
  find_IC_SN_div.style.height = "50px";
  find_IC_SN_div.style.alignItems = "center";
  find_IC_SN_div.style.justifyContent = "left";
  find_IC_SN_div.style.display = "flex";
  find_IC_SN_div.style.flexDirection = "row"

  const IC_SN_svg = Get_script_SVG("100%", "100%", "32px", "100%", "black", "");
  IC_SN_svg.id = "IC_SN_svg";
  IC_SN_svg.className = "IC_SN_svg";
  IC_SN_svg.style.width = "50px";
  IC_SN_svg.style.height = "100%";
  IC_SN_svg.style.alignItems = "center";
  IC_SN_svg.style.justifyContent = "center";

  const find_IC_SN_input = document.createElement("input")
  find_IC_SN_input.id = "find_IC_SN_input";
  find_IC_SN_input.className = "find_IC_SN_input";
  find_IC_SN_input.style.width = "95%";
  find_IC_SN_input.style.height = "30px";
  find_IC_SN_input.style.textAlign = "center";
  find_IC_SN_input.style.marginRight = "0px";
  find_IC_SN_input.placeholder = "請輸入單號";
  find_IC_SN_input.style.fontSize = "16px";
  const find_IC_SN_input_div = document.createElement("div")
  find_IC_SN_input_div.id = "find_IC_SN_input_div";
  find_IC_SN_input_div.className = "find_IC_SN_input_div";
  find_IC_SN_input_div.style.width = "100%";
  find_IC_SN_input_div.style.height = "100%";
  find_IC_SN_input_div.style.alignItems = "center";
  find_IC_SN_input_div.style.justifyContent = "left";
  find_IC_SN_input_div.style.display = "flex";
  find_IC_SN_input_div.appendChild(find_IC_SN_input);


  const find_start_date_div = document.createElement("div")
  find_start_date_div.id = "find_start_date_div";
  find_start_date_div.className = "find_start_date_div";
  find_start_date_div.style.width = "100%";
  find_start_date_div.style.height = "50px";
  find_start_date_div.style.alignItems = "center";
  find_start_date_div.style.justifyContent = "left";
  find_start_date_div.style.display = "flex";

  const date_start_svg = Get_date_SVG("100%", "100%", "40px", "100%", "black", "");
  date_start_svg.id = "date_start_svg";
  date_start_svg.className = "date_start_svg";
  date_start_svg.style.width = "50px";
  date_start_svg.style.height = "100%";
  date_start_svg.style.alignItems = "center";
  date_start_svg.style.justifyContent = "center";

  const find_start_date_input = document.createElement("input")
  find_start_date_input.id = "find_start_date_input";
  find_start_date_input.className = "find_start_date_input";
  find_start_date_input.style.width = "95%";
  find_start_date_input.style.height = "30px";
  find_start_date_input.type = "text";
  find_start_date_input.style.margin = "0px";
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
  find_start_date_input_div.appendChild(find_start_date_input);


  const find_end_date_div = document.createElement("div")
  find_end_date_div.id = "find_end_date_div";
  find_end_date_div.className = "find_end_date_div";
  find_end_date_div.style.width = "100%";
  find_end_date_div.style.height = "50px";
  find_end_date_div.style.alignItems = "center";
  find_end_date_div.style.justifyContent = "left";
  find_end_date_div.style.display = "flex";

  const date_end_svg = Get_date_SVG("100%", "100%", "40px", "100%", "black", "");
  date_end_svg.id = "date_end_svg";
  date_end_svg.className = "date_end_svg";
  date_end_svg.style.width = "50px";
  date_end_svg.style.height = "100%";
  date_end_svg.style.alignItems = "center";
  date_end_svg.style.justifyContent = "center";

  const find_end_date_input = document.createElement("input")
  find_end_date_input.id = "find_end_date_input";
  find_end_date_input.className = "find_end_date_input";
  find_end_date_input.style.width = "95%";
  find_end_date_input.style.height = "30px";
  find_end_date_input.style.border = "1px solid";
  find_end_date_input.style.margin = "0px";
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
  find_end_date_input_div.appendChild(find_end_date_input);

  const find_check_div = document.createElement("div")
  find_check_div.id = "find_check";
  find_check_div.className = "find_check";
  find_check_div.style.width = "100%";
  find_check_div.style.height = "50px";
  find_check_div.style.display = "flex";
  find_check_div.style.alignItems = "center";
  find_check_div.style.justifyContent = "flex-end";


  const checksvg = Get_find_check_SVG("", "", "40px", "100%", "green", "");
  checksvg.id = "date_start_svg";
  checksvg.className = "date_start_svg";
  checksvg.style.width = "30%";
  checksvg.style.height = "100%";
  checksvg.style.alignItems = "center";
  checksvg.style.justifyContent = "center";
  checksvg.style.borderRadius = "10px";
  checksvg.style.marginRight = "0px";
  checksvg.onclick = findcheckbtn_Click;


  header_contorls_div.appendChild(header_contorls_findbtn);
  header_contorls_div.appendChild(header_contorls_addformbtn);
  popup_find_div.appendChild(find_IC_SN_div);
  popup_find_div.appendChild(find_start_date_div);
  popup_find_div.appendChild(find_end_date_div);
  popup_find_div.appendChild(find_check_div);

  find_IC_SN_div.appendChild(IC_SN_svg);
  find_IC_SN_div.appendChild(find_IC_SN_input_div);
  find_start_date_div.appendChild(date_start_svg);
  find_start_date_div.appendChild(find_start_date_input_div);
  find_end_date_div.appendChild(date_end_svg);
  find_end_date_div.appendChild(find_end_date_input_div);
  find_check_div.appendChild(checksvg);

  header_contorls_addformbtn.onclick = addform_Click;
  header_contorls_findbtn.onclick = findbtn_Click;

  header_div.appendChild(header_title_user_div);
  header_div.appendChild(header_contorls_div);


  return header_div;
}
function get_main() {
  const main_div = document.createElement("div");
  main_div.id = "main_div";
  main_div.className = "main_div";
  main_div.style.width = "100%";
  main_div.style.height = "100%";
  main_div.style.backgroundColor = "#FFFFFF";
  return main_div;
}
function setUserText() {
  const userText = document.querySelector("#header_user_text");
   userText.innerText = `使用者:${get_logedName()} ID:${get_loggedID()}`;
}

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
  NoData_Text.innerText = "今日無盤點單,請搜尋或創建新單號!";
  NoData_Text.style.width = "100%"
  NoData_Text.style.textAlign = "center";
  NoData_Text.style.backgroundColor = "";
  NoData_Text.style.color = "red";
  NoData_Text.style.fontWeight = "bold";
  NoData_Text.style.fontSize = "30px";

  NoData_div.appendChild(NoData_Text);
  return NoData_div;
}




