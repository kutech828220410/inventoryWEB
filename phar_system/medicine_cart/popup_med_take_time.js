let popup_med_take_time_div;

function get_popup_med_take_time() {
    popup_med_take_time_div = new Basic_popup_Div('popup_med_take_time_div','popup_med_take_time_div','','');
    popup_med_take_time_div._popup_div.style.border = '10px solid white';

    let header = get_pp_med_take_time_header();
    let main = get_pp_med_take_time_main();
    let footer = get_pp_med_take_time_footer();

    popup_med_take_time_div.AddControl(header);
    popup_med_take_time_div.AddControl(main);
    popup_med_take_time_div.AddControl(footer);

    return popup_med_take_time_div;
};
function get_pp_med_take_time_header() {
    let ppmtt_header_container = document.createElement("div");
    ppmtt_header_container.classList.add("ppmtt_header_container");

    let ppmtt_h_title = document.createElement("div");
    ppmtt_h_title.classList.add("ppmtt_h_title");

    let ppmtt_h_title_content = document.createElement("div");
    ppmtt_h_title_content.classList.add("ppmtt_h_title_content");
    ppmtt_h_title_content.innerHTML = `撈藥時間`;

    ppmtt_h_title.appendChild(ppmtt_h_title_content);

    let ppmtt_h_close_btn = document.createElement("img");
    ppmtt_h_close_btn.classList.add("ppmtt_h_close_btn");
    ppmtt_h_close_btn.src = "../image/close.png";
    ppmtt_h_close_btn.addEventListener("click", () => {
        popup_med_take_time_div_close();
    });

    ppmtt_header_container.appendChild(ppmtt_h_title);
    ppmtt_header_container.appendChild(ppmtt_h_close_btn);

    return ppmtt_header_container;
}
function get_pp_med_take_time_main() {
    let ppmtt_main_container = document.createElement("div");
    ppmtt_main_container.classList.add("ppmtt_main_container");

    let now_date = new Date();
    let now_year = now_date.getFullYear();
    let now_month = now_date.getMonth() + 1;
    let now_day = now_date.getDate();

    let yesterday_date =  now_date.getDate() - 2;

    let default_start_time = `${now_year}-${now_month < 10 ? '0' + now_month : now_month}-${yesterday_date}T00:00`;
    let default_end_time = `${now_year}-${now_month < 10 ? '0' + now_month : now_month}-${now_day}T23:59`;

    let ppmtt_start_time_container = document.createElement("div");
    ppmtt_start_time_container.classList.add("ppmtt_time_container");

    let ppmtt_start_time_title = document.createElement("label");
    ppmtt_start_time_title.classList.add("ppmtt_time_title");
    ppmtt_start_time_title.innerHTML = `開始時間`;

    let ppmtt_start_time_input = document.createElement("input");
    ppmtt_start_time_input.classList.add("ppmtt_time_input");
    ppmtt_start_time_input.id = "ppmtt_start_time_input";
    ppmtt_start_time_input.type = "datetime-local";
    ppmtt_start_time_input.value = default_start_time;

    ppmtt_start_time_container.appendChild(ppmtt_start_time_title);
    ppmtt_start_time_container.appendChild(ppmtt_start_time_input);

    let ppmtt_end_time_container = document.createElement("div");
    ppmtt_end_time_container.classList.add("ppmtt_time_container");

    let ppmtt_end_time_title = document.createElement("label");
    ppmtt_end_time_title.classList.add("ppmtt_time_title");
    ppmtt_end_time_title.innerHTML = `結束時間`;

    let ppmtt_end_time_input = document.createElement("input");
    ppmtt_end_time_input.classList.add("ppmtt_time_input");
    ppmtt_end_time_input.id = "ppmtt_end_time_input";
    ppmtt_end_time_input.type = "datetime-local";
    ppmtt_end_time_input.value = default_end_time;

    ppmtt_end_time_container.appendChild(ppmtt_end_time_title);
    ppmtt_end_time_container.appendChild(ppmtt_end_time_input);

    ppmtt_main_container.appendChild(ppmtt_start_time_container);
    ppmtt_main_container.appendChild(ppmtt_end_time_container);


    return ppmtt_main_container;
}
function get_pp_med_take_time_footer() {
    let ppmtt_footer_container = document.createElement("div");
    ppmtt_footer_container.classList.add("ppmtt_footer_container");

    let ppmtt_footer_btn = document.createElement("button");
    ppmtt_footer_btn.classList.add("ppmtt_footer_btn");
    ppmtt_footer_btn.classList.add("btn");
    ppmtt_footer_btn.innerHTML = `確定`;
    ppmtt_footer_btn.addEventListener("click", async () => {
        Set_main_div_enable(true);
        let start_time = document.getElementById("ppmtt_start_time_input").value;
        let end_time = document.getElementById("ppmtt_end_time_input").value;

        if (start_time > end_time) {
            alert("開始時間不能大於結束時間");
            Set_main_div_enable(false);
            return;
        }

        await open_med_take_func()
        Set_main_div_enable(false);
        popup_med_take_time_div_close();
    });

    ppmtt_footer_container.appendChild(ppmtt_footer_btn);

    return ppmtt_footer_container;
}
function popup_med_take_time_div_close() {
    popup_med_take_time_div.Set_Visible(false);
    check_cart_dispense();
}
function popup_med_take_time_div_open() {
    check_cart_dispense();
    popup_med_take_time_div.Set_Visible(true);
}