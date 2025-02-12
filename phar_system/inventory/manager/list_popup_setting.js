var pop_setting_div;

function get_popup_setting()
{
    pop_setting_div = new Basic_popup_Div('pop_setting_div','pop_setting_div','330px','');
    pop_setting_div._popup_div.style.border = '10px solid white';
    const title_text = get_title_setting();
    const serch_box_div = get_serch_box_setting();
    const underline = get_underline_setting();

    pop_setting_div.AddControl(title_text);
    pop_setting_div.AddControl(serch_box_div);
    pop_setting_div.AddControl(underline);

    return pop_setting_div;
}

function get_title_setting()
{
    const title_text = document.createElement('div');
    My_Div.Init(title_text, 'title_add_setting_div','title_add_setting_div', '100%', '40px', 'gray');
    My_Div.Set_Text(title_text ,"請點選設定項目" , TextAlignEnum.CENTER , "24px", true,"微軟正黑體","white");
    title_text.style.borderRadius = "5px";
    title_text.style.marginBottom = "10px";
    return title_text;
}

function get_serch_box_setting()
{
    const serch_box_div = document.createElement('div');
    My_Div.Init(serch_box_div,'serch_box_div_popup_serch','serch_box_div_popup_serch', '100%','','');
    My_Div.Set_Block(serch_box_div, DisplayEnum.FLEX, JustifyContentEnum.CENTER);
    serch_box_div.style.alignItems = "center";
    serch_box_div.style.flexWrap  = "wrap";

    let set_default_op = document.createElement("div");
    set_default_op.classList.add("set_default_op");
    set_default_op.innerHTML = "設定盤點人";
    set_default_op.style.padding = "12px 0px";
    set_default_op.style.width = "44%";
    set_default_op.style.cursor = "pointer";
    set_default_op.style.margin = "0px 3% 12px";
    set_default_op.style.display = "flex";
    set_default_op.style.justifyContent = "center";
    set_default_op.style.alignItems = "center";
    set_default_op.style.borderRadius = "5px";
    set_default_op.style.border = "2px solid gray";
    set_default_op.style.boxSizing = "border-box";
    set_default_op.style.color = "#000000";
    set_default_op.style.backgroundColor = "transparent";
    set_default_op.style.fontWeight = "700";
    set_default_op.addEventListener("click", () => {
        let title_add_setting_div = document.querySelector(".title_add_setting_div");
        let IC_SN = title_add_setting_div.getAttribute("IC_SN");
        let GUID = title_add_setting_div.getAttribute("GUID");
        show_d_o(IC_SN, GUID);
        hide_setting();
    })

    let set_list_med = document.createElement("div");
    set_list_med.classList.add("set_list_med");
    set_list_med.innerHTML = "新增藥品";
    set_list_med.style.padding = "12px 0px";
    set_list_med.style.width = "44%";
    set_list_med.style.cursor = "pointer";
    set_list_med.style.margin = "0px 3% 12px";
    set_list_med.style.display = "flex";
    set_list_med.style.justifyContent = "center";
    set_list_med.style.alignItems = "center";
    set_list_med.style.borderRadius = "5px";
    set_list_med.style.border = "2px solid gray";
    set_list_med.style.boxSizing = "border-box";
    set_list_med.style.color = "#000000";
    set_list_med.style.backgroundColor = "transparent";
    set_list_med.style.fontWeight = "700";
    set_list_med.addEventListener("click", () => {
        // alert('功能趕工中，請耐心等候');
        let title_add_setting_div = document.querySelector(".title_add_setting_div");
        let IC_SN = title_add_setting_div.getAttribute("IC_SN");
        let GUID = title_add_setting_div.getAttribute("GUID");
        show_add_med(IC_SN, GUID);
        hide_setting();
    })


    serch_box_div.appendChild(set_default_op);
    serch_box_div.appendChild(set_list_med);

    return serch_box_div;
}

function get_underline_setting()
{
    const underline_div = document.createElement('div');
    My_Div.Init(underline_div, 'underline_div_serch_div_popup_serch','underline_div_serch_div_popup_serch', '100%','60px','');
    My_Div.Set_Block(underline_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.RIGHT);
    underline_div.style.alignItems = "center";

    const underline_serchtype_div = document.createElement('div');
    My_Div.Init(underline_serchtype_div, 'underline_serchtype_div_popup_serch','underline_serchtype_div_popup_serch', '62%','100%','');
    My_Div.Set_Block(underline_serchtype_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
    underline_div.style.alignItems = "center";

    const close_setting_div = document.createElement("div");
    close_setting_div.classList.add("close_setting_div");
    close_setting_div.innerHTML = '關閉設定';
    close_setting_div.style.padding = '7px 12px';
    close_setting_div.style.borderRadius = "5px";
    close_setting_div.style.border = "2px solid gray";
    close_setting_div.style.backgroundColor = "#454545";
    close_setting_div.style.color = "#F0F0F0";
    close_setting_div.style.fontWeight = "600";
    close_setting_div.style.marginRight = "10px";
    close_setting_div.style.cursor = "pointer";

    close_setting_div.addEventListener("click", () => {
        hide_setting();
    });

    // const svg_undo_SVG = Get_undo_SVG("40px","100%" ,"60%","100%","");
    // My_Div.Init(svg_undo_SVG, 'svg_undo_SVG_setting','svg_undo_SVG_setting', '40px', '40px', '');
    // svg_undo_SVG.style.border = "1px solid gray";
    // svg_undo_SVG.style.borderRadius = "3px";
    // svg_undo_SVG.style.marginRight = "5px";
    // svg_undo_SVG.addEventListener('click', function()
    // {
    //     hide_setting();
    // });
    // underline_div.appendChild(underline_serchtype_div);

    underline_div.appendChild(close_setting_div);
    // underline_div.appendChild(svg_confirm_SVG);
    return underline_div;
}

function hide_setting()
{
    let title_add_setting_div = document.querySelector(".title_add_setting_div");
    title_add_setting_div.setAttribute("IC_SN", "");
    title_add_setting_div.setAttribute("GUID", "");
    pop_setting_div.Set_Visible(false);
}

async function show_setting(e)
{
    let IC_SN = e.target.getAttribute("IC_SN");
    let GUID = e.target.getAttribute("GUID");
    let title_add_setting_div = document.querySelector(".title_add_setting_div");
    title_add_setting_div.setAttribute("IC_SN", IC_SN);
    title_add_setting_div.setAttribute("GUID", GUID);
    pop_setting_div.Set_Visible(true);
}

async function return_setting(_IC_SN, _GUID)
{
    let IC_SN = _IC_SN;
    let GUID = _GUID;
    let title_add_setting_div = document.querySelector(".title_add_setting_div");
    title_add_setting_div.setAttribute("IC_SN", IC_SN);
    title_add_setting_div.setAttribute("GUID", GUID);
    pop_setting_div.Set_Visible(true);
    hide_d_o();
    hide_add_med();
};