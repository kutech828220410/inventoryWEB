let response = [];
let data = [];
let device_basic = [];
let device_current = null;
var loging_name = get_logedName();
var current_IC_SN = "";
let allrows = [];
setInterval(function() 
{

}, 200);


window.onload = load;

function handleResize() 
{
  Set_popup_find_position();
}
async function load()
{ 
    check_session_off();
    ServerName = "DS01";
    ServerType = "藥庫";
    TableName = "medicine_page_cloud";
    DbName = "dbvm";
    APIServer = await LoadAPIServer();
    const API01 = serch_APIServer(ServerName,ServerType,"API01");
    const API02 = serch_APIServer(ServerName,ServerType,"API02");
    console.log("API01",API01);
    console.log("API02",API02);
    await check_ip(API01[0].server,API02[0].server);
    console.log("MED_page_url",MED_page_url);

    const Loadingpopup = GetLoadingpopup();
    document.body.appendChild(Loadingpopup);
    Set_main_div_enable(true);
 

    data = await device_all_storage();
    device_basic = data.Data;
    page_Init(device_basic);
   
    // data = await creat_get_by_IC_SN(IC_SN);
    // const device_basic_result = await device_all();
    // device_basic = device_basic_result.Data;
    // console.log("device_basic" , device_basic);
    // page_Init(data);
    // edit_herader_view_QTY();
    Set_main_div_enable(false);


}
function page_Init(device_basic) 
{
  console.log("device_basic",device_basic);
  const main_div = document.querySelector('#main_div');
  main_div.innerHTML = "";
  
  const ip_input_div = document.createElement('div');
  My_Div.Init(ip_input_div, 'ip_input_div','ip_input_div', '100%', '100px', '');
  My_Div.Set_Block(ip_input_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  ip_input_div.style.top = "50%";
  ip_input_div.style.left = "50%";
  main_div.appendChild(ip_input_div);

  const ip_input_text = document.createElement('input');
  My_Div.Init(ip_input_text, 'ip_input_text','ip_input_text', '70%','100px','');
  My_Div.Set_Text(ip_input_text, ``, TextAlignEnum.CENTER, "26px", true,"微軟正黑體","black");
  ip_input_text.readOnly = false;
  ip_input_text.type = "text";
  ip_input_text.inputMode = "latin";
  ip_input_text.style.backgroundColor = "";
  ip_input_text.style.borderRadius = "5px";
  ip_input_text.style.marginLeft = "10px";
  ip_input_text.style.marginRight = "10px";
  ip_input_text.placeholder = "XXX.XXX";
  ip_input_div.appendChild(ip_input_text);

  const ip_input_donesvg = Get_find_check_SVG("100%", "100%", "70%","100%","black","");
  My_Div.Init(ip_input_donesvg, 'ip_input_donesvg','ip_input_donesvg', '100px', '100px', '');
  My_Div.Set_Block(ip_input_donesvg, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.RIGHT);
  ip_input_donesvg.style.border = "1px solid black";
  ip_input_donesvg.style.marginRight = "10px";
  ip_input_donesvg.style.borderRadius = "3px";
  ip_input_donesvg.onclick = donesvg_Click;
  ip_input_div.appendChild(ip_input_donesvg);  


  const label_ip_input_text = document.createElement('div');
  My_Div.Init(label_ip_input_text, 'label_ip_input_text','label_ip_input_text', '100%', '80px', '');
  My_Div.Set_Text(label_ip_input_text ,"(請輸入IP 或 掃描面板條碼)" , TextAlignEnum.CENTER , "20px", true,"微軟正黑體","RED");
  label_ip_input_text.className = "label_ip_input_text";
  label_ip_input_text.id = "label_ip_input_text";
  label_ip_input_text.style.wordSpacing = "2px";;
  label_ip_input_text.style.letterSpacing = "2px";
  main_div.appendChild(label_ip_input_text);

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
function Sort_device_basic_byCode(Code)
{
  let ary = [];
  for(var i = 0; i < device_basic.length; i++)
  {
     if(device_basic[i].Code == Code)
     {
       ary.push(device_basic[i]);
     }
  }
  return ary;
}
async function light_device_by_Code(Code ,Color)
{
  const temp = Sort_device_basic_byCode(Code)
  device_light(Color , temp);
}

async function donesvg_Click() 
{
    const ip_input_text = document.querySelector(`#ip_input_text`);
    if(!ip_input_text.value)
    {
      alert("未輸入資料!");
      return;
    }
    device_current = await device_sort_by_ip(ip_input_text.value);
    if(device.Data.length == 0)
    {
      alert("找無儲位資訊!");
      return;
    }
}
function findsvg_Click()
{
    show_popup_serch();
}
function allsvg_Click()
{
  for(var i = 0; i < allrows.length ; i++)
  {
      allrows[i].style.display = "inline-block";
      allrows[i].style.visibility = "visible";
  }
}


function get_header()
{

  const coverage_div = document.createElement('div');
  My_Div.Init(coverage_div, 'coverage_div','coverage_div', '100%', '100%', '');
  My_Div.Set_Block(coverage_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.TOP);

  const header_div = document.createElement('div');
  My_Div.Init(header_div, 'header_div','header_div', '100%', '70px', '');
  My_Div.Set_Block(header_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
  My_Div.Set_position(header_div ,PositionEnum.FIXED ,0,0);
  header_div.style.background = "linear-gradient(90deg, rgba(186, 185, 208, 1) 0%, rgba(235, 235, 235, 1) 100%)";
  header_div.style.overflowX = "hidden";
 

  const header_title_user_div = document.createElement('div');
  My_Div.Init(header_title_user_div, 'header_title_user_div','header_title_user_div', '800px', '100%', '');
  My_Div.Set_Block(header_title_user_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.TOP);

  const header_title_text = document.createElement('div');
  My_Div.Init(header_title_text, 'header_title_text','header_title_text', '100%', '50%', '');
  My_Div.Set_Text(header_title_text ,"儲位管理" , TextAlignEnum.LEFT , "24px", true,"微軟正黑體","");
  header_title_text.className = "h1";
  header_title_text.id = "header_title_text";
  header_title_text.style.marginLeft = "20px";
  header_title_text.style.marginTop = "5repx";
  header_title_user_div.appendChild(header_title_text);

  const header_user_text = document.createElement('div');
  My_Div.Init(header_user_text, 'header_user_text','header_user_text', '100%', '50%', '');
  My_Div.Set_Text(header_user_text ,"使用者:" , TextAlignEnum.LEFT , "12x", false,"微軟正黑體","");
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

  const header_contorls_allsvg = Get_all_SVG("100%", "100%", "70%","100%","black","");
  My_Div.Init(header_contorls_allsvg, 'header_contorls_allsvg','header_contorls_allsvg', '60px', '80%', '');
  My_Div.Set_Block(header_contorls_allsvg, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.RIGHT);
  header_contorls_allsvg.style.border = "1px solid black";
  header_contorls_allsvg.style.marginRight = "3px";
  header_contorls_allsvg.style.borderRadius = "3px";
  header_contorls_allsvg.onclick = allsvg_Click;
  header_contorls_div.appendChild(header_contorls_allsvg);  

  const header_contorls_findsvg = Get_find_in_page_SVG("100%", "100%", "70%","100%","black","");
  My_Div.Init(header_contorls_findsvg, 'header_contorls_findsvg','header_contorls_findsvg', '60px', '80%', '');
  My_Div.Set_Block(header_contorls_findsvg, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.RIGHT);
  header_contorls_findsvg.style.border = "1px solid black";
  header_contorls_findsvg.onclick = findsvg_Click;
  header_contorls_findsvg.style.marginRight = "3px";
  header_contorls_findsvg.style.borderRadius = "3px";
  header_contorls_div.appendChild(header_contorls_findsvg);

 

  const herader_view_div = document.createElement('div');
  My_Div.Init(herader_view_div, 'herader_view_div','herader_view_div', '100%', '40px', '');
  My_Div.Set_Block(herader_view_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
  My_Div.Set_position(herader_view_div ,PositionEnum.FIXED ,0,70);
  herader_view_div.style.background = "linear-gradient(90deg, rgba(186, 185, 208, 1) 0%, rgba(235, 235, 235, 1) 100%)";
  herader_view_div.style.overflowX = "hidden";
  herader_view_div.style.overflowY = "hidden";
  herader_view_div.style.borderTop = "1px solid black";
  herader_view_div.style.borderBottom = "1px solid black";

  const herader_view_QTY_Tile_text = document.createElement('div');
  My_Div.Init(herader_view_QTY_Tile_text, 'herader_view_QTY_Tile_text','herader_view_QTY_Tile_text', '70px', '100%', '');
  My_Div.Set_Text(herader_view_QTY_Tile_text ,"已建/總數" , TextAlignEnum.LEFT , "14px", true,"微軟正黑體","");
  herader_view_QTY_Tile_text.style.marginLeft = "5px";
  herader_view_div.appendChild(herader_view_QTY_Tile_text);

  const herader_view_QTY_text = document.createElement('div');
  My_Div.Init(herader_view_QTY_text, 'herader_view_QTY_text','herader_view_QTY_text', '100px', '100%', '');
  My_Div.Set_Text(herader_view_QTY_text ,"0/0" , TextAlignEnum.LEFT , "14px", true,"微軟正黑體","");
  herader_view_QTY_text.style.marginLeft = "5px";
  herader_view_div.appendChild(herader_view_QTY_text);

  header_div.appendChild(header_title_user_div);
  header_div.appendChild(header_contorls_div);
  coverage_div.appendChild(header_div);
  coverage_div.appendChild(herader_view_div);
  return coverage_div;
}
function edit_herader_view_QTY()
{
    const herader_view_QTY_text = document.querySelector("#herader_view_QTY_text");
    const totle_QTY = data.Data.length;
    var QTY = 0;
    for(var i = 0 ; i < data.Data.length ; i++)
    {
       if(data.Data[i].BARCODE.length != 0) QTY++;
    }
    My_Div.Set_Text(herader_view_QTY_text ,`${QTY}/${totle_QTY}` , TextAlignEnum.LEFT , "14px", true,"微軟正黑體","");
}
function get_main() {

  const main_div = document.createElement('div');
  My_Div.Init(main_div, 'main_div','main_div', '100%', '100%', '');
  main_div.style.flexWrap = "";
  if(!isDesktop) 
  {
    console.log("!isDesktop");
    My_Div.Set_Block(main_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.CENTER);
  }
  else
  {
    console.log("isDesktop");
    My_Div.Set_Block(main_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.CENTER);
  }
  My_Div.Set_position(main_div ,PositionEnum.FIXED ,0 ,0);

  // main_div.style.overflowX = "";
  main_div.style.overflowY = "None";

  return main_div;
}



function setUserText()
{
   const userText = document.querySelector("#header_user_text");
   userText.innerText = `使用者:${get_logedName()} ID:${get_loggedID()}`;
}