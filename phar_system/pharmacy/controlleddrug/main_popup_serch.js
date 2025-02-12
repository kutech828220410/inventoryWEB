var popup_serch_div;

function get_popup_serch()
{
  popup_serch_div = new Basic_popup_Div('popup_serch_div','popup_serch_div','330px','');
  popup_serch_div._popup_div.style.border = '10px solid white';
  const title_text = get_title_popup_serch();
  const serch_box_div = get_serch_box_popup_serch();
  const underline = get_underline_popup_serch();

  popup_serch_div.AddControl(title_text);
  popup_serch_div.AddControl(serch_box_div);
  popup_serch_div.AddControl(underline);

  return popup_serch_div;
}

function show_popup_serch()
{
    popup_serch_div.Set_Visible(true);  
    updateDivHeight(popup_serch_div._popup_div , 10);
    const serch_code_input = document.querySelector("#serch_code_input");
    serch_start_date_input.value = "";
}
function hide_popup_serch()
{
    popup_serch_div.Set_Visible(false);
}
async function undo_popup_serch()
{
    hide_popup_serch();
}
async function confirm_popup_serch()
{
    try
    {
      const serch_start_date_input = document.querySelector("#serch_start_date_input");
      const serch_end_date_input = document.querySelector("#serch_end_date_input");
      const serch_code_input = document.querySelector("#serch_code_input");
      if(serch_code_input.value == "")
      {
          alert("請填寫完整資訊!");
          return;
      }
  
      Set_main_div_enable(true);
      const Code = serch_code_input.value;
      const start_time = serch_start_date_input.value ;
      const end_time = serch_end_date_input.value ;
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
        popup_serch_div.Set_Visible(false);
  
      page_Init();
      }
      else
      {
        alert("查無資料!");
      }    
  
  
  
      Set_main_div_enable(false);
      hide_popup_serch();
    }
    catch (e) 
    {}
    finally
    {
      
    }
}

async function button_currentDate_Click(event)
{
   const currentDate = getCurrentDate();
   const start_datetime = `${currentDate} 00:00:00`;
   const end_datetime = `${currentDate} 23:59:59`;

   const serch_start_date_input = document.querySelector("#serch_start_date_input");
   const serch_end_date_input = document.querySelector("#serch_end_date_input");
   serch_start_date_input.value = start_datetime;
   serch_end_date_input.value = end_datetime;
   
}
async function button_lastDate_Click(event)
{
    var currentDate = getCurrentDate();
    currentDate = DateTimeAddDays(currentDate , -1);
    currentDate = getDateStr(currentDate);
    const start_datetime = `${currentDate} 00:00:00`;
    const end_datetime = `${currentDate} 23:59:59`;
 
    const serch_start_date_input = document.querySelector("#serch_start_date_input");
    const serch_end_date_input = document.querySelector("#serch_end_date_input");
    serch_start_date_input.value = start_datetime;
    serch_end_date_input.value = end_datetime;
}


