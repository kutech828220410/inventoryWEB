
window.onload = load;
window.addEventListener('resize', handleResize);

function handleResize() 
{
  Set_popup_find_position();
}
async function load()
{
    let rowNum = 1;  
    data = await creat_get_by_CT_TIME_L(getCurrentDate());
    console.log(data);

    const _per_all_div = document.querySelectorAll(".all_div");
    for(var i = 0 ; i < data.Data.length ; i++)
    {
        const all_div = creat_all_div(i, data.Data[i]);
    }
    const main_div = document.querySelector('#main_div');
   
    
    setUserText();
}
async function addform_Click() 
{
  const confirmResult = confirm("確定建立盤點單?");
  if (confirmResult) 
  {
      document.body.style.opacity = "0.5"; 
      const returnData = await GET_creat_add();
      location.reload();
      document.body.style.opacity = "1"; 
  }
}
async function dlbtn_Click()
{
  var IC_SN = this.getAttribute("IC_SN");
  document.body.style.opacity = "0.5"; 
  await download_excel_by_IC_SN(IC_SN);
  document.body.style.opacity = "1"; 
}
function select_btn_Click(event)
{
    var IC_SN = this.getAttribute("IC_SN");
    console.log(IC_SN);
    sessionStorage.setItem('IC_SN',IC_SN);
    location.href = "../inventory/main.html"
}
async function delete_btn_Click(event)
{
  var IC_SN = this.getAttribute("IC_SN");
  const confirmResult = confirm(`確定刪除盤點單 [${IC_SN}]?`);
  if (confirmResult) 
  {
     document.body.style.opacity = "0.5"; 
     await creat_delete_by_IC_SN(IC_SN);
     location.reload();
     document.body.style.opacity = "1"; 
  }
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
  const header_div = document.createElement("div");
  header_div.id = "header_div";
  header_div.className = "header_div";
  header_div.style.width = "100%";
  header_div.style.height = "70px";
  header_div.style.background = "rgb(186, 185, 208)";
  header_div.style.background = "linear-gradient(90deg, rgba(186, 185, 208, 1) 0%, rgba(235, 235, 235, 1) 100%)";
  header_div.style.display = "flex";
  header_div.style.justifyContent = "left";
  header_div.style.flexDirection = "row";
  header_div.style.overflowX = "hidden";
 

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
  header_title_div.innerHTML = `<b class="h1">盤點單管理</b>`;
  header_title_div.style.display = "flex";
  header_title_div.id = "header_title_div";
  header_title_div.className = "header_title_div";
  header_title_div.style.textAlign = "left";
  header_title_div.style.width = "70%";
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


  const header_contorls_addformbtn = Get_add_SVG("100%", "100%", "70%","100%","black","");
  header_contorls_addformbtn.id = "header_contorls_addformbtn";
  header_contorls_addformbtn.className = "header_contorls";
  header_contorls_addformbtn.style.width = "60px";
  header_contorls_addformbtn.style.height = "80%";
  header_contorls_addformbtn.style.marginTop = "5px";
  header_contorls_addformbtn.style.marginRight = "2px";
  header_contorls_addformbtn.style.display = "flex";

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
  // popup_background_div.style.display = "none";
  document.body.appendChild(popup_background_div);

  const popup_find_div = document.createElement("div");
  popup_find_div.id = "popup_find_div";
  popup_find_div.className = "popup_find";
  popup_find_div.style.backgroundColor = "#FFF";
  popup_find_div.style.width = "220px";
  popup_find_div.style.height = "140px";
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
  popup_background_div.appendChild(popup_find_div);

  const find_IC_SN_div = document.createElement("div")
  find_IC_SN_div.id = "find_IC_SN_div";
  find_IC_SN_div.className = "find_IC_SN_div";
  find_IC_SN_div.style.width = "100%";
  find_IC_SN_div.style.height = "33.3%";
  find_IC_SN_div.style.alignItems = "center";
  find_IC_SN_div.style.justifyContent = "center";
  find_IC_SN_div.style.display = "flex";

  const IC_SN_svg = Get_script_SVG("100%", "100%", "32px","100%","black","");
  IC_SN_svg.id = "IC_SN_svg";
  IC_SN_svg.className = "IC_SN_svg";
  IC_SN_svg.style.width = "30%";
  IC_SN_svg.style.height = "100%";
  IC_SN_svg.style.alignItems = "center";
  IC_SN_svg.style.justifyContent = "center";

  const find_IC_SN_input = document.createElement("input")
  find_IC_SN_input.id = "find_IC_SN_input";
  find_IC_SN_input.className = "find_IC_SN_input";
  find_IC_SN_input.style.width = "60%";
  find_IC_SN_input.style.height = "35%";
  find_IC_SN_input.style.textAlign = "center";
  find_IC_SN_input.style.marginRight = "15px";
  find_IC_SN_input.placeholder = "請輸入單號";

  const find_date_div = document.createElement("div")
  find_date_div.id = "find_date_div";
  find_date_div.className = "find_date_div";
  find_date_div.style.width = "100%";
  find_date_div.style.height = "33.3%";
  find_date_div.style.alignItems = "center";
  find_date_div.style.justifyContent = "flex-start";
  find_date_div.style.display = "flex";

  const find_date_input = document.createElement("input")
  find_date_input.id = "find_date_input";
  find_date_input.className = "find_date_input";
  find_date_input.style.width = "60%";
  find_date_input.style.height = "40%";
  find_date_input.style.border = "1px solid";
  find_date_input.type = "date";
  find_date_input.style.margin = "-1.5px";
  find_date_input.style.textAlign = "center";
  find_date_input.placeholder = "請選擇日期";

  const datesvg = Get_date_SVG("100%", "100%", "40px","100%","black","");
  datesvg.id = "datesvg";
  datesvg.className = "datesvg";
  datesvg.style.width = "30%";
  datesvg.style.height = "100%";
  datesvg.style.alignItems = "center";
  datesvg.style.justifyContent = "center";

  const find_check_div = document.createElement("div")
  find_check_div.id = "find_check";
  find_check_div.className = "find_check";
  find_check_div.style.width = "100%";
  find_check_div.style.height = "33.3%";
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
  header_contorls_div.appendChild(header_contorls_addformbtn);
  popup_find_div.appendChild(find_IC_SN_div);
  popup_find_div.appendChild(find_date_div);
  popup_find_div.appendChild(find_check_div);
  find_IC_SN_div.appendChild(IC_SN_svg);
  find_IC_SN_div.appendChild(find_IC_SN_input);
  find_date_div.appendChild(datesvg);
  find_date_div.appendChild(find_date_input);
  find_check_div.appendChild(checksvg);

  header_contorls_addformbtn.onclick = addform_Click;
  header_contorls_findbtn.onclick = findbtn_Click;

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
function setUserText()
{
   const userText = document.querySelector("#header_user_text");
   userText.innerText = `使用者:${get_logedName()} ID:${get_loggedID()}`;
   console.log(userText);0
}

