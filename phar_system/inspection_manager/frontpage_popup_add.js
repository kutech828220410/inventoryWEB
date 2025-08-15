var popup_add_div;
//#region [rgba(0, 0, 255, 0.03)] public Function
function get_popup_add()
{
    popup_add_div = new Basic_popup_Div('popup_add_div','popup_add_div','330px','');
    popup_add_div._popup_div.style.border = '10px solid white';
    const title_text = get_title_popup_add();
    const box_div = get_box_popup_add();
    const underline = get_underline_popup_add();

    popup_add_div.AddControl(title_text);
    popup_add_div.AddControl(box_div);
    popup_add_div.AddControl(underline);

    return popup_add_div;
}

function show_popup_add()
{
    popup_add_div.Set_Visible(true);  
    updateDivHeight(popup_add_div._popup_div , 10);
}
function hide_popup_add()
{
    popup_add_div.Set_Visible(false);
}
//#endregion

//#region [rgba(0, 255, 0, 0.03)] Event
async function undo_popup_add()
{
    hide_popup_add();
}
async function confirm_popup_add()
{
    try
    {
        const confirmResult = confirm("確定建立驗收單?");
        if (confirmResult)
        {
            Set_main_div_enable(true);
            const serch_IC_NAME_input  = document.querySelector("#serch_IC_NAME_input_popup_serch");
            console.log(serch_IC_NAME_input.value);
            const returnData = await creat_auto_add(serch_IC_NAME_input.value , get_logedName());
          
            hide_popup_add();
            Set_main_div_enable(false);
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
function get_title_popup_add()
{
    const title_text = document.createElement('div');
    My_Div.Init(title_text, 'title_text_add_div','title_text_add_div', '100%', '40px', 'gray');
    My_Div.Set_Text(title_text ,"新增驗收單" , TextAlignEnum.CENTER , "24px", true,"微軟正黑體","white");
    title_text.style.borderRadius = "5px";
    title_text.style.marginBottom = "10px";
    return title_text;
}
function get_box_popup_add()
{
    const add_box_div = document.createElement('div');
    My_Div.Init(add_box_div,'add_box_div_popup_add','add_box_div_popup_add', '100%','','');
    My_Div.Set_Block(add_box_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.CENTER);
    add_box_div.style.alignItems = "center";
    add_box_div.style.flexWrap  = "wrap";

    const serch_IC_NAME_input = document.createElement('input');
    My_Div.Init(serch_IC_NAME_input,'serch_IC_NAME_input_popup_serch','serch_IC_NAME_input_popup_serch', '90%','40px','');
    My_Div.Set_Text(serch_IC_NAME_input ,"" , TextAlignEnum.CENTER , "18px", false ,"微軟正黑體","black");
    serch_IC_NAME_input.placeholder = '請輸入驗收單名稱';
    serch_IC_NAME_input.style.borderRadius = "3px";
    serch_IC_NAME_input.style.border = "1px solid gray";
    serch_IC_NAME_input.style.paddingLeft = "10px";
    serch_IC_NAME_input.type = "email";
    serch_IC_NAME_input.inputMode = "latin";
    serch_IC_NAME_input.onfocus = function()
    {
       this.select();       
    };
    add_box_div.appendChild(serch_IC_NAME_input);


    return add_box_div;
}
function get_underline_popup_add()
{
    const underline_div = document.createElement('div');
    My_Div.Init(underline_div, 'underline_div_add_div_popup_add','underline_div_add_div_popup_add', '100%','60px','');
    My_Div.Set_Block(underline_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.RIGHT);
    underline_div.style.alignItems = "center";

    const underline_addtype_div = document.createElement('div');
    My_Div.Init(underline_addtype_div, 'underline_addtype_div_popup_add','underline_addtype_div_popup_add', '72%','100%','');
    My_Div.Set_Block(underline_addtype_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
    underline_div.style.alignItems = "center";
    

    const svg_confirm_SVG = Get_confirm_SVG("40px","100%" ,"60%","100%","green");
    My_Div.Init(svg_confirm_SVG, 'svg_confirm_SVG_popup_input','svg_confirm_SVG_popup_input', '40px', '40px', '');
    svg_confirm_SVG.style.border = "1px solid gray";
    svg_confirm_SVG.style.borderRadius = "3px";
    svg_confirm_SVG.style.marginRight = "5px";
    svg_confirm_SVG.addEventListener('click', function()
    {
        confirm_popup_add();
    });
    const svg_undo_SVG = Get_undo_SVG("40px","100%" ,"60%","100%","");
    My_Div.Init(svg_undo_SVG, 'svg_undo_SVG_popup_input','svg_undo_SVG_popup_input', '40px', '40px', '');
    svg_undo_SVG.style.border = "1px solid gray";
    svg_undo_SVG.style.borderRadius = "3px";
    svg_undo_SVG.style.marginRight = "5px";
    svg_undo_SVG.addEventListener('click', function()
    {
        undo_popup_add();
    });
    underline_div.appendChild(underline_addtype_div);

    underline_div.appendChild(svg_undo_SVG);
    underline_div.appendChild(svg_confirm_SVG);
    return underline_div;
}
//#endregion

