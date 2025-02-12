let popup_staff_level_div;

let current_block = "藥局";

let warehouse_staff_level_data = [];

let pharmacy_staff_level_data = [
    {
        title: '交班作業',
        name: 'shifts_operation',
        content: [
            {
                title: "頁面顯示",
                name: 'shifts_operation_page_display',
            },
            {
                title: "交班對點",
                name: 'matching_shifts',
            },
            {
                title: "管制結存表匯出",
                name: 'controlleddrug_remit',
            },
            {
                title: "管制結存表列印",
                name: 'controlleddrug_print',
            },
        ],
    },
    {
        title: '藥品資料',
        name: "medicine_infomation",
        content: [
            {
                title: "頁面顯示",
                name: 'medicine_infomation_page_display',
            },
            {
                title: "資料更動",
                name: 'medicine_modify',
            },
            {
                title: "儲位效期表顯示",
                name: 'storage_validity_period_display',
            },
            {
                title: "儲位總庫存表顯示",
                name: 'storage_main_inventory_display',
            },
            {
                title: "藥品群組修改",
                name: 'medicine_group_modify',
            },
            {
                title: "管制藥設定",
                name: 'controlleddrug_setting',
            },
        ],

    },
    {
        title: '收支作業',
        name: "income_expenditure_operation",
        content: [
            {
                title: "頁面顯示",
                name: 'income_expenditure_operation_page_display',
            },
            {
                title: "收支原因維護",
                name: 'io_result_maintain',
            },
            {
                title: "入庫功能",
                name: 'stock_in_function',
            },
            {
                title: "出庫功能",
                name: 'stock_out_function',
            },
            {
                title: "調入功能",
                name: 'transfer_in_function',
            },
            {
                title: "調出功能",
                name: 'transfer_out_function',
            },
        ],
    },
    {
        title: '人員資料',
        name: "staff_data",
        content: [
            {
                title: "頁面顯示",
                name: 'staff_data_page_display',
            },
            {
                title: "基本資料更動",
                name: 'staff_basic_data_modify',
            },
            {
                title: "權限內容更動",
                name: 'staff_level_display',
            },
        ],

    },
    {
        title: '儲位管理',
        name: "storage_management",
        content: [
            {
                title: "頁面顯示",
                name: 'storage_management_page_display',
            },
            {
                title: "庫存效期異動",
                name: 'inventory_validity_period_change',
            },
            {
                title: "儲位刪除",
                name: 'storage_delete',
            },
            {
                title: "面板資訊更改",
                name: 'panel_info_change',
            },
        ],

    },
    {
        title: '盤點作業',
        name: "",
        content: [
            {
                title: "頁面顯示",
                name: 'inventory_page_display',
            },
            {
                title: "報表下載",
                name: 'report_download',
            },
            {
                title: "報表鎖定",
                name: 'report_locked',
            },
            {
                title: "報表刪除",
                name: 'report_delete',
            },
        ],

    },
    {
        title: '交易紀錄查詢',
        name: "transaction_history",
        content: [
            {
                title: "頁面顯示",
                name: 'transaction_history_page_display',
            },
            {
                title: "交易紀錄匯出",
                name: 'transaction_history_remit',
            },
        ],

    },
    {
        title: '醫令資料',
        name: "medical_order",
        content: [
            {
                title: "頁面顯示",
                name: 'medical_order_page_display',
            },
        ],

    },
    {
        title: '工程模式',
        name: "",
        content: [
            {
                title: "頁面顯示",
                name: 'project_page_display',
            },
        ],

    },
];

