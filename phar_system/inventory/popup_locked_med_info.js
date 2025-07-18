let popup_locked_med_info_div;

function get_popup_locked_med_info() {
    popup_locked_med_info_div = new Basic_popup_Div('popup_locked_med_info_div','popup_locked_med_info_div','','');
    popup_locked_med_info_div._popup_div.style.border = '10px solid white';

    let header = get_pplmi_header();
    let main = get_pplmi_main();
    let footer = get_pplmi_footer();

    popup_locked_med_info_div.AddControl(header);
    popup_locked_med_info_div.AddControl(main);
    popup_locked_med_info_div.AddControl(footer);

    return popup_locked_med_info_div;
};
function get_pplmi_header() {
    let pplmi_header_container = document.createElement("div");
    pplmi_header_container.classList.add("pplmi_header_container");

    let pplmi_h_title = document.createElement("div");
    pplmi_h_title.classList.add("pplmi_h_title");
    pplmi_h_title.innerHTML = `<span class="pplmi_h_title_span">通知</span>`;

    let pplmi_h_close_btn = document.createElement("img");
    pplmi_h_close_btn.classList.add("pplmi_h_close_btn");
    pplmi_h_close_btn.src = "../image/close.png";
    pplmi_h_close_btn.addEventListener("click", () => {
        // popup_locked_med_info_div_close();
    });

    pplmi_header_container.appendChild(pplmi_h_title);
    // pplmi_header_container.appendChild(pplmi_h_close_btn);

    return pplmi_header_container;
}
function get_pplmi_main() {
    let pplmi_main_container = document.createElement("div");
    pplmi_main_container.classList.add("pplmi_main_container");

    let ppp_med_info_container = document.createElement("div");
    ppp_med_info_container.classList.add("ppp_med_info_container");
    ppp_med_info_container.innerText = "測試文字測試文字測試文字測試文字測試文字測試文字測試文字\n 測試文字測試文字測試文字"

    pplmi_main_container.appendChild(ppp_med_info_container);
    return pplmi_main_container;
}
function get_pplmi_footer() {
    let pplmi_footer_container = document.createElement("div");
    pplmi_footer_container.classList.add("pplmi_footer_container");

    let pplmi_comfirm_btn = document.createElement("div");
    pplmi_comfirm_btn.classList.add("btn");
    pplmi_comfirm_btn.classList.add("pplmi_comfirm_btn");
    pplmi_comfirm_btn.innerHTML = "確認";

    pplmi_comfirm_btn.addEventListener("click", () => {
        popup_locked_med_info_div_close();
        let header_serch_text = document.querySelector('#header_serch_text');
        header_serch_text.focus();
    });

    pplmi_footer_container.appendChild(pplmi_comfirm_btn);

    return pplmi_footer_container;
}
function popup_locked_med_info_div_close() {
    popup_locked_med_info_div.Set_Visible(false);
}
async function popup_locked_med_info_div_open() {
    popup_locked_med_info_div.Set_Visible(true);
}
