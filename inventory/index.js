
class StateType
{
  static 等待條碼刷入 = '等待條碼刷入...';
  static 輸入盤點資訊中 = '輸入盤點資訊中...'; 
  static 搜尋藥品中 = '搜尋藥品中...'; 
};
var current_IC_SN;
var IsLogged = (function() 
{
  return (sessionData.Name != null && sessionData.Name != "");
})();
var IsCreatSelected = (function() 
{
  current_IC_SN = sessionStorage.getItem('IC_SN');
  return (current_IC_SN != null && current_IC_SN != "");
})();

var State = "-----------";
let data = [];
let allrows = [];
let medicine_page = [];
Window.load = load;
var Header_state;
setInterval(function() 
{
   refresh_Header_state();
  
}, 200);
function refresh_Header_state()
{
  if(!popup_creatSelect_div.Get_Visible() && !popup_input_div.Get_Visible()&& !popup_med_serch_div.Get_Visible())State = StateType.等待條碼刷入;
  if(State != Header_state.textContent)
  {
     My_Div.Set_Text(Header_state ,`${State}` , TextAlignEnum.CENTER , "20px", false,"微軟正黑體","white");
  }
}


setInterval(async function() 
{
  if(current_IC_SN != "" && current_IC_SN != null)
  {
    const temp =  await get_creat_Islocked_by_IC_SN(current_IC_SN);
    if(temp.Data == "鎖定")
    {
        console.log("盤點單已鎖定");
        alert("此盤點單被管理者鎖定,即將登出此盤點!");
        sessionStorage.removeItem("login_json");
        sessionStorage.removeItem("IC_SN");
        location.reload();
    }
  }
  
}, 5000);

async function load()
{
 
  
}

function handleResize() 
{
   Set_popup_find_position();
}


async function popup_login_finished()
{
   console.log(`[${arguments.callee.name}]`);
  //  popup_creatSelect_div.Show();
   let popup_creatSelect_creat = await get_all_unlock_creat();
   let creats = popup_creatSelect_creat.Data.filter(function(item) 
   {
      return item.IC_SN.charAt(0) != "Q";
   })
   let count_list = 0;
   let loged_name = get_logedName();
   console.log("loged_name", loged_name);
   creats.forEach((element) => {
      let temp_str = element.DEFAULT_OP;
      let temp_arr = [];
      if (temp_str != "") {
        temp_arr = temp_str.split(',');
      }

      temp_arr.forEach(e => {  
        if (e == loged_name) {
            sessionStorage.setItem('IC_SN', element.IC_SN);
            count_list = count_list + 1;
        }
      });
   });
   
   if(count_list > 1) {
    popup_creatSelect_div.Show();
   } else if (count_list == 1) {
    popup_creatSelect_finished();
   } else {
    popup_creatSelect_div.Show();
   }
}
async function popup_med_serch_finished(CODE)
{
   console.log(`[${arguments.callee.name}]` , CODE);
   const Content = data.Data[0].Contents.filter(function(content)
   {
     return content.CODE == CODE;
   });
   if(Content.length > 0)
   {
      State = StateType.輸入盤點資訊中;
      show_popup_input(Content[0]);
   }
}

async function popup_creatSelect_finished()
{
   console.log(`[${arguments.callee.name}]`);
   await init();
}
async function popup_content_input_Load()
{ 
  console.log(`[${arguments.callee.name}]`);
  const main_div = document.querySelector("#main_div");
  State = StateType.輸入盤點資訊中;
}

