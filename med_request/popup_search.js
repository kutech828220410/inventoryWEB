let popup_search_select_div;

async function get_popup_search_select()
{
    popup_search_select_div = new Basic_popup_Div('popup_search_select_div','popup_search_select_div','','');
    popup_search_select_div._popup_div.style.border = '10px solid white';

    let header = get_ppsearch_header();
    let main = await get_ppsearch_main();
    let footer = get_ppsearch_footer();

    popup_search_select_div.AddControl(header);
    popup_search_select_div.AddControl(main);
    popup_search_select_div.AddControl(footer);

    return popup_search_select_div;
};
function get_ppsearch_header() {
    let pps_header_container = document.createElement("div");
    pps_header_container.classList.add("pps_header_container");

    let pps_h_title = document.createElement("div");
    pps_h_title.classList.add("pps_h_title");
    pps_h_title.innerText = "搜尋條件";

    let pps_h_close_btn = document.createElement("img");
    pps_h_close_btn.classList.add("pps_h_close_btn");
    pps_h_close_btn.src = "../image/close.png";
    pps_h_close_btn.addEventListener("click", () => {
        popup_search_select_div_close();
    });

    pps_header_container.appendChild(pps_h_title);
    pps_header_container.appendChild(pps_h_close_btn);

    return pps_header_container;
}
async function get_ppsearch_main() {
    let pps_main_container = document.createElement("div");
    pps_main_container.classList.add("pps_main_container");

    let search_mode_select_container = set_search_mode_select_container();
    let search_input_container = set_search_input_container();
    let search_condition_container = await set_search_condition_container();

    pps_main_container.appendChild(search_mode_select_container);
    pps_main_container.appendChild(search_input_container);
    pps_main_container.appendChild(search_condition_container);

    return pps_main_container;
}
function get_ppsearch_footer() {
    let pps_footer_container = document.createElement("div");
    pps_footer_container.classList.add("pps_footer_container");

    let pps_btn = document.createElement("div");
    pps_btn.id = "pps_btn";
    pps_btn.classList.add("btn");
    pps_btn.innerHTML = "搜尋";
    pps_btn.addEventListener("click", () => {
        let pps_date_input = document.querySelector("#pps_date_input");
        let pps_input_condition = document.querySelector("#pps_input_condition");
        let pps_input = document.querySelector("#pps_input");
        let pps_select = document.querySelector("#pps_select");

        temp_search_condition.date = pps_date_input.value;
        temp_search_condition.req_unit = pps_select.value;
        temp_search_condition.type = pps_input_condition.value;
        temp_search_condition.content = pps_input.value;

        console.log(temp_search_condition);
        set_list_result_and_filter();
        popup_search_select_div_close();
    });

    let reset_search_condition_btn = document.createElement("div");
    reset_search_condition_btn.id = "reset_search_condition_btn";
    reset_search_condition_btn.classList.add("btn");
    reset_search_condition_btn.innerHTML = "重設條件";
    reset_search_condition_btn.addEventListener("click", () => {
        let pps_date_input = document.querySelector("#pps_date_input");
        let pps_input_condition = document.querySelector("#pps_input_condition");
        let pps_input = document.querySelector("#pps_input");
        let pps_select = document.querySelector("#pps_select");

        let today = new Date();
        let yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();
        if (mm < 10) {
            mm = '0' + mm;
        }
        if (dd < 10) {
            dd = '0' + dd;
        }

        pps_date_input.value = `${yyyy}-${mm}-${dd}`;
        pps_input_condition.value = "code";
        pps_input.value = "";
        pps_select.value = "all";

        temp_search_condition.date = `${yyyy}-${mm}-${dd}`;
        temp_search_condition.req_unit = "all";
        temp_search_condition.type = "code";
        temp_search_condition.content = "";
    });

    pps_footer_container.appendChild(reset_search_condition_btn);
    pps_footer_container.appendChild(pps_btn);

    return pps_footer_container;
}
function popup_search_select_div_close() {
    popup_search_select_div.Set_Visible(false);
}
function popup_search_select_div_open() {
    popup_search_select_div.Set_Visible(true);
}
function set_search_mode_select_container() {
    let search_mode_select_container = document.createElement("div");
    search_mode_select_container.classList.add("search_mode_select_container");

    // <input type="radio" name="color" value="green"

    for (let i = 0; i < 2; i++) {
        let search_mode_div = document.createElement("div");
        search_mode_div.classList.add("search_mode_div");

        if(i == 0) {
            let search_mode_CODE_label = document.createElement("label");
            search_mode_CODE_label.setAttribute("for", "mode_code");
            search_mode_CODE_label.classList.add("search_mode_label");
            search_mode_CODE_label.innerHTML = "藥品檢索";

            let search_mode_CODE_input = document.createElement("input");
            search_mode_CODE_input.classList.add("search_mode_input");
            search_mode_CODE_input.type = "radio";
            search_mode_CODE_input.value = "mode_code";
            search_mode_CODE_input.name = "search_mode";
            search_mode_CODE_input.id = "mode_code";
            search_mode_CODE_input.checked = true;

            search_mode_div.appendChild(search_mode_CODE_input);
            search_mode_div.appendChild(search_mode_CODE_label);
        } else {
            let search_mode_UNIT_label = document.createElement("label");
            search_mode_UNIT_label.setAttribute("for", "mode_unit");
            search_mode_UNIT_label.classList.add("search_mode_label");
            search_mode_UNIT_label.innerHTML = "單位檢索";

            let search_mode_UNIT_input = document.createElement("input");
            search_mode_UNIT_input.classList.add("search_mode_input");
            search_mode_UNIT_input.type = "radio";
            search_mode_UNIT_input.value = "mode_unit";
            search_mode_UNIT_input.name = "search_mode";
            search_mode_UNIT_input.id = "mode_unit";
            search_mode_UNIT_input.checked = false;

            search_mode_div.appendChild(search_mode_UNIT_input);
            search_mode_div.appendChild(search_mode_UNIT_label);
        }

        search_mode_select_container.appendChild(search_mode_div);
    }

    return search_mode_select_container;
}
function set_search_input_container() {
    let search_input_container = document.createElement("input");
    search_input_container.classList.add("pps_date_input_container");
    search_input_container.id = "pps_date_input";
    search_input_container.type = "date";
    search_input_container.max = "9999-12-31";
    
    let today = new Date();
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);
    let todayStr = year + '-' + month + '-' + day;

    search_input_container.value = todayStr;

    return search_input_container;
}

