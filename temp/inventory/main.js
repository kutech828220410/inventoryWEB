// let data;
// window.onload = load;
// window.addEventListener('resize', handleResize);

function handleResize() 
{
  Set_popup_find_position();
}
// async function load()
// {
//     let rowNum = 1;  
//     data = await creat_get_by_CT_TIME_L(getCurrentDate());
//     console.log(data);

//     const _per_all_div = document.querySelectorAll(".all_div");
//     for(var i = 0 ; i < data.Data.length ; i++)
//     {
//         const all_div = creat_all_div(i, data.Data[i]);
//     }
//     setUserText();
// }
async function done_Click() 
{
  location.href = "frontpage.html"
}

function findbtn_Click()
{
  Set_popup_find_position();
  if(popup_find_div.style.visibility  != 'visible')
  {
    popup_find_div.style.display = "block";
    popup_find_div.style.opacity = "1" ;
    popup_find_div.style.visibility  = "visible";

    
  }
  else
  {
    popup_find_div.style.display = "block";
    popup_find_div.style.opacity = "0" ;
    popup_find_div.style.visibility = "hidden";
  }
}


function Set_popup_find_position()
{
 
  const header_contorls_findbtn = document.querySelector("#header_contorls_findbtn");
  var position_header_contorls_findbtn = getAbsolutePosition(header_contorls_findbtn);
  const popup_find_div = document.querySelector("#popup_find_div");
  var position_popup_find_div = getAbsolutePosition(popup_find_div);
  
  const top = `${position_header_contorls_findbtn.top + position_header_contorls_findbtn.height + 5}px`;
  const left = `${position_header_contorls_findbtn.left + position_header_contorls_findbtn.width / 2- position_popup_find_div.width}px`;
 
  popup_find_div.style.top = `${top}`;
  popup_find_div.style.left = `${left}`;
  
}
function get_header()
{
  const coverage_div =document.createElement("div");
  coverage_div.style.width = "100%";
  coverage_div.style.height = "100%";
  coverage_div.style.display = "flex";
  coverage_div.style.flexDirection = "row";

  const header_div = document.createElement("div");
  header_div.id = "header_div";
  header_div.className = "header_div";
  header_div.style.width = "100%";
  header_div.style.height = "70px";
  header_div.style.position= "fixed";
  header_div.style.top= "0";
  header_div.style.left= "0";
  header_div.style.zIndex= "9";
  header_div.style.background = "rgb(186, 185, 208)";
  header_div.style.background = "linear-gradient(90deg, rgba(186, 185, 208, 1) 0%, rgba(235, 235, 235, 1) 100%)";
  header_div.style.display = "flex";
  header_div.style.justifyContent = "left";
  header_div.style.flexDirection = "row";
  header_div.style.overflowX = "hidden";
  coverage_div.appendChild(header_div);


  const header_title_user_div = document.createElement("div");
  header_title_user_div.id = "header_title_user_div";
  header_title_user_div.className = "header_title_user_div";
  header_title_user_div.style.display = "flex";
  header_title_user_div.style.justifyContent = "top";
  header_title_user_div.style.flexDirection = "column";
  header_title_user_div.style.width = "70%";
  header_title_user_div.style.height = "100%";
  header_title_user_div.style.backgroundColor = "#";

  const header_title_div = document.createElement("div");
  header_title_div.innerHTML = `<b class="h1">盤點操作頁面</b>`;
  header_title_div.style.display = "flex";
  header_title_div.id = "header_title_div";
  header_title_div.className = "header_title_div";
  header_title_div.style.textAlign = "left";
  header_title_div.style.width = "75%";
  header_title_div.style.height = "50%";
  header_title_div.style.backgroundColor = "#";
  header_title_div.style.justifyContent = "";
  header_title_div.style.flexDirection = "";


  const header_user_div = document.createElement("div");
  header_user_div.innerHTML = `<span ><p id="header_user_text" style="font-family: 微軟正黑體; font-size: 12px; margin-left: 20px; word-spacing: 5px; letter-spacing: 3px;">使用者名稱:</p><span>`;
  header_user_div.id = "header_user_div";
  header_user_div.style.display = "flex";
  header_user_div.className = "header_user_div";
  header_user_div.style.textAlign = "left";
  header_user_div.style.width = "100%";
  header_user_div.style.height = "50%";
  header_user_div.style.backgroundColor = "#";
  header_user_div.style.justifyContent = "";
  header_user_div.style.flexDirection = "";
  header_title_user_div.appendChild(header_title_div);
  header_title_user_div.appendChild(header_user_div);

  const header_contorls_div = document.createElement("div");
  header_contorls_div.id = "header_contorls_div";
  header_contorls_div.className = "header_contorls_div";
  header_contorls_div.style.display = "flex";
  header_contorls_div.style.justifyContent = "flex-end";
  header_contorls_div.style.flexDirection = "row";
  header_contorls_div.style.width = "30%";
  header_contorls_div.style.height = "100%";
  header_contorls_div.style.paddingRight = "5px";

  const header_contorls_findbtn = Get_find_in_page_SVG("100%", "100%", "70%","100%","black","");
  header_contorls_findbtn.id = "header_contorls_findbtn";
  header_contorls_findbtn.className = "header_contorls";
  header_contorls_findbtn.style.width = "60px";
  header_contorls_findbtn.style.height = "80%";
  header_contorls_findbtn.style.marginTop = "5px";
  header_contorls_findbtn.style.marginRight = "2px";
  header_contorls_findbtn.style.display = "flex";


  const header_contorls_donebtn = Get_find_check_SVG("100%", "100%", "70%","100%","black","");
  header_contorls_donebtn.id = "header_contorls_donebtn";
  header_contorls_donebtn.className = "header_contorls";
  header_contorls_donebtn.style.width = "60px";
  header_contorls_donebtn.style.height = "80%";
  header_contorls_donebtn.style.marginTop = "5px";
  header_contorls_donebtn.style.marginRight = "2px";
  header_contorls_donebtn.style.display = "flex";

  //彈跳視窗
  const popup_background_div = document.createElement("div");
  popup_background_div.id = "popup_background_div";
  popup_background_div.className = "popup_background_div";
  popup_background_div.style.backgroundColor = "gray";
  popup_background_div.style.width = "100%";
  popup_background_div.style.height = "100%";
  popup_background_div.position = "absolute";
  popup_background_div.top = "0";
  popup_background_div.left = "0";
  document.body.appendChild(popup_background_div);

  const popup_find_div = document.createElement("div");
  popup_find_div.id = "popup_find_div";
  popup_find_div.className = "popup_find";
  popup_find_div.style.backgroundColor = "#FFF";
  popup_find_div.style.width = "220px";
  popup_find_div.style.height = "100px";
  popup_find_div.style.position = "absolute";
  popup_find_div.style.top = "0px";
  popup_find_div.style.left = "0px";
  popup_find_div.style.display = "block";
  popup_find_div.style.visibility = 'hidden';
  popup_find_div.style.borderRadius = "5px";
  popup_find_div.style.border = "solid";
  popup_find_div.style.flexDirection = "column"
  popup_find_div.style.opacity = "0" ;
  popup_find_div.style.transition = "opacity 0.5s, visibility 0.5s 0s";
  popup_find_div.style.zIndex = "10";
  popup_background_div.appendChild(popup_find_div);

  const find_code_input_div = document.createElement("div")
  find_code_input_div.id = "find_code_input_div";
  find_code_input_div.className = "find_code_input_div";
  find_code_input_div.style.width = "100%";
  find_code_input_div.style.height = "50%";
  find_code_input_div.style.alignItems = "center";
  find_code_input_div.style.justifyContent = "center";
  find_code_input_div.style.display = "flex";

  const pill_svg = Get_pill_SVG("100%", "100%", "","100%","black","");
  pill_svg.id = "pill_svg";
  pill_svg.className = "pill_svg";
  pill_svg.style.width = "30%";
  pill_svg.style.height = "100%";
  pill_svg.style.alignItems = "center";
  pill_svg.style.justifyContent = "center";

  const find_code_input = document.createElement("input")
  find_code_input.id = "find_code_input";
  find_code_input.className = "find_code_input";
  find_code_input.style.width = "150px";
  find_code_input.style.height = "35%";
  find_code_input.style.textAlign = "center";
  find_code_input.style.marginRight = "8px";
  find_code_input.placeholder = "請輸入藥碼/藥名";

  const find_check_div = document.createElement("div")
  find_check_div.id = "find_check";
  find_check_div.className = "find_check";
  find_check_div.style.width = "100%";
  find_check_div.style.height = "50%";
  find_check_div.style.display = "flex";
  find_check_div.style.alignItems = "center";
  find_check_div.style.justifyContent = "flex-end";

  const checksvg =  Get_find_check_SVG("", "", "40px","100%","black","");
  checksvg.id = "datesvg";
  checksvg.className = "datesvg";
  checksvg.style.width = "20%";
  checksvg.style.height = "100%";
  checksvg.style.alignItems = "center";
  checksvg.style.justifyContent = "center";
  checksvg.style.marginRight = "15px";

  header_contorls_div.appendChild(header_contorls_findbtn);
  header_contorls_div.appendChild(header_contorls_donebtn);
  popup_find_div.appendChild(find_code_input_div);
  popup_find_div.appendChild(find_check_div);
  find_code_input_div.appendChild(pill_svg);
  find_code_input_div.appendChild(find_code_input);
  find_check_div.appendChild(checksvg);

  header_contorls_donebtn.onclick = done_Click;
  header_contorls_findbtn.onclick = findbtn_Click;

  header_div.appendChild(header_title_user_div);
  header_div.appendChild(header_contorls_div);
  
  const code_qty_div = document.createElement("div");
  code_qty_div.id = "code_qty_div";
  code_qty_div.className = "code_qty_div";
  code_qty_div.style.display = "flex";
  code_qty_div.style.textAlign = "left";
  code_qty_div.style.width = "100%";
  code_qty_div.style.height = "30px";
  code_qty_div.style.position= "fixed";
  code_qty_div.style.top= "70px";
  code_qty_div.style.left= "0";
  code_qty_div.style.zIndex= "9";
  code_qty_div.style.background = "linear-gradient(90deg, skyblue 0%, #fff 100%)" ;
  code_qty_div.style.justifyContent = "";
  code_qty_div.style.flexDirection = "";
  
  const code_div = document.createElement("div");
  code_div.id = "code_div";
  code_div.className = "code_div";
  code_div.innerText = "藥品資訊";
  code_div.style.fontWeight = "bolder";
  code_div.style.paddingLeft= "10px";
  code_div.style.textAlign = "left";
  code_div.style.display = "flex";
  code_div.style.width = "65%";
  code_div.style.height = "100%";
  code_div.style.border = "";
  code_div.style.justifyContent = "";
  code_div.style.alignItems= "center";
  code_div.style.flexDirection = "";

  const qty_div = document.createElement("div");
  qty_div.id = "qty_div";
  qty_div.className = "qty_div";
  qty_div.innerText = "盤點數量";
  qty_div.style.fontWeight = "bolder";
  qty_div.style.paddingLeft= "10px";
  qty_div.style.textAlign = "left";
  qty_div.style.display = "flex";
  qty_div.style.width = "35%";
  qty_div.style.height = "100%";
  qty_div.style.alignItems= "center";
  qty_div.style.backgroundColor = "#";
  qty_div.style.justifyContent = "";
  qty_div.style.flexDirection = "";

  coverage_div.appendChild(code_qty_div);
  code_qty_div.appendChild(code_div);
  code_qty_div.appendChild(qty_div);

  return coverage_div;
}
function get_main() {
  const main_div = document.createElement("div");
  main_div.id = "main_div";
  main_div.className = "main_div";
  main_div.style.width = "100%";
  main_div.style.height = "100%";
  main_div.style.justifyContent = "flex-start";
  main_div.style.marginTop = "100px";
  main_div.style.marginBottom = "30px";
  return main_div;
}

