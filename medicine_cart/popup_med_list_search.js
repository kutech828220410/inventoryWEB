let popup_med_list_search_div;

function get_popup_med_list_search() {
    popup_med_list_search_div = new Basic_popup_Div('popup_med_list_search_div','popup_med_list_search_div','','');
    popup_med_list_search_div._popup_div.style.border = '10px solid white';

    let header = get_pp_med_list_search_header();
    let main = get_pp_med_list_search_main();
    let footer = get_pp_med_list_search_footer();

    popup_med_list_search_div.AddControl(header);
    popup_med_list_search_div.AddControl(main);
    popup_med_list_search_div.AddControl(footer);

    return popup_med_list_search_div;
};
function get_pp_med_list_search_header() {
    let ppmls_header_container = document.createElement("div");
    ppmls_header_container.classList.add("ppmls_header_container");

    let ppmls_h_title = document.createElement("div");
    ppmls_h_title.classList.add("ppmls_h_title");
    ppmls_h_title.innerHTML = `藥品總量搜尋`;

    let ppmls_h_close_btn = document.createElement("img");
    ppmls_h_close_btn.classList.add("ppmls_h_close_btn");
    ppmls_h_close_btn.src = "../image/close.png";
    ppmls_h_close_btn.addEventListener("click", () => {
        popup_med_list_search_div_close();
    });

    ppmls_header_container.appendChild(ppmls_h_title);
    ppmls_header_container.appendChild(ppmls_h_close_btn);

    return ppmls_header_container;
}
function get_pp_med_list_search_main() {
    let ppmls_main_container = document.createElement("div");
    ppmls_main_container.classList.add("ppmls_main_container");

    let ppmls_type_select = document.createElement("select");
    ppmls_type_select.classList.add("ppmls_type_select");
    ppmls_type_select.innerHTML = `
        <option value="code">藥碼</option>
        <option value="name">藥名</option>
        <option value="cht_name">中文名</option>
        <option value="skdiacode">料號</option>
        <option value="drugkind">管制級別</option>
        <option value="table">調劑台</option>
        <option value="drugtype">大瓶藥</option>
    `;
    ppmls_type_select.addEventListener("change", (e) => {
        if(e.target.value == "table" || e.target.value == "drugkind") {
            ppmls_input.style.display = "none";
            ppmls_select.style.display = "block";

            switch (e.target.value) {
                case "table":
                    
                    break;
                case "drugkind":
                    ppmls_select.innerHTML = `
                        <option value="N">N</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    `
                    break;
            
                default:
                    break;
            }
        } else if(e.target.value == "drugtype") {
            ppmls_input.style.display = "block";
            ppmls_input.disabled = true;
            ppmls_select.style.display = "none";
        } else {
            ppmls_input.style.display = "block";
            ppmls_input.disabled = false;
            ppmls_select.style.display = "none";
        }
    })

    let ppmls_input = document.createElement("input");
    ppmls_input.classList.add("ppmls_input");
    ppmls_input.id = "ppmls_input";
    ppmls_input.type = "text";
    ppmls_input.maxLength = 50;

    let ppmls_select = document.createElement("select");
    ppmls_select.classList.add("ppmls_select");

    ppmls_main_container.appendChild(ppmls_type_select);
    ppmls_main_container.appendChild(ppmls_input);
    ppmls_main_container.appendChild(ppmls_select);

    return ppmls_main_container;
}
function get_pp_med_list_search_footer() {
    let ppmls_footer_container = document.createElement("div");
    ppmls_footer_container.classList.add("ppmls_footer_container");

    let ppmls_search_btn = document.createElement("div");
    ppmls_search_btn.classList.add('ppmls_search_btn');
    ppmls_search_btn.classList.add("btn");
    ppmls_search_btn.innerHTML = "搜尋";

    ppmls_footer_container.appendChild(ppmls_search_btn);

    return ppmls_footer_container;
}
function popup_med_list_search_div_close() {
    popup_med_list_search_div.Set_Visible(false);
}
function popup_med_list_search_div_open() {
    popup_med_list_search_div.Set_Visible(true);
}
