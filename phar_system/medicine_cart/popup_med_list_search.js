let popup_med_list_search_div;
med_table

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

    let ppmls_table_select = document.createElement("select");
    ppmls_table_select.classList.add("ppmls_table_select");

    let ppmls_type_select = document.createElement("select");
    ppmls_type_select.classList.add("ppmls_type_select");
    ppmls_type_select.innerHTML = `
        <option value="code">藥碼</option>
        <option value="name">藥名</option>
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
                    `;
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

    ppmls_main_container.appendChild(ppmls_table_select);
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
    ppmls_search_btn.onclick = med_list_search_result;

    // let ppmls_search_big_btn = document.createElement("div");
    // ppmls_search_big_btn.classList.add('ppmls_search_big_btn');
    // ppmls_search_big_btn.classList.add("btn");
    // ppmls_search_big_btn.innerHTML = "顯示大瓶藥品";
    // ppmls_search_big_btn.onclick = display_big_result;

    // ppmls_footer_container.appendChild(ppmls_search_big_btn);
    ppmls_footer_container.appendChild(ppmls_search_btn);

    return ppmls_footer_container;
}
function popup_med_list_search_div_close() {
    popup_med_list_search_div.Set_Visible(false);
}
function popup_med_list_search_div_open() {
    let ppmls_table_select = document.querySelector(".ppmls_table_select");
    ppmls_table_select.innerHTML = `<option value="all">全部調劑台</option>`
    med_table.forEach(element => {
        ppmls_table_select.innerHTML += `
            <option value="${element.name}">${element.name}</option>
        `
    });

    popup_med_list_search_div.Set_Visible(true);
}
async function med_list_search_result() {
    let ppmls_table_select = document.querySelector(".ppmls_table_select");
    let filter_med_table_input = document.querySelector(`.filter_med_table_input[value="${ppmls_table_select.value}"]`);
    filter_med_table_input.checked = true;
    med_list_data = await get_all_med_qty(current_pharmacy.phar, current_cart.hnursta, ppmls_table_select.value);
    med_list_data = med_list_data.Data;
    med_list_data = med_list_data.filter((item) => {
        return item["dispens_name"] == "Y";
    });
    let ppmls_type_select = document.querySelector(".ppmls_type_select");

    let ppmls_input = document.querySelector(".ppmls_input");

    if(ppmls_input.value != "") {
        switch (ppmls_type_select.value) {
            case "code":
                console.log(ppmls_type_select.value);
                console.log(ppmls_input.value);
                if(ppmls_input.value == "") return;
                med_list_data = med_list_data.filter((item) => {
                    return item["code"].toUpperCase().includes(ppmls_input.value.toUpperCase());
                });
                break;
            case "name":
                console.log(ppmls_type_select.value);
                console.log(ppmls_input.value);
                if(ppmls_input.value == "") return;
                med_list_data = med_list_data.filter((item) => {
                    return item["name"].toUpperCase().includes(ppmls_input.value.toUpperCase());
                });
                break;
        
            default:
                break;
        }
    }

    med_list_data = sort_med_list_data(med_list_data, current_func);
    med_list_data = sort_display_med_data(med_list_data);

    await set_pp_med_list_display();
    popup_med_list_search_div_close();
}
async function display_big_result() {
    let ppmls_table_select = document.querySelector(".ppmls_table_select");
    med_list_data = await get_all_med_qty(current_pharmacy.phar, current_cart.hnursta, ppmls_table_select.value);
    med_list_data = med_list_data.Data;
    med_list_data = med_list_data.filter((item) => {
        return item["dispens_name"] == "Y" && item["large"] == "L";
    });

    med_list_data = sort_med_list_data(med_list_data, current_func);

    // med_list_data = sort_display_med_data(med_list_data);

    await set_pp_med_list_display();
    popup_med_list_search_div_close();
}