//盤點輸入彈跳視窗
function popup_input_div()
{
    const popup_input_div = document.createElement("div");
    popup_input_div.id = "popup_input_div";
    popup_input_div.className = "popup_input_div";
    popup_input_div.style.backgroundColor = "#FFF";
    popup_input_div.style.width = "92%";
    popup_input_div.style.height = "100px";
    popup_input_div.style.position = "absolute";
    popup_input_div.style.top = "0px";
    popup_input_div.style.left = "0px";
    popup_input_div.style.display = "block";
    popup_input_div.style.visibility = 'hidden';
    popup_input_div.style.borderRadius = "5px";
    popup_input_div.style.border = "solid";
    popup_input_div.style.flexDirection = "column"
    popup_input_div.style.opacity = "0" ;
    popup_input_div.style.transition = "opacity 0.5s, visibility 0.5s 0s";
    popup_input_div.style.zIndex = "11";

    return popup_input_div;
}
// function get_main()
// {
//   const main_div = document.createElement("div");
//   main_div.id = "main_div";
//   main_div.className = "main_div";
//   main_div.style.width = "100%";
//   main_div.style.height = "100%";
//   main_div.style.backgroundColor = "#FFFFFF";
  
//   const code_qty_div = document.createElement("div");
//   code_qty_div.id = "code_qty_div";
//   code_qty_div.className = "code_qty_div";
//   code_qty_div.style.display = "flex";
//   code_qty_div.style.textAlign = "left";
//   code_qty_div.style.width = "100%";
//   code_qty_div.style.height = "30px";
//   code_qty_div.style.background = "linear-gradient(90deg, skyblue 0%, #fff 100%)" ;
//   code_qty_div.style.justifyContent = "";
//   code_qty_div.style.flexDirection = "";
  
