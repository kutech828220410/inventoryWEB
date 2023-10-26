let data;
window.onload = load;

async function load() 
{
  check_session_off();
  var serverName = sessionStorage.getItem('ServerName');  
  var serverType = sessionStorage.getItem('ServerType');  
  var tableName = sessionStorage.getItem('TableName');  
  console.log("ServerName",serverName);
  console.log("ServerType",serverType);
  console.log("TableName",tableName);
  ServerName = serverName;
  ServerType = serverType;
  TableName = tableName;
  APIServer = await LoadAPIServer();
  const API01 = serch_APIServer(serverName,serverType,"API01");
  const API02 = serch_APIServer(serverName,serverType,"API02");
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


  // nav_bar_create("inventory", test_user_data)
  data = await creat_get_by_CT_TIME_ST_END(date_start,date_end);
  Set_main_div_enable(false);
  current_funtion_check()
}

function current_funtion_check() 
{
  let bottom_gm_nav_card = document.querySelectorAll(".bottom_gm_nav_card")
  
  // 預設頁面
  if (bottom_gm_nav_card[0].classList[1] != "current_funtion") {
    page_Init(data);
    bottom_gm_nav_card[0].classList.add("current_funtion")
  } else {
    return
  }


  bottom_gm_nav_card.forEach(e => {
      e.addEventListener("click", () => {
          switch (e.innerHTML) {
              case "管理":
                current_function_trgger(bottom_gm_nav_card, e)
                  break;

              // case "合併":
              //   current_function_trgger(bottom_gm_nav_card, e)
              //     break;

              default:
                  break;
          }
      })
  });
}

// 頁面功能
function current_function_trgger(div_array, target) {
  // 切換功能
  if (target.classList[1] != "current_funtion") {
      div_array.forEach(e => {
          e.classList.remove("current_funtion")
          target.classList.add("current_funtion")
      });
  } else {
      return
  }

  switch (target.innerHTML) {
      case "管理":
          page_Init(data); 
          break;

      case "合併":
          merge_page_init(data)
          break;

      default:
          break;
  }
}

