let data;
let data_information;


window.onload = load;
window.addEventListener('resize', handleResize);

function handleResize() 
{
    //Set_popup_serch_position();
}
async function load()
{
  check_session_off();
  // var serverName = sessionStorage.getItem('ServerName');  
  var serverName = "管藥";  
  console.log("ServerName",serverName);
  ServerName = serverName;
  ServerType = "調劑台";
  TableName = "medicine_page";
  APIServer = await LoadAPIServer();
  const API01 = serch_APIServer(serverName,"調劑台","API01");
  const API02 = serch_APIServer(serverName,"調劑台","API02");
  console.log("API01",API01);
  console.log("API02",API02);
  check_ip(API01[0].server,API02[0].server);
  permissions = await GetApipermissions();
  console.log(permissions);


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

  nav_bar_create("drugs_report", test_user_data)

  Set_main_div_enable(false);
  page_Init();
}
async function page_Init() 
{
  console.log("data",data);
  const main_div = document.querySelector('#main_div');
  main_div.innerHTML = "";
  var toltal_TXN_QTY = 0;
  if(data != null)
  {
    creat_table(data);

    for (var i = 0; i < data.Data.length; i++) 
    {
      const num = parseInt(data.Data[i].TXN_QTY); 
      toltal_TXN_QTY = toltal_TXN_QTY +  num;
    }
  }
  else
  {
    const NoDataDiv = getNoDataDiv();
    // console.log(NoDataDiv);
    main_div.appendChild(NoDataDiv);
    return;
  }
  

  const numOfdata = document.querySelector("#numOfdata");
  numOfdata.innerText = `總筆數 : ${data.Data.length}`;
  const useqty_div = document.querySelector("#useqty_div");

  useqty_div.innerText = `消耗量 : ${toltal_TXN_QTY * -1}`;

  const code_div = document.querySelector("#code_div");
  code_div.innerText = `藥碼 : ${data_information.Data.CODE}`;
 
  const name_div = document.querySelector("#name_div");
  name_div.innerHTML = `<p style='color:orange;margin-right:6px'>(英)</p>${data_information.Data.NAME}`;

  const chtname_div = document.querySelector("#chtname_div");
  chtname_div.innerHTML = `<p style='color:orange;margin-right:6px'>(中)</p>${data_information.Data.CHT_NAME}`;

  const controlledlevel_div = document.querySelector("#controlledlevel_div");
  var SKDIACODE = data_information.SKDIACODE;
  if ( SKDIACODE == null) SKDIACODE = "N";
  controlledlevel_div.innerText = `${SKDIACODE}`;

  const serch_start_date_input = document.querySelector("#serch_start_date_input");
  const serch_end_date_input = document.querySelector("#serch_end_date_input");
  const startdate_div = document.querySelector("#startdate_div");
  const enddate_div = document.querySelector("#enddate_div");
  startdate_div.innerText = `始 : ${serch_start_date_input.value}`;
  enddate_div.innerText = `末 : ${serch_end_date_input.value}`;


  setUserText();

}

function handleResize() 
{
  Set_popup_serch_position();
}

function Set_main_div_enable(value) 
{
    const main_div = document.querySelector('#main_div');
    if (value) {
      showLoadingPopup();

    }
    else {
      hideLoadingPopup();
    }
  }
async function download_btn() 
{
  const serch_code_input = document.querySelector("#serch_code_input");
  const serch_start_date_input = document.querySelector("#serch_start_date_input");
  const serch_end_date_input = document.querySelector("#serch_end_date_input");
  const Code = serch_code_input.value;
  const start_time = serch_start_date_input.value;
  const end_time = serch_end_date_input.value;
  Set_main_div_enable(true);
  download_excel_by_serch(Code,start_time,end_time);
  Set_main_div_enable(false);
}

