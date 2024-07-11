let med_cart_data;
let fake_data = [
    {
        code: "2DIPTY",
        name: "Diphenhydramine*台裕*",
        cht_name: "",
        qty: "8",
        unit: "Amp",
        regulator: false,
        Dispensing: "針劑"
    },
    {
        code: "2DIPTY",
        name: "Diphenhydramine*台裕*",
        cht_name: "",
        qty: "8",
        unit: "Amp",
        regulator: false,
        Dispensing: "口服"
    },
    {
        code: "2DIPTY",
        name: "Diphenhydramine*台裕*",
        cht_name: "",
        qty: "8",
        unit: "Amp",
        regulator: false,
        Dispensing: "針劑"
    },
];
// 調劑畫面生成
function allocate_diplay_logic() {
    if(last_current_cart == "") {
        console.log("調劑功能畫面初生成");
        patient_bed_index = 0;
        allocate_display_init();
    } else if(current_cart != last_current_cart && last_current_cart != "") {
        console.log("調劑功能畫面init，藥車切換");
        patient_bed_index = 0;
        allocate_display_init();
    }

    // 根據選取的調劑台解鎖藥品
    if(current_med_table != "") {
        console.log("切換調劑台");
    } else {
        console.log("未選調劑台");
    }

    return;
}

