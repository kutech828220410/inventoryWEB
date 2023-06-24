function get_popup_find()
{
  const popup_find_div = new Basic_popup_Div('popup_find_div','popup_find_div','300px','260px');
  popup_find_div.div.style.paddingTop  = "10px";
  popup_find_div.div.style.paddingRight  = "10px";
  const find_code_input_div = document.createElement("div")
  find_code_input_div.id = "find_code_input_div";
  find_code_input_div.className = "find_code_input_div";
  find_code_input_div.style.width = "100%";
  find_code_input_div.style.height = "65px";
  find_code_input_div.style.alignItems = "center";
  find_code_input_div.style.justifyContent = "left";
  find_code_input_div.style.display = "flex";

  const pill_svg = Get_pill_SVG("100%", "100%", "52px","100%","black","");
  pill_svg.id = "pill_svg";
  pill_svg.className = "pill_svg";
  pill_svg.style.width = "80px";
  pill_svg.style.height = "100%";
  pill_svg.style.alignItems = "center";
  pill_svg.style.justifyContent = "center";
  pill_svg.style.marginRight = "5px";
  pill_svg.style.marginLeft = "5px";
  const find_code_input = document.createElement("input")
  find_code_input.id = "find_code_input";
  find_code_input.className = "find_code_input";
  find_code_input.style.width = "100%";
  find_code_input.style.height = "40px";
  find_code_input.style.textAlign = "center";
  find_code_input.style.marginRight = "8px";
  find_code_input.style.borderRadius = "5px";
  find_code_input.style.borderColor = "gray";
  find_code_input.placeholder = "請輸入藥碼";
  find_code_input.style.fontSize = "16px";

  find_code_input_div.appendChild(pill_svg);
  find_code_input_div.appendChild(find_code_input);

  
//開始日期
  const find_start_date_div = document.createElement("div")
  find_start_date_div.id = "find_start_date_div";
  find_start_date_div.className = "find_start_date_div";
  find_start_date_div.style.width = "100%";
  find_start_date_div.style.height = "65px";
  find_start_date_div.style.alignItems = "center";
  find_start_date_div.style.justifyContent = "left";
  find_start_date_div.style.display = "flex";
    // find_start_date_div.style.backgroundColor = "#000FFF";

  const date_start_svg = Get_date_SVG("100%", "100%", "60px", "100%", "black", "");
  date_start_svg.id = "date_start_svg";
  date_start_svg.className = "date_start_svg";
  date_start_svg.style.width = "80px";
  date_start_svg.style.height = "100%";
  date_start_svg.style.alignItems = "center";
  date_start_svg.style.justifyContent = "center";
  date_start_svg.style.marginRight = "3px";
  date_start_svg.style.marginLeft = "5px";
  const find_start_date_input = document.createElement("input")
  find_start_date_input.id = "find_start_date_input";
  find_start_date_input.className = "find_start_date_input";
  find_start_date_input.style.width = "100%";
  find_start_date_input.style.height = "40px";
  find_start_date_input.type = "text";
  find_start_date_input.style.marginRight = "8px";
  find_start_date_input.style.textAlign = "center";
  find_start_date_input.value  = "";
  find_start_date_input.placeholder = "起始時間";
  find_start_date_input.style.fontSize = "16px";
  find_start_date_input.style.borderRadius = "5px";
  find_start_date_input.style.borderColor = "gray";

  const find_start_date_input_div = document.createElement("div")
  find_start_date_input_div.id = "find_start_date_input_div";
  find_start_date_input_div.className = "find_start_date_input_div";
  find_start_date_input_div.style.width = "100%";
  find_start_date_input_div.style.height = "100%";
  find_start_date_input_div.style.alignItems = "center";
  find_start_date_input_div.style.justifyContent = "left";
  find_start_date_input_div.style.display = "flex";


  find_start_date_div.appendChild(date_start_svg);
  find_start_date_div.appendChild(find_start_date_input_div);
  find_start_date_input_div.appendChild(find_start_date_input);
 
//結束日期
  const find_end_date_div = document.createElement("div")
  find_end_date_div.id = "find_end_date_div";
  find_end_date_div.className = "find_end_date_div";
  find_end_date_div.style.width = "100%";
  find_end_date_div.style.height = "65px";
  find_end_date_div.style.alignItems = "center";
  find_end_date_div.style.justifyContent = "left";
  find_end_date_div.style.display = "flex";
  const date_end_svg = Get_date_SVG("100%", "100%", "60px", "100%", "black", "");
  date_end_svg.id = "date_end_svg";
  date_end_svg.className = "date_end_svg";
  date_end_svg.style.width = "80px";
  date_end_svg.style.height = "100%";
  date_end_svg.style.alignItems = "center";
  date_end_svg.style.justifyContent = "center";
  date_end_svg.style.marginRight = "3px";
  date_end_svg.style.marginLeft = "5px";
  const find_end_date_input = document.createElement("input")
  find_end_date_input.id = "find_end_date_input";
  find_end_date_input.className = "find_end_date_input";
  find_end_date_input.style.width = "100%";
  find_end_date_input.style.height = "40px";
  find_end_date_input.style.marginRight = "8px";
  find_end_date_input.style.textAlign = "center";
  find_end_date_input.value  = "";
  find_end_date_input.placeholder = "結束時間";
  find_end_date_input.style.fontSize = "16px";
  find_end_date_input.style.borderRadius = "5px";
  find_end_date_input.style.borderColor = "gray";

  const find_end_date_input_div = document.createElement("div")
  find_end_date_input_div.id = "find_end_date_input_div";
  find_end_date_input_div.className = "find_end_date_input_div";
  find_end_date_input_div.style.width = "100%";
  find_end_date_input_div.style.height = "100%";
  find_end_date_input_div.style.alignItems = "center";
  find_end_date_input_div.style.justifyContent = "left";
  find_end_date_input_div.style.display = "flex";

  find_end_date_div.appendChild(date_end_svg);
  find_end_date_div.appendChild(find_end_date_input_div);
  find_end_date_input_div.appendChild(find_end_date_input);
  
  const find_check_div = document.createElement("div")
  find_check_div.id = "find_check";
  find_check_div.className = "find_check";
  find_check_div.style.width = "100%";
  find_check_div.style.height = "50px";
  find_check_div.style.display = "flex";
  find_check_div.style.alignItems = "center";
  find_check_div.style.justifyContent = "right";

  const checksvg =  Get_find_check_SVG("", "", "40px","100%","black","");
  checksvg.id = "datesvg";
  checksvg.className = "datesvg";
  checksvg.style.width = "20%";
  checksvg.style.height = "100%";
  checksvg.style.alignItems = "center";
  checksvg.style.justifyContent = "center";
  checksvg.style.marginRight = "5px";

  const button_currentDate = document.createElement("button")
  button_currentDate.style.width = "80px";
  button_currentDate.style.height = "100%";
  button_currentDate.innerText = "當日";
  button_currentDate.style.fontSize = "14px";
  button_currentDate.style.marginRight = "5px";

  const button_lastDate = document.createElement("button")
  button_lastDate.style.width = "80px";
  button_lastDate.style.height = "100%";
  button_lastDate.innerText = "前日";
  button_lastDate.style.fontSize = "14px";

  find_check_div.appendChild(button_currentDate);
  find_check_div.appendChild(button_lastDate);
  find_check_div.appendChild(checksvg);

  popup_find_div.AddControl(find_code_input_div);
  popup_find_div.AddControl(find_start_date_div);
  popup_find_div.AddControl(find_end_date_div);
  popup_find_div.AddControl(find_check_div);



 



  button_currentDate.onclick = button_currentDate_Click;
  button_lastDate.onclick = button_lastDate_Click;
  checksvg.onclick = checksvg_Click;
  popup_find_div.onVisible = popup_find_onVisible;
  return popup_find_div;
}  
function popup_find_onVisible()
{
  const find_code_input = document.querySelector("#find_code_input");
  find_start_date_input.value = "";
}
async function button_currentDate_Click(event)
{
   const currentDate = getCurrentDate();
   const start_datetime = `${currentDate} 00:00:00`;
   const end_datetime = `${currentDate} 23:59:59`;

   const find_start_date_input = document.querySelector("#find_start_date_input");
   const find_end_date_input = document.querySelector("#find_end_date_input");
   find_start_date_input.value = start_datetime;
   find_end_date_input.value = end_datetime;
   
}
async function button_lastDate_Click(event)
{
    var currentDate = getCurrentDate();
    currentDate = DateTimeAddDays(currentDate , -1);
    currentDate = getDateStr(currentDate);
    const start_datetime = `${currentDate} 00:00:00`;
    const end_datetime = `${currentDate} 23:59:59`;
 
    const find_start_date_input = document.querySelector("#find_start_date_input");
    const find_end_date_input = document.querySelector("#find_end_date_input");
    find_start_date_input.value = start_datetime;
    find_end_date_input.value = end_datetime;
}
async function checksvg_Click(event)
{
    const find_start_date_input = document.querySelector("#find_start_date_input");
    const find_end_date_input = document.querySelector("#find_end_date_input");
    const find_code_input = document.querySelector("#find_code_input");
    if(find_code_input.value == "")
    {
        alert("請填寫完整資訊!");
        return;
    }

    Set_main_div_enable(true);
    const Code = find_code_input.value;
    const start_time = find_start_date_input.value ;
    const end_time = find_end_date_input.value ;
    if(start_time == "" || end_time == "")
    {
        [data_information, data] = await Promise.all([
            serch_med_information_by_code(Code),
            serch(Code)
            ]);
    }
    else
    {
        [data_information, data] = await Promise.all([
            serch_med_information_by_code(Code),
            serch(Code ,start_time ,end_time )
            ]);
    }
    if(data.Data.length != 0)
    {
      popup_find_div.Set_Visible(false);

    page_Init();
    }
    else
    {
    alert("查無資料!");
    }    



    Set_main_div_enable(false);
  

}