function serchbtn_Click()
{
  show_popup_serch();
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
  // header_div.style.background = "linear-gradient(90deg, rgba(186, 185, 208, 1) 0%, rgba(235, 235, 235, 1) 100%)";
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
  header_title_user_div.style.boxSizing = "border-box";
  header_title_user_div.style.paddingLeft = "60px";

  const header_title_div = document.createElement("div");
  header_title_div.innerHTML = `<b class="h1">管制藥結存</b>`;
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

  const header_contorls_serchbtn = Get_find_in_page_SVG("100%", "100%", "70%","100%","black","");
  header_contorls_serchbtn.id = "header_contorls_serchbtn";
  header_contorls_serchbtn.className = "header_contorls";
  header_contorls_serchbtn.style.width = "60px";
  header_contorls_serchbtn.style.height = "80%";
  header_contorls_serchbtn.style.marginTop = "5px";
  header_contorls_serchbtn.style.marginRight = "2px";
  header_contorls_serchbtn.style.display = "flex";
  const header_contorls_download_btn = Get_download_SVG("100%", "100%", "90%","100%","black","");
  header_contorls_download_btn.id = "header_contorls_download_btn";
  header_contorls_download_btn.className = "header_contorls";
  header_contorls_download_btn.style.width = "60px";
  header_contorls_download_btn.style.height = "83%";
  header_contorls_download_btn.style.marginTop = "5px";
  header_contorls_download_btn.style.marginRight = "2px";
  header_contorls_download_btn.style.display = "flex";
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
  level_code_date_div.style.height = "15%";
  level_code_date_div.style.justifyContent = "top";
  level_code_date_div.style.alignItems= "center";
  level_code_date_div.style.flexDirection = "row";
  level_code_date_div.style.display = "flex";
  level_code_date_div.style.marginTop = "3px";

  const controlledlevel_div = document.createElement("div");
  controlledlevel_div.id = "controlledlevel_div";
  controlledlevel_div.className = "controlledlevel_div";
  controlledlevel_div.innerText = "N";
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
  code_div.innerText = "藥碼 : ";
  code_div.style.color = "blue";
  code_div.style.fontWeight = "bolder";
  code_div.style.textAlign = "center";
  code_div.style.backgroundColor = "";
  code_div.style.display = "flex";
  code_div.style.width = "30%";
  code_div.style.height = "100%";
  code_div.style.border = "";
  code_div.style.justifyContent = "center";
  code_div.style.alignItems= "center";
  code_div.style.flexDirection = "";
  
  const startdate_div = document.createElement("div");
  startdate_div.id = "startdate_div";
  startdate_div.className = "startdate_div";
  startdate_div.innerText = "始 : YYYY-MM-DD";
  startdate_div.style.fontWeight = "bolder";
  startdate_div.style.textAlign = "center";
  startdate_div.style.display = "flex";
  startdate_div.style.width = "30%";
  startdate_div.style.height = "100%";
  startdate_div.style.border = "";
  startdate_div.style.justifyContent = "center";
  startdate_div.style.alignItems= "center";
  startdate_div.style.flexDirection = "";
  startdate_div.style.fontSize = "12px"; 

  const enddate_div = document.createElement("div");
  enddate_div.id = "enddate_div";
  enddate_div.className = "enddate_div";
  enddate_div.innerText = "末 : YYYY-MM-DD";
  enddate_div.style.fontWeight = "bolder";
  enddate_div.style.textAlign = "center";
  enddate_div.style.display = "flex";
  enddate_div.style.width = "30%";
  enddate_div.style.height = "100%";
  enddate_div.style.border = "";
  enddate_div.style.justifyContent = "center";
  enddate_div.style.alignItems= "center";
  enddate_div.style.flexDirection = "";
  enddate_div.style.fontSize = "12px"; 
  //第二行
  const name_numOfdata = document.createElement("div");
  name_numOfdata.style.width = "100%";
  name_numOfdata.style.height = "30%";
  name_numOfdata.style.borderTopStyle = "ridge";
  name_numOfdata.style.borderColor = "lightgray";
  name_numOfdata.style.justifyContent = "top";
  name_numOfdata.style.alignItems= "center";
  name_numOfdata.style.flexDirection = "row";
  name_numOfdata.style.display = "flex";
  name_numOfdata.style.marginTop = "4px";

  const name_div = document.createElement("div");
  name_div.id = "name_div";
  name_div.className = "name_div";
  name_div.innerHTML = "<p style='color:orange;margin-right:6px'>(英)</p>";
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

  const numOfdata = document.createElement("div");
  numOfdata.id = "numOfdata";
  numOfdata.className = "numOfdata";
  numOfdata.innerText = "總筆數 : 0";
  numOfdata.style.borderLeftStyle = "solid";
  numOfdata.style.borderColor = "orange";
  numOfdata.style.borderWidth = "10px";
  numOfdata.style.fontWeight = "bolder";
  numOfdata.style.textAlign = "left";
  numOfdata.style.display = "flex";
  numOfdata.style.width = "28%";
  numOfdata.style.height = "100%";
  numOfdata.style.justifyContent = "center";
  numOfdata.style.alignItems= "center";
  numOfdata.style.flexDirection = "";
  numOfdata.style.fontSize = "14px"; 


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
  chtname_div.innerHTML = "<p style='color:orange;margin-right:6px'>(中)</p>";
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
  useqty_div.innerText = "消耗量 : 0";
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
  useqty_div.style.fontSize = "14px"; 


  //第四行
  const tablehead_div = creat_column_div();


  coverage_div.appendChild(drughead_div);
  drughead_div.appendChild(level_code_date_div);
  drughead_div.appendChild(name_numOfdata);
  drughead_div.appendChild(chtname_useqty_div);
  drughead_div.appendChild(tablehead_div);

  level_code_date_div.appendChild(controlledlevel_div);
  level_code_date_div.appendChild(code_div);
  level_code_date_div.appendChild(startdate_div);
  level_code_date_div.appendChild(enddate_div);
  name_numOfdata.appendChild(name_div);
  name_numOfdata.appendChild(numOfdata);
  chtname_useqty_div.appendChild(chtname_div);
  chtname_useqty_div.appendChild(useqty_div);



  header_contorls_div.appendChild(header_contorls_serchbtn);
  header_contorls_div.appendChild(header_contorls_download_btn);

 
  
 

  header_contorls_download_btn.onclick = download_btn;
  header_contorls_serchbtn.onclick = serchbtn_Click;
  

  header_div.appendChild(header_title_user_div);
  header_div.appendChild(header_contorls_div);
  


  return coverage_div;
}
function get_main() {
  const main_div = document.createElement("div");
  main_div.id = "main_div";
  main_div.className = "main_div";
  // main_div.style.backgroundColor = "#0000FF";
  main_div.style.width = "100%";
  main_div.style.height = "100%";
  main_div.style.justifyContent = "flex-start";
  main_div.style.marginTop = "250px";
  return main_div;
}

//無資料時顯示
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
    NoData_Text.innerText = "請搜尋管制藥資訊!";
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