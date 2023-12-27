var popup_select_by_pon;

function get_select_by_pon()
{
    popup_select_by_pon = new Basic_popup_Div('popup_select_by_pon_div','popup_select_by_pon_div','340px','');
    let popup_select_by_pon_div = document.querySelector(".popup_select_by_pon_div");
    // popup_select_by_pon_div.style.minHeight = '280px';
    popup_select_by_pon_div.style.maxHeight = '460px';
    popup_select_by_pon_div.style.padding = "16px 0px";
    popup_select_by_pon_div.style.boxSizing = 'border-box';

    let sbp_header = document.createElement("div");
    sbp_header.classList.add("sbp_header");
    sbp_header.style.position = 'relative';

    let sbp_header_title = document.createElement("div");
    sbp_header_title.classList.add('sbp_header_title');
    sbp_header_title.innerHTML = '請根據請購單號選擇';

    let sbp_header_undo = document.createElement("div");
    sbp_header_undo.classList.add("sbp_header_undo");
    sbp_header_undo.innerHTML = '<img src="../../image/close.png" alt="close button">';
    sbp_header_undo.style.position = 'absolute';
    sbp_header_undo.addEventListener('click', () => {
        hide_popup_select_by_pon();
    })

    let sbp_main_div = document.createElement("div");
    sbp_main_div.classList.add('sbp_main_div')


    sbp_header.appendChild(sbp_header_title);
    sbp_header.appendChild(sbp_header_undo);

    popup_select_by_pon_div.appendChild(sbp_header);
    popup_select_by_pon_div.appendChild(sbp_main_div);
    // console.log(data['Data'][0]['Contents']);
    return popup_select_by_pon;
}

function hide_popup_select_by_pon()
{
    let sbp_main_div = document.querySelector('.sbp_main_div');
    sbp_main_div.innerHTML = '';
    popup_select_by_pon.Set_Visible(false);
}
function show_popup_select_by_pon()
{
    popup_select_by_pon.Set_Visible(true);
}
function init_get_row_by_pon() {
    let sbp_main_div = document.querySelector('.sbp_main_div');

    sbp_main_div.innerHTML = '';
}
function get_row_by_pon(sub_content) {
    let _GUID = sub_content.GUID;
    let sbp_main_div = document.querySelector('.sbp_main_div');

    let sbp_med_list_container = document.createElement("div");
    sbp_med_list_container.classList.add("sbp_med_list_container");
    sbp_med_list_container.id = _GUID;

    let sbp_med_list_name = document.createElement("div");
    sbp_med_list_name.classList.add("sbp_med_list_name");
    sbp_med_list_name.innerHTML = `(英)${sub_content.NAME}`;

    let sbp_med_list_ctname = document.createElement("div");
    sbp_med_list_ctname.classList.add("sbp_med_list_ctname");
    sbp_med_list_ctname.innerHTML = `(中)${sub_content.CHT_NAME}`;

    let sbp_med_list_pon = document.createElement("div");
    sbp_med_list_pon.classList.add("sbp_med_list_pon");
    sbp_med_list_pon.innerHTML = `請購單號: ${sub_content.PON}`;

    sbp_med_list_container.appendChild(sbp_med_list_pon);
    sbp_med_list_container.appendChild(sbp_med_list_name);
    sbp_med_list_container.appendChild(sbp_med_list_ctname);

    sbp_med_list_container.addEventListener("click", (e) => {
        let GUID = e.target.parentElement["id"];
        console.log(GUID);
        const Content = data.Data[0].Contents.filter(function(content)
        {
            return content.GUID == GUID;
        });
        console.log(Content);
        if(Content.length > 0)
        {
            hide_popup_select_by_pon();
            show_popup_input(Content[0]);
        }
    });

    sbp_main_div.appendChild(sbp_med_list_container);
}