let data;
// var device_buf =[];
// window.onresize = function() 
// {
//     const device = checkDeviceType();
//     const screenWidth = getScreenWidth();   
      
//     if(device == DeviceType.MOBILE) 
//     { 
//         if(device != device_buf)
//         {
//             const row_div = document.querySelectorAll(".row_div");
//             for(var i = 0 ; i < row_div.length ; i++)
//             {
//                 row_div[i].style.width = "100%";
//             }
//             device_buf = device;
//         }      
    
//     }
//     else
//     {
//         if(device != device_buf) device_buf = device;
//         const temp = Math.floor(screenWidth / 300);
//         const row_width = screenWidth / temp - 20;
//         const row_div = document.querySelectorAll(".row_div");
//         for(var i = 0 ; i < row_div.length ; i++)
//         {
//             row_div[i].style.width = `${row_width}px`;
//         }
//     }
    
// }
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
  // setUserText();
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
  My_Div.Init(header_div, 'header_div','header_div', '100%', '50px', '');
  My_Div.Set_Block(header_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  // header_div.style.background = "linear-gradient(90deg, rgba(186, 185, 208, 1) 0%, rgba(235, 235, 235, 1) 100%)";
  header_div.style.overflowX = "hidden";
  // header_div.style.borderBottom = "3px solid";


  // const header_title_user_div = document.createElement('div');
  // My_Div.Init(header_title_user_div, 'header_title_user_div','header_title_user_div', '100%', '100%', '');
  // My_Div.Set_Block(header_title_user_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.TOP);

  const header_title_text = document.createElement('div');
  My_Div.Init(header_title_text, 'header_title_text','header_title_text', '100%', '50%', '');
  My_Div.Set_Text(header_title_text ,"智慧藥局系統" , TextAlignEnum.CENTER , "24px", true,"微軟正黑體","#FFF");

  // header_title_text.className = "h1";
  header_title_text.id = "header_title_text";
  // header_title_text.style.marginLeft = "20px";
  // header_title_text.style.marginTop = "5px";
  header_div.appendChild(header_title_text);

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

  const header_contorls_findsvg = Get_find_in_page_SVG("100%", "100%", "70%","100%","black","");
  My_Div.Init(header_contorls_findsvg, 'header_contorls_findsvg','header_contorls_findsvg', '60px', '80%', '');
  My_Div.Set_Block(header_contorls_findsvg, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.RIGHT);
  header_contorls_findsvg.style.border = "1px solid black";
  header_contorls_findsvg.onclick = header_findsvg_Click;
  header_contorls_findsvg.style.marginRight = "3px";
  header_contorls_findsvg.style.borderRadius = "3px";
  header_contorls_div.appendChild(header_contorls_findsvg);

  const header_contorls_addsvg = Get_add_SVG("100%", "100%", "70%","100%","black","");
  My_Div.Init(header_contorls_addsvg, 'header_contorls_addsvg','header_contorls_addsvg', '60px', '80%', '');
  My_Div.Set_Block(header_contorls_addsvg, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.RIGHT);
  header_contorls_addsvg.style.border = "1px solid black";
  header_contorls_addsvg.style.marginRight = "3px";
  header_contorls_addsvg.style.borderRadius = "3px";
  header_contorls_addsvg.onclick = header_addsvg_Click;
  header_contorls_div.appendChild(header_contorls_addsvg);  

  

  // header_div.appendChild(header_title_user_div);
  // header_div.appendChild(header_contorls_div);


  return header_div;
}
function get_main() 
{
  const main_div = document.createElement("div");
  My_Div.Init(main_div, 'main_div','main_div', '100%', '100%', '');
  My_Div.Set_Block(main_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUM, JustifyContentEnum.TOP);
  
  const choose_text_div = document.createElement("div");
  My_Div.Init(choose_text_div, 'choose_text_div','choose_text_div', '100%', '5%', '');
  My_Div.Set_Block(choose_text_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUM, JustifyContentEnum.TOP);
  My_Div.Set_Text(choose_text_div ,"請選擇使用單位" , TextAlignEnum.CENTER , "24px", true,"微軟正黑體","");
  choose_text_div.style.color = '#bbb';
  choose_text_div.style.textTransform = 'uppercase';
  choose_text_div.style.backgroundImage = 'linear-gradient(to right, #777, #ccc)';
  choose_text_div.style.backgroundClip = 'text';
  choose_text_div.style.webkitBackgroundClip = 'text';
  choose_text_div.style.webkitTextFillColor = 'transparent';

  // if(device == DeviceType.MOBILE) 
  // {
  //   main_div.style.width = "100%";
  // }
  // if(device == DeviceType.COMPUTER)
  // {
  //     const temp = Math.floor(screenWidth / 300);
  //     const row_width = screenWidth / temp - 20;
  //     main_div.style.width = `${row_width}px`;
  // } 
  main_div.appendChild(choose_text_div);
  return main_div;
}

