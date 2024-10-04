let popup_physician_notes_div;

function get_popup_physician_notes() {
    popup_physician_notes_div = new Basic_popup_Div('popup_physician_notes_div','popup_physician_notes_div','','');
    popup_physician_notes_div._popup_div.style.border = '10px solid white';

    let header = get_pppns_header();
    let main = get_pppns_main();
    let footer = get_pppns_footer();

    popup_physician_notes_div.AddControl(header);
    popup_physician_notes_div.AddControl(main);
    popup_physician_notes_div.AddControl(footer);

    return popup_physician_notes_div;
};
function get_pppns_header() {
    let pppns_header_container = document.createElement("div");
    pppns_header_container.classList.add("pppns_header_container");

    let pppns_h_title = document.createElement("div");
    pppns_h_title.classList.add("pppns_h_title");
    pppns_h_title.innerHTML = `<span class="pppns_h_title_span">醫師註解</span>`;

    let pppns_h_close_btn = document.createElement("img");
    pppns_h_close_btn.classList.add("pppns_h_close_btn");
    pppns_h_close_btn.src = "../image/close.png";
    pppns_h_close_btn.addEventListener("click", () => {
        popup_physician_notes_div_close();
    });

    pppns_header_container.appendChild(pppns_h_title);
    pppns_header_container.appendChild(pppns_h_close_btn);

    return pppns_header_container;
}
function get_pppns_main() {
    let pppns_main_container = document.createElement("div");
    pppns_main_container.classList.add("pppns_main_container");

    let ppp_med_info_container = document.createElement("div");
    ppp_med_info_container.classList.add("ppp_med_info_container");

    let pppns_main_content = document.createElement("div");
    pppns_main_content.classList.add(`pppns_main_content`);

    ppp_med_info_container.appendChild(pppns_main_content);

    pppns_main_container.appendChild(ppp_med_info_container);
    return pppns_main_container;
}
function get_pppns_footer() {
    let pppns_footer_container = document.createElement("div");
    pppns_footer_container.classList.add("pppns_footer_container");

    return pppns_footer_container;
}
function popup_physician_notes_div_close() {
    popup_physician_notes_div.Set_Visible(false);
}
async function popup_physician_notes_div_open() {
    popup_physician_notes_div.Set_Visible(true);
}
async function set_pppns_func(content) {
    let temp_div = document.querySelector(`.pppns_main_content`);
    if(content == "") {
        temp_div.innerHTML = "無資料";
    } else {
        temp_div.innerHTML = content;
    }
}
