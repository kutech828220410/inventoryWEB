let popup_search_select_div;

function get_popup_search_select()
{
    popup_search_select_div = new Basic_popup_Div('popup_search_select_div','popup_search_select_div','','');
    popup_search_select_div._popup_div.style.border = '10px solid white';

    let header = get_ppsearch_header();
    let main = get_ppsearch_main();
    let footer = get_ppsearch_footer();

    popup_search_select_div.AddControl(header);
    popup_search_select_div.AddControl(main);
    popup_search_select_div.AddControl(footer);

    return popup_search_select_div;
};
function get_ppsearch_header() {
    let pps_header_container = document.createElement("div");
    pps_header_container.classList.add("pps_header_container");
    pps_header_container.innerHTML = '條件設定';

    return pps_header_container;
}
function get_ppsearch_main() {
    let pps_main_container = document.createElement("div");
    pps_main_container.classList.add("pps_main_container");

    let trigger_div = get_pp_search_trigger_block();
    let med_div = get_pp_search_med_block();
    let patient_div = get_pp_search_patient_block();
    let date_div = get_pp_search_date_block();

    // pps_main_container.appendChild(trigger_div);
    pps_main_container.appendChild(med_div);
    pps_main_container.appendChild(patient_div);
    pps_main_container.appendChild(date_div);

    return pps_main_container;
}
function get_ppsearch_footer() {
    let pps_footer_container = document.createElement("div");
    pps_footer_container.classList.add("pps_footer_container");

    let pps_btn = document.createElement("div");
    pps_btn.classList.add('btn');
    pps_btn.classList.add('pps_btn');
    pps_btn.innerHTML = "搜尋";
    pps_btn.addEventListener("click", async () => {
        await get_search_result();
    });

    let pps_close_btn = document.createElement("div");
    pps_close_btn.classList.add('btn');
    pps_close_btn.classList.add('pps_close_btn');
    pps_close_btn.innerHTML = "返回";
    pps_close_btn.addEventListener("click", () => {
        popup_search_select_div_close();
    })

    pps_footer_container.appendChild(pps_close_btn);
    pps_footer_container.appendChild(pps_btn);

    return pps_footer_container;
}

