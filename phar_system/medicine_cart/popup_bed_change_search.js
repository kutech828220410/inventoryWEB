let popup_bed_change_search_div;

function get_popup_bed_change_search() {
    popup_bed_change_search_div = new Basic_popup_Div('popup_bed_change_search_div','popup_bed_change_search_div','','');
    popup_bed_change_search_div._popup_div.style.border = '10px solid white';

    let header = get_pp_bed_change_search_header();
    let main = get_pp_bed_change_search_main();
    let footer = get_pp_bed_change_search_footer();

    popup_bed_change_search_div.AddControl(header);
    popup_bed_change_search_div.AddControl(main);
    popup_bed_change_search_div.AddControl(footer);

    return popup_bed_change_search_div;
};
function get_pp_bed_change_search_header() {
    let ppbcs_header_container = document.createElement("div");
    ppbcs_header_container.classList.add("ppbcs_header_container");

    let ppbcs_h_title = document.createElement("div");
    ppbcs_h_title.classList.add("ppbcs_h_title");
    ppbcs_h_title.innerHTML = `病床異動搜尋`;

    let ppbcs_h_close_btn = document.createElement("img");
    ppbcs_h_close_btn.classList.add("ppbcs_h_close_btn");
    ppbcs_h_close_btn.src = "../image/close.png";
    ppbcs_h_close_btn.addEventListener("click", () => {
        popup_bed_change_search_div_close();
    });

    ppbcs_header_container.appendChild(ppbcs_h_title);
    ppbcs_header_container.appendChild(ppbcs_h_close_btn);
    // ppbcs_header_container.appendChild(ppbcs_h_cart_name);

    return ppbcs_header_container;
}
function get_pp_bed_change_search_main() {
    let ppbcs_main_container = document.createElement("div");
    ppbcs_main_container.classList.add("ppbcs_main_container");

    let ppbcs_name_input_container = document.createElement("div");
    ppbcs_name_input_container.classList.add("ppbcs_name_input_container");

    let ppbcs_name_input = document.createElement("input");
    ppbcs_name_input.classList.add("ppbcs_name_input");
    ppbcs_name_input.type = "text";
    ppbcs_name_input.maxLength = 20;

    ppbcs_name_input_container.appendChild(ppbcs_name_input);

    let ppbcs_nurnum_container = document.createElement("div");

    ppbcs_main_container.appendChild(ppbcs_name_input_container);

    return ppbcs_main_container;
}
function get_pp_bed_change_search_footer() {
    let ppbcs_footer_container = document.createElement("div");
    ppbcs_footer_container.classList.add("ppbcs_footer_container");

    let ppbcs_search_result_btn = document.createElement("div");
    ppbcs_search_result_btn.classList.add('ppbcs_search_result_btn');
    ppbcs_search_result_btn.innerHTML = "搜尋";
    ppbcs_search_result_btn.addEventListener("click", () => {

    })

    return ppbcs_footer_container;
}
function popup_bed_change_search_div_close() {
    popup_bed_change_search_div.Set_Visible(false);
}
async function popup_bed_change_search_div_open() {
    popup_bed_change_search_div.Set_Visible(true);
}