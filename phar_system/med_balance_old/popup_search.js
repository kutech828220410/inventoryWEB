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

    pps_main_container.appendChild(trigger_div);
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
        <option value="code">藥品碼</option>
        <option value="name">藥品名稱</option>
    `

    let select_med_input = document.createElement("input");
    select_med_input.type = "text";
    select_med_input.id = "select_med_input";

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
    ppds_start_input.type = "date";

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
    ppds_end_input.type = "date";

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
    `

    let select_patient_input = document.createElement("input");
    select_patient_input.type = "text";
    select_patient_input.id = "select_patient_input";

    select_trigger_container.appendChild(select_patient_kind);
    select_trigger_container.appendChild(select_patient_input);

    return select_trigger_container;
}

function popup_search_select_div_close() {
    popup_search_select_div.Set_Visible(false);
}

function popup_search_select_div_open() {
    popup_search_select_div.Set_Visible(true);
}