function get_pp_search_trigger_block() {
    let select_trigger_select = [
        {
            id: "adjustment_work",
            ctname: "調劑作業"
        },
        {
            id: "auto_posting",
            ctname: "自動過帳"
        },
        {
            id: "input_output_work",
            ctname: "收支作業"
        },
        {
            id: "inventory_changes",
            ctname: "效期庫存異動"
        },
    ];

    let select_trigger_container = document.createElement("div");
    select_trigger_container.classList.add("select_trigger_container");

    select_trigger_select.forEach(element => {
        let tirgger_checkbox_container = document.createElement("div");
        tirgger_checkbox_container.classList.add('tirgger_checkbox_container');
    
        let trigger_label = document.createElement("label");
        trigger_label.classList.add("trigger_label");
        trigger_label.setAttribute("for", `${element.id}`);

        let trggier_container = document.createElement("div");
        trggier_container.classList.add("trggier_container");

        let trggier_switch = document.createElement("div");
        trggier_switch.classList.add("trggier_switch");

        trggier_container.appendChild(trggier_switch);

        let trggier_content = document.createElement("div");
        trggier_content.classList.add("trggier_content");
        trggier_content.innerHTML = element.ctname;

        trigger_label.appendChild(trggier_container);
        trigger_label.appendChild(trggier_content);

        let trigger_input = document.createElement("input");
        trigger_input.classList.add("search_checkbox");
        trigger_input.id = element.id;
        trigger_input.name = element.id;
        trigger_input.type = "checkbox";

        tirgger_checkbox_container.appendChild(trigger_input);
        tirgger_checkbox_container.appendChild(trigger_label);

        select_trigger_container.appendChild(tirgger_checkbox_container);
    });


    return select_trigger_container;
}
function get_pp_search_med_block() {
    let select_trigger_container = document.createElement("div");
    select_trigger_container.classList.add("select_trigger_container");

    let select_med_kind = document.createElement('select');
    select_med_kind.classList.add('select_med_kind');
    select_med_kind.innerHTML = `
        <option value="all">全部</option>
        <option value="code">藥碼</option>
        <option value="name">藥名</option>
    `

    let select_med_input = document.createElement("input");
    select_med_input.type = "text";
    select_med_input.id = "select_med_input";
    select_med_input.disabled = true;

    select_med_kind.addEventListener("change", () => {
        if(select_med_kind.value != "all") {
            select_med_input.disabled = false;
        } else {
            select_med_input.disabled = true;
        }
    });

    select_trigger_container.appendChild(select_med_kind);
    select_trigger_container.appendChild(select_med_input);

    return select_trigger_container;
}
function get_pp_search_date_block() {
    let select_trigger_container = document.createElement("div");
    select_trigger_container.classList.add("select_trigger_container");
    select_trigger_container.style.flexDirection = "column";
    select_trigger_container.style.padding = "12px";
    select_trigger_container.style.border = "1px solid rgb(150, 150, 150)";
    select_trigger_container.style.borderRadius = "5px";

    let select_date_kind = document.createElement('select');
    select_date_kind.classList.add('select_date_kind');
    select_date_kind.innerHTML = `
        <option value="operate">操作時間</option>
        <option value="prescribe">開方時間</option>
    `;

    let popup_date_start_container = document.createElement("div");
    popup_date_start_container.classList.add('popup_date_start_container');

    let ppds_start_lable = document.createElement("label");
    ppds_start_lable.classList.add("ppds_lable");
    ppds_start_lable.setAttribute("for", 'ppds_start_input');
    ppds_start_lable.innerHTML = "起始";
    
    let ppds_start_input = document.createElement("input");
    ppds_start_input.id = "ppds_start_input";
    ppds_start_input.name = "ppds_start_input";
    ppds_start_input.type = "datetime-local";
    ppds_start_input.max = "9999-12-31T00:00";

    popup_date_start_container.appendChild(ppds_start_lable);
    popup_date_start_container.appendChild(ppds_start_input);

    let popup_date_end_container = document.createElement("div");
    popup_date_end_container.classList.add('popup_date_end_container');

    let ppds_end_lable = document.createElement("label");
    ppds_end_lable.classList.add("ppds_lable");
    ppds_end_lable.setAttribute("for", 'ppds_end_input');
    ppds_end_lable.innerHTML = "結束";
    
    let ppds_end_input = document.createElement("input");
    ppds_end_input.id = "ppds_end_input";
    ppds_end_input.name = "ppds_end_input";
    ppds_end_input.type = "datetime-local";
    ppds_end_input.max = "9999-12-31T23:59";

    ppds_start_input.addEventListener("change", (e) => {
        console.log(e.target.value);
        let startDate = new Date(e.target.value);
        if(!isNaN(startDate.getTime())) {
            let endDate = new Date(startDate);
            endDate.setMonth(startDate.getMonth() + 1);

            // 如果月份超過12月，日期可能需要調整
            if (endDate.getMonth() !== (startDate.getMonth() + 1) % 12) {
                endDate.setDate(0);
            }
            // console.log(endDate);
            // 格式化日期為 YYYY-MM-DD
            let year = endDate.getFullYear();
            let month = String(endDate.getMonth() + 1).padStart(2, '0');
            let day = String(endDate.getDate()).padStart(2, '0');
            ppds_end_input.value = `${year}-${month}-${day}T23:59`;
            console.log(ppds_end_input.value);
        }
    });

    popup_date_end_container.appendChild(ppds_end_lable);
    popup_date_end_container.appendChild(ppds_end_input);

    select_trigger_container.appendChild(select_date_kind);
    select_trigger_container.appendChild(popup_date_start_container);
    select_trigger_container.appendChild(popup_date_end_container);
    // select_trigger_container.appendChild(popup_date_container);

    return select_trigger_container;
}
function get_pp_search_patient_block() {
    let select_trigger_container = document.createElement("div");
    select_trigger_container.classList.add("select_trigger_container");

    let select_patient_kind = document.createElement('select');
    select_patient_kind.classList.add('select_patient_kind');
    select_patient_kind.innerHTML = `
        <option value="operator">操作人</option>
        <option value="patient_name">病人姓名</option>
        <option value="patient_number">病歷號</option>
        <option value="med_bag_num">領藥號</option>
    `

    let select_patient_input = document.createElement("input");
    select_patient_input.type = "text";
    select_patient_input.id = "select_patient_input";

    select_trigger_container.appendChild(select_patient_kind);
    select_trigger_container.appendChild(select_patient_input);

    return select_trigger_container;
}

