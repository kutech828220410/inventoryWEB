let data;

window.onload = load;

async function load() 
{
  check_session_off();
  ServerName = "DS01";
  ServerType = "藥庫";
  // ServerName = "";
  // ServerType = "網頁";
  TableName = "medicine_page_firstclass";
  APIServer = await LoadAPIServer();
  const API01 = serch_APIServer("","網頁","API01");
  const API02 = serch_APIServer("","網頁","API02");
  const API_inspection_excel = serch_APIServer(ServerName,ServerType,"API_inspection_excel");
  const API_inspection_excel_upload = serch_APIServer(ServerName,ServerType,"API_inspection_excel_upload");
  const API_inspection_excel_download = serch_APIServer(ServerName,ServerType,"API_inspection_excel_download");
  
  // console.log("api_ip",api_ip);
  console.log("API01",API01);
  console.log("API02",API02);
  console.log("API_inspection_excel",API_inspection_excel);
  console.log("API_inspection_excel_upload",API_inspection_excel_upload[0].server);
  console.log("API_inspection_excel_download",API_inspection_excel_download[0].server);
  if(API_inspection_excel.length > 0) inspection_excel_url = API_inspection_excel[0].server;
  else inspection_excel_url = `${API01[0].server}/api/inspection/excel_upload`;
  await check_ip(API01[0].server,API02[0].server);
  // permissions = await GetApipermissions();
  // console.log(permissions);
  
  await page_check_permissions("inspection");
  
  let rowNum = 1;
  const Loadingpopup = GetLoadingpopup();
  document.body.appendChild(Loadingpopup);
  Set_main_div_enable(true);
  const currentDate = new Date();
  var date_end = DateTimeAddDays(currentDate, 1);
  var date_start = DateTimeAddDays(currentDate, -30);
  date_start = getDateStr(date_start);
  date_end = getDateStr(date_end);

  var loggedID = sessionStorage.getItem('loggedID');  
  var loggedName = sessionStorage.getItem('loggedName');  
  const test_user_data = {
    id: loggedID,
    name: loggedName,
  }
  
  data = await creat_get_by_CT_TIME_ST_END(date_start,date_end);
  nav_bar_create("inspection", test_user_data)
  Set_main_div_enable(false);
  page_Init(data);
}