function find_start_date_input_Y_Click()
{
    const find_start_date_input = document.querySelector("#find_start_date_input");
    const find_end_date_input = document.querySelector("#find_end_date_input");
    if(find_end_date_input.value == "")return;
    const start_date = StringToDateime(find_start_date_input.value);
    const end_date = StringToDateime(find_end_date_input.value);
    if(start_date > end_date)
    {
        alert("'開始時間'不得大於'結束時間'!");
        find_start_date_input.value = "";
    }
}
function find_start_date_input_N_Click()
{
    find_start_date_input.value = "";
}
function find_end_date_input_Y_Click()
{
    const find_start_date_input = document.querySelector("#find_start_date_input");
    const find_end_date_input = document.querySelector("#find_end_date_input");
    if(find_start_date_input.value == "")return;
    const start_date = StringToDateime(find_start_date_input.value);
    const end_date = StringToDateime(find_end_date_input.value);
    if(start_date > end_date)
    {
        alert("'結束時間'不得小於'開始時間'!");
        find_end_date_input.value = "";
    }
}
function find_end_date_input_N_Click()
{
    find_end_date_input.value = "";
}
$(function()
{
     $('.find_start_date_input').focus(function(event) 
     {
       /* Act on the event */
       $(this).date(
       {
         theme:'datetime',
         beginyear : 2022,
         curdate:false
       },find_start_date_input_Y_Click,find_start_date_input_N_Click);
     });
     $('.find_end_date_input').focus(function(event) 
     {
        /* Act on the event */
        $(this).date(
        {
          theme:'datetime',
          beginyear : 2022,
          curdate:false
        },find_end_date_input_Y_Click,find_end_date_input_N_Click);
     });

}) 