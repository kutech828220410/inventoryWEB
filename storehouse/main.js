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
  header_div.style.overflowX = "hidden";
  const header_title_text = document.createElement('div');
  My_Div.Init(header_title_text, 'header_title_text','header_title_text', '100%', '50%', '');
  My_Div.Set_Text(header_title_text ,"智慧藥局系統" , TextAlignEnum.CENTER , "32px", true,"微軟正黑體","#FFF");
  header_title_text.id = "header_title_text";
  header_div.appendChild(header_title_text);
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
  My_Div.Init(pharmacy_div, 'pharmacy_div','pharmacy_div', '240px', '120px', 'rgba(255, 255, 255, 0.85)');
  My_Div.Set_Block(pharmacy_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.TOP);
  pharmacy_div.style.borderRadius = "10px";
  pharmacy_div.style.boxShadow = "4px 4px 15px rgba(0, 0, 0, 0.9)";
  pharmacy_div.style.marginTop = "10px";
  pharmacy_div.onclick =  pharmacy_Click;

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
  My_Div.Set_Text(pharmacy_text_eng_div ,"Pharmacy" , TextAlignEnum.CENTER , "22px", true,"","");
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

function get_storehouse()
{
  const storehouse_div = document.createElement("div");
  My_Div.Init(storehouse_div, 'storehouse_div','storehouse_div', '240px', '120px', 'rgba(255, 255, 255, 0.85)');
  My_Div.Set_Block(storehouse_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.TOP);
  storehouse_div.style.borderRadius = "10px";
  storehouse_div.style.boxShadow = "4px 4px 15px rgba(0, 0, 0, 0.9)";
  storehouse_div.style.marginTop = "10px";
  storehouse_div.onclick =  storehouse_Click;

  const storehouse_svg = Get_storehouse_SVG("80%", "80%", "80%","80%","black","");
  My_Div.Init(storehouse_svg, 'storehouse_svg','storehouse_svg', '30%', '100%', '');
  My_Div.Set_Block(storehouse_svg, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);

  const all_text_div = document.createElement("div");
  My_Div.Init(all_text_div, 'all_text_div','all_text_div', '70%', '100%', '');
  My_Div.Set_Block(all_text_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUM, JustifyContentEnum.CENTER);


  const storehouse_text_div = document.createElement("div");
  My_Div.Init(storehouse_text_div, 'storehouse_text_div','storehouse_text_div', '100%', '30%', '');
  My_Div.Set_Block(storehouse_text_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  My_Div.Set_Text(storehouse_text_div ,"藥庫" , TextAlignEnum.CENTER , "30px", true,"微軟正黑體","");
  storehouse_text_div.style.backgroundImage = 'linear-gradient(to right, #000046, #1CB5E0)';
  storehouse_text_div.style.backgroundClip = 'text';
  storehouse_text_div.style.webkitBackgroundClip = 'text';
  storehouse_text_div.style.webkitTextFillColor = 'transparent';
  storehouse_text_div.style.borderTopRightRadius = "10px";
  storehouse_text_div.style.borderBottomRightRadius = "10px";

  const storehouse_text_eng_div = document.createElement("div");
  My_Div.Init( storehouse_text_eng_div, ' storehouse_text_eng_div',' storehouse_text_eng_div', '100%', '30%', '');
  My_Div.Set_Block( storehouse_text_eng_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  My_Div.Set_Text( storehouse_text_eng_div ,"Storehouse" , TextAlignEnum.CENTER , "22px", true,"","");
   storehouse_text_eng_div.style.backgroundImage = 'linear-gradient(to right, #000046, #1CB5E0)';
   storehouse_text_eng_div.style.backgroundClip = 'text';
   storehouse_text_eng_div.style.webkitBackgroundClip = 'text';
   storehouse_text_eng_div.style.webkitTextFillColor = 'transparent';
   storehouse_text_eng_div.style.borderTopRightRadius = "10px";
   storehouse_text_eng_div.style.borderBottomRightRadius = "10px";

  storehouse_div.appendChild(storehouse_svg);
  storehouse_div.appendChild(all_text_div);
  all_text_div.appendChild(storehouse_text_div);
  all_text_div.appendChild(storehouse_text_eng_div);
  return storehouse_div;
}

function get_ward()
{
  const ward_div = document.createElement("div");
  My_Div.Init(ward_div, 'ward_div','ward_div', '240px', '120px', 'rgba(255, 255, 255, 0.85)');
  My_Div.Set_Block(ward_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.TOP);
  ward_div.style.borderRadius = "10px";
  ward_div.style.boxShadow = "4px 4px 15px rgba(0, 0, 0, 0.9)";
  ward_div.style.marginTop = "10px";
  ward_div.id = "ward_div";
  ward_div.onclick =  ward_Click;

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
  ward_text_div.style.backgroundImage = 'linear-gradient(to right, #000046, #1CB5E0)';
  ward_text_div.style.backgroundClip = 'text';
  ward_text_div.style.webkitBackgroundClip = 'text';
  ward_text_div.style.webkitTextFillColor = 'transparent';
  ward_text_div.style.borderTopRightRadius = "10px";
  ward_text_div.style.borderBottomRightRadius = "10px";

  const ward_text_eng_div = document.createElement("div");
  My_Div.Init( ward_text_eng_div, ' ward_text_eng_div',' ward_text_eng_div', '100%', '30%', '');
  My_Div.Set_Block( ward_text_eng_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  My_Div.Set_Text( ward_text_eng_div ,"Nursing Station" , TextAlignEnum.CENTER , "20px", true,"","");
   ward_text_eng_div.style.backgroundImage = 'linear-gradient(to right, #000046, #1CB5E0)';
   ward_text_eng_div.style.backgroundClip = 'text';
   ward_text_eng_div.style.wordBreak = "break-word";
   ward_text_eng_div.style.webkitBackgroundClip = 'text';
   ward_text_eng_div.style.webkitTextFillColor = 'transparent';
   ward_text_eng_div.style.borderTopRightRadius = "10px";
   ward_text_eng_div.style.borderBottomRightRadius = "10px";

  ward_div.appendChild(ward_svg);
  ward_div.appendChild(all_text_div);
  all_text_div.appendChild(ward_text_div);
  all_text_div.appendChild(ward_text_eng_div);

  // //沒有LICENSE上鎖
  // const lock_div = get_Lock(); // 呼叫 get_Lock 函式獲取 lock_div
  // ward_div.appendChild(lock_div); // 添加 lock_div 到 ward_div 中

  return ward_div;
}

function get_userinfo()
{
  const userinfo_div = document.createElement("div");
  My_Div.Init(userinfo_div, 'userinfo_div','userinfo_div', '240px', '50px', 'rgba(255, 255, 255, 0.85)');
  My_Div.Set_Block(userinfo_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  userinfo_div.style.borderRadius = "10px";
  userinfo_div.style.boxShadow = "4px 4px 15px rgba(0, 0, 0, 0.9)";
  userinfo_div.style.marginTop = "10px";

  const userinfo_svg = Get_user_SVG("70%", "70%", "70%","70%","","none");
  My_Div.Init(userinfo_svg, 'userinfo_svg','userinfo_svg', '30%', '100%', '');
  My_Div.Set_Block(userinfo_svg, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);

  const userinfo_text_div = document.createElement("div");
  My_Div.Init(userinfo_text_div, 'userinfo_text_div','userinfo_text_div', '40%', '100%', '');
  My_Div.Set_Block(userinfo_text_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  My_Div.Set_Text(userinfo_text_div ,"鴻森整合" , TextAlignEnum.CENTER , "22px", true,"","");

  const logout_svg = Get_logout_SVG("80%", "80%", "80%","80%","","none");
  My_Div.Init(logout_svg, 'logout_svg','logout_svg', '30%', '100%', '');
  My_Div.Set_Block(logout_svg, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  logout_svg.onclick = logout_Click;

   userinfo_div.appendChild(userinfo_svg);
   userinfo_div.appendChild(userinfo_text_div);
   userinfo_div.appendChild(logout_svg);
  return userinfo_div;
}

function get_Lock()
{
  const lock_div = document.createElement("div");
  My_Div.Init(lock_div, 'lock_div','lock_div', '240px', '120px', 'rgba(128, 128, 128, 0.85)');
  My_Div.Set_Block(lock_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  lock_div.style.position= "absolute";
  lock_div.style.borderRadius = "10px";

  const lock_svg = Get_licenselock_SVG("80%", "80%", "80%","80%","darkred","none");
  My_Div.Init(lock_svg, 'lock_svg','lock_svg', '100%', '100%', '');
  My_Div.Set_Block(lock_svg, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  lock_svg.onclick = lock_Click;

  lock_div.appendChild(lock_svg);


  return lock_div;

  document.getElementById("ward_div").addEventListener("scroll", function() {
    // 取得 ward_div 的位置
    const wardDivRect = document.getElementById("ward_div").getBoundingClientRect();
    lock_div.style.top = wardDivRect.top + "px";
    lock_div.style.left = wardDivRect.left + "px";
  });
}

async function logout_Click()
 {
  location.href = "http://www.ketech.tw:5500/login.html";
}

async function pharmacy_Click()
 {
  console.log("pharmacy");
}

async function storehouse_Click()
 {
  console.log("Stroehouse");
}

async function ward_Click()
 {
  console.log("ward");
}

async function lock_Click()
 {
  console.log("license");
  window.alert("需要解鎖此功能，請聯繫「鴻森整合機電」電話號碼為：02-82822040");
}