let data;
let data_information;


window.onload = load;
window.addEventListener('resize', handleResize);

function handleResize() 
{
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
    console.log(NoDataDiv);
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

  const find_start_date_input = document.querySelector("#find_start_date_input");
  const find_end_date_input = document.querySelector("#find_end_date_input");
  const startdate_div = document.querySelector("#startdate_div");
  const enddate_div = document.querySelector("#enddate_div");
  startdate_div.innerText = `始 : ${find_start_date_input.value}`;
  enddate_div.innerText = `末 : ${find_end_date_input.value}`;


  setUserText();

}

function handleResize() 
{
  Set_popup_find_position();
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
  const find_code_input = document.querySelector("#find_code_input");
  const find_start_date_input = document.querySelector("#find_start_date_input");
  const find_end_date_input = document.querySelector("#find_end_date_input");
  const Code = find_code_input.value;
  const start_time = find_start_date_input.value;
  const end_time = find_end_date_input.value;
  Set_main_div_enable(true);
  download_excel_by_serch(Code,start_time,end_time);
  Set_main_div_enable(false);
}

function findbtn_Click()
{
  
  if(popup_find_div.Get_Visible())
  {
    popup_find_div.Set_Visible(false);
  }
  else
  {
    popup_find_div.Set_Visible(true);

  }
}






function get_header()
{
  const coverage_div =document.createElement("div");
  coverage_div.style.width = "100%";
  coverage_div.style.height = "100%";
  coverage_div.style.display = "flex";
  coverage_div.style.flexDirection = "column";

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
  header_title_div.innerHTML = `<b class="h1">藥品交易量查詢</b>`;
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
  const header_contorls_download_btn = Get_download_SVG("100%", "100%", "70%","100%","black","");
  header_contorls_download_btn.id = "header_contorls_download_btn";
  header_contorls_download_btn.className = "header_contorls";
  header_contorls_download_btn.style.width = "60px";
  header_contorls_download_btn.style.height = "83%";
  header_contorls_download_btn.style.marginTop = "5px";
  header_contorls_download_btn.style.marginRight = "2px";
  header_contorls_download_btn.style.display = "flex";
  //搜尋日期及時間
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

  const level_code_date_div = document.createElement("div");
  level_code_date_div.style.width = "100%";
  level_code_date_div.style.height = "30px";
  level_code_date_div.style.justifyContent = "center";
  level_code_date_div.style.alignItems= "center";
  level_code_date_div.style.flexDirection = "row";
  level_code_date_div.style.display = "flex";
  level_code_date_div.style.marginTop = "70px";

  const startdate_div = document.createElement("div");
  startdate_div.id = "startdate_div";
  startdate_div.className = "startdate_div";
  startdate_div.innerText = "始 : YYYY-MM-DD";
  startdate_div.style.fontWeight = "bolder";
  startdate_div.style.textAlign = "center";
  startdate_div.style.display = "flex";
  startdate_div.style.width = "50%";
  startdate_div.style.height = "100%";
  startdate_div.style.border = "";
  startdate_div.style.justifyContent = "center";
  startdate_div.style.alignItems= "center";
  startdate_div.style.flexDirection = "";
  startdate_div.style.fontSize = "14px"; 

  const enddate_div = document.createElement("div");
  enddate_div.id = "enddate_div";
  enddate_div.className = "enddate_div";
  enddate_div.innerText = "末 : YYYY-MM-DD";
  enddate_div.style.fontWeight = "bolder";
  enddate_div.style.textAlign = "center";
  enddate_div.style.display = "flex";
  enddate_div.style.width = "50%";
  enddate_div.style.height = "100%";
  enddate_div.style.border = "";
  enddate_div.style.justifyContent = "center";
  enddate_div.style.alignItems= "center";
  enddate_div.style.flexDirection = "";
  enddate_div.style.fontSize = "14px"; 
  //藥品資訊表頭
  const tablehead_div = creat_column_div();

  level_code_date_div.appendChild(startdate_div);
  level_code_date_div.appendChild(enddate_div);
  coverage_div.appendChild(level_code_date_div);
  coverage_div.appendChild(tablehead_div);




  header_contorls_div.appendChild(header_contorls_findbtn);
  header_contorls_div.appendChild(header_contorls_download_btn);

 
  
 

  header_contorls_download_btn.onclick = download_btn;
  header_contorls_findbtn.onclick = findbtn_Click;
  

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
  main_div.style.marginTop = "120px";
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
    NoData_Text.innerText = "請搜尋藥品資訊!";
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