// 產生調劑台畫面
function allocate_display_init() {
    console.log("調劑功能畫面產生");
    func_display_init();

    let function_display_container = document.querySelector(".function_display_container");

    let p_bed_header = get_p_bed_header();
    let p_bed_info_container = set_p_bed_info_container();
    let p_bed_med_container = set_p_bed_med_container();

    function_display_container.appendChild(p_bed_header);
    function_display_container.appendChild(p_bed_info_container);
    function_display_container.appendChild(p_bed_med_container);
}
function get_p_bed_header() {
    // 病床資訊及彈窗按鈕
    let p_bed_header = document.createElement("div");
    p_bed_header.classList.add("p_bed_header");

    let pb_name_display = document.createElement("div");
    pb_name_display.classList.add("pb_name_display");

    let pb_name_title = document.createElement("span");
    pb_name_title.classList.add("pb_name_title");
    pb_name_title.innerHTML = "病床號：";

    let pb_name_content = document.createElement("span");
    pb_name_content.classList.add("pb_name_content");
    pb_name_content.innerHTML = `這裡放病床名`;

    pb_name_display.appendChild(pb_name_title);
    pb_name_display.appendChild(pb_name_content);

    let pb_btn_container = document.createElement("div");
    pb_btn_container.classList.add("pb_btn_container");

    let pb_list_btn = document.createElement("div");
    pb_list_btn.classList.add("btn");
    pb_list_btn.classList.add("pb_list_btn");
    pb_list_btn.innerHTML = "病床清單";
    
    let pb_list_notice = document.createElement("img");
    pb_list_notice.classList.add("pb_list_notice");
    // pb_list_notice.classList.add("display_none");
    pb_list_notice.src = '../image/notice_mark.png'
    
    pb_list_btn.appendChild(pb_list_notice);

    let med_cart_sum_list_btn = document.createElement("div");
    med_cart_sum_list_btn.classList.add("btn");
    med_cart_sum_list_btn.classList.add("med_cart_sum_list_btn");
    med_cart_sum_list_btn.innerHTML = "藥品總量";

    let dc_new_btn = document.createElement("div");
    dc_new_btn.classList.add("btn");
    dc_new_btn.classList.add("dc_new_btn");
    dc_new_btn.innerHTML = "DC / NEW";

    pb_btn_container.appendChild(dc_new_btn);
    pb_btn_container.appendChild(med_cart_sum_list_btn);
    pb_btn_container.appendChild(pb_list_btn);

    // pb_btn_container.appendChild();
    // pb_btn_container.appendChild();

    p_bed_header.appendChild(pb_name_display);
    p_bed_header.appendChild(pb_btn_container);

    return p_bed_header;
}
function set_p_bed_info_container() {
    // 病床資料
    let p_bed_info_container = document.createElement("div");
    p_bed_info_container.classList.add("p_bed_info_container");

    let p_bed_simple_container = document.createElement("div");
    p_bed_simple_container.classList.add("p_bed_simple_container");

    let p_bed_detailed_container = document.createElement("div");
    p_bed_detailed_container.classList.add("p_bed_detailed_container");

    p_bed_info_container.appendChild(p_bed_simple_container);
    p_bed_info_container.appendChild(p_bed_detailed_container);

    return p_bed_info_container;
}
function set_p_bed_med_container() {
    // 病床藥品資料
    let p_bed_med_container = document.createElement("div");
    p_bed_med_container.classList.add("p_bed_med_container");

    let pbm_header_container = set_pbm_header_container();
    let pbm_main_container = set_pbm_main_container();

    p_bed_med_container.appendChild(pbm_header_container);
    p_bed_med_container.appendChild(pbm_main_container);

    return p_bed_med_container;
}
function set_pbm_header_container() {
    let pbm_header_container = document.createElement("div");
    pbm_header_container.classList.add('pbm_header_container');

    let pbmh_pre_btn = document.createElement("div");
    pbmh_pre_btn.classList.add("pbmh_pre_btn");
    pbmh_pre_btn.classList.add("btn");
    pbmh_pre_btn.innerHTML = "上一床";

    let pbmh_light_on_btn = document.createElement("div");
    pbmh_light_on_btn.classList.add("pbmh_light_on_btn");
    pbmh_light_on_btn.innerHTML = "亮燈";

    let pbmh_checked_trigger_label = document.createElement("label");
    pbmh_checked_trigger_label.classList.add("pbmh_checked_trigger_label");
    pbmh_checked_trigger_label.setAttribute("for", "pbmh_checked_trigger");

    let pbmh_checked_trigger = document.createElement("input");
    pbmh_checked_trigger.id = "pbmh_checked_trigger";
    pbmh_checked_trigger.type = "checkbox";
    pbmh_checked_trigger.name = "pbmh_checked_trigger";

    pbmh_checked_trigger_label.appendChild(pbmh_checked_trigger);
    pbmh_checked_trigger_label.innerHTML += "全選";

    let pbmh_next_btn = document.createElement("div");
    pbmh_next_btn.classList.add("pbmh_next_btn");
    pbmh_next_btn.classList.add("btn");
    pbmh_next_btn.innerHTML = "下一床";

    pbm_header_container.appendChild(pbmh_pre_btn);
    pbm_header_container.appendChild(pbmh_checked_trigger_label);
    pbm_header_container.appendChild(pbmh_light_on_btn);
    pbm_header_container.appendChild(pbmh_next_btn);

    return pbm_header_container;
}
function set_pbm_main_container() {
    let pbm_main_container = document.createElement("div");
    pbm_main_container.classList.add("pbm_main_container");

    fake_data.forEach(element => {
        let med_card_container = document.createElement("div");
        med_card_container.classList.add("med_card_container");

        let med_card_title_container = document.createElement("div");
        med_card_title_container.classList.add("med_card_title_container");

        let med_card_main_display_container = document.createElement("div");
        med_card_main_display_container.classList.add("med_card_main_display_container");

        let med_card_info_container = document.createElement("div");
        med_card_info_container.classList.add("med_card_info_container");

        let med_card_code = document.createElement("div");
        med_card_code.classList.add("med_card_code");
        med_card_code.innerHTML = `藥碼：${element.code}`;

        let med_card_qty = document.createElement("div");
        med_card_qty.classList.add("med_card_qty");
        med_card_qty.innerHTML = `劑量：${element.qty}`;

        let med_card_unit = document.createElement("div");
        med_card_unit.classList.add("med_card_unit");
        med_card_unit.innerHTML = `單位：${element.unit}`;

        med_card_info_container.appendChild(med_card_code);
        med_card_info_container.appendChild(med_card_qty);
        med_card_info_container.appendChild(med_card_unit);

        let med_name_card_container = document.createElement("div");
        med_name_card_container.classList.add("med_name_card_container");

        let med_card_name = document.createElement("div");
        med_card_name.classList.add("med_card_name");
        if(element.name == "") {
            med_card_name.innerHTML = `(英)：無`;
        } else {
            med_card_name.innerHTML = `(英)：${element.name}`;
        }

        let med_card_cht_name = document.createElement("div");
        med_card_cht_name.classList.add("med_card_cht_name");
        if(element.cht_name == "") {
            med_card_cht_name.innerHTML = `(中)：無`;
        } else {
            med_card_cht_name.innerHTML = `(中)：${element.cht_name}`;
        }

        med_name_card_container.appendChild(med_card_name);
        med_name_card_container.appendChild(med_card_cht_name);

        med_card_main_display_container.appendChild(med_card_info_container);
        med_card_main_display_container.appendChild(med_name_card_container);

        med_card_title_container.appendChild(med_card_main_display_container);

        med_card_container.appendChild(med_card_title_container)

        pbm_main_container.appendChild(med_card_container);
    });

    return pbm_main_container;
}