async function popup_content_input_Closed()
{
  console.log(`[${arguments.callee.name}]`);

  const main_div = document.querySelector("#main_div");

  // State = StateType.等待條碼刷入;
}
async function popup_med_serch_Load()
{ 
  console.log(`[${arguments.callee.name}]`);
  State = StateType.搜尋藥品中;
}
async function popup_med_serch_Closed()
{
  console.log(`[${arguments.callee.name}]`);
  // State = StateType.等待條碼刷入;
}
async function init()
{ 
    showLoadingPopup();
    // sessionStorage.setItem('loggedName', "DELL");        

    const serverName ="";
    const serverType = "網頁";
    APIServer = await LoadAPIServer();
    const API01 = serch_APIServer(serverName,serverType,"API01");
    const API02 = serch_APIServer(serverName,serverType,"API02");
    console.log("API01",API01);
    console.log("API02",API02);
    await check_ip(API01[0].server,API02[0].server);
    console.log("inventory_url",inventory_url);

    current_IC_SN = sessionStorage.getItem('IC_SN');
    
    var IC_SN = sessionStorage.getItem('IC_SN');  
    current_IC_SN = IC_SN;
    medicine_page = await get_medicine_cloud();
    console.log(medicine_page);
    popup_med_serch_medclass = medicine_page.Data;
    data = await creat_get_by_IC_SN(IC_SN);
    console.log("盤點單資料" , data);
    State = StateType.等待條碼刷入;

    await page_Init(data);
    hideLoadingPopup();
}
async function page_Init(data)
{
  const userText = document.querySelector("#header_userName");
  userText.innerText = `姓名 : ${sessionData.Name}`;
  const header_creat_name = document.querySelector("#header_creat_name");
  header_creat_name.innerText = `區域 : ${data.Data[0].IC_NAME}`;
  const main_div = document.querySelector('#main_div');
  main_div.innerHTML = "";
  My_Div.Init(main_div, 'main_div','main_div', '100%', '', '');
  My_Div.Set_Block(main_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.CENTER);

  main_div.style.flexWrap = "wrap";
  main_div.style.overflowX = "hidden";
  main_div.style.overflowY = "hidden";
  allrows = [];
  await Refresh_rows();
}
async function Refresh_rows()
{
  const main_div = document.querySelector('#main_div');
  My_Div.Set_Block(main_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.CENTER);
  var subContentArray = get_subContentByOP(data);
  for (var i = 0; i < subContentArray.length; i++)
  {
    var row;
    row = allrows.filter(function(row)
    {
       const GUID = row.getAttribute("GUID");
       return subContentArray[i].GUID == GUID;
    });
    
    if(row.length != 0)
    {
        const _QTY = subContentArray[i].END_QTY;
        const _TOL_QTY = subContentArray[i].START_QTY;
        const row_content_QTY = row[0].querySelector(`.row_content_QTY`);
        row[0].style.backgroundColor = "white";
        if(_TOL_QTY == "0" || _TOL_QTY == "") {
          My_Div.Set_Text(row_content_QTY ,`${_QTY}/${_QTY}` , TextAlignEnum.RIGHT , "18px", true,"微軟正黑體","green");
        } else {
          My_Div.Set_Text(row_content_QTY ,`${_QTY}/${_TOL_QTY}` , TextAlignEnum.RIGHT , "18px", true,"微軟正黑體","green");
        }
    }
    else
    {
      // console.log("subContentArray[i]",subContentArray[i]);
      row = get_row(subContentArray[i]);
      row.style.backgroundColor = "white";
      allrows.push(row);
      main_div.appendChild(row);
    }
  }
  for (var i = 0; i < allrows.length; i++)
  {
      var sub_Constent;
      const GUID = allrows[i].getAttribute("GUID");
      sub_Constent = subContentArray.filter(function(sub_constent_temp)
      {
         return GUID == sub_constent_temp.GUID;
      });
      if(sub_Constent == 0)
      {
         main_div.removeChild(allrows[i]);
         allrows[i].setAttribute("remove" , "true");

      }
  }
  allrows = allrows.filter(function(row)
  {
    return row.getAttribute("remove") != "true";
  });
  if(allrows.length > 0)
  {
    // allrows[allrows.length - 1].style.backgroundColor = "";
  }
  const data_temp = data.Data[0].Contents.filter(function(constent){return constent.Sub_content.length > 0;});
  const inventory_num = data_temp.length;
  const inventory_toltal = data.Data[0].Contents.length;
  const header_inventory_num = document.querySelector("#header_inventory_num");
  header_inventory_num.innerText = `已盤 : ${inventory_num}/${inventory_toltal}`;
}
function get_subContentByOP(data)
{
  // var subContentArray = data.Data[0].Contents.map(function(content) 
  // {
  //   return content.Sub_content.filter(function(subContent) 
  //   {
  //       return subContent.OP === sessionData.Name;
  //   });
  // }).flat();
  var subContentArray = data.Data[0].Contents.sort((a, b) => {
    return parseInt(a.INDEX) - parseInt(b.INDEX)
  })

  if(localStorage.getItem("invertory") == "check") {
    subContentArray = subContentArray.filter(function(item) {
      return item.Sub_content.length > 0;
    });
  } else {
    subContentArray = subContentArray.filter(function(item) {
      return item.Sub_content.length === 0;
    });
  }
  
  return subContentArray;
}
function Replace_data_by_content(_data)
{
    const content = _data.Data;
    // console.log(`[${arguments.callee.name}]`,content);
    for(var i = 0 ; i < data.Data[0].Contents.length ; i++)
    {
      if(data.Data[0].Contents[i].GUID == content.GUID)
      {
         console.log("Replace");
         data.Data[0].Contents[i] = JSON.parse(JSON.stringify(content));
      }
    }
    Refresh_rows();
}
async function serch_CODE_input_enter(barcode)
{
    if(barcode == "") return;
    if(medicine_page == undefined) return;
    const response = await serch_by_BarCode(barcode, medicine_page.Data);
    console.log("serch_by_BarCode",response)
    if(medicine_page == undefined) return;
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
function get_header()
{
    // 检查浏览器是否支持localStorage
    if (typeof(Storage) !== "undefined") {
      // 浏览器支持localStorage

      // 存储数据
      if(!localStorage.getItem("invertory")) {
        localStorage.setItem("invertory", "uncheck");
      }
      console.log("設定已盤未盤狀態", localStorage.getItem("invertory"));
  } else {
      // 浏览器不支持localStorage
      console.log("抱歉，您的浏览器不支持LocalStorage。");
  }

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
  My_Div.Set_Text(header_userName ,"姓名 : 無" , TextAlignEnum.LEFT , "18px", true,"微軟正黑體","");
  header_userName.style.marginLeft = "10px";
  header_creat_div.appendChild(header_userName);

  const header_creat_name = document.createElement('div');
  My_Div.Init(header_creat_name, 'header_creat_name','header_creat_name', '100%', '', '');
  My_Div.Set_Text(header_creat_name ,"區域 : 無" , TextAlignEnum.LEFT , "18px", true,"微軟正黑體","");
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
  header_creatselect_btn.addEventListener("click", function()
  {
    popup_creatSelect_div.Show();
  });

  const header_serch_btn = document.createElement('button');
  header_serch_btn.className = "control_btn";
  My_Div.Init(header_serch_btn, 'control_btn','header_serch_btn', '', '40px', '');
  My_Div.Set_Text(header_serch_btn ,"搜尋" , TextAlignEnum.CENTER , "16px", false,"微軟正黑體","white");
  header_serch_btn.addEventListener("click", function()
  {
     popup_med_serch_div.Show();
  });
  
  const header_refresh_btn = document.createElement('button');
  header_refresh_btn.className = "link_btn";
  My_Div.Init(header_refresh_btn, 'link_btn','header_refresh_btn', '', '40px', '');
  My_Div.Set_Text(header_refresh_btn ,"重新整理" , TextAlignEnum.CENTER , "16px", false,"微軟正黑體","white");
  header_refresh_btn.addEventListener("click", function()
  {
      location.reload();
  });
  const header_logout = document.createElement('button');
  header_logout.className = "link_btn";
  My_Div.Init(header_logout, 'link_btn','header_logout', '', '40px', '');
  My_Div.Set_Text(header_logout ,"登出" , TextAlignEnum.CENTER , "16px", false,"微軟正黑體","white");
  header_logout.addEventListener("click", function()
  {
     const confirmResult = confirm(`是否登出系統?`);
     if(confirmResult)
     {
        sessionStorage.removeItem("login_json");
        sessionStorage.removeItem("IC_SN");

        location.reload();
    }
  });

  const header_invertory_check = document.createElement('div');
  header_invertory_check.classList.add("header_invertory_check");
  My_Div.Set_Text(header_invertory_check ,"已盤" , TextAlignEnum.CENTER , "16px", false,"微軟正黑體","");
  header_invertory_check.addEventListener("click",async () => {
    // let header_invertory_check = document.querySelector(".header_invertory_check");
    // let header_invertory_uncheck = document.querySelector(".header_invertory_uncheck");
    header_invertory_check.classList.remove("header_invertory_active");
    header_invertory_uncheck.classList.remove("header_invertory_active");
    localStorage.setItem("invertory", "check");

    header_invertory_check.classList.add("header_invertory_active");

    await Refresh_rows();
  });

  const header_invertory_uncheck = document.createElement('div');
  header_invertory_uncheck.classList.add("header_invertory_uncheck");
  // header_invertory_uncheck.classList.add("header_invertory_active");
  My_Div.Set_Text(header_invertory_uncheck ,"未盤" , TextAlignEnum.CENTER , "16px", false,"微軟正黑體","");
  header_invertory_uncheck.addEventListener("click",async () => {
    header_invertory_check.classList.remove("header_invertory_active");
    header_invertory_uncheck.classList.remove("header_invertory_active");

    localStorage.setItem("invertory", "uncheck");

    header_invertory_uncheck.classList.add("header_invertory_active");

    await Refresh_rows();
  });

  console.log(localStorage.getItem("invertory"));
  if(localStorage.getItem("invertory") == "check") {
    header_invertory_check.classList.remove("header_invertory_active");
    header_invertory_uncheck.classList.remove("header_invertory_active");
    header_invertory_check.classList.add("header_invertory_active");
    // Refresh_rows();
  } else {
    header_invertory_check.classList.remove("header_invertory_active");
    header_invertory_uncheck.classList.remove("header_invertory_active");
    header_invertory_uncheck.classList.add("header_invertory_active");
    // Refresh_rows();
  }
 
  header_controls.appendChild(header_logout);
  header_controls.appendChild(header_refresh_btn);
  header_controls.appendChild(header_serch_btn);
  header_controls.appendChild(header_creatselect_btn);
  header_controls.appendChild(header_invertory_check);
  header_controls.appendChild(header_invertory_uncheck);

  header_div.appendChild(header_controls);


  //搜尋列
  const header_serch_text = document.createElement('input');
  My_Div.Init(header_serch_text, 'header_serch_text','header_serch_text', '250px', '30px', '');
  My_Div.Set_Text(header_serch_text ,"" , TextAlignEnum.CENTER , "16px", false,"微軟正黑體","black");

  My_Div.Set_Block(header_serch_text, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  header_serch_text.placeholder = '藥碼/料號/條碼 輸入搜尋';
  header_serch_text.style.marginTop = "5px";
  header_serch_text.style.borderRadius = "5px";
  header_serch_text.style.border = "2px solid gray";
  header_serch_text.type = "email";
  header_serch_text.inputMode = "text";
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

  const header_inventory_num = document.createElement('div');
  My_Div.Init(header_inventory_num, 'header_inventory_num','header_inventory_num', '40%', '', '');
  My_Div.Set_Text(header_inventory_num ,"已盤 : 0/0" , TextAlignEnum.CENTER , "20px", true,"微軟正黑體","");
  header_div.appendChild(header_inventory_num);

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
  My_Div.Set_Block(main_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.CENTER);

  main_div.style.flexWrap = "wrap";
  main_div.style.overflowX = "hidden";
  main_div.style.overflowY = "hidden";

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
  var _TOL_QTY = Sub_Content.START_QTY;
  var _NAME = Sub_Content.NAME;
  var _CHT_NAME = Sub_Content.CHT_NAME;
  var _STORAGE_NAME = Sub_Content.STORAGE_NAME;

  const row_div = document.createElement('div');
  My_Div.Init(row_div, 'row_div',`row_div_${_GUID}`, '97%', '', '');
  My_Div.Set_Block(row_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUNM, JustifyContentEnum.TOP);
  row_div.setAttribute("GUID", _GUID);
  row_div.setAttribute("Master_GUID", _Master_GUID);

  row_div.style.borderRadius = '10px';
  row_div.style.border = "2px solid black";
  row_div.style.marginTop = '2px';
  // row_div.style.marginLeft = '2px';
  // row_div.style.marginRight = '2px';
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

  const row_content_STORAGE_NAME = document.createElement('div');
  My_Div.Set_Text(row_content_STORAGE_NAME ,`儲位:${_STORAGE_NAME}` , TextAlignEnum.LEFT , "16px", true,"微軟正黑體","black");
  row_content_STORAGE_NAME.style.marginLeft = "12px";
  row_content_sub01_div01.appendChild(row_content_STORAGE_NAME);

  const row_content_sub02_div01 = document.createElement('div');
  My_Div.Init(row_content_sub02_div01, 'row_content_sub02_div01',`row_content_sub02_div01__${_GUID}`, '30%', '', '');
  My_Div.Set_Block(row_content_sub02_div01, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.RIGHT);
  row_content_sub02_div01.style.marginRight = '10px';

  const row_content_QTY = document.createElement('div');
  My_Div.Init(row_content_QTY, 'row_content_QTY',`row_content_QTY${_GUID}`, '30%', '', '');
  if(_TOL_QTY == "0" || _TOL_QTY == "") {
    My_Div.Set_Text(row_content_QTY ,`${_QTY}/${_QTY}` , TextAlignEnum.RIGHT , "18px", true,"微軟正黑體","green");
  } else {
    My_Div.Set_Text(row_content_QTY ,`${_QTY}/${_TOL_QTY}` , TextAlignEnum.RIGHT , "18px", true,"微軟正黑體","green");
  }
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
      row_div.style.paddingTop = '5px';
      row_div.style.paddingBottom = '5px';
      row_div.style.borderRadius = "10px";

  });
  row_div.addEventListener("click", function()
  {
      const Master_GUID = this.getAttribute("GUID");
      const Content = data.Data[0].Contents.filter(function(content)
      {
        return content.GUID == Master_GUID;
      });
      if(Content.length > 0)
      {
         show_popup_input(Content[0]);
      }
  });
  
  return row_div;
}