//#region [rgba(0, 0, 255, 0.03)] public Function
function page_Init(data) 
{
  let header_title_text = document.querySelector("#header_title_text")
  header_title_text.innerHTML = "盤點單號"
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

let isOpen =false;
function header_allsvg_Click()
{
    const menuContainer = document.querySelector("#menuContainer");
    const header_contorls_allsvg = document.querySelector("#header_contorls_allsvg");
    if (isOpen) 
    {
      header_contorls_allsvg.removeChild(header_contorls_allsvg.firstElementChild);
      header_contorls_allsvg.appendChild(Get_hamburger1_SVG("", "", "80%","80%","",""));
      header_contorls_allsvg.style.borderRadius = "8px";
      header_contorls_allsvg.style.backgroundColor="";
      menuContainer.style.opacity = "0"; // 設置透明度為 0
      menuContainer.style.transform = "translateY(-10px)"; // 設置向上位移
      setTimeout(() => {
        menuContainer.style.display = "none"; // 隱藏選單
      }, 500); // 等待過渡完成後隱藏選單
    }
     else
    {
      header_contorls_allsvg.removeChild(header_contorls_allsvg.firstElementChild);
      header_contorls_allsvg.appendChild(Get_hamburger2_SVG("", "", "80%","80%","",""));
      header_contorls_allsvg.style.backgroundColor="gray";
      header_contorls_allsvg.style.borderRadius = "";
      menuContainer.style.display = "block"; // 開啟選單
      setTimeout(() => {
        menuContainer.style.opacity = "1"; // 設置透明度為 1
      menuContainer.style.transform = "translateY(0)"; // 設置向下位移
      }, 100);
      const rect = header_contorls_allsvg.getBoundingClientRect();
      menuContainer.style.top = rect.bottom + "px";
    }
    isOpen = !isOpen; // 切换样式标记
}

function get_header() 
{

  const header_div = document.createElement('div');
  My_Div.Init(header_div, 'header_div','header_div', '100%', '70px', '');
  My_Div.Set_Block(header_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  header_div.style.background = "linear-gradient(90deg, rgba(186, 185, 208, 1) 0%, rgba(235, 235, 235, 1) 100%)";
  header_div.style.overflowX = "hidden";


  const header_title_user_div = document.createElement('div');
  My_Div.Init(header_title_user_div, 'header_title_user_div','header_title_user_div', '100%', '100%', '');
  My_Div.Set_Block(header_title_user_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.LEFT);

  const header_title_text = document.createElement('div');
  My_Div.Init(header_title_text, 'header_title_text','header_title_text', '100%', '50%', '');
  My_Div.Set_Text(header_title_text ,"盤點單號" , TextAlignEnum.LEFT , "24px", true,"微軟正黑體","");
  header_title_text.className = "h1";
  header_title_text.id = "header_title_text";
  header_title_text.style.marginLeft = "20px";
  header_title_text.style.marginTop = "5px";
  header_title_user_div.appendChild(header_title_text);
  header_title_user_div.style.marginLeft = "68px"

  // const header_user_text = document.createElement('div');
  // My_Div.Init(header_user_text, 'header_user_text','header_user_text', '100%', '50%', '');
  // My_Div.Set_Text(header_user_text ,"使用者:" , TextAlignEnum.LEFT , "14px", false,"微軟正黑體","");
  // header_user_text.className = "header_user_text";
  // header_user_text.id = "header_user_text";
  // header_user_text.style.marginLeft = "50px";
  // header_user_text.style.marginBottom = "5px";
  // header_user_text.style.wordSpacing = "2px";;
  // header_user_text.style.letterSpacing = "2px";
  // header_title_user_div.appendChild(header_user_text);


  const header_contorls_div = document.createElement('div');
  My_Div.Init(header_contorls_div, 'header_contorls_div','header_contorls_div', '100%', '100%', '');
  My_Div.Set_Block(header_contorls_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.RIGHT);
  header_contorls_div.style.paddingRight = "5px";

  const header_contorls_allsvg = Get_hamburger1_SVG("", "", "80%","80%","","");
  My_Div.Init(header_contorls_allsvg, 'header_contorls_allsvg','header_contorls_allsvg', '60px', '80%', '');
  My_Div.Set_Block(header_contorls_allsvg, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.RIGHT);
  header_contorls_allsvg.style.border = "1px solid gray";
  header_contorls_allsvg.style.borderRadius = "8px";

  header_contorls_allsvg.onclick = function() {
    header_allsvg_Click();     
  };

  const header_contorls_findsvg = Get_find_in_page_SVG("100%", "100%", "70%","100%","black","");
  My_Div.Init(header_contorls_findsvg, 'header_contorls_findsvg','header_contorls_findsvg', '60px', '80%', '');
  My_Div.Set_Block(header_contorls_findsvg, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.RIGHT);
  header_contorls_findsvg.style.backgroundColor="lightblue";
  header_contorls_findsvg.style.border = "1px solid black";
  header_contorls_findsvg.onclick = header_findsvg_Click;



  const header_contorls_addsvg = Get_add_SVG("100%", "100%", "70%","100%","black","");
  My_Div.Init(header_contorls_addsvg, 'header_contorls_addsvg','header_contorls_addsvg', '60px', '80%', '');
  My_Div.Set_Block(header_contorls_addsvg, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.RIGHT);
  header_contorls_addsvg.style.backgroundColor="lightblue";
  header_contorls_addsvg.style.border = "1px solid black";
  header_contorls_addsvg.onclick = header_addsvg_Click;

  header_contorls_div.appendChild(header_contorls_allsvg); 
   
  const menuContainer = document.createElement('div');
  menuContainer.id = "menuContainer";
  menuContainer.style.display = "none"; // 初始隱藏選單
  menuContainer.style.position = "absolute";
  menuContainer.style.backgroundColor = "#ffffff";

  menuContainer.appendChild(header_contorls_findsvg);
  menuContainer.appendChild(header_contorls_addsvg);
  header_contorls_div.appendChild(menuContainer);


  

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
//#endregion