async function get_search_result() {
    Set_main_div_enable(true);
    // checkbox
    // 調劑作業
    let adjustment_work = document.querySelector("#adjustment_work");
    // 收支作業
    let input_output_work = document.querySelector("#input_output_work");
    // 自動過帳
    let auto_posting = document.querySelector("#auto_posting");
    // 效期庫存異動
    let inventory_changes = document.querySelector("#inventory_changes");

    // select
    // 藥碼、藥名
    let select_med_kind = document.querySelector('.select_med_kind');
    // 操作人、病人姓名、病例號
    let select_patient_kind = document.querySelector('.select_patient_kind');
    // 操作時間、開方時間
    let select_date_kind = document.querySelector('.select_date_kind');

    // input
    let select_med_input = document.querySelector("#select_med_input");
    let select_patient_input = document.querySelector("#select_patient_input");

    let ppds_start_input = document.querySelector("#ppds_start_input");
    let ppds_end_input = document.querySelector("#ppds_end_input");

    if(!ppds_start_input.value) {
        alert("請選起始時間！！");
        Set_main_div_enable(false);
        return;
    } else if(!ppds_end_input.value) {
        alert("請選結束時間！！");
        Set_main_div_enable(false);
        return;
    }
    // 根據操作或開方時間請求資料
    let temp_post_data = get_trans_form_post_data();
    console.log(temp_post_data);
    let temp_data;
    if (select_date_kind.value == "operate") {
        temp_data = await get_datas_by_op_time_st_end_transactions(temp_post_data);
        // console.log(temp_data);
        data_information = temp_data["Data"];
    } else {
        temp_data = await get_datas_by_rx_time_st_end_transactions(temp_post_data);
        // console.log(temp_data);
        data_information = temp_data["Data"];
    }

    if(select_med_input.value != "" && select_med_kind.value != "all") {
        let temp_data = data_information;
        switch (select_med_kind.value) {
            case "code":
                temp_data = data_information.filter((e) => {
                    return e["CODE"].includes(select_med_input.value);
                });
                data_information = temp_data;
                break;
            case "name":
                temp_data = data_information.filter((e) => {
                    return e["NAME"].includes(select_med_input.value);
                });
                data_information = temp_data;
                break;
            default:
                break;
        }
    }

    if(select_patient_input.value != "") {
        let temp_data = data_information;
        switch (select_patient_kind.value) {
            case "operator":
                temp_data = data_information.filter((e) => {
                    return e["OP"].includes(select_patient_input.value);
                });
                data_information = temp_data;
                break;
            case "patient_name":
                temp_data = data_information.filter((e) => {
                    return e["PAT"].includes(select_patient_input.value);
                });
                data_information = temp_data;
                break;
            case "patient_number":
                temp_data = data_information.filter((e) => {
                    return e["MRN"].includes(select_patient_input.value);
                });
                data_information = temp_data;
                break;
            case "med_bag_num":
                temp_data = data_information.filter((e) => {
                    return e["MED_BAG_NUM"].includes(select_patient_input.value);
                });
                data_information = temp_data;
                break;
            default:
                break;
        }
    }

    current_pagination = 1;
    get_info_init();
    set_pagination_init();
    set_main_div_time_line();
    popup_search_select_div_close();
    Set_main_div_enable(false);
};

function get_trans_form_post_data() {
    let ppds_start_input = document.querySelector("#ppds_start_input");
    let ppds_end_input = document.querySelector("#ppds_end_input");

    let serverNameStr = "";
    let serverTypeStr = "";
  
    temp_selected_arr.forEach(element => {
        serverNameStr += element.serverName + ",";
        serverTypeStr += element.serverType + ",";
    });
  
    // Remove the trailing comma
    serverNameStr = serverNameStr.slice(0, -1);
    serverTypeStr = serverTypeStr.slice(0, -1);
  
    // console.log(st_time);
    // console.log(end_time);
    // console.log(serverNameStr);
    // console.log(serverTypeStr);

    let temp_start_time = ppds_start_input.value.replace("T", " ");
    let temp_end_time = ppds_end_input.value.replace("T", " ");
  
    let post_data = {
        Data: {},
        ValueAry: [   
            `${temp_start_time}:00`,
            `${temp_end_time}:00`,
            `${serverNameStr}`,
            `${serverTypeStr}`]
    };

    return post_data;
}

function set_main_div_time_line() {
    console.log("進階搜尋");
    let select_date_kind = document.querySelector('.select_date_kind');
    let ppds_start_input = document.querySelector("#ppds_start_input");
    let ppds_end_input = document.querySelector("#ppds_end_input");

    let time_line_type = document.querySelector(".time_line_type");
    let time_line_st = document.querySelector(".time_line_st");
    let time_line_end = document.querySelector(".time_line_end");

    if (select_date_kind.value == "operate") {
        time_line_type.innerHTML = "操作時間";
    } else {
        time_line_type.innerHTML = "開方時間";
    }

    let temp_start_time = ppds_start_input.value.replace("T", " ");
    let temp_end_time = ppds_end_input.value.replace("T", " ");

    time_line_st.innerHTML = temp_start_time;
    time_line_end.innerHTML = temp_end_time;
}

function popup_search_select_div_close() {
    popup_search_select_div.Set_Visible(false);
}

function popup_search_select_div_open() {
    popup_search_select_div.Set_Visible(true);
}