//   const code_div = document.createElement("div");
//   code_div.id = "code_div";
//   code_div.className = "code_div";
//   code_div.innerText = "藥品資訊";
//   code_div.style.fontWeight = "bolder";
//   code_div.style.paddingLeft= "10px";
//   code_div.style.textAlign = "left";
//   code_div.style.display = "flex";
//   code_div.style.width = "65%";
//   code_div.style.height = "100%";
//   code_div.style.border = "";
//   code_div.style.justifyContent = "";
//   code_div.style.alignItems= "center";
//   code_div.style.flexDirection = "";

//   const qty_div = document.createElement("div");
//   qty_div.id = "qty_div";
//   qty_div.className = "qty_div";
//   qty_div.innerText = "盤點數量";
//   qty_div.style.fontWeight = "bolder";
//   qty_div.style.paddingLeft= "10px";
//   qty_div.style.textAlign = "left";
//   qty_div.style.display = "flex";
//   qty_div.style.width = "35%";
//   qty_div.style.height = "100%";
//   qty_div.style.alignItems= "center";
//   qty_div.style.backgroundColor = "#";
//   qty_div.style.justifyContent = "";
//   qty_div.style.flexDirection = "";

//   main_div.appendChild(code_qty_div);
//   code_qty_div.appendChild(code_div);
//   code_qty_div.appendChild(qty_div);

//   return main_div;
// }

function setUserText()
{
   const userText = document.querySelector("#header_user_text");
   userText.innerText = `使用者:${get_logedName()} ID:${get_loggedID()}`;
   console.log(userText);0
}