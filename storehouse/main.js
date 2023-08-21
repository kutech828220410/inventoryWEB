let data;
window.onload = load;
var functionality = [];
async function load()
{ 
  ServerName = "DS01";
  ServerType = "藥庫";
  APIServer = await LoadAPIServer();
  const data = serch_APIServer(ServerName,ServerType,"功能");
  functionality = JSON.parse( data[0].value);
  console.log("functionality",functionality);
  const main_div = get_main();
  document.body.appendChild(main_div);
}

async function logout_Click()
{
  logout();
  location.href = "../../login.html";
}

async function back_Click()
{
  location.href = "../../frontpage/main.html";
}

async function home_Click()
{
  location.href = "../../storehouse/main.html";
}

async function inspection_Click()
{
  console.log("inspection");
  location.href = "../../storehouse/inspection/frontpage.html";
}

async function inventory_Click()
{
  console.log("inventory");
  sessionStorage.setItem('ServerName', "DS01");
  sessionStorage.setItem('ServerType', "藥庫");
  sessionStorage.setItem('TableName', "medicine_page_firstclass");
  location.href = "../../inventory/frontpage.html";
}

async function orderpicking_Click()
{
  console.log("orderpicking");
}

async function barcodemanagement_Click()
{
  console.log("barcodemanagement");
  location.href = "../../storehouse/barcodemanagement/main.html";
}

async function storagelocation_Click()
{
  console.log("barcodemanagement");
  location.href = "../../storehouse/storagelocation/main.html";
}

