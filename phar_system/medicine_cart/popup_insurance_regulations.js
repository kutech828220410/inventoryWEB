let popup_insurance_regulations_div;

function get_popup_insurance_regulations() {
    popup_insurance_regulations_div = new Basic_popup_Div('popup_insurance_regulations_div','popup_insurance_regulations_div','','');
    popup_insurance_regulations_div._popup_div.style.border = '10px solid white';

    let header = get_ppir_header();
    let main = get_ppir_main();
    let footer = get_ppir_footer();

    popup_insurance_regulations_div.AddControl(header);
    popup_insurance_regulations_div.AddControl(main);
    popup_insurance_regulations_div.AddControl(footer);

    return popup_insurance_regulations_div;
};
function get_ppir_header() {
    let ppir_header_container = document.createElement("div");
    ppir_header_container.classList.add("ppir_header_container");

    let ppir_h_title = document.createElement("div");
    ppir_h_title.classList.add("ppir_h_title");
    ppir_h_title.innerHTML = `<span class="ppir_h_title_span">健保規範</span>`;

    let ppir_h_close_btn = document.createElement("img");
    ppir_h_close_btn.classList.add("ppir_h_close_btn");
    ppir_h_close_btn.src = "../image/close.png";
    ppir_h_close_btn.addEventListener("click", () => {
        popup_insurance_regulations_div_close();
    });

    ppir_header_container.appendChild(ppir_h_title);
    ppir_header_container.appendChild(ppir_h_close_btn);

    return ppir_header_container;
}
function get_ppir_main() {
    let ppir_main_container = document.createElement("div");
    ppir_main_container.classList.add("ppir_main_container");

    let ppir_med_info_container = document.createElement("div");
    ppir_med_info_container.classList.add("ppir_med_info_container");

    let ppir_main_content = document.createElement("div");
    ppir_main_content.classList.add(`ppir_main_content`);

    ppir_med_info_container.appendChild(ppir_main_content);

    ppir_main_container.appendChild(ppir_med_info_container);
    return ppir_main_container;
}
function get_ppir_footer() {
    let ppir_footer_container = document.createElement("div");
    ppir_footer_container.classList.add("ppir_footer_container");

    return ppir_footer_container;
}
function popup_insurance_regulations_div_close() {
    check_cart_dispense();
    popup_insurance_regulations_div.Set_Visible(false);
}
async function popup_insurance_regulations_div_open() {
    await check_cart_dispense();
    popup_insurance_regulations_div.Set_Visible(true);
}
async function set_ppir_func(content) {
    console.log(content);
    let temp_div = document.querySelector(`.ppir_main_content`);
    if(content == "") {
        temp_div.innerHTML = "無資料";
    } else {
        temp_div.innerHTML = content;
    }
}
