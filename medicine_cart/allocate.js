let med_cart_beds_data;
let current_p_bed_data;
let last_p_bed_data;

// 調劑畫面生成
function allocate_diplay_logic() {
    if(last_current_cart == "") {
        console.log("調劑功能畫面初生成");
        patient_bed_index = -1;
        last_patient_bed_index = -1;
    } else if(current_cart != last_current_cart && last_current_cart != "") {
        console.log("調劑功能畫面init，藥車切換");
        patient_bed_index = -1;
        last_patient_bed_index = -1;
    }

    // 根據選取的調劑台解鎖藥品
    if(current_med_table != "") {
        console.log("切換調劑台");
        allocate_display_init();
    } else {
        console.log("未選調劑台");
        allocate_display_init();
    }

    return;
}

// 產生調劑台畫面
async function allocate_display_init() {
    Set_main_div_enable(true);
    med_cart_beds_data = await get_bed_list_by_cart(current_pharmacy.phar, current_cart.hnursta);
    med_cart_beds_data = med_cart_beds_data.Data;

    console.log("調劑功能畫面產生");
    console.log(med_cart_beds_data);
    // console.log(current_p_bed_data);
    func_display_init();

    let function_display_container = document.querySelector(".function_display_container");

    if(med_cart_beds_data.length == 0) {
        let no_data_div = document.createElement("div");
        no_data_div.classList.add("no_data_div");
        no_data_div.innerHTML = `${current_cart.hnursta} 無資料`;

        function_display_container.appendChild(no_data_div);
        Set_main_div_enable(false);
    } else {
        first_patient_bed_index = -1;
        final_patient_bed_index = med_cart_beds_data.length;
        do {
            first_patient_bed_index++;
        } while(med_cart_beds_data[first_patient_bed_index].bed_status != "已佔床");
    
        do {
            final_patient_bed_index--;
        } while(med_cart_beds_data[first_patient_bed_index].bed_status != "已佔床" || first_patient_bed_index == final_patient_bed_index);
        
        if(patient_bed_index == -1) {
            for (let index = 0; index < med_cart_beds_data.length; index++) {
                let element = med_cart_beds_data[index];
                if(element.bed_status == "已佔床") {
                    patient_bed_index = index;
                    break;
                }
            }
        }

        current_p_bed_data = await get_patient_GUID(med_cart_beds_data[patient_bed_index].GUID);
        current_p_bed_data = current_p_bed_data.Data;

        console.log(current_p_bed_data);

        let p_bed_header = get_p_bed_header();
        let p_bed_info_container = set_p_bed_info_container();
        let p_bed_med_container = set_p_bed_med_container();
    
        function_display_container.appendChild(p_bed_header);
        function_display_container.appendChild(p_bed_info_container);
        function_display_container.appendChild(p_bed_med_container);

        let p_status_td = document.querySelectorAll(".p_status_td");
        let p_status_arr = current_p_bed_data.abnormal.split(';');
        console.log(p_status_arr);

        p_status_td.forEach(element => {
            if(p_status_arr.includes(element.getAttribute("key"))) {
                element.classList.add("p_red_notice");
            }
        });
        Set_main_div_enable(false);
    }
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
    pb_name_content.innerHTML = `${current_p_bed_data.nurnum}-${current_p_bed_data.bednum}`;

    pb_name_display.appendChild(pb_name_title);
    pb_name_display.appendChild(pb_name_content);

    let pb_btn_container = document.createElement("div");
    pb_btn_container.classList.add("pb_btn_container");

    let pb_list_btn = document.createElement("div");
    pb_list_btn.classList.add("btn");
    pb_list_btn.classList.add("pb_list_btn");
    pb_list_btn.innerHTML = "病床清單";
    pb_list_btn.addEventListener("click", () => {
        set_pp_bed_list_info();
        popup_bed_list_div_open();
    })
    
    let pb_list_notice = document.createElement("img");
    pb_list_notice.classList.add("pb_list_notice");
    // pb_list_notice.classList.add("display_none");
    pb_list_notice.src = '../image/notice_mark.png'
    
    pb_list_btn.appendChild(pb_list_notice);

    let med_cart_sum_list_btn = document.createElement("div");
    med_cart_sum_list_btn.classList.add("btn");
    med_cart_sum_list_btn.classList.add("med_cart_sum_list_btn");
    med_cart_sum_list_btn.innerHTML = "藥品總量";
    med_cart_sum_list_btn.addEventListener("click", async () => {
        Set_main_div_enable(true);
        med_list_data = await get_all_med_qty(current_pharmacy.phar, current_cart.hnursta);
        med_list_data = med_list_data.Data;
        await set_pp_med_list_display();
        popup_med_list_div_open();
        Set_main_div_enable(false);
    });

    let dc_new_btn = document.createElement("div");
    dc_new_btn.classList.add("btn");
    dc_new_btn.classList.add("dc_new_btn");
    dc_new_btn.innerHTML = "DC / NEW";
    dc_new_btn.addEventListener("click", () => {
        cart_bed_length = fake_dc_new_data["p_bed"].length;
        set_dc_new_info_table();
        popup_dc_new_div_open();
    });

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

    let pbic_top = document.createElement("div");
    pbic_top.classList.add("pbic_top");

    let p_bed_simple_container = document.createElement("div");
    p_bed_simple_container.classList.add("p_bed_simple_container");

    let pbsc_bed_num = document.createElement("div");
    pbsc_bed_num.classList.add("pbsc_info");
    pbsc_bed_num.innerHTML = `${current_p_bed_data.nurnum}-${current_p_bed_data.bednum}`;

    p_bed_simple_container.appendChild(pbsc_bed_num);

    let pbsc_p_name = document.createElement("div");
    pbsc_p_name.classList.add("pbsc_info");
    pbsc_p_name.innerHTML = `病人姓名：${current_p_bed_data.pnamec}`;

    p_bed_simple_container.appendChild(pbsc_p_name);

    let pbsc_histno = document.createElement("div");
    pbsc_histno.classList.add("pbsc_info");
    pbsc_histno.innerHTML = `病歷號：${current_p_bed_data.histno}`;

    p_bed_simple_container.appendChild(pbsc_histno);

    let pbsc_pfinc = document.createElement("div");
    pbsc_pfinc.classList.add("pbsc_info");
    pbsc_pfinc.innerHTML = `${current_p_bed_data.pfinc}`;

    p_bed_simple_container.appendChild(pbsc_pfinc);

    let pbsc_gender = document.createElement("div");
    pbsc_gender.classList.add("pbsc_info");
    pbsc_gender.innerHTML = `性別：${current_p_bed_data.hsexc}`;

    p_bed_simple_container.appendChild(pbsc_gender);

    let pbsc_age = document.createElement("div");
    pbsc_age.classList.add("pbsc_info");
    pbsc_age.innerHTML = `年齡：${current_p_bed_data.age}`;

    p_bed_simple_container.appendChild(pbsc_age);

    let pbsc_weight = document.createElement("div");
    pbsc_weight.classList.add("pbsc_info");
    pbsc_weight.innerHTML = `體重：${current_p_bed_data.weight}`;

    p_bed_simple_container.appendChild(pbsc_weight);

    let pbsc_hight = document.createElement("div");
    pbsc_hight.classList.add("pbsc_info");
    pbsc_hight.innerHTML = `身高：${current_p_bed_data.hight}`;

    p_bed_simple_container.appendChild(pbsc_hight);

    let pbsc_psectc = document.createElement("div");
    pbsc_psectc.classList.add("pbsc_info");
    pbsc_psectc.innerHTML = `科別：${current_p_bed_data.psectc}`;

    p_bed_simple_container.appendChild(pbsc_psectc);

    let pbsc_pbbsa = document.createElement("div");
    pbsc_pbbsa.classList.add("pbsc_info");
    pbsc_pbbsa.innerHTML = `體表面積：${current_p_bed_data.pbbsa}`;

    p_bed_simple_container.appendChild(pbsc_pbbsa);

    let pbsc_doc_container = document.createElement("div");
    pbsc_doc_container.classList.add("pbsc_info");
    pbsc_doc_container.innerHTML = `
        <div class="pbsc_doc">主治醫師：${current_p_bed_data.pvsdno_name}(${current_p_bed_data.pvsdno})</div>
        <div class="pbsc_doc">住院醫師：${current_p_bed_data.prdno_name}(${current_p_bed_data.prdno})</div>
    `;

    p_bed_simple_container.appendChild(pbsc_doc_container);

    // let pbsc_pbbsa = document.createElement("div");
    // pbsc_pbbsa.classList.add("pbsc_info");
    // pbsc_pbbsa.innerHTML = `體表面積：${current_p_bed_data.pbbsa}`;

    // p_bed_simple_container.appendChild(pbsc_pbbsa);

    let p_bed_detailed_container = document.createElement("div");
    p_bed_detailed_container.classList.add("p_bed_detailed_container");
    p_bed_detailed_container.innerHTML = `
    <table class="pbd_table">
      <tr class="pbd_th">
        <td>ALB</td>
        <td>SCr</td>
        <td>eGFR</td>
        <td>ALT</td>
      </tr>
      <tr class="pbd_tr">
        <td class="p_status_td" key="alb">${current_p_bed_data.alb}</td>
        <td class="p_status_td" key="scr">${current_p_bed_data.scr}</td>
        <td class="p_status_td" key="egfr">${current_p_bed_data.egfr}</td>
        <td class="p_status_td" key="alt">${current_p_bed_data.alt}</td>
      </tr>
      <tr class="pbd_th">
        <td>K</td>
        <td>CA</td>
        <td>NA</td>
        <td>T.B</td>
      </tr>
      <tr class="pbd_tr">
        <td class="p_status_td" key="k">${current_p_bed_data.k}</td>
        <td class="p_status_td" key="ca">${current_p_bed_data.ca}</td>
        <td class="p_status_td" key="na">${current_p_bed_data.na}</td>
        <td class="p_status_td" key="tb">${current_p_bed_data.tb}</td>
      </tr>
      <tr class="pbd_th">
        <td>WBC</td>
        <td>Hgb</td>
        <td>PLT</td>
        <td>INR</td>
      </tr>
      <tr class="pbd_tr">
        <td class="p_status_td" key="wbc">${current_p_bed_data.wbc}</td>
        <td class="p_status_td" key="hgb">${current_p_bed_data.hgb}</td>
        <td class="p_status_td" key="plt">${current_p_bed_data.plt}</td>
        <td class="p_status_td" key="inr">${current_p_bed_data.inr}</td>
      </tr>
    </table>`;

    pbic_top.appendChild(p_bed_simple_container);
    pbic_top.appendChild(p_bed_detailed_container);

    let pbic_disease_container = document.createElement("div");
    pbic_disease_container.classList.add("pbic_disease_container");

    
    if(current_p_bed_data.disease != "" && current_p_bed_data.disease_code != "") {
        let pbict_table = document.createElement('table');
        pbict_table.classList.add("pbict_table");

        let pbict_thead = document.createElement("tr");
        pbict_thead.classList.add("pbict_thead");
        pbict_thead.innerHTML = `
            <td>項次</td>
            <td>疾病代號</td>
            <td>病名</td>
        `;

        pbict_table.appendChild(pbict_thead);

        let diseasesArray = current_p_bed_data.disease_descrip.split(";");
        let codesArray = current_p_bed_data.disease_code.split(";");
    
        let diseases_arr = diseasesArray.map((item, index) => {
            return {
                name: item,
                code: codesArray[index]
            };
        });

        console.log(diseases_arr);

        diseases_arr.forEach((item, index) => {
            let pbict_tr = document.createElement("tr");
            pbict_tr.classList.add("pbict_tr");
            pbict_tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.code}</td>
                <td>${item.name}</td>
            `;

            pbict_table.appendChild(pbict_tr);
        });

        pbic_disease_container.appendChild(pbict_table);
    } else {
        pbic_disease_container.innerHTML = '無疾病資料';
    }


    p_bed_info_container.appendChild(pbic_top);
    p_bed_info_container.appendChild(pbic_disease_container);

    return p_bed_info_container;
}
function set_p_bed_med_container() {
    // 病床藥品資料
    let p_bed_med_container = document.createElement("div");
    p_bed_med_container.classList.add("p_bed_med_container");

    let pbm_header_container = set_pbm_header_container();
    let pbm_main_container = set_pbm_main_container();
    let pbm_footer_container = set_pbm_footer_container();

    p_bed_med_container.appendChild(pbm_header_container);
    p_bed_med_container.appendChild(pbm_main_container);
    p_bed_med_container.appendChild(pbm_footer_container);

    return p_bed_med_container;
}
function set_pbm_header_container() {
    let pbm_header_container = document.createElement("div");
    pbm_header_container.classList.add('pbm_header_container');

    let pbmh_pre_btn = document.createElement("div");
    pbmh_pre_btn.classList.add("pbmh_pre_btn");
    pbmh_pre_btn.classList.add("btn");
    pbmh_pre_btn.innerHTML = "上一床";
    if(patient_bed_index == first_patient_bed_index) {
        pbmh_pre_btn.classList.add("pbmh_pre_btn_not_allow");
    } else {
        pbmh_pre_btn.addEventListener("click", () => {
            pre_bed_func();
        });
    }

    let pbmh_light_on_btn = document.createElement("div");
    pbmh_light_on_btn.classList.add("pbmh_light_on_btn");
    pbmh_light_on_btn.innerHTML = "亮燈";

    let pbmh_checked_trigger_label = document.createElement("div");
    pbmh_checked_trigger_label.classList.add("pbmh_checked_trigger_label");
    pbmh_checked_trigger_label.classList.add("btn");
    pbmh_checked_trigger_label.setAttribute("checked", false);
    pbmh_checked_trigger_label.innerHTML = "全選";
    pbmh_checked_trigger_label.addEventListener("click", (e) => {
        let tirgger = e.target.getAttribute("checked");
        let med_card_checkbox = document.querySelectorAll(".med_card_checkbox");
        if(tirgger == "false") {
            // 點選後全選
            med_card_checkbox.forEach(element => {
                if(!element.disabled) {
                    element.checked = true;
                    e.target.innerHTML = "取消全選";
                    e.target.setAttribute("checked", true);
                }
            });
        } else {
            med_card_checkbox.forEach(element => {
                if(!element.disabled) {
                    element.checked = false;
                    e.target.innerHTML = "全選";
                    e.target.setAttribute("checked", false);
                }
            });
        }
    });

    // let pbmh_checked_trigger = document.createElement("input");
    // pbmh_checked_trigger.id = "pbmh_checked_trigger";
    // pbmh_checked_trigger.type = "checkbox";
    // pbmh_checked_trigger.name = "pbmh_checked_trigger";

    // pbmh_checked_trigger_label.appendChild(pbmh_checked_trigger);

    let pbmh_next_btn = document.createElement("div");
    pbmh_next_btn.classList.add("pbmh_next_btn");
    pbmh_next_btn.classList.add("btn");
    pbmh_next_btn.innerHTML = "下一床";
    if(patient_bed_index == final_patient_bed_index) {
        pbmh_next_btn.classList.add("pbmh_pre_btn_not_allow");
    } else {
        pbmh_next_btn.addEventListener("click", () => {
            next_bed_func();
        });
    }

    let pbmh_checked_submit_btn = document.createElement("div");
    pbmh_checked_submit_btn.classList.add("pbmh_checked_submit_btn");
    pbmh_checked_submit_btn.classList.add("btn");
    pbmh_checked_submit_btn.innerHTML = "完成";

    pbm_header_container.appendChild(pbmh_pre_btn);
    pbm_header_container.appendChild(pbmh_light_on_btn);
    pbm_header_container.appendChild(pbmh_checked_trigger_label);
    pbm_header_container.appendChild(pbmh_checked_submit_btn);
    pbm_header_container.appendChild(pbmh_next_btn);

    return pbm_header_container;
}
function set_pbm_main_container() {
    let pbm_main_container = document.createElement("div");
    pbm_main_container.classList.add("pbm_main_container");
    
    console.log(current_p_bed_data);

    if(current_p_bed_data["cpoe"].length == 0) {
        let no_med_info_div = document.createElement("div");
        no_med_info_div.classList.add("no_med_info_div");
        no_med_info_div.innerHTML = "無藥品資料";

        pbm_main_container.appendChild(no_med_info_div);
        
        return pbm_main_container;
    }

    current_p_bed_data["cpoe"].forEach(element => {
        let med_card_container = document.createElement("div");
        med_card_container.classList.add("med_card_container");

        let med_card_title_container = document.createElement("div");
        med_card_title_container.classList.add("med_card_title_container");

        let med_card_checkbox_label = document.createElement("label");
        med_card_checkbox_label.classList.add("med_card_checkbox_label");
        med_card_checkbox_label.setAttribute("for", `${element.GUID}`);

        let med_card_checkbox = document.createElement("input");
        med_card_checkbox.classList.add("med_card_checkbox");
        med_card_checkbox.id = `${element.GUID}`;
        if(element.dispens_status == "Y") med_card_checkbox.checked = true;
        med_card_checkbox.type = "checkbox";
        if(current_med_table == "") {
            med_card_checkbox.disabled = true;
            med_card_container.classList.add("card_disable");
        } else {
            if(current_med_table == "all") {
                med_card_checkbox.disabled = false;
            } else {
                if(current_med_table.name == element.Dispensing) {
                    med_card_checkbox.disabled = false;
                } else {
                    med_card_checkbox.disabled = true;
                    med_card_container.classList.add("card_disable");
                }
            }
        }

        med_card_checkbox_label.appendChild(med_card_checkbox);

        let med_card_main_display_container = document.createElement("div");
        med_card_main_display_container.classList.add("med_card_main_display_container");

        let med_card_info_container = document.createElement("div");
        med_card_info_container.classList.add("med_card_info_container");

        let med_card_code = document.createElement("div");
        med_card_code.classList.add("med_card_code");
        med_card_code.innerHTML = `藥碼：${element.code}`;

        let med_card_qty = document.createElement("div");
        med_card_qty.classList.add("med_card_qty");
        let temp_qty = +element.qty
        med_card_qty.innerHTML = `劑量：${temp_qty}`;

        let med_card_unit = document.createElement("div");
        med_card_unit.classList.add("med_card_unit");
        med_card_unit.innerHTML = `單位：${element.dunit}`;

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

        let med_card_open_tigger = document.createElement("img");
        med_card_open_tigger.classList.add("med_card_open_tigger");
        med_card_open_tigger.src = "../image/left-arrow.png";

        med_card_title_container.appendChild(med_card_checkbox_label);
        med_card_title_container.appendChild(med_card_main_display_container);
        med_card_title_container.appendChild(med_card_open_tigger);

        med_card_container.appendChild(med_card_title_container);
        
        let med_more_info_container = document.createElement("div");
        med_more_info_container.classList.add("med_more_info_container");
        
        med_card_container.appendChild(med_more_info_container);

        pbm_main_container.appendChild(med_card_container);
    });

    return pbm_main_container;
}
function set_pbm_footer_container() {
    let pbm_footer_container = document.createElement("div");
    pbm_footer_container.classList.add('pbm_footer_container');

    let pbmh_pre_btn = document.createElement("div");
    pbmh_pre_btn.classList.add("pbmh_pre_btn");
    pbmh_pre_btn.classList.add("btn");
    pbmh_pre_btn.innerHTML = "上一床";
    if(patient_bed_index == first_patient_bed_index) {
        pbmh_pre_btn.classList.add("pbmh_pre_btn_not_allow");
    } else {
        pbmh_pre_btn.addEventListener("click", () => {
            pre_bed_func();
        });
    }

    let pbmf_submit_btn = document.createElement("div");
    pbmf_submit_btn.classList.add("pbmf_submit_btn");
    pbmf_submit_btn.classList.add("btn");
    pbmf_submit_btn.innerHTML = "確認初盤";

    let pbmh_checked_submit_btn = document.createElement("div");
    pbmh_checked_submit_btn.classList.add("pbmh_checked_submit_btn");
    pbmh_checked_submit_btn.classList.add("btn");
    pbmh_checked_submit_btn.innerHTML = "完成";

    let pbmh_light_on_btn = document.createElement("div");
    pbmh_light_on_btn.classList.add("pbmh_light_on_btn");
    pbmh_light_on_btn.innerHTML = "亮燈";

    let pbmh_next_btn = document.createElement("div");
    pbmh_next_btn.classList.add("pbmh_next_btn");
    pbmh_next_btn.classList.add("btn");
    pbmh_next_btn.innerHTML = "下一床";
    if(patient_bed_index == final_patient_bed_index) {
        pbmh_next_btn.classList.add("pbmh_pre_btn_not_allow");
    } else {
        pbmh_next_btn.addEventListener("click", () => {
            next_bed_func();
        });
    }

    pbm_footer_container.appendChild(pbmh_pre_btn);
    pbm_footer_container.appendChild(pbmh_light_on_btn);
    pbm_footer_container.appendChild(pbmf_submit_btn);
    pbm_footer_container.appendChild(pbmh_checked_submit_btn);
    pbm_footer_container.appendChild(pbmh_next_btn);

    return pbm_footer_container;
}
async function pre_bed_func() {
    await set_post_data_to_check_dispense();
    let temp_p_bed_index = patient_bed_index;
    first_patient_bed_index;
    final_patient_bed_index;

    do {
        temp_p_bed_index--;
    } while(med_cart_beds_data[temp_p_bed_index]["bed_status"] != "已佔床");
    last_patient_bed_index = patient_bed_index;
    patient_bed_index = temp_p_bed_index;
    allocate_display_init();
}
async function next_bed_func() {
    await set_post_data_to_check_dispense();
    let temp_p_bed_index = patient_bed_index;
    first_patient_bed_index;
    final_patient_bed_index;

    do {
        temp_p_bed_index++;
    } while(med_cart_beds_data[temp_p_bed_index]["bed_status"] != "已佔床");
    last_patient_bed_index = patient_bed_index;
    patient_bed_index = temp_p_bed_index;
    allocate_display_init();
}

async function set_post_data_to_check_dispense() {
    let med_card_checkbox = document.querySelectorAll(".med_card_checkbox");
    let bed_guid = current_p_bed_data.GUID;
    let med_arr = [];
    let post_data = {
        Value: bed_guid,
        ValueAry: []
    }

    med_card_checkbox.forEach(element => {
        if(!element.disabled && element.checked) {
            med_arr.push(element.id);
        };
    });

    if(med_arr.length < 1) return;

    post_data.ValueAry[0] = med_arr.join(";");
    console.log(post_data);
    api_med_cart_check_dispense(post_data);
    // console.log(med_arr);
}