async function set_search_condition_container() {
    let pps_condition_container = document.createElement("div");
    pps_condition_container.classList.add("pps_condition_container");

    let pps_input_content_container = document.createElement("div");
    pps_input_content_container.classList.add("pps_content_container");

    let pps_input_condition = document.createElement("select");
    pps_input_condition.id = "pps_input_condition";
    pps_input_condition.innerHTML = `
    <option value="code">藥碼</option>
    <option value="name">藥名</option>
    <option value="cht_name">中文名</option>
    `;
    // <option value="all">全部</option>
    
    let pps_input = document.createElement("input");
    pps_input.id = "pps_input";
    pps_input.maxLength = "32";
    pps_input.type = "text";

    pps_input_content_container.appendChild(pps_input_condition);
    pps_input_content_container.appendChild(pps_input);

    let pps_select_content_container = document.createElement("div");
    pps_select_content_container.classList.add("pps_content_container");

    let pps_select_label = document.createElement("div");
    pps_select_label.classList.add("pps_select_label");
    pps_select_label.innerHTML = `請領單位`;

    // let pharmacy_table_data = await get_serversetting_by_type();

    // let temp_table_data = pharmacy_table_data["Data"];
    // console.log(temp_table_data);

    let pps_select = document.createElement("select");
    pps_select.id = "pps_select";
    // pps_select.innerHTML = `<option value="all">全部</option>`;
    // temp_table_data.forEach(element => {
    //     pps_select.innerHTML += `<option value="${element.name}">${element.name}</option>`
    // });

    pps_select_content_container.appendChild(pps_select_label);
    pps_select_content_container.appendChild(pps_select);

    pps_condition_container.appendChild(pps_input_content_container);
    pps_condition_container.appendChild(pps_select_content_container);

    return pps_condition_container;
}

async function get_serversetting_by_type() {
    // const newUrl = api_ip.replace(":4435", ":4433");
    let temp_data = await fetch(`${api_ip}api/ServerSetting/get_serversetting_by_type`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            Data: 
            {
                
            },
            ValueAry : 
            [
                "調劑台"
            ]
        }),
    })
    .then((response) => {
        return response.json();
    })

    return temp_data;
}

async function set_select_pharmacy_option() {
    let pharmacy_table_data = await get_serversetting_by_type();

    let temp_table_data = pharmacy_table_data["Data"];
    console.log(temp_table_data);

    let pps_select = document.querySelector("#pps_select");
    pps_select.innerHTML = `<option value="all">全部</option>`;
    temp_table_data.forEach(element => {
        pps_select.innerHTML += `<option value="${element.name}">${element.name}</option>`
    });
}