function get_popup_staff_level()
{
    popup_staff_level_div = new Basic_popup_Div('popup_staff_level_div','popup_staff_level_div','','');
    popup_staff_level_div._popup_div.style.border = '10px solid white';

    let header = get_pp_staff_level_header();
    let main = get_pp_staff_level_main();
    let footer = get_pp_staff_level_footer();

    popup_staff_level_div.AddControl(header);
    popup_staff_level_div.AddControl(main);
    popup_staff_level_div.AddControl(footer);

    return popup_staff_level_div;
}
function get_pp_staff_level_header() {
    let ppsl_header_container = document.createElement("div");
    ppsl_header_container.classList.add("ppsl_header_container");
    ppsl_header_container.innerHTML = '權限管理';

    return ppsl_header_container;
}
function get_pp_staff_level_main() {
    let ppsl_main_container = document.createElement("div");
    ppsl_main_container.classList.add("ppsl_main_container");

    let staff_level_block_container = document.createElement("div");
    staff_level_block_container.classList.add("staff_level_block_container");

    let staff_level_pharmacy = document.createElement("div");
    staff_level_pharmacy.classList.add("staff_level_block");
    staff_level_pharmacy.classList.add("active_block");
    staff_level_pharmacy.innerHTML = "藥局";
    staff_level_pharmacy.addEventListener("click", (e) => {
        get_current_block(e);
    })

    let staff_level_warehouse = document.createElement("div");
    staff_level_warehouse.classList.add("staff_level_block");
    staff_level_warehouse.innerHTML = "藥庫";
    staff_level_warehouse.addEventListener("click", (e) => {
        get_current_block(e);
    })

    staff_level_block_container.appendChild(staff_level_pharmacy);
    staff_level_block_container.appendChild(staff_level_warehouse);

    let staff_level_selected_container = document.createElement("div");
    staff_level_selected_container.classList.add("staff_level_selected_container");

    let staff_level_select_label = document.createElement("div");
    staff_level_select_label.classList.add("staff_level_select_label");
    staff_level_select_label.innerHTML = '權限等級 : ';

    let staff_level_select = document.createElement("select");
    staff_level_select.classList.add('staff_level_select');
    staff_level_select.innerHTML = `
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
    `;

    let staff_level_change_btn = document.createElement("div");
    staff_level_change_btn.classList.add("staff_level_change_btn");
    staff_level_change_btn.classList.add("btn");
    staff_level_change_btn.innerHTML = "修改";

    staff_level_selected_container.appendChild(staff_level_select_label);
    staff_level_selected_container.appendChild(staff_level_select);
    staff_level_selected_container.appendChild(staff_level_change_btn);

    let staff_level_change_rule_container = document.createElement("div");
    staff_level_change_rule_container.classList.add("staff_level_change_rule_container");
    staff_level_change_rule_container.innerHTML = "※僅針對當前等級修改";

    let staff_level_data_container = document.createElement("div");
    staff_level_data_container.classList.add("staff_level_data_container");

    pharmacy_staff_level_data.forEach(element => {
        let level_data_div = document.createElement("div");
        level_data_div.classList.add("level_data_div");

        let level_data_title = document.createElement("div");
        level_data_title.classList.add("level_data_title");
        level_data_title.innerHTML = element.title;
        level_data_title.id = element.name;

        level_data_div.appendChild(level_data_title);

        element["content"].forEach(element => {            
            let level_content_data_container = document.createElement("div");
            level_content_data_container.classList.add("level_content_data_container");

            let level_data_checked_box = document.createElement("input");
            level_data_checked_box.type = "checkbox";
            level_data_checked_box.classList.add("level_data_checked_box");
            level_data_checked_box.id = element.name;
            level_data_checked_box.name = element.name;

            let level_data_label = document.createElement("label");
            level_data_label.setAttribute("for", element.name);
            level_data_label.classList.add("level_data_label");

            let level_data_label_trigger_container = document.createElement("div");
            level_data_label_trigger_container.classList.add("level_data_label_trigger_container");

            let level_data_label_trigger = document.createElement("div");
            level_data_label_trigger.classList.add("level_data_label_trigger");

            level_data_label_trigger_container.appendChild(level_data_label_trigger);

            let level_data_label_title = document.createElement("div");
            level_data_label_title.classList.add("level_data_label_title");
            level_data_label_title.innerHTML = element.title;

            level_data_label.appendChild(level_data_label_trigger_container);
            level_data_label.appendChild(level_data_label_title);

            level_content_data_container.appendChild(level_data_checked_box);
            level_content_data_container.appendChild(level_data_label);

            level_data_div.appendChild(level_content_data_container);
        });

        staff_level_data_container.appendChild(level_data_div);
    });
    
    ppsl_main_container.appendChild(staff_level_block_container);
    ppsl_main_container.appendChild(staff_level_selected_container);
    ppsl_main_container.appendChild(staff_level_change_rule_container);
    ppsl_main_container.appendChild(staff_level_data_container);

    return ppsl_main_container;
}
function get_pp_staff_level_footer() {
    let ppsl_footer_container = document.createElement("div");
    ppsl_footer_container.classList.add("ppsl_footer_container");

    let ppsl_close_btn = document.createElement("div");
    ppsl_close_btn.classList.add("btn");
    ppsl_close_btn.classList.add("ppsl_close_btn");
    ppsl_close_btn.innerHTML = "關閉";
    ppsl_close_btn.addEventListener("click", () => {
        popup_staff_level_div_close();
    });

    ppsl_footer_container.appendChild(ppsl_close_btn);

    return ppsl_footer_container;
}