//#region [rgba(0, 0, 255, 0.03)] public Function
function page_Init(data) 
{
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
      const all_div = creat_row_div(i, data.Data[i]);
      main_div.appendChild(all_div);
    }

    const space_div = document.createElement("div");
    My_Div.Init(space_div,'space_div','space_div', '100%', '30px');
    main_div.appendChild(space_div);
  

  }
   setUserText();
}
function Set_main_div_enable(value) 
{
  const main_div = document.querySelector('#main_div');
  if (value) 
  {
    showLoadingPopup();
    //  document.body.style.opacity = "0.5"; 
    document.body.style.pointerEvents = "none";
  }
  else 
  {
    hideLoadingPopup();
    document.body.style.opacity = "1";
    document.body.style.pointerEvents = "auto";
  }
}
function get_header() 
{

  const header_div = document.createElement('div');
  My_Div.Init(header_div, 'header_div','header_div', '100%', '70px', '');
  My_Div.Set_Block(header_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
  // header_div.style.background = "linear-gradient(90deg, rgba(186, 185, 208, 1) 0%, rgba(235, 235, 235, 1) 100%)";
  header_div.style.overflowX = "hidden";


  const header_title_user_div = document.createElement('div');
  My_Div.Init(header_title_user_div, 'header_title_user_div','header_title_user_div', '100%', '100%', '');
  My_Div.Set_Block(header_title_user_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.TOP);
  header_title_user_div.style.marginLeft = "60px"

  const header_title_text = document.createElement('div');
  My_Div.Init(header_title_text, 'header_title_text','header_title_text', '100%', '50%', '');
  My_Div.Set_Text(header_title_text ,"驗收管理" , TextAlignEnum.LEFT , "24px", true,"微軟正黑體","");
  header_title_text.id = "header_title_text";
  header_title_text.style.marginLeft = "20px";
  header_title_text.style.marginTop = "5px";
  header_title_user_div.appendChild(header_title_text);

  const header_user_text = document.createElement('div');
  My_Div.Init(header_user_text, 'header_user_text','header_user_text', '100%', '50%', '');
  My_Div.Set_Text(header_user_text ,"使用者:" , TextAlignEnum.LEFT , "14px", false,"微軟正黑體","");
  header_user_text.className = "header_user_text";
  header_user_text.id = "header_user_text";
  header_user_text.style.marginLeft = "50px";
  header_user_text.style.marginBottom = "5px";
  header_user_text.style.wordSpacing = "2px";;
  header_user_text.style.letterSpacing = "2px";
  header_title_user_div.appendChild(header_user_text);


  const header_contorls_div = document.createElement('div');
  My_Div.Init(header_contorls_div, 'header_contorls_div','header_contorls_div', '100%', '100%', '');
  My_Div.Set_Block(header_contorls_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.RIGHT);
  header_contorls_div.style.paddingRight = "5px";

  const header_contorls_findsvg = Get_find_in_page_SVG("100%", "100%", "70%","100%","#F6F7F7","");
  My_Div.Init(header_contorls_findsvg, 'header_contorls_findsvg','header_contorls_findsvg', '60px', '80%', '');
  My_Div.Set_Block(header_contorls_findsvg, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.RIGHT);
  header_contorls_findsvg.style.backgroundColor = "dimgray";
  header_contorls_findsvg.onclick = header_findsvg_Click;
  header_contorls_findsvg.style.marginRight = "3px";
  header_contorls_findsvg.style.borderRadius = "5px";
  header_contorls_div.appendChild(header_contorls_findsvg);

  const header_contorls_addsvg = Get_add_SVG("100%", "100%", "70%","100%","#F6F7F7","");
  My_Div.Init(header_contorls_addsvg, 'header_contorls_addsvg','header_contorls_addsvg', '60px', '80%', '');
  My_Div.Set_Block(header_contorls_addsvg, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.RIGHT);
  header_contorls_addsvg.style.backgroundColor = "dimgray";
  header_contorls_addsvg.style.marginRight = "3px";
  header_contorls_addsvg.style.borderRadius = "5px";
  header_contorls_addsvg.onclick = header_addsvg_Click;
  header_contorls_div.appendChild(header_contorls_addsvg);  

  const header_contorls_uploadsvg = Get_upload_SVG("100%", "100%", "90%","100%","#F6F7F7","");
  My_Div.Init(header_contorls_uploadsvg, 'header_contorls_uploadsvg','header_contorls_uploadsvg', '60px', '80%', '');
  My_Div.Set_Block(header_contorls_uploadsvg, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.RIGHT);
  header_contorls_uploadsvg.style.backgroundColor = "dimgray";
  header_contorls_uploadsvg.style.marginRight = "3px";
  header_contorls_uploadsvg.style.borderRadius = "5px";
  header_contorls_uploadsvg.style.border = "1px solid #fff";
  header_contorls_uploadsvg.onclick = header_uploadsvg_Click;
  header_contorls_div.appendChild(header_contorls_uploadsvg);  

  header_div.appendChild(header_title_user_div);
  header_div.appendChild(header_contorls_div);


  return header_div;
}
function get_main() 
{
  const main_div = document.createElement("div");
  main_div.id = "main_div";
  main_div.className = "main_div";
  main_div.style.width = "100%";
  main_div.style.height = "100%";
  main_div.style.backgroundColor = "#FFFFFF";
  return main_div;
}
//#endregion

//#region [rgba(0, 255, 0, 0.03)] Event

async function header_addsvg_Click(event) 
{
  show_popup_add();

}
function header_findsvg_Click(event)
{
  show_popup_serch();
}
function header_uploadsvg_Click(event)
{
  show_popup_upload();
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
  if (IC_SN) 
  {
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
//#endregion


//#region [rgba(255, 0, 0, 0.03)] private Function
function getNoDataDiv() 
{
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
  NoData_Text.innerText = "今日無驗收單,請搜尋或創建新單號!";
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
}
//#endregion