function get_title_popup_serch()
{
    const title_text = document.createElement('div');
    My_Div.Init(title_text, 'title_text_serch_div','title_text_serch_div', '100%', '40px', 'gray');
    My_Div.Set_Text(title_text ,"搜尋功能" , TextAlignEnum.CENTER , "24px", true,"微軟正黑體","white");
    title_text.style.borderRadius = "5px";
    title_text.style.marginBottom = "10px";
    return title_text;
}
function get_serch_box_popup_serch()
{
    const serch_box_div = document.createElement('div');
    My_Div.Init(serch_box_div,'serch_box_div_popup_serch','serch_box_div_popup_serch', '100%','','');
    My_Div.Set_Block(serch_box_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.CENTER);
    serch_box_div.style.alignItems = "center";
    serch_box_div.style.flexWrap  = "wrap";

    const serch_code_input_div = document.createElement("div")
    serch_code_input_div.id = "serch_code_input_div";
    serch_code_input_div.className = "serch_code_input_div";
    serch_code_input_div.style.width = "100%";
    serch_code_input_div.style.height = "65px";
    serch_code_input_div.style.alignItems = "center";
    serch_code_input_div.style.justifyContent = "left";
    serch_code_input_div.style.display = "flex";
  
    const pill_svg = Get_pill_SVG("100%", "100%", "52px","100%","black","");
    pill_svg.id = "pill_svg";
    pill_svg.className = "pill_svg";
    pill_svg.style.width = "80px";
    pill_svg.style.height = "100%";
    pill_svg.style.alignItems = "center";
    pill_svg.style.justifyContent = "center";
    pill_svg.style.marginRight = "5px";
    pill_svg.style.marginLeft = "5px";
    const serch_code_input = document.createElement("input")
    serch_code_input.id = "serch_code_input";
    serch_code_input.className = "serch_code_input";
    serch_code_input.style.width = "100%";
    serch_code_input.style.height = "40px";
    serch_code_input.style.textAlign = "center";
    serch_code_input.style.marginRight = "8px";
    serch_code_input.style.borderRadius = "5px";
    serch_code_input.style.borderColor = "gray";
    serch_code_input.placeholder = "請輸入藥碼";
    serch_code_input.style.fontSize = "16px";
  
    serch_code_input_div.appendChild(pill_svg);
    serch_code_input_div.appendChild(serch_code_input);
  
    
  //開始日期
    const serch_start_date_div = document.createElement("div")
    serch_start_date_div.id = "serch_start_date_div";
    serch_start_date_div.className = "serch_start_date_div";
    serch_start_date_div.style.width = "100%";
    serch_start_date_div.style.height = "65px";
    serch_start_date_div.style.alignItems = "center";
    serch_start_date_div.style.justifyContent = "left";
    serch_start_date_div.style.display = "flex";
      // serch_start_date_div.style.backgroundColor = "#000FFF";
  
    const date_start_svg = Get_date_SVG("100%", "100%", "60px", "100%", "black", "");
    date_start_svg.id = "date_start_svg";
    date_start_svg.className = "date_start_svg";
    date_start_svg.style.width = "80px";
    date_start_svg.style.height = "100%";
    date_start_svg.style.alignItems = "center";
    date_start_svg.style.justifyContent = "center";
    date_start_svg.style.marginRight = "3px";
    date_start_svg.style.marginLeft = "5px";
    const serch_start_date_input = document.createElement("input")
    serch_start_date_input.id = "serch_start_date_input";
    serch_start_date_input.className = "serch_start_date_input";
    serch_start_date_input.style.width = "100%";
    serch_start_date_input.style.height = "40px";
    serch_start_date_input.type = "text";
    serch_start_date_input.style.marginRight = "8px";
    serch_start_date_input.style.textAlign = "center";
    serch_start_date_input.value  = "";
    serch_start_date_input.placeholder = "起始時間";
    serch_start_date_input.style.fontSize = "16px";
    serch_start_date_input.style.borderRadius = "5px";
    serch_start_date_input.style.borderColor = "gray";
  
    const serch_start_date_input_div = document.createElement("div")
    serch_start_date_input_div.id = "serch_start_date_input_div";
    serch_start_date_input_div.className = "serch_start_date_input_div";
    serch_start_date_input_div.style.width = "100%";
    serch_start_date_input_div.style.height = "100%";
    serch_start_date_input_div.style.alignItems = "center";
    serch_start_date_input_div.style.justifyContent = "left";
    serch_start_date_input_div.style.display = "flex";
  
  
    serch_start_date_div.appendChild(date_start_svg);
    serch_start_date_div.appendChild(serch_start_date_input_div);
    serch_start_date_input_div.appendChild(serch_start_date_input);
   
  //結束日期
    const serch_end_date_div = document.createElement("div")
    serch_end_date_div.id = "serch_end_date_div";
    serch_end_date_div.className = "serch_end_date_div";
    serch_end_date_div.style.width = "100%";
    serch_end_date_div.style.height = "65px";
    serch_end_date_div.style.alignItems = "center";
    serch_end_date_div.style.justifyContent = "left";
    serch_end_date_div.style.display = "flex";
    const date_end_svg = Get_date_SVG("100%", "100%", "60px", "100%", "black", "");
    date_end_svg.id = "date_end_svg";
    date_end_svg.className = "date_end_svg";
    date_end_svg.style.width = "80px";
    date_end_svg.style.height = "100%";
    date_end_svg.style.alignItems = "center";
    date_end_svg.style.justifyContent = "center";
    date_end_svg.style.marginRight = "3px";
    date_end_svg.style.marginLeft = "5px";
    const serch_end_date_input = document.createElement("input")
    serch_end_date_input.id = "serch_end_date_input";
    serch_end_date_input.className = "serch_end_date_input";
    serch_end_date_input.style.width = "100%";
    serch_end_date_input.style.height = "40px";
    serch_end_date_input.style.marginRight = "8px";
    serch_end_date_input.style.textAlign = "center";
    serch_end_date_input.value  = "";
    serch_end_date_input.placeholder = "結束時間";
    serch_end_date_input.style.fontSize = "16px";
    serch_end_date_input.style.borderRadius = "5px";
    serch_end_date_input.style.borderColor = "gray";
  
    const serch_end_date_input_div = document.createElement("div")
    serch_end_date_input_div.id = "serch_end_date_input_div";
    serch_end_date_input_div.className = "serch_end_date_input_div";
    serch_end_date_input_div.style.width = "100%";
    serch_end_date_input_div.style.height = "100%";
    serch_end_date_input_div.style.alignItems = "center";
    serch_end_date_input_div.style.justifyContent = "left";
    serch_end_date_input_div.style.display = "flex";
  
    serch_end_date_div.appendChild(date_end_svg);
    serch_end_date_div.appendChild(serch_end_date_input_div);
    serch_end_date_input_div.appendChild(serch_end_date_input);
    
   

  
  
  
    serch_box_div.appendChild(serch_code_input_div);
    serch_box_div.appendChild(serch_start_date_div);
    serch_box_div.appendChild(serch_end_date_div);


    return serch_box_div;
}
function get_underline_popup_serch()
{
    const underline_div = document.createElement('div');
    My_Div.Init(underline_div, 'underline_div_serch_div_popup_serch','underline_div_serch_div_popup_serch', '100%','60px','');
    My_Div.Set_Block(underline_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.RIGHT);
    underline_div.style.alignItems = "center";

    const underline_serchtype_div = document.createElement('div');
    My_Div.Init(underline_serchtype_div, 'underline_serchtype_div_popup_serch','underline_serchtype_div_popup_serch', '72%','100%','');
    My_Div.Set_Block(underline_serchtype_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
    underline_div.style.alignItems = "center";
    

    const svg_confirm_SVG = Get_confirm_SVG("40px","100%" ,"60%","100%","green");
    My_Div.Init(svg_confirm_SVG, 'svg_confirm_SVG_popup_input','svg_confirm_SVG_popup_input', '40px', '40px', '');
    svg_confirm_SVG.style.border = "1px solid gray";
    svg_confirm_SVG.style.borderRadius = "3px";
    svg_confirm_SVG.style.marginRight = "5px";
    svg_confirm_SVG.addEventListener('click', function()
    {
        confirm_popup_serch();
    });
    const svg_undo_SVG = Get_undo_SVG("40px","100%" ,"60%","100%","");
    My_Div.Init(svg_undo_SVG, 'svg_undo_SVG_popup_input','svg_undo_SVG_popup_input', '40px', '40px', '');
    svg_undo_SVG.style.border = "1px solid gray";
    svg_undo_SVG.style.borderRadius = "3px";
    svg_undo_SVG.style.marginRight = "5px";
    svg_undo_SVG.addEventListener('click', function()
    {
        undo_popup_serch();
    });

    const button_currentDate = document.createElement("button")
    button_currentDate.style.width = "80px";
    button_currentDate.style.height = "100%";
    button_currentDate.innerText = "當日";
    button_currentDate.style.fontSize = "14px";
    button_currentDate.style.marginRight = "5px";
    button_currentDate.onclick = button_currentDate_Click;
    const button_lastDate = document.createElement("button")
    button_lastDate.style.width = "80px";
    button_lastDate.style.height = "100%";
    button_lastDate.innerText = "前日";
    button_lastDate.style.fontSize = "14px";
    button_lastDate.onclick = button_lastDate_Click;


    underline_serchtype_div.appendChild(button_currentDate);
    underline_serchtype_div.appendChild(button_lastDate);

    underline_div.appendChild(underline_serchtype_div);

    underline_div.appendChild(svg_undo_SVG);
    underline_div.appendChild(svg_confirm_SVG);
    return underline_div;
}


function serch_start_date_input_Y_Click()
{
    const serch_start_date_input = document.querySelector("#serch_start_date_input");
    const serch_end_date_input = document.querySelector("#serch_end_date_input");
    if(serch_end_date_input.value == "")return;
    const start_date = StringToDateime(serch_start_date_input.value);
    const end_date = StringToDateime(serch_end_date_input.value);
    if(start_date > end_date)
    {
        alert("'開始時間'不得大於'結束時間'!");
        serch_start_date_input.value = "";
    }
}
function serch_start_date_input_N_Click()
{
    serch_start_date_input.value = "";
}
function serch_end_date_input_Y_Click()
{
    const serch_start_date_input = document.querySelector("#serch_start_date_input");
    const serch_end_date_input = document.querySelector("#serch_end_date_input");
    if(serch_start_date_input.value == "")return;
    const start_date = StringToDateime(serch_start_date_input.value);
    const end_date = StringToDateime(serch_end_date_input.value);
    if(start_date > end_date)
    {
        alert("'結束時間'不得小於'開始時間'!");
        serch_end_date_input.value = "";
    }
}
function serch_end_date_input_N_Click()
{
    serch_end_date_input.value = "";
}
$(function()
{
     $('.serch_start_date_input').focus(function(event) 
     {
       /* Act on the event */
       $(this).date(
       {
         theme:'datetime',
         beginyear : 2022,
         curdate:false
       },serch_start_date_input_Y_Click,serch_start_date_input_N_Click);
     });
     $('.serch_end_date_input').focus(function(event) 
     {
        /* Act on the event */
        $(this).date(
        {
          theme:'datetime',
          beginyear : 2022,
          curdate:false
        },serch_end_date_input_Y_Click,serch_end_date_input_N_Click);
     });

}) 

