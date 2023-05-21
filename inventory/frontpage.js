
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
    setUserText();
}
async function addform_Click() 
{
  const confirmResult = confirm("確定建立盤點單?");
  if (confirmResult) 
  {
      const returnData = await GET_creat_add();
      location.reload();
  }
}
function findbtn_Click()
{
  Set_popup_find_position();
  if(popup_find_div.style.visibility  != 'visible')
  {
    popup_find_div.style.display = "block";
    popup_find_div.style.visibility  = "visible";
  }
  else
  {
    popup_find_div.style.display = "block";
    popup_find_div.style.visibility  = "hidden";
  }
  showPopup();
}
//彈跳視窗動畫
function showPopup() {
  var popup = document.getElementById("popup");
  if (popup.style.visibility === "hidden") {
    popup.style.visibility = "visible"; // 显示弹出窗口
    popup.style.opacity = 1; // 设置完全不透明
  } else {
    popup.style.opacity = 0; // 设置完全透明
    setTimeout(function() {
      popup.style.visibility = "hidden"; // 隐藏弹出窗口
    }, 500); // 等待过渡效果完成
  }
}
function Set_popup_find_position()
{
 
  const header_contorls_findbtn = document.querySelector("#header_contorls_findbtn");
  var position_header_contorls_findbtn = getAbsolutePosition(header_contorls_findbtn);
  const popup_find_div = document.querySelector("#popup_find_div");
  var position_popup_find_div = getAbsolutePosition(popup_find_div);
  
  const top = `${position_header_contorls_findbtn.top + position_header_contorls_findbtn.height}px`;
  const left = `${position_header_contorls_findbtn.left + position_header_contorls_findbtn.width- position_popup_find_div.width}px`;
 
  popup_find_div.style.top = `${top}`;
  popup_find_div.style.left = `${left}`;
  
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
     await creat_delete_by_IC_SN(IC_SN);
     location.reload();
  }
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

// 設置按鈕的內容
  const popup_find_div = document.createElement("div");
  popup_find_div.id = "popup_find_div";
  popup_find_div.className = "popup_find";
  popup_find_div.style.width = "60%";
  popup_find_div.style.height = "120px";
  popup_find_div.style.backgroundColor = "black";
  popup_find_div.style.zIndex = "99";
  popup_find_div.style.position = "absolute";
  popup_find_div.style.top = "0px";
  popup_find_div.style.left = "0px";
  popup_find_div.style.display = "block";
  popup_find_div.style.visibility = 'hidden';
  popup_find_div.style.borderRadius = "5px"
  document.body.appendChild(popup_find_div);
  
  header_contorls_div.appendChild(header_contorls_findbtn);
  header_contorls_div.appendChild(header_contorls_addformbtn);
  console.log(getAbsolutePosition(header_contorls_addformbtn));

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


