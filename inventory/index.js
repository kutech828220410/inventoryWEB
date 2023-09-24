
class StateType
{
  static 等待條碼刷入 = '等待條碼刷入...';
  static 輸入盤點資訊中 = '輸入盤點資訊中...'; 
};
var State = "-----------";
let response = [];
let data = [];
let device_basic = [];
var loging_name = get_logedName();
var current_IC_SN = "";
let allrows = [];
let medicine_page = [];
Window.load = load;
var Header_state;
setInterval(function() 
{
  if(State != Header_state.textContent)
  {
     My_Div.Set_Text(Header_state ,`${State}` , TextAlignEnum.CENTER , "20px", false,"微軟正黑體","white");
  }
  
}, 100);


async function load()
{
 
}

function handleResize() 
{
   Set_popup_find_position();
}
async function popup_login_finished()
{
   popup_creatSelect_div.Show();
}
async function popup_creatSelect_finished()
{
   await init();
}
async function popup_content_input_Load()
{
  
  console.log(`[${arguments.callee.name}]`);
  State = StateType.輸入盤點資訊中;
}
async function popup_content_input_Closed()
{
  console.log(`[${arguments.callee.name}]`);
  State = StateType.等待條碼刷入;
}
async function init()
{ 
    showLoadingPopup();
    sessionStorage.setItem('loggedName', "DELL");        

    const serverName ="";
    const serverType = "網頁";
    APIServer = await LoadAPIServer();
    const API01 = serch_APIServer(serverName,serverType,"API01");
    const API02 = serch_APIServer(serverName,serverType,"API02");
    console.log("API01",API01);
    console.log("API02",API02);
    await check_ip(API01[0].server,API02[0].server);
    console.log("inventory_url",inventory_url);

   
    var IC_SN = sessionStorage.getItem('IC_SN');  
    current_IC_SN = IC_SN;
    medicine_page = await get_medicine_cloud();
    console.log(medicine_page);

    data = await creat_get_by_IC_SN(IC_SN);

    State = StateType.等待條碼刷入;

    page_Init(data);

    setUserText();

    hideLoadingPopup();
}
function page_Init(data) 
{
  const main_div = document.querySelector('#main_div');
  main_div.innerHTML = "";
  console.log("盤點單資料" , data);

  var subContentArray = data.Data[0].Contents.map(function(content) 
  {
    return content.Sub_content.filter(function(subContent) 
    {
        return subContent.OP === get_logedName();
    });
  }).flat();
  subContentArray.sort(function(a, b) 
  {
    var timeA = new Date(a.OP_TIME).getTime();
    var timeB = new Date(b.OP_TIME).getTime();
    return timeB - timeA;
  });
  console.log("subContentArray",subContentArray);

  for (var i = 0; i < subContentArray.length; i++)
  {
    const row = get_row(subContentArray[i]);
    main_div.appendChild(row);
  }

}


async function serch_CODE_input_enter(barcode)
{
    if(barcode == "") return;
    const response = await serch_by_BarCode(barcode, medicine_page.Data);
    console.log("serch_by_BarCode",response)
    if(response.Data.length == 0) 
    {
      alert("查無此藥品");
      return;
    }
    for(var i = 0; i < data.Data[0].Contents.length; i++)
    {

      const CODE = data.Data[0].Contents[i].CODE;     
      if(CODE.toUpperCase() == response.Data[0].CODE.toUpperCase())
      {
        console.log("CODE",CODE);
        show_popup_input(data.Data[0].Contents[i]);
        return;
      }
    }
   
}

let isMultiUser =false;
function header_contorls_viewswitching_click()
{
    if (isMultiUser) 
    {
      const header_contorls_viewswitching = document.querySelector("#header_contorls_viewswitching");
      header_contorls_viewswitching.removeChild(header_contorls_viewswitching.firstChild);
      header_contorls_viewswitching.appendChild(Get_me_SVG("100%", "100%", "70%", "100%", "", ""));
    }
     else
    {
      const header_contorls_viewswitching = document.querySelector("#header_contorls_viewswitching");
      header_contorls_viewswitching.removeChild(header_contorls_viewswitching.firstChild);
      header_contorls_viewswitching.appendChild(Get_others_SVG("100%", "100%", "70%", "100%", "", ""));
    }
    isMultiUser = !isMultiUser; // 切换样式标记
}

