let popup_med_pic_div;

function get_popup_med_pic() {
    popup_med_pic_div = new Basic_popup_Div('popup_med_pic_div','popup_med_pic_div','','');
    popup_med_pic_div._popup_div.style.border = '10px solid white';

    let header = get_pp_med_pic_header();
    let main = get_pp_med_pic_main();
    let footer = get_pp_med_pic_footer();

    popup_med_pic_div.AddControl(header);
    popup_med_pic_div.AddControl(main);
    popup_med_pic_div.AddControl(footer);

    return popup_med_pic_div;
};
function get_pp_med_pic_header() {
    let ppmp_header_container = document.createElement("div");
    ppmp_header_container.classList.add("ppmp_header_container");

    let ppmp_h_title = document.createElement("div");
    ppmp_h_title.classList.add("ppmp_h_title");
    ppmp_h_title.innerHTML = `<span class="ppmp_h_title_span">藥品外觀</span>`;

    let ppmp_h_close_btn = document.createElement("img");
    ppmp_h_close_btn.classList.add("ppmp_h_close_btn");
    ppmp_h_close_btn.src = "../image/close.png";
    ppmp_h_close_btn.addEventListener("click", () => {
        popup_med_pic_div_close();
    });

    ppmp_header_container.appendChild(ppmp_h_title);
    ppmp_header_container.appendChild(ppmp_h_close_btn);

    return ppmp_header_container;
}
function get_pp_med_pic_main() {
    let ppmp_main_container = document.createElement("div");
    ppmp_main_container.classList.add("ppmp_main_container");

    let ppmp_main_name = document.createElement("div");
    ppmp_main_name.classList.add("ppmp_main_name");

    let ppmp_main_cht_name = document.createElement("div");
    ppmp_main_cht_name.classList.add("ppmp_main_cht_name");

    let ppmp_main_code = document.createElement("div");
    ppmp_main_code.classList.add("ppmp_main_code");

    let ppmp_main_img = document.createElement("img");
    ppmp_main_img.classList.add("ppmp_main_img");

    ppmp_main_container.appendChild(ppmp_main_name);
    ppmp_main_container.appendChild(ppmp_main_cht_name);
    ppmp_main_container.appendChild(ppmp_main_code);
    ppmp_main_container.appendChild(ppmp_main_img);

    return ppmp_main_container;
}
function get_pp_med_pic_footer() {
    let ppmp_footer_container = document.createElement("div");
    ppmp_footer_container.classList.add("ppmp_footer_container");

    return ppmp_footer_container;
}
function popup_med_pic_div_close() {
    popup_med_pic_div.Set_Visible(false);
}
async function popup_med_pic_div_open() {
    popup_med_pic_div.Set_Visible(true);
}
async function set_pp_med_pic_func(name, cht_name, code) {
    let ppmp_main_name = document.querySelector(".ppmp_main_name");
    let ppmp_main_cht_name = document.querySelector(".ppmp_main_cht_name");
    let ppmp_main_code = document.querySelector(".ppmp_main_code");
    let ppmp_main_img = document.querySelector(".ppmp_main_img");

    let temp_pic_data = await get_med_pic_by_code(code);
    let med_pic_data = temp_pic_data.Data;
    let temp_src;

    // console.log(temp_pic_data);
    if(temp_pic_data.Code != -200) {
        temp_src = med_pic_data.pic_base64;
    } else {
        temp_src = "../image/no_pic.png";
    }
    ppmp_main_name.innerHTML = `${name}`;
    ppmp_main_cht_name.innerHTML = cht_name;
    ppmp_main_code.innerHTML = `藥碼：${code}`;
    ppmp_main_img.src = temp_src;
}
