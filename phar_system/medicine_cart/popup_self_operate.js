let popup_self_operate_div;
let ppso_table_data;

function get_popup_self_operate() {
    popup_self_operate_div = new Basic_popup_Div('popup_self_operate_div','popup_self_operate_div','','');
    popup_self_operate_div._popup_div.style.border = '10px solid white';

    let header = get_ppso_header();
    let main = get_ppso_main();
    let footer = get_ppso_footer();

    popup_self_operate_div.AddControl(header);
    popup_self_operate_div.AddControl(main);
    popup_self_operate_div.AddControl(footer);

    return popup_self_operate_div;
};
function get_ppso_header() {
    let ppso_header_container = document.createElement("div");
    ppso_header_container.classList.add("ppso_header_container");

    let ppso_h_title = document.createElement("div");
    ppso_h_title.classList.add("ppso_h_title");
    ppso_h_title.innerText = "操作紀錄";

    let ppso_h_close_btn = document.createElement("img");
    ppso_h_close_btn.classList.add("ppso_h_close_btn");
    ppso_h_close_btn.src = "../image/close.png";
    ppso_h_close_btn.addEventListener("click", () => {
        popup_self_operate_div_close();
    });

    ppso_header_container.appendChild(ppso_h_title);
    ppso_header_container.appendChild(ppso_h_close_btn);

    return ppso_header_container;
}
function get_ppso_main() {
    let ppso_main_container = document.createElement("div");
    ppso_main_container.classList.add("ppso_main_container");

    let ppso_main_time_range_container = document.createElement("div");
    ppso_main_time_range_container.classList.add("ppso_main_time_range_container");

    let ppso_main_time_head = document.createElement("div");
    ppso_main_time_head.classList.add("ppso_main_time_head");
    
    let ppso_main_time_title = document.createElement("div");
    ppso_main_time_title.classList.add("ppso_main_time_title");
    ppso_main_time_title.innerHTML = '操作時間';

    let ppso_main_time_trigger = document.createElement("div");
    ppso_main_time_trigger.classList.add("ppso_main_time_trigger");
    ppso_main_time_trigger.innerHTML = '<img src="../image/left-arrow.png"/>';
    ppso_main_time_trigger.addEventListener("click", () => {
        if(ppso_main_time_input_container.className.includes("ppso_main_time_input_container_open")) {
            ppso_main_time_head.classList.remove("ppso_main_time_head_open");
            ppso_main_time_input_container.classList.remove("ppso_main_time_input_container_open");
            ppso_main_time_trigger.classList.remove("ppso_main_time_trigger_open");
        } else {
            ppso_main_time_head.classList.add("ppso_main_time_head_open");
            ppso_main_time_input_container.classList.add("ppso_main_time_input_container_open");
            ppso_main_time_trigger.classList.add("ppso_main_time_trigger_open");
        }
    })

    ppso_main_time_head.appendChild(ppso_main_time_title);
    ppso_main_time_head.appendChild(ppso_main_time_trigger);

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 月份補0
    const day = String(today.getDate()).padStart(2, '0'); // 日期補0

    // document.getElementById('myDate').value = `${year}-${month}-${day}`;

    let ppso_main_time_input_container = document.createElement("div");
    ppso_main_time_input_container.classList.add("ppso_main_time_input_container");

    let ppso_main_start_time_div = document.createElement("div");
    ppso_main_start_time_div.classList.add("ppso_main_time_div");

    let ppso_main_start_time_label = document.createElement("label");
    ppso_main_start_time_label.classList.add("ppso_main_time_label");
    ppso_main_start_time_label.innerHTML = "操作日期";
    ppso_main_start_time_label.setAttribute("for", "ppso_start_time");

    let ppso_main_start_time_input = document.createElement('input');
    ppso_main_start_time_input.classList.add("ppso_main_time_input");
    ppso_main_start_time_input.id = "ppso_start_time";
    ppso_main_start_time_input.type = "date";
    ppso_main_start_time_input.value = `${year}-${month}-${day}`;
    ppso_main_start_time_input.addEventListener("change", () => {
        set_self_operate_info_table()
    });

    ppso_main_start_time_div.appendChild(ppso_main_start_time_label);
    ppso_main_start_time_div.appendChild(ppso_main_start_time_input);

    let ppso_main_end_time_div = document.createElement("div");
    ppso_main_end_time_div.classList.add("ppso_main_time_div");

    let ppso_main_end_time_label = document.createElement("label");
    ppso_main_end_time_label.classList.add("ppso_main_time_label");
    ppso_main_end_time_label.innerHTML = "結束時間";
    ppso_main_end_time_label.setAttribute("for", "ppso_end_time");

    let ppso_main_end_time_input = document.createElement('input');
    ppso_main_end_time_input.classList.add("ppso_main_time_input");
    ppso_main_end_time_input.id = "ppso_end_time";
    ppso_main_end_time_input.type = "date";
    ppso_main_end_time_input.value = `${year}-${month}-${day}`;
    ppso_main_end_time_input.addEventListener("change", () => {
        set_self_operate_info_table()
    });

    ppso_main_end_time_div.appendChild(ppso_main_end_time_label);
    ppso_main_end_time_div.appendChild(ppso_main_end_time_input);

    ppso_main_time_input_container.appendChild(ppso_main_start_time_div);
    // ppso_main_time_input_container.appendChild(ppso_main_end_time_div);

    ppso_main_time_range_container.appendChild(ppso_main_time_head);
    ppso_main_time_range_container.appendChild(ppso_main_time_input_container);

    let ppso_table_container = document.createElement("div");
    ppso_table_container.classList.add("ppso_table_container");

    ppso_main_container.appendChild(ppso_main_time_range_container);
    ppso_main_container.appendChild(ppso_table_container);

    return ppso_main_container;
}
function get_ppso_footer() {
    let ppso_footer_container = document.createElement("div");
    ppso_footer_container.classList.add("ppso_footer_container");

    return ppso_footer_container;
}
function popup_self_operate_div_close() {
    popup_self_operate_div.Set_Visible(false);
}
async function popup_self_operate_div_open() {
    ppso_table_data = await get_table_info();
    await set_self_operate_info_table();
    popup_self_operate_div.Set_Visible(true);
}
async function set_self_operate_info_table() {
    let ppso_table_container = document.querySelector(".ppso_table_container");
    ppso_table_container.innerHTML = "";

    let start_time = document.querySelector("#ppso_start_time").value;
    // let end_time = document.querySelector("#ppso_end_time").value;

    const startTime = new Date(`${start_time}T00:00:00`);
    const endTime = new Date(`${start_time}T23:59:59`);

    const data_filtered = ppso_table_data.filter(item => {
        // 把 op_time 轉成 Date
        const opTime = new Date(item.op_time.replace(/\//g, "-"));
        return opTime >= startTime && opTime <= endTime;
    });

    let table_th_arr = ["動作", "護理站", "床號", "藥碼", "藥名", "數量", "操作時間"];

    let ppso_table = document.createElement("table");
    ppso_table.classList.add("ppso_table");

    let ppso_head_tr = document.createElement("tr");
    ppso_head_tr.classList.add("ppso_head_tr");

    table_th_arr.forEach(element => {
        let ppso_th = document.createElement("th");
        ppso_th.classList.add("ppso_th");
        ppso_th.classList.add("ppso_text_center");
        ppso_th.innerText = element;

        ppso_head_tr.appendChild(ppso_th);
    });

    ppso_table.appendChild(ppso_head_tr);
    
    data_filtered.forEach(element => {
        let ppso_body_tr = document.createElement("tr");
        ppso_body_tr.classList.add("ppso_body_tr");

        table_th_arr.forEach(item => {
            let ppso_td = document.createElement("td");
            ppso_td.classList.add("ppso_td");

            switch (item) {
                case "動作":
                    ppso_td.innerText = element.op_act;
                    ppso_td.classList.add("ppso_text_center");
                    break;
                case "護理站":
                    ppso_td.innerText = element.nurnum;
                    ppso_td.classList.add("ppso_text_center");
                    break;
                case "床號":
                    ppso_td.innerText = element.bednum;
                    ppso_td.classList.add("ppso_text_center");
                    break;
                case "藥碼":
                    ppso_td.innerText = element.code;
                    ppso_td.classList.add("ppso_text_center");
                    break;
                case "藥名":
                    ppso_td.innerText = element.name;
                    break;
                case "數量":
                    ppso_td.innerText = element.qty;
                    ppso_td.classList.add("ppso_text_center");
                    break;
                case "操作時間":
                    ppso_td.innerText = element.op_time;
                    break;
            
                default:
                    break;
            }

            ppso_body_tr.appendChild(ppso_td);
        });
        
        ppso_table.appendChild(ppso_body_tr);
    });

    ppso_table_container.appendChild(ppso_table);
};


async function get_table_info() {
    let user_session = JSON.parse(sessionStorage.getItem("user_session"));
    let post_data;
    let return_data;
    console.log(user_session)
    if(user_session.ID) {
        post_data = {
            Data: [],
            ValueAry: [user_session.ID]
        }

        return_data = await get_logtime_by_opid(post_data);
    } else {
        return_data = {
            Data: [],
        };
    }

    console.log(return_data);

    return return_data.Data
};