function get_header()
{

  const header_div = document.createElement('div');
  My_Div.Init(header_div, 'header_div','header_div', '100%', '', '');
  My_Div.Set_Block(header_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUNM, JustifyContentEnum.LEFT);
  // My_Div.Set_position(header_div ,PositionEnum.FIXED ,0,0);
  header_div.style.overflowX = "hidden";

  //盤點作業標題
  const header_title_text = document.createElement('div');
  My_Div.Init(header_title_text, 'header_title_text','header_title_text', '100%', '', '');
  My_Div.Set_Text(header_title_text ,"盤點作業" , TextAlignEnum.CENTER , "30px", true,"微軟正黑體","");
  header_title_text.className = "h1";
  header_div.appendChild(header_title_text);

  //盤點資訊
  const header_creat_div = document.createElement('div');
  My_Div.Init(header_creat_div, 'header_creat_div','header_creat_div', '100%', '', '');
  My_Div.Set_Block(header_creat_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
  header_creat_div.style.marginTop = "5px";
  const header_userName = document.createElement('div');
  My_Div.Init(header_userName, 'header_userName','header_userName', '100%', '', '');
  My_Div.Set_Text(header_userName ,"姓名 : XXX" , TextAlignEnum.LEFT , "18px", true,"微軟正黑體","");
  header_userName.style.marginLeft = "10px";
  header_creat_div.appendChild(header_userName);

  const header_creat_name = document.createElement('div');
  My_Div.Init(header_creat_name, 'header_creat_text','header_creat_text', '100%', '', '');
  My_Div.Set_Text(header_creat_name ,"區域 : A5" , TextAlignEnum.LEFT , "18px", true,"微軟正黑體","");
  header_creat_name.style.marginLeft = "10px";
  header_creat_div.appendChild(header_creat_name);

  header_div.appendChild(header_creat_div);


  //功能按鈕列
  const header_controls = document.createElement('div');
  My_Div.Init(header_controls, 'header_controls','header_controls', '100%', '', '');
  My_Div.Set_Block(header_controls, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.RIGHT);
  header_controls.style.marginRight = "10px";
  const header_creatselect_btn = document.createElement('button');
  header_creatselect_btn.className = "control_btn";
  My_Div.Init(header_creatselect_btn, 'control_btn','header_creatselect_btn', '', '40px', '');
  My_Div.Set_Text(header_creatselect_btn ,"換區" , TextAlignEnum.CENTER , "16px", false,"微軟正黑體","white");

  const header_serch_btn = document.createElement('button');
  header_serch_btn.className = "control_btn";
  My_Div.Init(header_serch_btn, 'control_btn','header_serch_btn', '', '40px', '');
  My_Div.Set_Text(header_serch_btn ,"搜尋" , TextAlignEnum.CENTER , "16px", false,"微軟正黑體","white");

  const header_refresh_btn = document.createElement('button');
  header_refresh_btn.className = "link_btn";
  My_Div.Init(header_refresh_btn, 'link_btn','header_refresh_btn', '', '40px', '');
  My_Div.Set_Text(header_refresh_btn ,"重新整理" , TextAlignEnum.CENTER , "16px", false,"微軟正黑體","white");



  header_controls.appendChild(header_refresh_btn);
  header_controls.appendChild(header_serch_btn);
  header_controls.appendChild(header_creatselect_btn);

  header_div.appendChild(header_controls);


  //搜尋列
  const header_serch_text = document.createElement('input');
  My_Div.Init(header_serch_text, 'header_serch_text','header_serch_text', '300px', '30px', '');
  My_Div.Set_Text(header_serch_text ,"" , TextAlignEnum.CENTER , "16px", false,"微軟正黑體","black");

  My_Div.Set_Block(header_serch_text, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  header_serch_text.placeholder = '藥碼/料號/條碼 輸入搜尋';
  header_serch_text.style.marginTop = "5px";
  header_serch_text.style.borderRadius = "5px";
  header_serch_text.style.border = "2px solid gray";
  header_serch_text.type = "email";
  header_serch_text.inputMode = "latin";
  header_serch_text.addEventListener('keyup', function(event) 
  {
    
      if (event.keyCode === 13) 
      {  
        serch_CODE_input_enter(header_serch_text.value);
        header_serch_text.value = "";
      }
  });
  header_serch_text.addEventListener("blur", function(event)
  {
       serch_CODE_input_enter(header_serch_text.value);
       header_serch_text.value = "";
  });
  header_div.appendChild(header_serch_text);

  //狀態列
  const header_state = document.createElement('div');
  Header_state = header_state;
  My_Div.Init(header_state, 'header_state','header_state', '100%', '40px', '#c77a05');
  My_Div.Set_Block(header_state, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  My_Div.Set_Text(header_state ,"---------------" , TextAlignEnum.CENTER , "20px", false,"微軟正黑體","white");
  header_state.style.marginTop = "5px";
  header_div.appendChild(header_state);


  return header_div;
}
function edit_herader_view_QTY()
{
    const herader_view_QTY_text = document.querySelector("#herader_view_QTY_text");
    const totle_QTY = data.Data[0].Contents.length;
    var QTY = 0;
    for(var i = 0 ; i < data.Data[0].Contents.length ; i++)
    {
       if(data.Data[0].Contents[i].Sub_content.length != 0) QTY++;
    }
    My_Div.Set_Text(herader_view_QTY_text ,`${QTY}/${totle_QTY}` , TextAlignEnum.LEFT , "14px", true,"微軟正黑體","");
}
function get_main() 
{

  const main_div = document.createElement('div');
  My_Div.Init(main_div, 'main_div','main_div', '100%', '', '');
  main_div.style.flexWrap = "wrap";
  My_Div.Set_Block(main_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  const header_div = document.querySelector('#header_div');
  console.log("header_div",header_div.offsetHeight);
  return main_div;
}
function get_row(Sub_Content)
{
  var _GUID =  Sub_Content.GUID;
  var _Master_GUID =  Sub_Content.Master_GUID;
  var _CODE = Sub_Content.CODE;
  var _SKDIACODE = Sub_Content.SKDIACODE;
  var _QTY = Sub_Content.END_QTY;
  var _TOL_QTY = Sub_Content.TOLTAL_QTY;
  var _NAME = Sub_Content.NAME;
  var _CHT_NAME = Sub_Content.CHT_NAME;

  const row_div = document.createElement('div');
  My_Div.Init(row_div, 'row_div',`row_div_${_GUID}`, '100%', '', '');
  My_Div.Set_Block(row_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUNM, JustifyContentEnum.TOP);
  row_div.setAttribute("GUID", _GUID);
  row_div.setAttribute("Master_GUID", _Master_GUID);


  row_div.style.borderRadius = '10px';
  row_div.style.border = "2px solid black";
  row_div.style.marginTop = '2px';
  row_div.style.marginLeft = '2px';
  row_div.style.marginRight = '2px';
  row_div.style.paddingTop = '5px';
  row_div.style.paddingBottom = '5px';

  const row_content_div01 = document.createElement('div');
  My_Div.Init(row_content_div01, `row_content_div01`,`row_content_div01_${_GUID}`, '100%', '', '');
  My_Div.Set_Block(row_content_div01, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);

  const row_content_sub01_div01 = document.createElement('div');
  My_Div.Init(row_content_sub01_div01, `row_content_sub01_div01`,`row_content_sub01_div01_${_GUID}`, '70%', '', '');
  My_Div.Set_Block(row_content_sub01_div01, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
  row_content_sub01_div01.style.paddingLeft = '10px';

  const row_content_CODE = document.createElement('div');
  My_Div.Set_Text(row_content_CODE ,`藥碼:${_CODE}` , TextAlignEnum.LEFT , "16px", true,"微軟正黑體","black");
  row_content_CODE.style.marginRight = '10px';
  row_content_sub01_div01.appendChild(row_content_CODE);

  const row_content_SKDIACODE = document.createElement('div');
  My_Div.Set_Text(row_content_SKDIACODE ,`料號:${_SKDIACODE}` , TextAlignEnum.LEFT , "16px", true,"微軟正黑體","black");
  row_content_sub01_div01.appendChild(row_content_SKDIACODE);

  const row_content_sub02_div01 = document.createElement('div');
  My_Div.Init(row_content_sub02_div01, 'row_content_sub02_div01',`row_content_sub02_div01__${_GUID}`, '30%', '', '');
  My_Div.Set_Block(row_content_sub02_div01, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.RIGHT);
  row_content_sub02_div01.style.marginRight = '10px';

  const row_content_QTY = document.createElement('div');
  My_Div.Set_Text(row_content_QTY ,`${_QTY}/${_TOL_QTY}` , TextAlignEnum.RIGHT , "18px", true,"微軟正黑體","green");
  row_content_sub02_div01.appendChild(row_content_QTY);

  
  row_content_div01.appendChild(row_content_sub01_div01);
  row_content_div01.appendChild(row_content_sub02_div01);

  const row_content_div02 = document.createElement('div');
  My_Div.Init(row_content_div02, 'row_content_div02',`row_content_div02__${_GUID}`, '100%', '', '');
  My_Div.Set_Block(row_content_div02, DisplayEnum.FLEX, FlexDirectionEnum.COLUNM, JustifyContentEnum.TOP);
  row_content_div02.style.marginTop = '5px';

  const row_content_NAME = document.createElement('div');
  My_Div.Init(row_content_NAME, 'row_content_NAME','row_content_NAME', '100%', '', '');
  My_Div.Set_Text(row_content_NAME ,`(英):${_NAME}` , TextAlignEnum.LEFT , "14px", true,"微軟正黑體","#c88114");
  row_content_NAME.style.marginLeft = '10px';
  row_content_div02.appendChild(row_content_NAME);

  const row_content_CHT_NAME = document.createElement('div');
  My_Div.Init(row_content_CHT_NAME, 'row_content_CHT_NAME','row_content_CHT_NAME', '100%', '', '');
  My_Div.Set_Text(row_content_CHT_NAME ,`(中):${_CHT_NAME}` , TextAlignEnum.LEFT , "14px", true,"微軟正黑體","#c88114");
  row_content_CHT_NAME.style.marginLeft = '10px';
  row_content_div02.appendChild(row_content_CHT_NAME);

  row_div.appendChild(row_content_div01);
  row_div.appendChild(row_content_div02);

  row_div.style.transition = "background-color 0.3s";
  row_div.addEventListener("mouseover", function() 
  {
      row_div.style.border = "5px solid #1b05c7";
      row_div.style.padding = "0px";
      row_div.style.borderRadius = "10px";
  });
  row_div.addEventListener("mouseout", function()
  {
      row_div.style.border = "2px solid black";
      row_div.style.padding = "4px";
      row_div.style.borderRadius = "10px";

  });

  return row_div;
}


function setUserText()
{
   const userText = document.querySelector("#header_userName");
   userText.innerText = `姓名 : ${get_logedName()}`;
}

