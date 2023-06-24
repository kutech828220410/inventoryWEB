let data;
var ServerName = "";
window.onload = load;
async function load() 
{
   ServerName =  sessionStorage.getItem('ServerName');
   console.log(ServerName ,"ServerName");
}

async function logout_Click()
{
  logout();
  location.href = "../../login.html";
}

async function drugsreport_Click()
{
  if(ServerName == null)
  {
    alert("未選擇調劑台號,將返回主頁面");
    logout_Click();
  }
  location.href = "../../pharmacy/controlleddrug/main.html";
}

async function inventory_Click()
{
  
  if(ServerName == null)
  {
    alert("未選擇調劑台號,將返回主頁面");
    logout_Click();
  }
  location.href = "../../pharmacy/inventory/frontpage.html";
}

async function consumptionreport_Click()
{
  console.log("consumptionreport");
  location.href = "../../pharmacy/consumption/main.html";
}

async function appropriation_Click()
 {
  console.log("appropriation");
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
  ServerName =  sessionStorage.getItem('ServerName');
  const header_div = document.createElement('div');
  My_Div.Init(header_div, 'header_div','header_div', '100%', '55px', '');
  My_Div.Set_Block(header_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  header_div.style.overflowX = "hidden";
  const header_title_text = document.createElement('div');
  My_Div.Init(header_title_text, 'header_title_text','header_title_text', '100%', '50%', '');
  My_Div.Set_Text(header_title_text ,`${ServerName} 智慧藥局功能選單` , TextAlignEnum.CENTER , "32px", true,"微軟正黑體","#FFF");
  header_title_text.id = "header_title_text";
  header_title_text.style.marginTop = "5px";
  header_div.appendChild(header_title_text);
  return header_div;
}
function get_main() 
{
  const main_div = document.createElement("div");
  My_Div.Init(main_div, 'main_div','main_div', '100%', '100%', '');
  My_Div.Set_Block(main_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUM, JustifyContentEnum.TOP);
  const row1_div = document.createElement("div");
  My_Div.Init(row1_div, 'row1_div','row1_div', '100%', '120px', '');
  My_Div.Set_Block(row1_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  row1_div.style.marginTop = "10px";

  const row2_div = document.createElement("div");
  My_Div.Init(row2_div, 'row2_div','row2_div', '100%', '120px', '');
  My_Div.Set_Block(row2_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  row2_div.style.marginTop = "10px";

  const drugsreport_div = get_drugsreport();
  const inventory_div = get_inventory();
  const consumptionreport_div = get_consumptionreport();
  const appropriation_div = get_appropriation();
  main_div.appendChild(row1_div);
  main_div.appendChild(row2_div);
  row1_div.appendChild(drugsreport_div);
  row1_div.appendChild(inventory_div);
  row2_div.appendChild(consumptionreport_div);
  row2_div.appendChild(appropriation_div);
  return main_div;
}
function get_userinfo()
{
  const userinfo_div = document.createElement("div");
  My_Div.Init(userinfo_div, 'userinfo_div','userinfo_div', '250px', '60px', 'rgba(255, 255, 255, 0.85)');
  My_Div.Set_Block(userinfo_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  userinfo_div.style.borderRadius = "5px";
  userinfo_div.style.boxShadow = "4px 4px 15px rgba(0, 0, 0, 0.9)";
  userinfo_div.style.marginTop = "10px";
  userinfo_div.style.marginBottom = "5px";

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
function get_choose_text_div()
{
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
  return choose_text_div;
}
function get_drugsreport()
{
  const drugsreport_div = document.createElement("div");
  My_Div.Init(drugsreport_div, 'drugsreport_div','drugsreport_div', '180px', '120px', 'rgba(255, 255, 255, 0.85)');
  My_Div.Set_Block(drugsreport_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUM, JustifyContentEnum.CENTER);
  drugsreport_div.style.borderRadius = "5px";
  drugsreport_div.style.boxShadow = "4px 4px 15px rgba(0, 0, 0, 0.9)";
  drugsreport_div.style.margin = "5px";
  drugsreport_div.onclick =  drugsreport_Click;

  const svg_text_div = document.createElement("div");
  My_Div.Init(svg_text_div, 'svg_text_div','svg_text_div', '100%', '50%', '');
  My_Div.Set_Block(svg_text_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);

  const drugsreport_svg = Get_pill_SVG("80%", "80%", "80%","80%","black","");
  My_Div.Init(drugsreport_svg, 'drugsreport_svg','drugsreport_svg', '30%', '100%', '');
  My_Div.Set_Block(drugsreport_svg, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);

  const drugsreport_text_div = document.createElement("div");
  My_Div.Init(drugsreport_text_div, 'drugsreport_text_div','drugsreport_text_div', '70%', '100%', '');
  My_Div.Set_Block(drugsreport_text_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  My_Div.Set_Text(drugsreport_text_div ,'管制藥\n結存報表' , TextAlignEnum.CENTER , "21px", true,"微軟正黑體","#000046");
  drugsreport_text_div.style.textTransform = 'uppercase';
  drugsreport_text_div.style.backgroundImage = 'linear-gradient(to right, #000046, #000046)';
  drugsreport_text_div.style.backgroundClip = 'text';
  drugsreport_text_div.style.webkitBackgroundClip = 'text';
  drugsreport_text_div.style.webkitTextFillColor = 'transparent';
  drugsreport_text_div.style.borderTopRightRadius = "10px";
  drugsreport_text_div.style.borderBottomRightRadius = "10px";

  const drugsreport_text_eng_div = document.createElement("div");
  My_Div.Init(drugsreport_text_eng_div, 'drugsreport_text_eng_div','drugsreport_text_eng_div', '100%', '20%', '');
  My_Div.Set_Block(drugsreport_text_eng_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  My_Div.Set_Text(drugsreport_text_eng_div ,'Controlled Drugs Report' , TextAlignEnum.CENTER , "14px", true,"","");
  drugsreport_text_eng_div.style.backgroundImage = 'linear-gradient(to right, #000046, #000046)';
  drugsreport_text_eng_div.style.backgroundClip = 'text';
  drugsreport_text_eng_div.style.webkitBackgroundClip = 'text';
  drugsreport_text_eng_div.style.webkitTextFillColor = 'transparent';
  drugsreport_text_eng_div.style.borderTopRightRadius = "10px";
  drugsreport_text_eng_div.style.borderBottomRightRadius = "10px";

  drugsreport_div.appendChild(svg_text_div);
  svg_text_div.appendChild(drugsreport_svg);
  svg_text_div.appendChild(drugsreport_text_div);
  drugsreport_div.appendChild(drugsreport_text_eng_div);
  return drugsreport_div;
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
  inventory_svg.style.marginLeft = "5px";

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

function get_consumptionreport()
{
  const consumptionreport_div = document.createElement("div");
  My_Div.Init(consumptionreport_div, 'consumptionreport_div','consumptionreport_div', '180px', '120px', 'rgba(255, 255, 255, 0.85)');
  My_Div.Set_Block(consumptionreport_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUM, JustifyContentEnum.CENTER);
  consumptionreport_div.style.borderRadius = "5px";
  consumptionreport_div.style.boxShadow = "4px 4px 15px rgba(0, 0, 0, 0.9)";
  consumptionreport_div.style.margin = "5px";
  consumptionreport_div.id = "consumptionreport_div";
  consumptionreport_div.onclick =  consumptionreport_Click;

  const svg_text_div = document.createElement("div");
  My_Div.Init(svg_text_div, 'svg_text_div','svg_text_div', '100%', '50%', '');
  My_Div.Set_Block(svg_text_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);

  const consumptionreport_svg = Get_ward_SVG("80%", "80%", "80%","80%","gray","");
  My_Div.Init(consumptionreport_svg, 'consumptionreport_svg','consumptionreport_svg', '30%', '100%', '');
  My_Div.Set_Block(consumptionreport_svg, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
  consumptionreport_svg.style.margin = "5px";

  const consumptionreport_text_div = document.createElement("div");
  My_Div.Init(consumptionreport_text_div, 'consumptionreport_text_div','consumptionreport_text_div', '70%', '100%', '');
  My_Div.Set_Block(consumptionreport_text_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  My_Div.Set_Text(consumptionreport_text_div ,'藥品\n耗用量' , TextAlignEnum.CENTER , "21px", true,"微軟正黑體","");
  consumptionreport_text_div.style.backgroundImage = 'linear-gradient(to right, #000046, #000046)';
  consumptionreport_text_div.style.backgroundClip = 'text';
  consumptionreport_text_div.style.webkitBackgroundClip = 'text';
  consumptionreport_text_div.style.webkitTextFillColor = 'transparent';
  consumptionreport_text_div.style.borderTopRightRadius = "10px";
  consumptionreport_text_div.style.borderBottomRightRadius = "10px";

  const consumptionreport_text_eng_div = document.createElement("div");
  My_Div.Init( consumptionreport_text_eng_div, ' consumptionreport_text_eng_div',' consumptionreport_text_eng_div', '100%', '20%', '');
  My_Div.Set_Block( consumptionreport_text_eng_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  My_Div.Set_Text( consumptionreport_text_eng_div ,"Consumption Report" , TextAlignEnum.CENTER , "16px", true,"","");
   consumptionreport_text_eng_div.style.backgroundImage = 'linear-gradient(to right, #000046, #000046)';
   consumptionreport_text_eng_div.style.backgroundClip = 'text';
   consumptionreport_text_eng_div.style.wordBreak = "break-word";
   consumptionreport_text_eng_div.style.webkitBackgroundClip = 'text';
   consumptionreport_text_eng_div.style.webkitTextFillColor = 'transparent';
   consumptionreport_text_eng_div.style.borderTopRightRadius = "10px";
   consumptionreport_text_eng_div.style.borderBottomRightRadius = "10px";

  consumptionreport_div.appendChild(svg_text_div);
  svg_text_div.appendChild(consumptionreport_svg);
  svg_text_div.appendChild(consumptionreport_text_div);
  consumptionreport_div.appendChild(consumptionreport_text_eng_div);

  return consumptionreport_div;
}

function get_appropriation()
{
  const appropriation_div = document.createElement("div");
  My_Div.Init(appropriation_div, 'appropriation_div','appropriation_div', '180px', '120px', 'rgba(255, 255, 255, 0.85)');
  My_Div.Set_Block(appropriation_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUM, JustifyContentEnum.CENTER);
  appropriation_div.style.borderRadius = "5px";
  appropriation_div.style.boxShadow = "4px 4px 15px rgba(0, 0, 0, 0.9)";
  appropriation_div.style.margin = "5px";
  appropriation_div.id = "appropriation_div";
  // appropriation_div.onclick = appropriation_Click;

  const svg_text_div = document.createElement("div");
  My_Div.Init(svg_text_div, 'svg_text_div','svg_text_div', '100%', '50%', '');
  My_Div.Set_Block(svg_text_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);

  const appropriation_svg = Get_ward_SVG("80%", "80%", "80%","80%","gray","");
  My_Div.Init(appropriation_svg, 'appropriation_svg','appropriation_svg', '30%', '100%', '');
  My_Div.Set_Block(appropriation_svg, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
  appropriation_svg.style.margin = "5px";

  const appropriation_text_div = document.createElement("div");
  My_Div.Init(appropriation_text_div, 'appropriation_text_div','appropriation_text_div', '70%', '100%', '');
  My_Div.Set_Block(appropriation_text_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  My_Div.Set_Text(appropriation_text_div ,'撥補' ,TextAlignEnum.CENTER , "30px", true,"微軟正黑體","");
  appropriation_text_div.style.backgroundImage = 'linear-gradient(to right, #000046, #000046)';
  appropriation_text_div.style.backgroundClip = 'text';
  appropriation_text_div.style.webkitBackgroundClip = 'text';
  appropriation_text_div.style.webkitTextFillColor = 'transparent';
  appropriation_text_div.style.borderTopRightRadius = "10px";
  appropriation_text_div.style.borderBottomRightRadius = "10px";

  const appropriation_text_eng_div = document.createElement("div");
  My_Div.Init( appropriation_text_eng_div, ' appropriation_text_eng_div',' appropriation_text_eng_div', '100%', '20%', '');
  My_Div.Set_Block( appropriation_text_eng_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  My_Div.Set_Text( appropriation_text_eng_div ,"Appropriation" , TextAlignEnum.CENTER , "16px", true,"","");
   appropriation_text_eng_div.style.backgroundImage = 'linear-gradient(to right, #000046, #000046)';
   appropriation_text_eng_div.style.backgroundClip = 'text';
   appropriation_text_eng_div.style.wordBreak = "break-word";
   appropriation_text_eng_div.style.webkitBackgroundClip = 'text';
   appropriation_text_eng_div.style.webkitTextFillColor = 'transparent';
   appropriation_text_eng_div.style.borderTopRightRadius = "10px";
   appropriation_text_eng_div.style.borderBottomRightRadius = "10px";

  appropriation_div.appendChild(svg_text_div);
  svg_text_div.appendChild(appropriation_svg);
  svg_text_div.appendChild(appropriation_text_div);
  appropriation_div.appendChild(appropriation_text_eng_div);

  //沒有LICENSE上鎖
  const lock_div = get_Lock(); // 呼叫 get_Lock 函式獲取 lock_div
  appropriation_div.appendChild(lock_div); // 添加 lock_div 到 appropriation_div 中

  return appropriation_div;
}



//上鎖功能
function get_Lock()
{
  const lock_div = document.createElement("div");
  My_Div.Init(lock_div, 'lock_div','lock_div', '180px', '120px', 'rgba(128, 128, 128, 0.85)');
  My_Div.Set_Block(lock_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  lock_div.style.position= "absolute";
  lock_div.style.borderRadius = "5px";

  const lock_svg = Get_licenselock_SVG("80%", "80%", "80%","80%","darkred","none");
  My_Div.Init(lock_svg, 'lock_svg','lock_svg', '100%', '100%', '');
  My_Div.Set_Block(lock_svg, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  lock_svg.onclick = lock_Click;

  lock_div.appendChild(lock_svg);


  return lock_div;

  document.getElementById(" appropriation_div").addEventListener("scroll", function() {
    // 取得 consumptionreport_div 的位置
    const appropriationDivRect = document.getElementById(" appropriation_div").getBoundingClientRect();
    lock_div.style.top = appropriationDivRect.top + "px";
    lock_div.style.left = appropriationDivRect.left + "px";
  });
}
async function lock_Click()
{
  console.log("license");
  window.alert("功能未開放,請聯繫服務商!");
}
