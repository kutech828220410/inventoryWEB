var popup_serch_div;
//#region [rgba(0, 0, 255, 0.03)] public Function
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
//#endregion

//#region [rgba(0, 255, 0, 0.03)] Event
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
        
        var date_start = serch_start_date_input.value;
        var date_start = getStartDateStr(date_start);
        var date_end = serch_end_date_input.value;
        var date_end = getEndDateStr(date_end);

        if (date_start && date_end)
        {
            data = await serch_by_ST_END(date_start,date_end);
            if(data == null)
            {
                alert("查無資料!");
                return;
            }
            if(data.Data.length == 0)
            {
                alert("查無資料!");
                return;
            }
            page_Init(data);
            hide_popup_serch();
            return;
        }
    }
    catch (e) 
    {}
    finally
    {
      
    }
}
//#endregion

//#region [rgba(255, 0, 0, 0.03)] private Function
function get_title_popup_serch()
{
    const title_text = document.createElement('div');
    My_Div.Init(title_text, 'title_text','title_text', '100%', '40px', 'gray');
    My_Div.Set_Text(title_text ,"搜尋功能" , TextAlignEnum.CENTER , "24px", true,"微軟正黑體","white");
    title_text.style.borderRadius = "5px";
    title_text.style.marginBottom = "10px";
    return title_text;
}
function get_serch_box_popup_serch()
{
    const serch_box_div = document.createElement('div');
    My_Div.Init(serch_box_div,'serch_box_div','serch_box_div', '100%','','');
    My_Div.Set_Block(serch_box_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.CENTER);
    serch_box_div.style.alignItems = "center";
    serch_box_div.style.flexWrap  = "wrap";

    const serch_start_date_input = document.createElement('input');
    My_Div.Init(serch_start_date_input,'serch_start_date_input','serch_start_date_input', '90%','40px','');
    My_Div.Set_Text(serch_start_date_input ,"" , TextAlignEnum.CENTER , "18px", false ,"微軟正黑體","black");
    serch_start_date_input.placeholder = '請選擇起始日期';
    serch_start_date_input.style.borderRadius = "3px";
    serch_start_date_input.style.border = "1px solid gray";
    serch_start_date_input.style.paddingLeft = "10px";
    serch_start_date_input.type = "email";
    serch_start_date_input.inputMode = "latin";
    serch_start_date_input.style.marginTop = "10px";

    const serch_end_date_input = document.createElement('input');
    My_Div.Init(serch_end_date_input,'serch_end_date_input','serch_end_date_input', '90%','40px','');
    My_Div.Set_Text(serch_end_date_input ,"" , TextAlignEnum.CENTER , "18px", false ,"微軟正黑體","black");
    serch_end_date_input.placeholder = '請選擇結束日期';
    serch_end_date_input.style.borderRadius = "3px";
    serch_end_date_input.style.border = "1px solid gray";
    serch_end_date_input.style.paddingLeft = "10px";
    serch_end_date_input.type = "email";
    serch_end_date_input.inputMode = "latin";
    serch_end_date_input.style.marginTop = "10px";

    serch_box_div.appendChild(serch_start_date_input);
    serch_box_div.appendChild(serch_end_date_input);


    return serch_box_div;
}
function get_underline_popup_serch()
{
    const underline_div = document.createElement('div');
    My_Div.Init(underline_div, 'underline_div_serch_div_popup_serch','underline_div_serch_div_popup_serch', '100%','55px','');
    My_Div.Set_Block(underline_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
    underline_div.style.alignItems = "center";

    const svg_confirm_SVG = Get_confirm_SVG("40px","100%" ,"60%","100%","green");
    My_Div.Init(svg_confirm_SVG, 'svg_confirm_SVG_popup_input','svg_confirm_SVG_popup_input', '40px', '40px', '');
    svg_confirm_SVG.style.border = "1px solid gray";
    svg_confirm_SVG.style.borderRadius = "3px";
    svg_confirm_SVG.style.marginLeft = "10px";
    svg_confirm_SVG.addEventListener('click', function()
    {
        confirm_popup_serch();
    });

    const svg_undo_SVG = Get_undo_SVG("40px","100%" ,"60%","100%","");
    My_Div.Init(svg_undo_SVG, 'svg_undo_SVG_popup_input','svg_undo_SVG_popup_input', '40px', '40px', '');
    svg_undo_SVG.style.border = "1px solid gray";
    svg_undo_SVG.style.borderRadius = "3px";
    svg_undo_SVG.style.marginLeft = "85px";
    svg_undo_SVG.addEventListener('click', function()
    {
        undo_popup_serch();
    });
    
    const button_currentDate = document.createElement("button")
    button_currentDate.style.width = "60px";
    button_currentDate.style.height = "75%";
    button_currentDate.innerText = "當日";
    button_currentDate.style.fontSize = "14px";
    button_currentDate.style.marginLeft = "10px";

    const button_lastDate = document.createElement("button")
    button_lastDate.style.width = "60px";
    button_lastDate.style.height = "75%";
    button_lastDate.innerText = "前日";
    button_lastDate.style.fontSize = "14px";
    button_lastDate.style.marginLeft = "10px";

    button_currentDate.onclick = button_currentDate_Click;
    button_lastDate.onclick = button_lastDate_Click;

    underline_div.appendChild(button_currentDate);
    underline_div.appendChild(button_lastDate);
    underline_div.appendChild(svg_undo_SVG);
    underline_div.appendChild(svg_confirm_SVG);
    return underline_div;
}
async function button_currentDate_Click(event)
{
   const currentDate = getCurrentDate();
   const start_datetime = `${currentDate}`;
   const end_datetime = `${currentDate}`;

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
    const start_datetime = `${currentDate}`;
    const end_datetime = `${currentDate}`;
 
    const serch_start_date_input = document.querySelector("#serch_start_date_input");
    const serch_end_date_input = document.querySelector("#serch_end_date_input");
    serch_start_date_input.value = start_datetime;
    serch_end_date_input.value = end_datetime;
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
         theme:'date',
         beginyear : 2022,
         curdate:false
       },serch_start_date_input_Y_Click,serch_start_date_input_N_Click);
     });
     $('.serch_end_date_input').focus(function(event) 
     {
        /* Act on the event */
        $(this).date(
        {
          theme:'date',
          beginyear : 2022,
          curdate:false
        },serch_end_date_input_Y_Click,serch_end_date_input_N_Click);
     });

}) 
//#endregion