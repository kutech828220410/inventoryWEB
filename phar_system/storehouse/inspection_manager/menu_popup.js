function get_menu_popup()
{
    menu_popup_div = new Basic_popup_Div('menu_popup_div','menu_popup_div','60px','240px');
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