let data;
window.onload = load;
async function load()
{ 
    await set_ip();

}

async function logout_Click()
{
  logout();
  location.href = "../../login.html";
}

async function inspection_Click()
{
  console.log("inspection");
}

async function inventory_Click()
{
  console.log("inventory");
  location.href = "../../storehouse/inventory/frontpage.html";
}

async function orderpicking_Click()
{
  console.log("orderpicking");
}

async function settingbarcode_Click()
{
  console.log("orderpicking");
}


async function lock_Click()
 {
  console.log("license");
  window.alert("需要解鎖此功能，請聯繫「鴻森整合機電」電話號碼為：02-82822040");
}

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
  header_div.style.overflowX = "hidden";
  const header_title_text = document.createElement('div');
  My_Div.Init(header_title_text, 'header_title_text','header_title_text', '100%', '50%', '');
  My_Div.Set_Text(header_title_text ,"智慧藥庫功能選單" , TextAlignEnum.CENTER , "32px", true,"微軟正黑體","#FFF");
  header_title_text.id = "header_title_text";
  header_div.appendChild(header_title_text);
  return header_div;
}
function get_userinfo()
{
  const userinfo_div = document.createElement("div");
  My_Div.Init(userinfo_div, 'userinfo_div','userinfo_div', '250px', '60px', 'rgba(255, 255, 255, 0.85)');
  My_Div.Set_Block(userinfo_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  userinfo_div.style.borderRadius = "5px";
  userinfo_div.style.boxShadow = "4px 4px 15px rgba(0, 0, 0, 0.9)";
  userinfo_div.style.marginTop = "10px";

  const userinfo_svg = Get_user_SVG("70%", "70%", "70%","70%","","none");
  My_Div.Init(userinfo_svg, 'userinfo_svg','userinfo_svg', '30%', '100%', '');
  My_Div.Set_Block(userinfo_svg, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);

  const userinfo_text_div = document.createElement("div");
  My_Div.Init(userinfo_text_div, 'userinfo_text_div','userinfo_text_div', '40%', '100%', '');
  My_Div.Set_Block(userinfo_text_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  My_Div.Set_Text(userinfo_text_div ,get_logedName() , TextAlignEnum.CENTER , "22px", true,"","");

  const logout_svg = Get_logout_SVG("80%", "80%", "80%","80%","","none");
  My_Div.Init(logout_svg, 'logout_svg','logout_svg', '30%', '100%', '');
  My_Div.Set_Block(logout_svg, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  logout_svg.onclick = logout_Click;

   userinfo_div.appendChild(userinfo_svg);
   userinfo_div.appendChild(userinfo_text_div);
   userinfo_div.appendChild(logout_svg);
  return userinfo_div;
}

function get_main() 
{
  const main_div = document.createElement("div");
  My_Div.Init(main_div, 'main_div','main_div', '100%', '100%', '');
  My_Div.Set_Block(main_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUM, JustifyContentEnum.TOP);
  const choose_text_div = document.createElement("div");
  My_Div.Init(choose_text_div, 'choose_text_div','choose_text_div', '100%', '5%', '');
  My_Div.Set_Block(choose_text_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUM, JustifyContentEnum.TOP);
  My_Div.Set_Text(choose_text_div ,"請選擇工作項目" , TextAlignEnum.CENTER , "24px", true,"微軟正黑體","");
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

  function get_inspection()
{
  const inspection_div = document.createElement("div");
  My_Div.Init(inspection_div, 'inspection_div','inspection_div', '180px', '120px', 'rgba(255, 255, 255, 0.85)');
  My_Div.Set_Block(inspection_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUM, JustifyContentEnum.CENTER);
  inspection_div.style.borderRadius = "5px";
  inspection_div.style.boxShadow = "4px 4px 15px rgba(0, 0, 0, 0.9)";
  inspection_div.style.margin = "5px";
  inspection_div.onclick =  inspection_Click;

  const svg_text_div = document.createElement("div");
  My_Div.Init(svg_text_div, 'svg_text_div','svg_text_div', '100%', '50%', '');
  My_Div.Set_Block(svg_text_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);

  const inspection_svg = Get_pill_SVG("80%", "80%", "80%","80%","black","");
  My_Div.Init(inspection_svg, 'inspection_svg','inspection_svg', '30%', '100%', '');
  My_Div.Set_Block(inspection_svg, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
  inspection_svg.style.marginLeft = '10px';
  const inspection_text_div = document.createElement("div");
  My_Div.Init(inspection_text_div, 'inspection_text_div','inspection_text_div', '70%', '100%', '');
  My_Div.Set_Block(inspection_text_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  My_Div.Set_Text(inspection_text_div ,"驗收" , TextAlignEnum.CENTER , "30px", true,"微軟正黑體","");
  inspection_text_div.style.textTransform = 'uppercase';
  inspection_text_div.style.backgroundImage = 'linear-gradient(to right, #000046, #000046)';
  inspection_text_div.style.backgroundClip = 'text';
  inspection_text_div.style.webkitBackgroundClip = 'text';
  inspection_text_div.style.webkitTextFillColor = 'transparent';
  inspection_text_div.style.borderTopRightRadius = "10px";
  inspection_text_div.style.borderBottomRightRadius = "10px";

  const inspection_text_eng_div = document.createElement("div");
  My_Div.Init(inspection_text_eng_div, 'inspection_text_eng_div','inspection_text_eng_div', '100%', '20%', '');
  My_Div.Set_Block(inspection_text_eng_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  My_Div.Set_Text(inspection_text_eng_div ,"Inspection" , TextAlignEnum.CENTER , "18px", true,"","");
  inspection_text_eng_div.style.backgroundImage = 'linear-gradient(to right, #000046, #000046)';
  inspection_text_eng_div.style.backgroundClip = 'text';
  inspection_text_eng_div.style.webkitBackgroundClip = 'text';
  inspection_text_eng_div.style.webkitTextFillColor = 'transparent';
  inspection_text_eng_div.style.borderTopRightRadius = "10px";
  inspection_text_eng_div.style.borderBottomRightRadius = "10px";

  inspection_div.appendChild(svg_text_div);
  svg_text_div.appendChild(inspection_svg);
  svg_text_div.appendChild(inspection_text_div);
  inspection_div.appendChild(inspection_text_eng_div);
  return inspection_div;
}

function get_inventory()
{
  const inventory_div = document.createElement("div");
  My_Div.Init(inventory_div, 'inventory_div','inventory_div', '180px', '120px', 'rgba(255, 255, 255, 0.85)');
  My_Div.Set_Block(inventory_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUM, JustifyContentEnum.CENTER);
  inventory_div.style.borderRadius = "5px";
  inventory_div.style.boxShadow = "4px 4px 15px rgba(0, 0, 0, 0.9)";
  inventory_div.style.margin = "5px";
  inventory_div.onclick =  inventory_Click;

  const svg_text_div = document.createElement("div");
  My_Div.Init(svg_text_div, 'svg_text_div','svg_text_div', '100%', '50%', '');
  My_Div.Set_Block(svg_text_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);

  const inventory_svg = Get_storehouse_SVG("80%", "80%", "80%","80%","black","");
  My_Div.Init(inventory_svg, 'inventory_svg','inventory_svg', '30%', '100%', '');
  My_Div.Set_Block(inventory_svg, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
  inventory_svg.style.marginLeft = '10px';
  const inventory_text_div = document.createElement("div");
  My_Div.Init(inventory_text_div, 'inventory_text_div','inventory_text_div', '70%', '100%', '');
  My_Div.Set_Block(inventory_text_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  My_Div.Set_Text(inventory_text_div ,"盤點" , TextAlignEnum.CENTER , "30px", true,"微軟正黑體","");
  inventory_text_div.style.backgroundImage = 'linear-gradient(to right, #000046, #000046)';
  inventory_text_div.style.backgroundClip = 'text';
  inventory_text_div.style.webkitBackgroundClip = 'text';
  inventory_text_div.style.webkitTextFillColor = 'transparent';
  inventory_text_div.style.borderTopRightRadius = "10px";
  inventory_text_div.style.borderBottomRightRadius = "10px";

  const inventory_text_eng_div = document.createElement("div");
  My_Div.Init( inventory_text_eng_div, ' inventory_text_eng_div',' inventory_text_eng_div', '100%', '20%', '');
  My_Div.Set_Block( inventory_text_eng_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  My_Div.Set_Text( inventory_text_eng_div ,"Inventory" , TextAlignEnum.CENTER , "18px", true,"","");
  inventory_text_eng_div.style.backgroundImage = 'linear-gradient(to right, #000046, #000046)';
  inventory_text_eng_div.style.backgroundClip = 'text';
  inventory_text_eng_div.style.webkitBackgroundClip = 'text';
  inventory_text_eng_div.style.webkitTextFillColor = 'transparent';
  inventory_text_eng_div.style.borderTopRightRadius = "10px";
  inventory_text_eng_div.style.borderBottomRightRadius = "10px";

  inventory_div.appendChild(svg_text_div);
  svg_text_div.appendChild(inventory_svg);
  svg_text_div.appendChild(inventory_text_div);
  inventory_div.appendChild(inventory_text_eng_div);
  return inventory_div;
}

function get_orderpicking()
{
  const orderpicking_div = document.createElement("div");
  My_Div.Init(orderpicking_div, 'orderpicking_div','orderpicking_div', '180px', '120px', 'rgba(255, 255, 255, 0.85)');
  My_Div.Set_Block(orderpicking_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUM, JustifyContentEnum.CENTER);
  orderpicking_div.style.borderRadius = "5px";
  orderpicking_div.style.boxShadow = "4px 4px 15px rgba(0, 0, 0, 0.9)";
  orderpicking_div.style.margin = "5px";
  orderpicking_div.id = "orderpicking_div";
  orderpicking_div.onclick =  orderpicking_Click;

  const svg_text_div = document.createElement("div");
  My_Div.Init(svg_text_div, 'svg_text_div','svg_text_div', '100%', '50%', '');
  My_Div.Set_Block(svg_text_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);

  const orderpicking_svg = Get_ward_SVG("80%", "80%", "80%","80%","gray","");
  My_Div.Init(orderpicking_svg, 'orderpicking_svg','orderpicking_svg', '30%', '100%', '');
  My_Div.Set_Block(orderpicking_svg, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
  orderpicking_svg.style.marginLeft = '10px';
  const orderpicking_text_div = document.createElement("div");
  My_Div.Init(orderpicking_text_div, 'orderpicking_text_div','orderpicking_text_div', '70%', '100%', '');
  My_Div.Set_Block(orderpicking_text_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  My_Div.Set_Text(orderpicking_text_div ,"揀貨" , TextAlignEnum.CENTER , "30px", true,"微軟正黑體","");
  orderpicking_text_div.style.backgroundImage = 'linear-gradient(to right, #000046, #000046)';
  orderpicking_text_div.style.backgroundClip = 'text';
  orderpicking_text_div.style.webkitBackgroundClip = 'text';
  orderpicking_text_div.style.webkitTextFillColor = 'transparent';
  orderpicking_text_div.style.borderTopRightRadius = "10px";
  orderpicking_text_div.style.borderBottomRightRadius = "10px";

  const orderpicking_text_eng_div = document.createElement("div");
  My_Div.Init( orderpicking_text_eng_div, ' orderpicking_text_eng_div',' orderpicking_text_eng_div', '100%', '30%', '');
  My_Div.Set_Block( orderpicking_text_eng_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  My_Div.Set_Text( orderpicking_text_eng_div ,"Order Picking" , TextAlignEnum.CENTER , "17px", true,"","");
  orderpicking_text_eng_div.style.backgroundImage = 'linear-gradient(to right, #000046, #000046)';
  orderpicking_text_eng_div.style.backgroundClip = 'text';
  orderpicking_text_eng_div.style.wordBreak = "break-word";
  orderpicking_text_eng_div.style.webkitBackgroundClip = 'text';
  orderpicking_text_eng_div.style.webkitTextFillColor = 'transparent';
  orderpicking_text_eng_div.style.borderTopRightRadius = "10px";
  orderpicking_text_eng_div.style.borderBottomRightRadius = "10px";

  orderpicking_div.appendChild(svg_text_div);
  svg_text_div.appendChild(orderpicking_svg);
  svg_text_div.appendChild(orderpicking_text_div);
  orderpicking_div.appendChild(orderpicking_text_eng_div);

  // //沒有LICENSE上鎖
  // const lock_div = get_Lock(); // 呼叫 get_Lock 函式獲取 lock_div
  // orderpicking_div.appendChild(lock_div); // 添加 lock_div 到 orderpicking_div 中

  return orderpicking_div;
}

function get_settingbarcode()
{
  const settingbarcode_div = document.createElement("div");
  My_Div.Init(settingbarcode_div, 'settingbarcode_div','settingbarcode_div', '180px', '120px', 'rgba(255, 255, 255, 0.85)');
  My_Div.Set_Block(settingbarcode_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUM, JustifyContentEnum.CENTER);
  settingbarcode_div.style.borderRadius = "5px";
  settingbarcode_div.style.boxShadow = "4px 4px 15px rgba(0, 0, 0, 0.9)";
  settingbarcode_div.style.margin = "5px";
  settingbarcode_div.id = "settingbarcode_div";
  settingbarcode_div.onclick = settingbarcode_Click;

  const svg_text_div = document.createElement("div");
  My_Div.Init(svg_text_div, 'svg_text_div','svg_text_div', '100%', '50%', '');
  My_Div.Set_Block(svg_text_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);

  const settingbarcode_svg = Get_ward_SVG("80%", "80%", "80%","80%","gray","");
  My_Div.Init(settingbarcode_svg, 'settingbarcode_svg','settingbarcode_svg', '30%', '100%', '');
  My_Div.Set_Block(settingbarcode_svg, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
  settingbarcode_svg.style.marginLeft = '10px';
  const settingbarcode_text_div = document.createElement("div");
  My_Div.Init(settingbarcode_text_div, 'settingbarcode_text_div','settingbarcode_text_div', '70%', '100%', '');
  My_Div.Set_Block(settingbarcode_text_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  My_Div.Set_Text(settingbarcode_text_div ,'條碼建置' ,TextAlignEnum.CENTER , "22px", true,"微軟正黑體","");;
  settingbarcode_text_div.style.backgroundImage = 'linear-gradient(to right, #000046, #000046)';
  settingbarcode_text_div.style.backgroundClip = 'text';
  settingbarcode_text_div.style.webkitBackgroundClip = 'text';
  settingbarcode_text_div.style.webkitTextFillColor = 'transparent';
  settingbarcode_text_div.style.borderTopRightRadius = "10px";
  settingbarcode_text_div.style.borderBottomRightRadius = "10px";

  const settingbarcode_text_eng_div = document.createElement("div");
  My_Div.Init( settingbarcode_text_eng_div, ' settingbarcode_text_eng_div',' settingbarcode_text_eng_div', '100%', '30%', '');
  My_Div.Set_Block( settingbarcode_text_eng_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  My_Div.Set_Text( settingbarcode_text_eng_div ,"Setting Barcode" , TextAlignEnum.CENTER , "15px", true,"","");
   settingbarcode_text_eng_div.style.backgroundImage = 'linear-gradient(to right, #000046, #000046)';
   settingbarcode_text_eng_div.style.backgroundClip = 'text';
   settingbarcode_text_eng_div.style.wordBreak = "break-word";
   settingbarcode_text_eng_div.style.webkitBackgroundClip = 'text';
   settingbarcode_text_eng_div.style.webkitTextFillColor = 'transparent';
   settingbarcode_text_eng_div.style.borderTopRightRadius = "10px";
   settingbarcode_text_eng_div.style.borderBottomRightRadius = "10px";

  settingbarcode_div.appendChild(svg_text_div);
  svg_text_div.appendChild(settingbarcode_svg);
  svg_text_div.appendChild(settingbarcode_text_div);
  settingbarcode_div.appendChild(settingbarcode_text_eng_div);

  // //沒有LICENSE上鎖
  // const lock_div = get_Lock(); // 呼叫 get_Lock 函式獲取 lock_div
  // settingbarcode_div.appendChild(lock_div); // 添加 lock_div 到 settingbarcode_div 中

  return settingbarcode_div;
}



function get_Lock()
{
  const lock_div = document.createElement("div");
  My_Div.Init(lock_div, 'lock_div','lock_div', '240px', '120px', 'rgba(128, 128, 128, 0.85)');
  My_Div.Set_Block(lock_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  lock_div.style.position= "absolute";
  lock_div.style.borderRadius = "5px";

  const lock_svg = Get_licenselock_SVG("80%", "80%", "80%","80%","darkred","none");
  My_Div.Init(lock_svg, 'lock_svg','lock_svg', '100%', '100%', '');
  My_Div.Set_Block(lock_svg, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  lock_svg.onclick = lock_Click;

  lock_div.appendChild(lock_svg);


  return lock_div;

  document.getElementById("orderpicking_div").addEventListener("scroll", function() {
    // 取得 orderpicking_div 的位置
    const orderpickingDivRect = document.getElementById("orderpicking_div").getBoundingClientRect();
    lock_div.style.top = orderpickingDivRect.top + "px";
    lock_div.style.left = orderpickingDivRect.left + "px";
  });
}

