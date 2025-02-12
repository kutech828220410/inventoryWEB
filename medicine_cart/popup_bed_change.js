let popup_bed_change_div;

function get_popup_bed_change() {
    popup_bed_change_div = new Basic_popup_Div('popup_bed_change_div','popup_bed_change_div','','');
    popup_bed_change_div._popup_div.style.border = '10px solid white';

    let header = get_pp_bed_change_header();
    let main = get_pp_bed_change_main();
    let footer = get_pp_bed_change_footer();

    popup_bed_change_div.AddControl(header);
    popup_bed_change_div.AddControl(main);
    popup_bed_change_div.AddControl(footer);

    return popup_bed_change_div;
};
function get_pp_bed_change_header() {
    let ppbc_header_container = document.createElement("div");
    ppbc_header_container.classList.add("ppbc_header_container");

    let ppbc_h_title = document.createElement("div");
    ppbc_h_title.classList.add("ppbc_h_title");
    ppbc_h_title.innerHTML = `病床異動`;

    let ppbc_h_close_btn = document.createElement("img");
    ppbc_h_close_btn.classList.add("ppbc_h_close_btn");
    ppbc_h_close_btn.src = "../image/close.png";
    ppbc_h_close_btn.addEventListener("click", () => {
        popup_bed_change_div_close();
    });

    ppbc_header_container.appendChild(ppbc_h_title);
    ppbc_header_container.appendChild(ppbc_h_close_btn);
    // ppbc_header_container.appendChild(ppbc_h_cart_name);

    return ppbc_header_container;
}
function get_pp_bed_change_main() {
    let ppbc_main_container = document.createElement("div");
    ppbc_main_container.classList.add("ppbc_main_container");

    return ppbc_main_container;
}
function get_pp_bed_change_footer() {
    let ppbc_footer_container = document.createElement("div");
    ppbc_footer_container.classList.add("ppbc_footer_container");

    return ppbc_footer_container;
}
function popup_bed_change_div_close() {
    popup_bed_change_div.Set_Visible(false);
}
async function popup_bed_change_div_open() {
    popup_bed_change_div.Set_Visible(true);
}