async function lock_Click()
 {
  console.log("license");
  window.alert("功能未開放,請聯繫服務商!");
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
  My_Div.Init(header_div, 'header_div','header_div', '100%', '70px', '');
  My_Div.Set_Block(header_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  header_div.style.overflowX = "hidden";
  const header_title_text = document.createElement('div');
  My_Div.Init(header_title_text, 'header_title_text','header_title_text', '100%', '50%', '');
  My_Div.Set_Text(header_title_text ,"智慧藥庫功能選單" , TextAlignEnum.CENTER , "32px", true,"微軟正黑體","#FFF");
  header_title_text.id = "header_title_text";
  // header_title_text.style.marginTop = "5px";
  header_div.appendChild(header_title_text);
  return header_div;
}


function get_main() 
{
  const main_div = document.createElement("div");
  My_Div.Init(main_div, 'main_div','main_div', '100%', '100%', '');
  My_Div.Set_Block(main_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUM, JustifyContentEnum.TOP);
  // const choose_text_div = document.createElement("div");

  const row1_div = document.createElement("div");
  My_Div.Init(row1_div, 'row1_div','row1_div', '100%', '120px', '');
  My_Div.Set_Block(row1_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  row1_div.style.marginTop = "10px";

  const row2_div = document.createElement("div");
  My_Div.Init(row2_div, 'row2_div','row2_div', '100%', '120px', '');
  My_Div.Set_Block(row2_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  row2_div.style.marginTop = "10px";

  const row3_div = document.createElement("div");
  My_Div.Init(row3_div, 'row3_div','row3_div', '100%', '120px', '');
  My_Div.Set_Block(row3_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  row3_div.style.marginTop = "10px";

  const inspection_div = get_inspection();
  const inventory_div = get_inventory();
  const orderpicking_div = get_orderpicking();
  const barcodemanagement_div = get_barcodemanagement();
  const storagelocation_div = get_storagelocation()

  main_div.appendChild(row1_div);
  main_div.appendChild(row2_div);
  main_div.appendChild(row3_div);
  row1_div.appendChild(inspection_div);
  row1_div.appendChild(inventory_div);
  row2_div.appendChild(orderpicking_div);
  row2_div.appendChild(barcodemanagement_div);
  row3_div.appendChild(storagelocation_div);
  return main_div;
}
function get_userinfo()
{
  const row1_div = document.createElement("div");
  My_Div.Init(row1_div, 'row1_div','row1_div', '370px', '70px', '');
  My_Div.Set_Block(row1_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);

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

  const back_svg = Get_back_SVG("70%", "70%", "70%","70%","black","");
  My_Div.Init(back_svg, 'back_svg','back_svg', '60px', '60px', 'rgba(255, 255, 255, 0.85)');
  My_Div.Set_Block(back_svg, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  back_svg.style.borderRadius = "5px";
  back_svg.style.boxShadow = "4px 4px 15px rgba(0, 0, 0, 0.9)";
  back_svg.style.marginRight = "10px";
  back_svg.style.marginTop = "10px";
  back_svg.onclick = back_Click;

  const home_svg = Get_home_SVG("100%", "100%", "100%","100%","","");
  My_Div.Init(home_svg, 'home_svg','home_svg', '60px', '60px', 'rgba(255, 255, 255, 0.85)');
  My_Div.Set_Block(home_svg, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  home_svg.style.borderRadius = "5px";
  home_svg.style.boxShadow = "4px 4px 15px rgba(0, 0, 0, 0.9)";
  home_svg.style.marginLeft = "10px";
  home_svg.style.marginTop = "10px";
  home_svg.onclick = home_Click;

   userinfo_div.appendChild(userinfo_svg);
   userinfo_div.appendChild(userinfo_text_div);
   userinfo_div.appendChild(logout_svg);
   row1_div.appendChild(back_svg);
   row1_div.appendChild(userinfo_div);
   row1_div.appendChild(home_svg);

  return row1_div;
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
function get_inspection()
{
  const inspection_div = document.createElement("div");
  My_Div.Init(inspection_div, 'inspection_div','inspection_div', '180px', '120px', 'rgba(255, 255, 255, 0.85)');
  My_Div.Set_Block(inspection_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUM, JustifyContentEnum.CENTER);
  inspection_div.style.borderRadius = "5px";
  inspection_div.style.boxShadow = "4px 4px 15px rgba(0, 0, 0, 0.9)";
  inspection_div.style.margin = "5px";
 

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

  if(GetFunctionality("驗收"))
  {
    inspection_div.onclick = inspection_Click;
  }
  else
  {
    inspection_div.appendChild(get_Lock());
  }

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

  if(GetFunctionality("盤點"))
  {
    inventory_div.onclick =  inventory_Click;
  }
  else
  {
    inventory_div.appendChild(get_Lock());
  }

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

  const svg_text_div = document.createElement("div");
  My_Div.Init(svg_text_div, 'svg_text_div','svg_text_div', '100%', '50%', '');
  My_Div.Set_Block(svg_text_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);

  const orderpicking_svg = Get_ward_SVG("80%", "80%", "80%","80%","","");
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

  if(GetFunctionality("鎖"))
  {
    orderpicking_div.onclick =  orderpicking_Click;
  }
  else
  {
    orderpicking_div.appendChild(get_Lock());
  }

  return orderpicking_div;
}

function get_barcodemanagement()
{
  const barcodemanagement_div = document.createElement("div");
  My_Div.Init(barcodemanagement_div, 'barcodemanagement_div','barcodemanagement_div', '180px', '120px', 'rgba(255, 255, 255, 0.85)');
  My_Div.Set_Block(barcodemanagement_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUM, JustifyContentEnum.CENTER);
  barcodemanagement_div.style.borderRadius = "5px";
  barcodemanagement_div.style.boxShadow = "4px 4px 15px rgba(0, 0, 0, 0.9)";
  barcodemanagement_div.style.margin = "5px";
  barcodemanagement_div.id = "barcodemanagement_div";

  const svg_text_div = document.createElement("div");
  My_Div.Init(svg_text_div, 'svg_text_div','svg_text_div', '100%', '50%', '');
  My_Div.Set_Block(svg_text_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);

  const barcodemanagement_svg = Get_barcode_SVG("100%", "100%", "100%","100%","","");
  My_Div.Init(barcodemanagement_svg, 'barcodemanagement_svg','barcodemanagement_svg', '30%', '100%', '');
  My_Div.Set_Block(barcodemanagement_svg, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
  barcodemanagement_svg.style.marginLeft = '10px';
  const barcodemanagement_text_div = document.createElement("div");
  My_Div.Init(barcodemanagement_text_div, 'barcodemanagement_text_div','barcodemanagement_text_div', '70%', '100%', '');
  My_Div.Set_Block(barcodemanagement_text_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  My_Div.Set_Text(barcodemanagement_text_div ,'條碼管理' ,TextAlignEnum.CENTER , "22px", true,"微軟正黑體","");;
  barcodemanagement_text_div.style.backgroundImage = 'linear-gradient(to right, #000046, #000046)';
  barcodemanagement_text_div.style.backgroundClip = 'text';
  barcodemanagement_text_div.style.webkitBackgroundClip = 'text';
  barcodemanagement_text_div.style.webkitTextFillColor = 'transparent';
  barcodemanagement_text_div.style.borderTopRightRadius = "10px";
  barcodemanagement_text_div.style.borderBottomRightRadius = "10px";

  const barcodemanagement_text_eng_div = document.createElement("div");
  My_Div.Init( barcodemanagement_text_eng_div, ' barcodemanagement_text_eng_div',' barcodemanagement_text_eng_div', '100%', '30%', '');
  My_Div.Set_Block( barcodemanagement_text_eng_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  My_Div.Set_Text( barcodemanagement_text_eng_div ,"Barcode Management" , TextAlignEnum.CENTER , "15px", true,"","");
   barcodemanagement_text_eng_div.style.backgroundImage = 'linear-gradient(to right, #000046, #000046)';
   barcodemanagement_text_eng_div.style.backgroundClip = 'text';
   barcodemanagement_text_eng_div.style.wordBreak = "break-word";
   barcodemanagement_text_eng_div.style.webkitBackgroundClip = 'text';
   barcodemanagement_text_eng_div.style.webkitTextFillColor = 'transparent';
   barcodemanagement_text_eng_div.style.borderTopRightRadius = "10px";
   barcodemanagement_text_eng_div.style.borderBottomRightRadius = "10px";

  barcodemanagement_div.appendChild(svg_text_div);
  svg_text_div.appendChild(barcodemanagement_svg);
  svg_text_div.appendChild(barcodemanagement_text_div);
  barcodemanagement_div.appendChild(barcodemanagement_text_eng_div);

  if(GetFunctionality("條碼管理"))
  {
    barcodemanagement_div.onclick = barcodemanagement_Click;
  }
  else
  {
    barcodemanagement_div.appendChild(get_Lock());
  }

  return barcodemanagement_div;
}

function get_storagelocation()
{
  const storagelocation_div = document.createElement("div");
  My_Div.Init(storagelocation_div, 'storagelocation_div','storagelocation_div', '180px', '120px', 'rgba(255, 255, 255, 0.85)');
  My_Div.Set_Block(storagelocation_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUM, JustifyContentEnum.CENTER);
  storagelocation_div.style.borderRadius = "5px";
  storagelocation_div.style.boxShadow = "4px 4px 15px rgba(0, 0, 0, 0.9)";
  storagelocation_div.style.margin = "5px";
  storagelocation_div.id = "storagelocation_div";

  const svg_text_div = document.createElement("div");
  My_Div.Init(svg_text_div, 'svg_text_div','svg_text_div', '100%', '50%', '');
  My_Div.Set_Block(svg_text_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);

  const storagelocation_svg = Get_storagelocation_SVG("100%", "100%", "100%","100%","","");
  My_Div.Init(storagelocation_svg, 'storagelocation_svg','storagelocation_svg', '30%', '100%', '');
  My_Div.Set_Block(storagelocation_svg, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
  storagelocation_svg.style.marginLeft = '10px';
  const storagelocation_text_div = document.createElement("div");
  My_Div.Init(storagelocation_text_div, 'storagelocation_text_div','storagelocation_text_div', '70%', '100%', '');
  My_Div.Set_Block(storagelocation_text_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  My_Div.Set_Text(storagelocation_text_div ,'儲位管理' ,TextAlignEnum.CENTER , "22px", true,"微軟正黑體","");;
  storagelocation_text_div.style.backgroundImage = 'linear-gradient(to right, #000046, #000046)';
  storagelocation_text_div.style.backgroundClip = 'text';
  storagelocation_text_div.style.webkitBackgroundClip = 'text';
  storagelocation_text_div.style.webkitTextFillColor = 'transparent';
  storagelocation_text_div.style.borderTopRightRadius = "10px";
  storagelocation_text_div.style.borderBottomRightRadius = "10px";

  const storagelocation_text_eng_div = document.createElement("div");
  My_Div.Init( storagelocation_text_eng_div, ' storagelocation_text_eng_div',' storagelocation_text_eng_div', '100%', '30%', '');
  My_Div.Set_Block( storagelocation_text_eng_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  My_Div.Set_Text( storagelocation_text_eng_div ,"Storage Location" , TextAlignEnum.CENTER , "18px", true,"","");
   storagelocation_text_eng_div.style.backgroundImage = 'linear-gradient(to right, #000046, #000046)';
   storagelocation_text_eng_div.style.backgroundClip = 'text';
   storagelocation_text_eng_div.style.wordBreak = "break-word";
   storagelocation_text_eng_div.style.webkitBackgroundClip = 'text';
   storagelocation_text_eng_div.style.webkitTextFillColor = 'transparent';
   storagelocation_text_eng_div.style.borderTopRightRadius = "10px";
   storagelocation_text_eng_div.style.borderBottomRightRadius = "10px";

  storagelocation_div.appendChild(svg_text_div);
  svg_text_div.appendChild(storagelocation_svg);
  svg_text_div.appendChild(storagelocation_text_div);
  storagelocation_div.appendChild(storagelocation_text_eng_div);

  if(GetFunctionality("鎖"))
  {
    storagelocation_div.onclick = storagelocation_Click;
  }
  else
  {
    storagelocation_div.appendChild(get_Lock());
  }

  return storagelocation_div;
}

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

  // document.getElementById("orderpicking_div").addEventListener("scroll", function() {
  //   // 取得 orderpicking_div 的位置
  //   const orderpickingDivRect = document.getElementById("orderpicking_div").getBoundingClientRect();
  //   lock_div.style.top = orderpickingDivRect.top + "px";
  //   lock_div.style.left = orderpickingDivRect.left + "px";
  // });
}

function GetFunctionality(name)
{
    for(var i = 0; i < functionality.length; i++)
    {      
        if(functionality[i] == name)
        {
            return true;
        }
    }
    return false; //true or false
}