let popup_light_table_select_div;
let fake_table_data = [
    "口服台", "針劑台", "共用台"
]

function get_popup_light_table_select() {
    popup_light_table_select_div = new Basic_popup_Div('popup_light_table_select_div','popup_light_table_select_div','','');
    popup_light_table_select_div._popup_div.style.border = '10px solid white';

    let header = get_pp_light_table_select_header();
    let main = get_pp_light_table_select_main();
    let footer = get_pp_light_table_select_footer();

    popup_light_table_select_div.AddControl(header);
    popup_light_table_select_div.AddControl(main);
    popup_light_table_select_div.AddControl(footer);

    return popup_light_table_select_div;
};
function get_pp_light_table_select_header() {
    let pplts_header_container = document.createElement("div");
    pplts_header_container.classList.add("pplts_header_container");

    let pplts_h_title = document.createElement("div");
    pplts_h_title.classList.add("pplts_h_title");
    pplts_h_title.innerHTML = `調劑台亮燈`;

    let pplts_h_close_btn = document.createElement("img");
    pplts_h_close_btn.classList.add("pplts_h_close_btn");
    pplts_h_close_btn.src = "../image/close.png";
    pplts_h_close_btn.addEventListener("click", () => {
        popup_light_table_select_div_close();
    });

    pplts_header_container.appendChild(pplts_h_title);
    pplts_header_container.appendChild(pplts_h_close_btn);

    return pplts_header_container;
}
function get_pp_light_table_select_main() {
    let pplts_main_container = document.createElement("div");
    pplts_main_container.classList.add("pplts_main_container");

    let pplts_med_info_container = document.createElement("div");
    pplts_med_info_container.classList.add("pplts_med_info_container");

    for (let i = 0; i < 3; i++) {
        let pplts_med_info = document.createElement("div");
        pplts_med_info.classList.add("pplts_med_info");

        switch (i) {
            case 0:
                pplts_med_info.innerHTML = `藥碼：<span class="pplts_code"></span>`;
                break;
            case 1:
                pplts_med_info.innerHTML = `(英)：<span class="pplts_name"></span>`;
                break;
            case 2:
                pplts_med_info.innerHTML = `(中)：<span class="pplts_cht_name"></span>`;
                break;
        
            default:
                break;
        }

        pplts_med_info_container.appendChild(pplts_med_info);
    }

    let pplts_table_info_container = document.createElement("div");
    pplts_table_info_container.classList.add("pplts_table_info_container");

    pplts_main_container.appendChild(pplts_med_info_container);
    pplts_main_container.appendChild(pplts_table_info_container);

    return pplts_main_container;
}
function get_pp_light_table_select_footer() {
    let pplts_footer_container = document.createElement("div");
    pplts_footer_container.classList.add("pplts_footer_container");

    return pplts_footer_container;
}
function popup_light_table_select_div_close() {
    popup_light_table_select_div.Set_Visible(false);
}
function popup_light_table_select_div_open() {
    popup_light_table_select_div.Set_Visible(true);
}

async function set_light_table(code, name, cht_name) {
    let pplts_code = document.querySelector(".pplts_code");
    let pplts_name = document.querySelector(".pplts_name");
    let pplts_cht_name = document.querySelector(".pplts_cht_name");

    let temp_arr = [];
    med_table.forEach(element => {
        temp_arr.push(element.name);
    });

    let post_data = {
        Value: code,
        ValueAry:[temp_arr.join(";")]
    };

    console.log(post_data);
    let return_data = await get_dispens_by_code(post_data);
    return_data = return_data.Data;

    pplts_code.innerHTML = code;
    pplts_name.innerHTML = name;
    pplts_cht_name.innerHTML = cht_name;

    let pplts_table_info_container = document.querySelector(".pplts_table_info_container");
    pplts_table_info_container.innerHTML = "";

    return_data.forEach(element => {
        let light_on_table = document.createElement("div");
        light_on_table.classList.add("light_on_table");
        light_on_table.classList.add("btn");
        light_on_table.innerHTML = element.server_name;
        light_on_table.setAttribute("code", code);
        light_on_table.addEventListener("click", async () => {
            await light_on_func(code, element.server_name, element.server_type);
        });

        pplts_table_info_container.appendChild(light_on_table);
    });
}
