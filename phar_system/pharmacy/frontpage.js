let data;
window.onload = load;
var DPS_Server_Name = [];
async function load() 
{
  check_session_off();
  ServerName = "";
  ServerType = "調劑台";
  TableName = "";
  APIServer = await LoadAPIServer();
  const API01 = serch_APIServer(ServerName,ServerType,"API01");
  console.log("API01",API01);
  for(var i=0; i< API01.length; i++)
  {
     DPS_Server_Name.push(API01[i].name);
  }
  page_Init(DPS_Server_Name);
}

async function logout_Click()
{
  logout();
  location.href = "../../login.html";
}

async function DPS_div_Click()
{
  const ServerName = this.getAttribute("ServerName");
  console.log("ServerName",ServerName);
  sessionStorage.setItem('ServerName', ServerName);
  location.href = "../../pharmacy/main.html";
}


function page_Init(data) 
{
  console.log(data);
  const main_div = document.querySelector('#main_div');
  main_div.innerHTML = "";

  
  for (var i = 0; i < data.length; i++) 
  {
    const all_div = get_DPS_div(data[i]);
    main_div.appendChild(all_div);
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
  My_Div.Init(header_div, 'header_div','header_div', '100%', '55px', '');
  My_Div.Set_Block(header_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  header_div.style.overflowX = "hidden";
  const header_title_text = document.createElement('div');
  My_Div.Init(header_title_text, 'header_title_text','header_title_text', '100%', '50%', '');
  My_Div.Set_Text(header_title_text ,"藥局調劑台選單" , TextAlignEnum.CENTER , "32px", true,"微軟正黑體","#FFF");
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

 
  return main_div;
}

function get_DPS_div(ServerName)
{
  const DPS_div_div = document.createElement("div");
  My_Div.Init(DPS_div_div, 'DPS_div_div','DPS_div_div', '200px', '90px', 'rgba(255, 255, 255, 0.85)');
  My_Div.Set_Block(DPS_div_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUM, JustifyContentEnum.CENTER);
  DPS_div_div.style.borderRadius = "5px";
  DPS_div_div.style.boxShadow = "4px 4px 15px rgba(0, 0, 0, 0.9)";
  DPS_div_div.style.margin = "5px";
  DPS_div_div.onclick =  DPS_div_Click;
  DPS_div_div.setAttribute("ServerName",ServerName)
  const svg_text_div = document.createElement("div");
  My_Div.Init(svg_text_div, 'svg_text_div','svg_text_div', '100%', '50%', '');
  My_Div.Set_Block(svg_text_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);


  const DPS_div_text_div = document.createElement("div");
  My_Div.Init(DPS_div_text_div, 'DPS_div_text_div','DPS_div_text_div', '70%', '100%', '');
  My_Div.Set_Block(DPS_div_text_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  My_Div.Set_Text(DPS_div_text_div ,`${ServerName}` , TextAlignEnum.CENTER , "24px", true,"微軟正黑體","#000046");
  DPS_div_text_div.style.textTransform = 'uppercase';
  DPS_div_text_div.style.backgroundImage = 'linear-gradient(to right, #000046, #000046)';
  DPS_div_text_div.style.backgroundClip = 'text';
  DPS_div_text_div.style.webkitBackgroundClip = 'text';
  DPS_div_text_div.style.webkitTextFillColor = 'transparent';
  DPS_div_text_div.style.borderTopRightRadius = "10px";
  DPS_div_text_div.style.borderBottomRightRadius = "10px";


  DPS_div_div.appendChild(svg_text_div);
  svg_text_div.appendChild(DPS_div_text_div);
  return DPS_div_div;
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
  My_Div.Set_Text(choose_text_div ,"請選擇調劑台" , TextAlignEnum.CENTER , "24px", true,"微軟正黑體","");
  choose_text_div.style.color = '#bbb';
  choose_text_div.style.textTransform = 'uppercase';
  choose_text_div.style.backgroundImage = 'linear-gradient(to right, #777, #ccc)';
  choose_text_div.style.backgroundClip = 'text';
  choose_text_div.style.webkitBackgroundClip = 'text';
  choose_text_div.style.webkitTextFillColor = 'transparent';
  return choose_text_div;
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
}
async function lock_Click()
{
  console.log("license");
  window.alert("功能未開放,請聯繫服務商!");
}
