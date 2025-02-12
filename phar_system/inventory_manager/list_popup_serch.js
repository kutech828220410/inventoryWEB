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
        const serch_ICSN_input = document.querySelector('#serch_ICSN_input_popup_serch');
        const serch_start_date_input = document.querySelector('#serch_start_date_input_popup_serch');
        const serch_end_date_input = document.querySelector('#serch_end_date_input_popup_serch');
        var IC_SN = serch_ICSN_input.value;
        var date_start = serch_start_date_input.value;
        var date_end = serch_end_date_input.value;
        serch_ICSN_input.value = '';
        serch_start_date_input.value = '';
        if (IC_SN) 
        {
            Set_main_div_enable(true);
            data = await creat_get_by_IC_SN(IC_SN);
            Set_main_div_enable(false);
            if (data.Code <= 0) 
            {
            alert("查無資料!");
            return;
            }
            page_Init(data);
            return;
        }
        if (date_start || date_end)
        {
            var num = 0;
            if(date_start)num++;
            if(date_end)num++;
            if(num == 2)
            {
            var date_end = DateTimeAddDays(date_end, 1);
            date_start = getDateStr(date_start);
            date_end = getDateStr(date_end);
            Set_main_div_enable(true);
            data = await creat_get_by_CT_TIME_ST_END(date_start,date_end);
            Set_main_div_enable(false);
            }
            else
            {
            if(date_start)
            {
                Set_main_div_enable(true);
                data = await creat_get_by_CT_TIME_S(date_start);
                Set_main_div_enable(false);
            }
            if(date_end)
            {
                Set_main_div_enable(true);
                data = await creat_get_by_CT_TIME_S(date_end);
                Set_main_div_enable(false);
            }
            }
        
            if (data.Data.length <= 0) 
            {
            alert("查無資料!");
            return;
            }
            page_Init(data);
            return;
        }
        hide_popup_serch();
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

    const serch_ICSN_input = document.createElement('input');
    My_Div.Init(serch_ICSN_input,'serch_ICSN_input_popup_serch','serch_ICSN_input_popup_serch', '90%','40px','');
    My_Div.Set_Text(serch_ICSN_input ,"" , TextAlignEnum.CENTER , "18px", false ,"微軟正黑體","black");
    serch_ICSN_input.placeholder = '請輸入盤點單號';
    serch_ICSN_input.style.borderRadius = "3px";
    serch_ICSN_input.style.border = "1px solid gray";
    serch_ICSN_input.style.paddingLeft = "10px";
    serch_ICSN_input.type = "email";
    serch_ICSN_input.inputMode = "latin";
    serch_ICSN_input.onfocus = function()
    {
       this.select();       
    };

    const serch_start_date_input = document.createElement('input');
    My_Div.Init(serch_start_date_input,'serch_start_date_input_popup_serch','serch_start_date_input_popup_serch', '90%','40px','');
    My_Div.Set_Text(serch_start_date_input ,"" , TextAlignEnum.CENTER , "18px", false ,"微軟正黑體","black");
    serch_start_date_input.placeholder = '請選擇起始日期';
    serch_start_date_input.style.borderRadius = "3px";
    serch_start_date_input.style.border = "1px solid gray";
    serch_start_date_input.style.paddingLeft = "10px";
    serch_start_date_input.type = "email";
    serch_start_date_input.inputMode = "latin";
    serch_start_date_input.style.marginTop = "10px";

    const serch_end_date_input = document.createElement('input');
    My_Div.Init(serch_end_date_input,'serch_end_date_input_popup_serch','serch_end_date_input_popup_serch', '90%','40px','');
    My_Div.Set_Text(serch_end_date_input ,"" , TextAlignEnum.CENTER , "18px", false ,"微軟正黑體","black");
    serch_end_date_input.placeholder = '請選擇結束日期';
    serch_end_date_input.style.borderRadius = "3px";
    serch_end_date_input.style.border = "1px solid gray";
    serch_end_date_input.style.paddingLeft = "10px";
    serch_end_date_input.type = "email";
    serch_end_date_input.inputMode = "latin";
    serch_end_date_input.style.marginTop = "10px";

    serch_box_div.appendChild(serch_ICSN_input);
    serch_box_div.appendChild(serch_start_date_input);
    serch_box_div.appendChild(serch_end_date_input);


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
    underline_div.appendChild(underline_serchtype_div);

    underline_div.appendChild(svg_undo_SVG);
    underline_div.appendChild(svg_confirm_SVG);
    return underline_div;
}

function serch_start_date_input_Y_Click()
{
    const serch_start_date_input = document.querySelector("#serch_start_date_input_popup_serch");
    const serch_end_date_input = document.querySelector("#serch_end_date_input_popup_serch");
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
    const serch_start_date_input = document.querySelector("#serch_start_date_input_popup_serch");
    serch_start_date_input.value = "";
}
function serch_end_date_input_Y_Click()
{
    const serch_start_date_input = document.querySelector("#serch_start_date_input_popup_serch");
    const serch_end_date_input = document.querySelector("#serch_end_date_input_popup_serch");
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
    const serch_end_date_input = document.querySelector("#serch_end_date_input_popup_serch");
    serch_end_date_input.value = "";
}
$(function()
{
     $('.serch_start_date_input_popup_serch').focus(function(event) 
     {
       /* Act on the event */
       $(this).date(
       {
         theme:'date',
         beginyear : 2022,
         curdate:false
       },serch_start_date_input_Y_Click,serch_start_date_input_N_Click);
     });
     $('.serch_end_date_input_popup_serch').focus(function(event) 
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