function get_pharmacy()
{
  const pharmacy_div = document.createElement("div");
  My_Div.Init(pharmacy_div, 'pharmacy_div','pharmacy_div', '240px', '120px', 'rgba(255, 255, 255, 1)');
  My_Div.Set_Block(pharmacy_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.TOP);
  pharmacy_div.style.borderRadius = "10px";
  pharmacy_div.style.boxShadow = "4px 4px 15px rgba(0, 0, 0, 0.9)";
  pharmacy_div.style.marginTop = "10px";

  const pharmacy_svg = Get_pill_SVG("80%", "80%", "80%","80%","black","");
  My_Div.Init(pharmacy_svg, 'pharmacy_svg','pharmacy_svg', '30%', '100%', '');
  My_Div.Set_Block(pharmacy_svg, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);

  const all_text_div = document.createElement("div");
  My_Div.Init(all_text_div, 'all_text_div','all_text_div', '70%', '100%', '');
  My_Div.Set_Block(all_text_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUM, JustifyContentEnum.CENTER);


  const pharmacy_text_div = document.createElement("div");
  My_Div.Init(pharmacy_text_div, 'pharmacy_text_div','pharmacy_text_div', '100%', '30%', '');
  My_Div.Set_Block(pharmacy_text_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  My_Div.Set_Text(pharmacy_text_div ,"藥局" , TextAlignEnum.CENTER , "30px", true,"微軟正黑體","");
  pharmacy_text_div.style.textTransform = 'uppercase';
  pharmacy_text_div.style.backgroundImage = 'linear-gradient(to right, #000046, #1CB5E0)';
  pharmacy_text_div.style.backgroundClip = 'text';
  pharmacy_text_div.style.webkitBackgroundClip = 'text';
  pharmacy_text_div.style.webkitTextFillColor = 'transparent';
  pharmacy_text_div.style.borderTopRightRadius = "10px";
  pharmacy_text_div.style.borderBottomRightRadius = "10px";

  const pharmacy_text_eng_div = document.createElement("div");
  My_Div.Init(pharmacy_text_eng_div, 'pharmacy_text_eng_div','pharmacy_text_eng_div', '100%', '30%', '');
  My_Div.Set_Block(pharmacy_text_eng_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  My_Div.Set_Text(pharmacy_text_eng_div ,"Pharmacy" , TextAlignEnum.CENTER , "22px", true,"微軟正黑體","");
  pharmacy_text_eng_div.style.textTransform = 'uppercase';
  pharmacy_text_eng_div.style.backgroundImage = 'linear-gradient(to right, #000046, #1CB5E0)';
  pharmacy_text_eng_div.style.backgroundClip = 'text';
  pharmacy_text_eng_div.style.webkitBackgroundClip = 'text';
  pharmacy_text_eng_div.style.webkitTextFillColor = 'transparent';
  pharmacy_text_eng_div.style.borderTopRightRadius = "10px";
  pharmacy_text_eng_div.style.borderBottomRightRadius = "10px";

  pharmacy_div.appendChild(pharmacy_svg);
  pharmacy_div.appendChild(all_text_div);
  all_text_div.appendChild(pharmacy_text_div);
  all_text_div.appendChild(pharmacy_text_eng_div);
  return pharmacy_div;
}

function get_warehouse()
{
  const warehouse_div = document.createElement("div");
  My_Div.Init(warehouse_div, 'warehouse_div','warehouse_div', '240px', '120px', 'rgba(255, 255, 255, 1)');
  My_Div.Set_Block(warehouse_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.TOP);
  warehouse_div.style.borderRadius = "10px";
  warehouse_div.style.boxShadow = "4px 4px 15px rgba(0, 0, 0, 0.9)";
  warehouse_div.style.marginTop = "10px";

  const warehouse_svg = Get_warehouse_SVG("80%", "80%", "80%","80%","black","");
  My_Div.Init(warehouse_svg, 'warehouse_svg','warehouse_svg', '30%', '100%', '');
  My_Div.Set_Block(warehouse_svg, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);

  const all_text_div = document.createElement("div");
  My_Div.Init(all_text_div, 'all_text_div','all_text_div', '70%', '100%', '');
  My_Div.Set_Block(all_text_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUM, JustifyContentEnum.CENTER);


  const warehouse_text_div = document.createElement("div");
  My_Div.Init(warehouse_text_div, 'warehouse_text_div','warehouse_text_div', '100%', '30%', '');
  My_Div.Set_Block(warehouse_text_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  My_Div.Set_Text(warehouse_text_div ,"藥庫" , TextAlignEnum.CENTER , "30px", true,"微軟正黑體","");
  warehouse_text_div.style.textTransform = 'uppercase';
  warehouse_text_div.style.backgroundImage = 'linear-gradient(to right, #000046, #1CB5E0)';
  warehouse_text_div.style.backgroundClip = 'text';
  warehouse_text_div.style.webkitBackgroundClip = 'text';
  warehouse_text_div.style.webkitTextFillColor = 'transparent';
  warehouse_text_div.style.borderTopRightRadius = "10px";
  warehouse_text_div.style.borderBottomRightRadius = "10px";

  const warehouse_text_eng_div = document.createElement("div");
  My_Div.Init( warehouse_text_eng_div, ' warehouse_text_eng_div',' warehouse_text_eng_div', '100%', '30%', '');
  My_Div.Set_Block( warehouse_text_eng_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  My_Div.Set_Text( warehouse_text_eng_div ,"storehouse" , TextAlignEnum.CENTER , "22px", true,"微軟正黑體","");
   warehouse_text_eng_div.style.textTransform = 'uppercase';
   warehouse_text_eng_div.style.backgroundImage = 'linear-gradient(to right, #000046, #1CB5E0)';
   warehouse_text_eng_div.style.backgroundClip = 'text';
   warehouse_text_eng_div.style.webkitBackgroundClip = 'text';
   warehouse_text_eng_div.style.webkitTextFillColor = 'transparent';
   warehouse_text_eng_div.style.borderTopRightRadius = "10px";
   warehouse_text_eng_div.style.borderBottomRightRadius = "10px";

  warehouse_div.appendChild(warehouse_svg);
  warehouse_div.appendChild(all_text_div);
  all_text_div.appendChild(warehouse_text_div);
  all_text_div.appendChild(warehouse_text_eng_div);
  return warehouse_div;
}

function get_ward()
{
  const ward_div = document.createElement("div");
  My_Div.Init(ward_div, 'ward_div','ward_div', '240px', '120px', 'rgba(255, 255, 255, 1)');
  My_Div.Set_Block(ward_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.TOP);
  ward_div.style.borderRadius = "10px";
  ward_div.style.boxShadow = "4px 4px 15px rgba(0, 0, 0, 0.9)";
  ward_div.style.marginTop = "10px";

  const ward_svg = Get_ward_SVG("80%", "80%", "80%","80%","gray","");
  My_Div.Init(ward_svg, 'ward_svg','ward_svg', '30%', '100%', '');
  My_Div.Set_Block(ward_svg, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);

  const all_text_div = document.createElement("div");
  My_Div.Init(all_text_div, 'all_text_div','all_text_div', '70%', '100%', '');
  My_Div.Set_Block(all_text_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUM, JustifyContentEnum.CENTER);


  const ward_text_div = document.createElement("div");
  My_Div.Init(ward_text_div, 'ward_text_div','ward_text_div', '100%', '30%', '');
  My_Div.Set_Block(ward_text_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  My_Div.Set_Text(ward_text_div ,"護理站" , TextAlignEnum.CENTER , "30px", true,"微軟正黑體","");
  ward_text_div.style.textTransform = 'uppercase';
  ward_text_div.style.backgroundImage = 'linear-gradient(to right, #000046, #1CB5E0)';
  ward_text_div.style.backgroundClip = 'text';
  ward_text_div.style.webkitBackgroundClip = 'text';
  ward_text_div.style.webkitTextFillColor = 'transparent';
  ward_text_div.style.borderTopRightRadius = "10px";
  ward_text_div.style.borderBottomRightRadius = "10px";

  const ward_text_eng_div = document.createElement("div");
  My_Div.Init( ward_text_eng_div, ' ward_text_eng_div',' ward_text_eng_div', '100%', '30%', '');
  My_Div.Set_Block( ward_text_eng_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  My_Div.Set_Text( ward_text_eng_div ,"Nursing Station" , TextAlignEnum.CENTER , "18px", true,"微軟正黑體","");
   ward_text_eng_div.style.textTransform = 'uppercase';
   ward_text_eng_div.style.backgroundImage = 'linear-gradient(to right, #000046, #1CB5E0)';
   ward_text_eng_div.style.backgroundClip = 'text';
   ward_text_eng_div.style.webkitBackgroundClip = 'text';
   ward_text_eng_div.style.webkitTextFillColor = 'transparent';
   ward_text_eng_div.style.borderTopRightRadius = "10px";
   ward_text_eng_div.style.borderBottomRightRadius = "10px";

  ward_div.appendChild(ward_svg);
  ward_div.appendChild(all_text_div);
  all_text_div.appendChild(ward_text_div);
  all_text_div.appendChild(ward_text_eng_div);
  return ward_div;
}
//#endregion

//#region [rgba(0, 255, 0, 0.03)] Event
// window.onload = load;
// async function load() 
// {
//   await set_ip();
//   let rowNum = 1;
//   const Loadingpopup = GetLoadingpopup();
//   document.body.appendChild(Loadingpopup);
//   Set_main_div_enable(true);
//   const currentDate = new Date();
//   var date_end = DateTimeAddDays(currentDate, 1);
//   var date_start = DateTimeAddDays(currentDate, -30);
//   date_start = getDateStr(date_start);
//   date_end = getDateStr(date_end);
  
//   data = await creat_get_by_CT_TIME_ST_END(date_start,date_end);
//   Set_main_div_enable(false);
//   page_Init(data);
// }
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
function setUserText() 
{
  const userText = document.querySelector("#header_user_text");
   userText.innerText = `使用者:${get_logedName()} ID:${get_loggedID()}`;
}
//#endregion