function popup_staff_level_div_close() {
    popup_staff_level_div.Set_Visible(false);
}
 
function popup_staff_level_div_open() {
    popup_staff_level_div.Set_Visible(true);
}

function get_current_block(e) {
    let temp_block = e.target.innerHTML;
    if (temp_block == current_block) {
        return;
    } else {
        let staff_level_block = document.querySelectorAll(".staff_level_block");
        let staff_level_select = document.querySelector(".staff_level_select");

        // 清除樣式
        staff_level_block.forEach(element => {
            element.classList.remove("active_block");
        });

        // 加入樣式至點選的按鈕
        e.target.classList.add("active_block");

        current_block = temp_block;

        // 載入資料
        switch (temp_block) {
            case "藥局":
                staff_level_data_init(pharmacy_staff_level_data);
                break;

            case "藥庫":
                staff_level_data_init(warehouse_staff_level_data);
                break;
        
            default:
                break;
        }

        console.log("區域" + temp_block + " ==> " + "權限等級：" + staff_level_select.value);
    }
}

function staff_level_data_init(array) {
    let staff_level_data_container = document.querySelector(".staff_level_data_container");
    staff_level_data_container.innerHTML = "";
    
    array.forEach(element => {
        let level_data_div = document.createElement("div");
        level_data_div.classList.add("level_data_div");

        let level_data_title = document.createElement("div");
        level_data_title.classList.add("level_data_title");
        level_data_title.innerHTML = element.title;
        level_data_title.id = element.name;

        level_data_div.appendChild(level_data_title);

        element["content"].forEach(element => {            
            let level_content_data_container = document.createElement("div");
            level_content_data_container.classList.add("level_content_data_container");

            let level_data_checked_box = document.createElement("input");
            level_data_checked_box.type = "checkbox";
            level_data_checked_box.classList.add("level_data_checked_box");
            level_data_checked_box.id = element.name;
            level_data_checked_box.name = element.name;

            let level_data_label = document.createElement("label");
            level_data_label.setAttribute("for", element.name);
            level_data_label.classList.add("level_data_label");

            let level_data_label_trigger_container = document.createElement("div");
            level_data_label_trigger_container.classList.add("level_data_label_trigger_container");

            let level_data_label_trigger = document.createElement("div");
            level_data_label_trigger.classList.add("level_data_label_trigger");

            level_data_label_trigger_container.appendChild(level_data_label_trigger);

            let level_data_label_title = document.createElement("div");
            level_data_label_title.classList.add("level_data_label_title");
            level_data_label_title.innerHTML = element.title;

            level_data_label.appendChild(level_data_label_trigger_container);
            level_data_label.appendChild(level_data_label_title);

            level_content_data_container.appendChild(level_data_checked_box);
            level_content_data_container.appendChild(level_data_label);

            level_data_div.appendChild(level_content_data_container);
        });

        staff_level_data_container.appendChild(level_data_div);
    });
}